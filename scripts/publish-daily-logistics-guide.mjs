import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { editorialArticles } from "./logistics-editorial-library.mjs"

const postsDir = path.join(process.cwd(), "content", "posts")
const stateFile = path.join(process.cwd(), "content", ".daily-logistics-state.json")
const dryRun = process.env.DAILY_POST_DRY_RUN === "1"
const researchOnly = process.env.DAILY_POST_RESEARCH_ONLY === "1"
const forcePublish = process.env.DAILY_POST_FORCE === "1"
const allowedSourceHosts = new Set(["www.wcoomd.org", "www.adb.org", "cpmm.carecprogram.org"])

const sources = {
  wcoTransit: {
    name: "World Customs Organization - Transit Guidelines",
    url: "https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/tools/transit-guidelines.aspx",
    requiredTerms: ["Transit Guidelines", "transit regimes"],
  },
  wcoAnnexE: {
    name: "World Customs Organization - Revised Kyoto Convention, Specific Annex E",
    url: "https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/conventions/pf_revised_kyoto_conv/kyoto_new/spane.aspx?p=1",
    requiredTerms: ["Customs transit", "Specific Annex E"],
  },
  carecRail: {
    name: "Asian Development Bank - Railway Strategy for CAREC 2017-2030",
    url: "https://www.adb.org/documents/railway-strategy-carec-2017-2030",
    requiredTerms: ["Railway Strategy", "CAREC"],
  },
  carecTransport: {
    name: "Asian Development Bank - CAREC Transport Strategy 2030",
    url: "https://www.adb.org/documents/carec-transport-strategy-2030",
    requiredTerms: ["CAREC Transport Strategy", "Cross-Border Transport"],
  },
  panAsian: {
    name: "Asian Development Bank - Pan-Asian Corridors 2026",
    url: "https://www.adb.org/annual-meeting/2026/events/pan-asia-corridors",
    requiredTerms: ["Pan-Asian", "corridors"],
  },
  tajikistan: {
    name: "CAREC Corridor Performance Monitoring - Tajikistan 2022",
    url: "https://cpmm.carecprogram.org/2022-report/tajikistan/",
    requiredTerms: ["Tajikistan", "Corridor Performance"],
  },
  kazakhstan: {
    name: "CAREC Corridor Performance Monitoring - Kazakhstan 2022",
    url: "https://cpmm.carecprogram.org/2022-report/kazakhstan/",
    requiredTerms: ["Kazakhstan", "Corridor Performance"],
  },
  uzbekistan: {
    name: "CAREC Corridor Performance Monitoring - Uzbekistan 2022",
    url: "https://cpmm.carecprogram.org/2022-report/uzbekistan/",
    requiredTerms: ["Uzbekistan", "Corridor Performance"],
  },
  kyrgyzstan: {
    name: "CAREC Corridor Performance Monitoring - Kyrgyz Republic 2022",
    url: "https://cpmm.carecprogram.org/2022-report/kyrgyz-republic/",
    requiredTerms: ["Kyrgyz", "Corridor Performance"],
  },
}

function chinaDate() {
  if (process.env.DAILY_POST_DATE) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(process.env.DAILY_POST_DATE)) {
      throw new Error("DAILY_POST_DATE must use YYYY-MM-DD")
    }
    return process.env.DAILY_POST_DATE
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

function parseDate(value) {
  const timestamp = Date.parse(`${value}T00:00:00Z`)
  if (!Number.isFinite(timestamp)) throw new Error(`Invalid date: ${value}`)
  return new Date(timestamp)
}

export function addDays(value, days) {
  const date = parseDate(value)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function chooseIntervalDays() {
  if (process.env.DAILY_POST_INTERVAL_DAYS) {
    const interval = Number(process.env.DAILY_POST_INTERVAL_DAYS)
    if (![1, 2, 3].includes(interval)) throw new Error("DAILY_POST_INTERVAL_DAYS must be 1, 2, or 3")
    return interval
  }
  return crypto.randomInt(1, 4)
}

function readState() {
  if (!fs.existsSync(stateFile)) return null
  const state = JSON.parse(fs.readFileSync(stateFile, "utf8"))
  if (state.version !== 1 || !/^\d{4}-\d{2}-\d{2}$/.test(state.nextPublishOn || "")) {
    throw new Error("Invalid daily publishing state")
  }
  return state
}

function latestManagedPostDate() {
  if (!fs.existsSync(postsDir)) return null
  return fs.readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => matter(fs.readFileSync(path.join(postsDir, file), "utf8")).data)
    .filter((data) => data.generatedBy === "source-grounded-daily-logistics-guide" && data.date)
    .map((data) => String(data.date).slice(0, 10))
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort()
    .at(-1) || null
}

export function scheduleDecision(date, state, latestPublishedOn, options = {}) {
  if (options.force || options.dryRun || options.researchOnly) {
    return { due: true, reason: options.force ? "forced" : "validation-run" }
  }
  const nextPublishOn = state?.nextPublishOn || (latestPublishedOn ? addDays(latestPublishedOn, 1) : date)
  return date >= nextPublishOn
    ? { due: true, reason: "scheduled", nextPublishOn }
    : { due: false, reason: "waiting", nextPublishOn }
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
}

function extractReadableText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    || html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    || html

  return decodeEntities(main)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function fetchSource(id) {
  const source = sources[id]
  if (!source) throw new Error(`Unknown research source: ${id}`)
  const url = new URL(source.url)
  if (url.protocol !== "https:" || !allowedSourceHosts.has(url.hostname)) {
    throw new Error(`Source is not on the authority allowlist: ${source.url}`)
  }

  let lastError
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(source.url, {
        signal: AbortSignal.timeout(20_000),
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent": "Fengji logistics source checker; contact https://www.modcv.com/",
        },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const contentType = response.headers.get("content-type") || ""
      if (!contentType.includes("text/html")) throw new Error(`Unsupported content type: ${contentType}`)
      const html = await response.text()
      const text = extractReadableText(html)
      if (text.length < 600) throw new Error("Source page did not expose enough readable text")
      if (!source.requiredTerms.some((term) => text.toLowerCase().includes(term.toLowerCase()))) {
        throw new Error("Source page no longer contains the expected subject matter")
      }
      return { id, ...source, text: text.slice(0, 12_000) }
    } catch (error) {
      lastError = error
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 2_000))
    }
  }
  throw new Error(`Failed to retrieve ${source.name}: ${lastError instanceof Error ? lastError.message : String(lastError)}`)
}

function existingTopicKeys() {
  if (!fs.existsSync(postsDir)) return new Set()
  return new Set(
    fs.readdirSync(postsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => matter(fs.readFileSync(path.join(postsDir, file), "utf8")).data.dailyTopicKey)
      .filter(Boolean),
  )
}

function topicCandidates(date) {
  const dayIndex = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86_400_000)
  const used = existingTopicKeys()
  return editorialArticles
    .map((article, index) => ({ article, rank: (index - dayIndex + editorialArticles.length) % editorialArticles.length }))
    .filter(({ article }) => !used.has(`editorial-v2:${article.key}`))
    .sort((left, right) => left.rank - right.rank)
    .map(({ article }) => article)
}

function normalized(value) {
  return value.toLowerCase().replace(/[\s\p{P}\p{S}]/gu, "")
}

function assertOriginalWording(content, research) {
  const article = normalized(content)
  for (const source of research) {
    const reference = normalized(source.text)
    for (let index = 0; index + 48 <= article.length; index += 12) {
      const phrase = article.slice(index, index + 48)
      if (reference.includes(phrase)) throw new Error(`Article copies a long passage from ${source.name}`)
    }
  }
}

function contentShingles(value, size = 32) {
  const clean = normalized(value)
  const shingles = new Set()
  for (let index = 0; index + size <= clean.length; index += 8) {
    shingles.add(clean.slice(index, index + size))
  }
  return shingles
}

function assertDistinctFromPublished(content) {
  if (!fs.existsSync(postsDir)) return
  const candidate = contentShingles(content)
  for (const file of fs.readdirSync(postsDir).filter((name) => name.endsWith(".md"))) {
    const parsed = matter(fs.readFileSync(path.join(postsDir, file), "utf8"))
    if (parsed.data.generatedBy !== "source-grounded-daily-logistics-guide") continue
    const published = contentShingles(parsed.content)
    if (candidate.size === 0 || published.size === 0) continue
    const shared = [...candidate].filter((item) => published.has(item)).length
    const ratio = shared / Math.min(candidate.size, published.size)
    if (ratio > 0.18) throw new Error(`Article is too similar to ${file} (${Math.round(ratio * 100)}% shared phrasing)`)
  }
}

export function validateArticle(article, research, options = {}) {
  const required = ["title", "summary", "seoTitle", "seoDescription", "content"]
  for (const field of required) {
    if (typeof article[field] !== "string" || !article[field].trim()) throw new Error(`Missing article field: ${field}`)
    article[field] = article[field].trim()
  }

  if (article.title.length < 8 || article.title.length > 90) throw new Error("Title length is invalid")
  if (article.summary.length < 40 || article.summary.length > 240) throw new Error("Summary length is invalid")
  if (article.seoTitle.length > 90) throw new Error("SEO title is too long")
  if (article.seoDescription.length < 50 || article.seoDescription.length > 240) throw new Error("SEO description length is invalid")
  if (article.content.length < 800 || article.content.length > 6_000) throw new Error("Article body length is invalid")
  const headings = article.content.match(/^## .+$/gm) || []
  if (headings.length < 3 || headings.length > 6) throw new Error("Article needs three to six H2 sections")
  if (new Set(headings).size !== headings.length) throw new Error("Article contains repeated section headings")
  if (/作为AI|人工智能生成|保证时效|保证通关|最低价格|本文基于|内容涵盖|旨在|赋能|全方位|深入解析|一文读懂|须知|应高度重视|综上所述|值得注意的是/.test(`${article.title}\n${article.summary}\n${article.content}`)) {
    throw new Error("Article contains formulaic or prohibited wording")
  }
  if (/\d+(?:\.\d+)?\s*(?:小时|天|美元|元|%|吨|公里)/.test(article.content)) {
    throw new Error("Article contains a numerical operational claim that requires manual review")
  }

  if (!Array.isArray(article.evidence) || article.evidence.length < 3) {
    throw new Error("Article needs at least three evidence mappings")
  }
  const sourceIds = new Set(research.map((source) => source.id))
  for (const item of article.evidence) {
    if (typeof item?.claim !== "string" || !item.claim.trim()) throw new Error("Evidence mapping is missing a claim")
    if (!Array.isArray(item.sourceIds) || item.sourceIds.length === 0 || item.sourceIds.some((id) => !sourceIds.has(id))) {
      throw new Error("Evidence mapping references an unknown source")
    }
  }

  assertOriginalWording(article.content, research)
  if (!options.skipPublishedSimilarity) assertDistinctFromPublished(article.content)
  return article
}

async function researchFor(article) {
  const results = await Promise.allSettled(article.sourceIds.map(fetchSource))
  const research = results.filter((result) => result.status === "fulfilled").map((result) => result.value)
  const failures = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason instanceof Error ? result.reason.message : String(result.reason))

  if (failures.length) console.warn(`Source checks with errors for ${article.key}:\n- ${failures.join("\n- ")}`)
  if (research.length < 2) return null

  const available = new Set(research.map((source) => source.id))
  const evidence = article.evidence
    .map((item) => ({ ...item, sourceIds: item.sourceIds.filter((id) => available.has(id)) }))
    .filter((item) => item.sourceIds.length > 0)
  if (evidence.length < 3) return null

  return { research, article: { ...article, evidence } }
}

function appendReferences(content, research, date) {
  const links = research.map((source) => `- [${source.name}](${source.url})（访问日期：${date}）`).join("\n")
  return `${content}\n\n## 参考资料\n\n${links}\n`
}

function writeActionOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, "utf8")
}

function report(result) {
  writeActionOutput("created", result.created ? "true" : "false")
  if (result.slug) writeActionOutput("slug", result.slug)
  console.log(JSON.stringify(result, null, 2))
}

function writeAtomic(target, content) {
  const temporary = `${target}.${process.pid}.tmp`
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(temporary, content, "utf8")
  fs.renameSync(temporary, target)
}

async function main() {
  const date = chinaDate()
  const state = readState()
  const decision = scheduleDecision(date, state, latestManagedPostDate(), {
    force: forcePublish,
    dryRun,
    researchOnly,
  })

  if (!decision.due) {
    report({ created: false, reason: decision.reason, today: date, nextPublishOn: decision.nextPublishOn })
    return
  }

  const slug = `central-asia-logistics-guide-${date}`
  const target = path.join(postsDir, `${slug}.md`)

  if (fs.existsSync(target) && !dryRun && !researchOnly) {
    report({ created: false, reason: "already-exists", slug })
    return
  }

  const candidates = topicCandidates(date)
  if (candidates.length === 0) {
    report({ created: false, reason: "editorial-catalog-exhausted" })
    return
  }

  let selected = null
  for (const candidate of candidates) {
    const result = await researchFor(candidate)
    if (result) {
      selected = result
      break
    }
  }

  if (!selected) {
    report({ created: false, reason: "insufficient-authoritative-sources", attemptedTopics: candidates.length })
    return
  }

  const { article: candidate, research } = selected

  if (researchOnly) {
    report({
      created: false,
      reason: "research-only",
      topic: candidate.key,
      sources: research.map(({ id, name, url, text }) => ({ id, name, url, characters: text.length })),
    })
    return
  }

  const article = validateArticle({ ...candidate }, research)
  const content = appendReferences(article.content, research, date)
  const file = matter.stringify(content, {
    title: article.title,
    date: `${date}T08:00:00+08:00`,
    summary: article.summary,
    category: article.category,
    coverImage: "",
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    status: "published",
    dailyTopicKey: `editorial-v2:${article.key}`,
    generatedBy: "source-grounded-daily-logistics-guide",
    editorialMethod: "source-checked-curated-draft",
    sources: research.map(({ name, url }) => ({ name, url, accessedAt: date })),
  })

  const intervalDays = chooseIntervalDays()
  const nextState = {
    version: 1,
    lastPublishedOn: date,
    nextPublishOn: addDays(date, intervalDays),
    intervalDays,
    lastTopicKey: `editorial-v2:${article.key}`,
  }

  if (!dryRun) {
    writeAtomic(target, file)
    writeAtomic(stateFile, `${JSON.stringify(nextState, null, 2)}\n`)
  }

  report({
    created: !dryRun,
    dryRun,
    slug,
    title: article.title,
    topic: article.key,
    sources: research.map((source) => source.url),
    evidenceItems: article.evidence.length,
    characters: content.length,
    intervalDays,
    nextPublishOn: nextState.nextPublishOn,
  })
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    writeActionOutput("created", "false")
    console.error(error)
    process.exit(1)
  })
}
