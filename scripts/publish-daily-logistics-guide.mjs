import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content", "posts")
const modelEndpoint = "https://models.github.ai/inference/chat/completions"
const modelName = process.env.DAILY_POST_MODEL || "openai/gpt-4.1"
const token = process.env.GITHUB_MODELS_TOKEN || ""
const dryRun = process.env.DAILY_POST_DRY_RUN === "1"

const routes = [
  { name: "中国至乌兹别克斯坦", note: "重点关注口岸衔接、换装安排、目的国清关与末端派送信息" },
  { name: "中国至哈萨克斯坦", note: "重点关注铁路与公路方案选择、口岸能力和收货地条件" },
  { name: "中国至吉尔吉斯斯坦", note: "重点关注跨境公路衔接、转关资料和目的地卸货条件" },
  { name: "中国至塔吉克斯坦", note: "重点关注多段运输交接、边境通关和末端运输可达性" },
  { name: "中国经中亚至俄罗斯", note: "重点关注过境安排、单证一致性和不同运输段责任边界" },
  { name: "中国经中亚至欧洲", note: "重点关注多式联运衔接、路线备选和全程信息跟踪" },
  { name: "中亚区域内跨境运输", note: "重点关注当地运输资源、边境手续和收发货双方协同" },
]

const cargoes = [
  { name: "机械设备", note: "核实单件尺寸重量、重心、吊点、包装和是否需要加固" },
  { name: "普通工业品", note: "核实品名、材质、用途、包装件数和海关编码基础信息" },
  { name: "汽车及零部件", note: "核实车型或零件属性、包装方式、装载要求和随附资料" },
  { name: "建材", note: "核实密度、单件重量、防潮要求以及装卸场地能力" },
  { name: "化工相关货物", note: "先确认是否属于危险品或受限品，并准备准确的成分与安全资料" },
  { name: "温控货物", note: "核实温区、允许偏差、续航要求、交接记录和异常处置方式" },
  { name: "大件或超限货物", note: "核实精确尺寸重量、装载图、线路限界和装卸方案" },
  { name: "电商及多品名货物", note: "核实品名清单、件数、申报要素和分拨交付要求" },
]

const stages = [
  { name: "询价前资料准备", category: "询价指南", note: "解释哪些信息会直接影响路线判断和报价有效性" },
  { name: "运输方式选择", category: "路线规划", note: "比较铁路、公路和多式联运的适用边界，不给出固定时效承诺" },
  { name: "订舱与装载准备", category: "操作知识", note: "说明订舱、包装、装载和加固前需要确认的事项" },
  { name: "报关与清关资料核对", category: "清关准备", note: "强调品名、编码、金额、重量和贸易单证之间的一致性" },
  { name: "在途节点跟踪", category: "操作知识", note: "说明应跟踪的关键节点、异常升级方式和信息记录" },
  { name: "目的国派送安排", category: "操作知识", note: "说明收货地址、限行、预约、卸货和签收条件" },
  { name: "费用边界确认", category: "询价指南", note: "说明报价包含项、排除项、可能发生项和结算凭证" },
  { name: "异常风险预案", category: "风险管理", note: "覆盖口岸拥堵、资料问题、车辆等待、查验和货损等常见情形" },
]

const audiences = ["外贸企业", "生产制造企业", "项目物流负责人", "首次开展中亚业务的货主"]

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

function listExistingTopicKeys() {
  if (!fs.existsSync(postsDir)) return new Set()
  return new Set(
    fs.readdirSync(postsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => matter(fs.readFileSync(path.join(postsDir, file), "utf8")).data.dailyTopicKey)
      .filter(Boolean),
  )
}

function topicAt(index) {
  const audience = audiences[index % audiences.length]
  const cargoIndex = Math.floor(index / audiences.length) % cargoes.length
  const stageIndex = Math.floor(index / (audiences.length * cargoes.length)) % stages.length
  const routeIndex = Math.floor(index / (audiences.length * cargoes.length * stages.length)) % routes.length
  const route = routes[routeIndex]
  const cargo = cargoes[cargoIndex]
  const stage = stages[stageIndex]
  return {
    route,
    cargo,
    stage,
    audience,
    key: [routeIndex, cargoIndex, stageIndex, index % audiences.length].join("-"),
  }
}

function selectTopic(date) {
  const total = routes.length * cargoes.length * stages.length * audiences.length
  const dayIndex = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86_400_000)
  const used = listExistingTopicKeys()

  for (let offset = 0; offset < total; offset += 1) {
    const topic = topicAt((dayIndex + offset) % total)
    if (!used.has(topic.key)) return topic
  }
  throw new Error("The daily topic catalog is exhausted")
}

function extractJson(value) {
  const first = value.indexOf("{")
  const last = value.lastIndexOf("}")
  if (first < 0 || last <= first) throw new Error("Model response did not contain a JSON object")
  return JSON.parse(value.slice(first, last + 1))
}

function validateArticle(article) {
  const required = ["title", "summary", "seoTitle", "seoDescription", "content"]
  for (const field of required) {
    if (typeof article[field] !== "string" || !article[field].trim()) {
      throw new Error(`Missing article field: ${field}`)
    }
    article[field] = article[field].trim()
  }

  if (article.title.length < 8 || article.title.length > 90) throw new Error("Title length is invalid")
  if (article.summary.length < 40 || article.summary.length > 240) throw new Error("Summary length is invalid")
  if (article.seoTitle.length > 90) throw new Error("SEO title is too long")
  if (article.seoDescription.length < 50 || article.seoDescription.length > 240) throw new Error("SEO description length is invalid")
  if (article.content.length < 700 || article.content.length > 6_000) throw new Error("Article body length is invalid")
  if ((article.content.match(/^## /gm) || []).length < 4) throw new Error("Article needs at least four H2 sections")
  if (/作为AI|人工智能生成|虚构案例|保证时效/.test(article.content)) throw new Error("Article contains prohibited wording")
  return article
}

function promptFor(topic) {
  return `你是中国至中亚跨境物流企业的资深操作编辑。请围绕以下主题撰写一篇简体中文知识文章：

- 线路：${topic.route.name}。${topic.route.note}
- 货物：${topic.cargo.name}。${topic.cargo.note}
- 环节：${topic.stage.name}。${topic.stage.note}
- 读者：${topic.audience}

要求：
1. 文章帮助真实货主做准备，语言专业、克制、自然，不写营销口号。
2. 正文 900 至 1500 个汉字，使用 Markdown，包含 4 至 6 个“##”小标题，并至少有一份可执行清单。
3. 不虚构运价、固定时效、班次、政策日期、口岸能力、客户案例或公司业绩；存在变化的信息明确提示以承运人、海关和现场确认为准。
4. 不照搬新闻，不引用无法核实的数据，不声称丰吉国际已经完成某个项目。
5. 标题贴近客户会搜索的问题，摘要直接说明文章能解决什么。
6. 只返回一个 JSON 对象，不要代码块。字段必须为 title、summary、seoTitle、seoDescription、content。`
}

async function generateWithModel(topic) {
  if (!token) return null
  let lastError

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(modelEndpoint, {
        method: "POST",
        signal: AbortSignal.timeout(60_000),
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
          "x-github-api-version": "2022-11-28",
        },
        body: JSON.stringify({
          model: modelName,
          temperature: 0.35,
          max_tokens: 2_400,
          messages: [
            { role: "system", content: "输出准确、实用、可独立阅读的中文物流知识内容。严格返回 JSON。" },
            { role: "user", content: promptFor(topic) },
          ],
        }),
      })

      if (!response.ok) throw new Error(`GitHub Models returned ${response.status}: ${(await response.text()).slice(0, 300)}`)
      const result = await response.json()
      return validateArticle(extractJson(result.choices?.[0]?.message?.content || ""))
    } catch (error) {
      lastError = error
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 2_000))
    }
  }

  console.warn(`Model generation failed; using reviewed fallback: ${lastError instanceof Error ? lastError.message : String(lastError)}`)
  return null
}

function fallbackArticle(topic) {
  const { route, cargo, stage, audience } = topic
  const title = `${route.name}${cargo.name}${stage.name}：发货前应确认什么？`
  const summary = `面向${audience}，整理${route.name}${cargo.name}在${stage.name}环节需要确认的货物资料、运输边界、单证信息和异常预案，便于提高询价与执行效率。`
  const content = `## 先把货物信息说清楚

${cargo.name}的运输判断应从真实货物数据开始。${cargo.note}。询价时建议同时提供中文品名、英文品名、用途、材质、包装类型、件数、单件尺寸重量、总毛重和货值。货物若涉及危险属性、温控、超限、品牌授权或其他监管条件，应在询价阶段主动说明，不能只使用“配件”“设备”等笼统名称。

## 线路判断需要哪些条件

${route.name}通常需要结合起运地、目的城市、货物属性、交付时间要求和收货条件选择运输方式。${route.note}。铁路、公路或多式联运各有适用场景，实际可行性会受到舱位、口岸、天气、查验和当地车辆资源影响，应以承运人、海关及现场最新确认为准。

## ${stage.name}核对清单

- 核对发货人、收货人及通知方的完整名称和联系方式。
- 核对品名、海关编码、申报要素、数量、重量、金额和贸易条款。
- 明确报价包含的运输段、装卸、报关、清关、仓储、等待和派送范围。
- 确认包装能否承受换装、堆码、长距离振动以及当地装卸条件。
- 明确原件、扫描件和电子数据分别由谁提供，最晚何时提交。
- 约定关键节点反馈频率，以及出现资料退回、查验或延误时的联系人。

## 容易被忽略的费用边界

报价总额只有在边界清楚时才有比较价值。应逐项确认起运地提货、装车、加固、报关、干线运输、换装、目的国清关、税费、仓储、等待、送货和卸货是否包含。对于查验、滞箱、超期仓储、二次派送等条件性费用，应提前约定计费依据和凭证要求，避免执行后才发现双方理解不同。

## 发运前做一次交叉复核

${stage.note}。建议由业务、单证、操作和客户共同完成最后复核，确保订单、发票、装箱单、运输委托和申报信息使用同一组基础数据。目的地还要确认道路限行、预约时间、卸货设备、现场联系人和签收要求。完成这些准备后，再锁定运输方案和发运计划，通常比单纯追求最低报价更能降低后续返工风险。`

  return validateArticle({
    title,
    summary,
    seoTitle: title,
    seoDescription: summary,
    content,
  })
}

async function main() {
  const date = chinaDate()
  const slug = `central-asia-logistics-guide-${date}`
  const target = path.join(postsDir, `${slug}.md`)

  if (fs.existsSync(target)) {
    console.log(JSON.stringify({ created: false, reason: "already-exists", slug }, null, 2))
    return
  }

  const topic = selectTopic(date)
  const article = (await generateWithModel(topic)) || fallbackArticle(topic)
  const file = matter.stringify(article.content, {
    title: article.title,
    date: `${date}T08:00:00+08:00`,
    summary: article.summary,
    category: topic.stage.category,
    coverImage: "",
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    status: "published",
    dailyTopicKey: topic.key,
    generatedBy: "daily-central-asia-logistics-guide",
  })

  if (!dryRun) {
    fs.mkdirSync(postsDir, { recursive: true })
    fs.writeFileSync(target, file, "utf8")
  }

  console.log(JSON.stringify({
    created: !dryRun,
    dryRun,
    slug,
    title: article.title,
    topic: topic.key,
    generator: token ? "github-models-or-fallback" : "fallback",
    characters: article.content.length,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
