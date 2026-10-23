---
name: 丰吉国际
description: 品牌蓝、宽幅运输摄影与清晰双语层级的物流企业官网
colors:
  primary: "hsl(222 76% 43%)"
  foreground: "hsl(216 55% 18%)"
  background: "hsl(216 43% 98%)"
  paper: "hsl(0 0% 100%)"
  secondary: "hsl(215 52% 94%)"
  muted-text: "hsl(216 19% 39%)"
  border: "hsl(215 30% 85%)"
  input-border: "hsl(215 26% 72%)"
  destructive: "hsl(354 66% 40%)"
  navy: "#112b54"
  network: "#0b2849"
  footer: "#081e37"
  primary-hover: "#153974"
typography:
  display:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "clamp(2rem, 4.3vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  section:
    fontSize: "clamp(1.7rem, 3vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontSize: "14px"
    fontWeight: 600
rounded:
  control: "6px"
  filter: "4px"
  panel: "12px"
spacing:
  compact: "8px"
  inline: "12px"
  field-gap: "18px"
  panel-mobile: "24px"
  panel-desktop: "32px"
  section: "clamp(3.5rem, 6vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  hero-primary:
    backgroundColor: "{colors.paper}"
    textColor: "#123b78"
    rounded: "{rounded.control}"
    padding: "12px 26px"
    height: "54px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
  filter-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
---

# Design System: 丰吉国际

## Overview

**Creative North Star: "航运企业识别手册"**

用户选定品牌蓝配物流大图、稳重熟悉的企业官网。2026-10-22 根据用户对旧截图的反馈重建首页构图：铁路全景承担第一视觉，询价位于主画面之后，服务入口使用统一运输摄影。公开页面兼顾询价与资料查阅；阅读和后台页面保留操作密度。

**Key Characteristics:**

- 品牌蓝、纸白与深海军蓝交替形成页面层次。
- 宽幅铁路主视觉、摄影服务入口与可筛选目的地构成核心阅读顺序。
- 生成图仅作场景示意，来源保留于资产记录和图片说明，不证明公司设施或运力。
- 中英文共享组件，按文字长度调整排版与移动端高度。

## Colors

CSS 变量由 app/globals.css 定义，Tailwind 通过 HSL 变量映射。主蓝用于主要行动、选中态、链接和功能图标；network 深蓝用于地区展示和摄影标题区，footer 深蓝用于页尾。纸白承载导航、表单和阅读内容，浅冰蓝区分段落。

**The Photography Contrast Rule.** 主视觉遮罩由左侧 rgb(4 24 48 / 88%) 过渡到右侧 12%，手机由 85% 过渡到 35%；以文字可读和列车辨识为准。暗色区正文采用浅蓝白，焦点环采用浅蓝。

## Typography

Barlow 提供英文和数字字形，Noto Sans SC 承担中文；两者通过 next/font 加载 400、500、600、700。正文为 16px、行高 1.7，普通段落 1.85，首页介绍为 18px/1.95，手机为 16px/1.9。导航为 15px，字段标签为 14px。

**The Display Rule.** 首页主张为两行完整语义，使用 display token；英文最大宽 19ch。摄影内页标题为 clamp(2rem, 3.7vw, 3.5rem)，手机 32px。文章长标题使用独立阅读排版，不套首页主张字号。

## Layout

居中容器最大宽度 1440px。断点为 640、768、1024、1280、1440px；固定导航在 >=1024px 高 88px，其余宽度高 72px，主体预留同等空间。

首页顺序为铁路主视觉、线路询价、三类服务、目的地区域、企业工作方式、业务笔记、联系表单与页尾。主视觉高度为 clamp(620px, calc(100svh - 88px), 900px)，<=1023px 为 clamp(680px, calc(100svh - 72px), 900px)；<=359px 的英文主视觉最小高 800px，避免行动按钮与底部服务入口重叠。

线路询价为无外圆角的白色横栏。桌面标题和表单分栏，字段与按钮同行；手机两字段并排，按钮跨整行。服务概览桌面三列、照片 4:3，手机单列、照片 16:10；服务详解为图文两列，手机堆叠。地区保留筛选和真实目的地列表。

展示内页使用 min-height 340px、上下 48px 的摄影标题区；手机 min-height 320px、上下 36px。联系、资讯与操作页面保留白底标题区。手机联系页先给电话和邮件快捷入口，再展示完整表单。文章目录在桌面右侧，在手机和平板正文前折叠展示。

## Elevation & Depth

**The Flat Surface Rule.** 常规内容依靠深浅色区、边界和摄影构图分层，不叠加卡片阴影。主视觉只保留文字所需遮罩；抽屉沿用 Radix 对话框遮罩、焦点约束和层级。

## Shapes

按钮和字段的 rounded-md 实际为 6px，rounded-lg 为 8px，信息面板 rounded-xl 为 12px。首页深蓝区国家筛选为 4px；通用地区筛选沿用 6px。服务照片和线路询价横栏不加圆角，资料行无需逐项套卡片。

## Components

主要按钮最小高 48px，主视觉按钮 54px。主视觉主行动为白底深蓝字，次行动为透明底细边界。其余主要行动使用品牌蓝，禁用态降低不透明度。链接箭头悬停移动 3px、持续 180ms；服务图片悬停缩放至 1.025、持续 500ms。

字段保留可见标签。完整表单解释 * 为必填，并标示相应字段；提交期间禁用字段组，成功和失败在表单内反馈。首页 GET 询价将起运地与目的地带入联系页。国家筛选有 aria-pressed 和结果状态反馈。

白色导航显示当前页面，手机抽屉支持 Escape 和点击路径后关闭。键盘聚焦时显示跳转到主要内容的入口。文章目录使用实际渲染标题及稳定锚点，表格可横向滚动。

首页只做一次 600ms 整体进入；减少动态效果偏好关闭平滑滚动并压缩过渡。全局焦点为主蓝 2px 环与 4px 间隔；深色区使用浅蓝 2px 环与 5px 间隔。

铁路、公路、仓储图保存于 public/images，生成方式及完整提示词记录于 .impeccable/assets/imagegen-v3.json，并嵌入 PNG 元数据。按用户要求，页面不叠加生成来源字样；alt 文本和资产记录保留图片性质说明。

## Do's and Don'ts

- Do 保留真实服务、目的地、公司信息及现有品牌标志。
- Do 为官网、资料和后台选择各自适合的内容密度。
- Do 用语义结构、文字与可见状态共同解释交互。
- Don't 把生成图片包装为公司自有设施、车队或运输案例。
- Don't 用未经确认的时效、运价、客户数或资质填补视觉空间。
- Don't 恢复遮挡主画面的巨型询价卡、服务纯目录或装饰性阴影。
