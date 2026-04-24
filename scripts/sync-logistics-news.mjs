import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content", "posts")

const defaultFeeds = [
  {
    name: "American Journal of Transportation",
    url: "https://www.ajot.com/news/news/rss",
  },
  {
    name: "RailFreight.com",
    url: "https://www.railfreight.com/feed/",
  },
  {
    name: "Supply Chain Dive",
    url: "https://www.supplychaindive.com/feeds/news/",
  },
]

const regionKeywords = [
  "central asia",
  "kazakhstan",
  "uzbekistan",
  "kyrgyzstan",
  "tajikistan",
  "turkmenistan",
  "tashkent",
  "almaty",
  "astana",
  "caspian",
  "trans-caspian",
  "middle corridor",
  "eurasia",
  "china-europe",
  "silk road",
]

const logisticsKeywords = [
  "logistics",
  "freight",
  "rail",
  "railway",
  "intermodal",
  "container",
  "customs",
  "warehouse",
  "shipping",
  "port",
  "supply chain",
  "transport",
  "corridor",
]

const maxItems = Number(process.env.NEWS_SYNC_LIMIT || 5)
const maxAgeDays = Number(process.env.NEWS_SYNC_MAX_AGE_DAYS || 30)

function configuredFeeds() {
  if (!process.env.CENTRAL_ASIA_NEWS_FEEDS) return defaultFeeds

  return process.env.CENTRAL_ASIA_NEWS_FEEDS
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, url] = entry.includes("|") ? entry.split("|") : ["Custom Feed", entry]
      return { name: name.trim(), url: url.trim() }
    })
}

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
}

function stripHtml(value) {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function getTag(block, names) {
  for (const name of names) {
    const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"))
    if (match) return decodeEntities(match[1]).trim()
  }
  return ""
}

function getLink(block) {
  const atomLink = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)
  if (atomLink) return decodeEntities(atomLink[1]).trim()
  return getTag(block, ["link", "guid"])
}

function parseFeed(xml, sourceName) {
  const itemBlocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0])
  const entryBlocks = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0])
  const blocks = itemBlocks.length ? itemBlocks : entryBlocks

  return blocks.map((block) => {
    const title = stripHtml(getTag(block, ["title"]))
    const link = getLink(block)
    const description = stripHtml(getTag(block, ["description", "summary", "content:encoded", "content"]))
    const dateText = getTag(block, ["pubDate", "published", "updated", "dc:date"])
    const publishedAt = dateText ? new Date(dateText) : new Date()

    return {
      title,
      link,
      description,
      publishedAt: Number.isNaN(publishedAt.getTime()) ? new Date() : publishedAt,
      sourceName,
    }
  }).filter((item) => item.title && item.link)
}

function scoreItem(item) {
  const text = `${item.title} ${item.description}`.toLowerCase()
  const regionScore = regionKeywords.filter((keyword) => text.includes(keyword)).length
  const logisticsScore = logisticsKeywords.filter((keyword) => text.includes(keyword)).length
  return {
    regionScore,
    logisticsScore,
    total: regionScore * 3 + logisticsScore,
  }
}

function isFresh(item) {
  const ageMs = Date.now() - item.publishedAt.getTime()
  return ageMs <= maxAgeDays * 24 * 60 * 60 * 1000
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80)
}

function readExistingSources() {
  if (!fs.existsSync(postsDir)) return new Set()

  return new Set(
    fs.readdirSync(postsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const fullPath = path.join(postsDir, file)
        const parsed = matter(fs.readFileSync(fullPath, "utf8"))
        return parsed.data.sourceUrl
      })
      .filter(Boolean)
  )
}

function createDraftContent(item) {
  const summary = item.description || "A recent logistics update relevant to Central Asia supply chain monitoring."
  const shortSummary = summary.length > 360 ? `${summary.slice(0, 357).trim()}...` : summary

  return [
    `This market watch draft was generated from a public source and should be reviewed before publishing.`,
    "",
    `## Source update`,
    "",
    shortSummary,
    "",
    `## Why it may matter`,
    "",
    `- Watch for possible impact on Central Asia rail, multimodal, customs, or corridor planning.`,
    `- Confirm operational details with carriers, terminals, customs brokers, or local teams before using this in customer advice.`,
    "",
    `## Source`,
    "",
    `[${item.sourceName}](${item.link})`,
  ].join("\n")
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: {
      "user-agent": "LandSea market watch bot; contact renyizheng@landsea.cc",
      accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
    },
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.text()
}

async function main() {
  fs.mkdirSync(postsDir, { recursive: true })

  const feeds = configuredFeeds()
  const existingSources = readExistingSources()
  const items = []
  const failures = []

  for (const feed of feeds) {
    try {
      const xml = await fetchFeed(feed)
      items.push(...parseFeed(xml, feed.name))
    } catch (error) {
      failures.push(`${feed.name}: ${error.message}`)
    }
  }

  const candidates = items
    .filter(isFresh)
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .filter((item) => item.score.regionScore > 0 && item.score.logisticsScore > 0)
    .filter((item) => !existingSources.has(item.link))
    .sort((a, b) => b.score.total - a.score.total || b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, maxItems)

  const created = []

  for (const item of candidates) {
    const slug = slugify(`market-watch-${item.title}`) || `market-watch-${Date.now()}`
    const fullPath = path.join(postsDir, `${slug}.md`)

    if (fs.existsSync(fullPath)) continue

    const description = item.description.slice(0, 220)
    const file = matter.stringify(createDraftContent(item), {
      title: item.title,
      date: item.publishedAt.toISOString(),
      summary: description,
      category: "Market Watch",
      coverImage: "",
      seoTitle: item.title,
      seoDescription: description,
      status: "draft",
      sourceUrl: item.link,
      sourceName: item.sourceName,
    })

    fs.writeFileSync(fullPath, file, "utf8")
    created.push({ title: item.title, source: item.sourceName, slug })
  }

  console.log(JSON.stringify({
    feeds: feeds.length,
    scanned: items.length,
    created: created.length,
    drafts: created,
    failures,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
