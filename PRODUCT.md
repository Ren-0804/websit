# 丰吉国际

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

货主、企业客户和已有客户。用户于 2026-10-21 确认：询价转化与线路、服务、物流资讯的查阅同样重要。

## Product Purpose

丰吉国际供应链管理（江苏）有限公司的企业官网与内容管理后台。帮助访客了解跨境物流服务、查阅线路与业务笔记，并提交具有可执行货物信息的咨询。

## Capabilities and Constraints

- 现有 Next.js App Router、React、TypeScript、Tailwind 实现；保留路由、SEO metadata、结构化数据与旧 URL 重定向。
- 保留中文和英文客户端切换。
- 现有服务涵盖铁路班列、跨境公路与多式联运、清关协同、仓储分拨与目的国派送，以 lib/i18n.ts 的内容为依据。
- 联系表单继续通过 /api/send-email 提交；后台继续使用既有 TOTP 登录、受保护的文章发布与 Markdown 预览。
- 保留鉴权、内容来源约束、定时发布和 Git-backed 发布逻辑；重构不构成向生产环境发布或真实发送询价的授权。

## Brand Commitments

保留丰吉国际名称、法定公司名称、现有标志、真实联系方式和已有业务事实。视觉系统可重构。不得凭空添加运价、时效、服务能力、客户、资质、数据或承诺。

## Evidence on Hand

- lib/i18n.ts：公司信息、服务、城市线路、中英文案。
- content/posts：现有文章和来源。
- public/brand-mark.svg、public/brand-wordmark.svg：现有品牌资产。
- public 中现有物流图片：可沿用，不能当作新增真实客户/运输案例证据。
- README.md、现有路由和 API：技术与工作流依据。

## Product Principles

- 咨询与查阅并重，关键服务、线路和联系入口容易找到。
- 业务内容来自项目证据；不增加无依据的商业主张。
- 全站重构覆盖公开页和后台 UI，同时保留业务行为及安全边界。
- 用户于 2026-10-21 选择直接实现代码并在浏览器中检查、迭代。
