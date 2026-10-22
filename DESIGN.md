---
name: 丰吉国际
description: 航运企业识别手册，品牌蓝、物流摄影与清晰的双语信息层级
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
  primary-hover: "#153974"
typography:
  display:
    fontFamily: "Barlow, Noto Sans SC, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.9rem)"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
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
  control: "10px"
  panel: "12px"
spacing:
  compact: "8px"
  inline: "12px"
  field-gap: "20px"
  panel-mobile: "24px"
  panel-desktop: "32px"
  section: "clamp(3.5rem, 6vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
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

用户于 2026-10-21 选定品牌蓝配物流大图、稳重熟悉的企业官网。系统以清晰的双语层级、宽幅实景、水平目录与轻圆角字段组织内容。公开页面兼顾询价与资料查阅；后台使用同一视觉语言，减少装饰并保留操作密度。

**Key Characteristics:**

- 品牌蓝、纸白、浅冰蓝与深海军蓝。
- 物流摄影用于展示场景，不能作为公司自有设施、运力或客户案例的证明。
- 导航、服务目录、表单与阅读页面共享排版和交互规则。

## Colors

CSS 变量由 app/globals.css 定义，Tailwind 通过 HSL 变量映射。上方 token 保留实际源格式。

主蓝用于主要行动、导航选中态、链接和功能图标；深海军蓝用于暗色咨询区及摄影承托。纸白用于导航、表单和正文；浅冰蓝区分内容段落。次要文字使用带蓝调的正文色。破坏性状态采用独立错误色，并配合明确文案。

## Typography

Barlow 提供英文和数字的企业字体特征，Noto Sans SC 承担中文；通过 next/font 在站内分发。正文采用常规字重，标题采用半粗字重。段落行高为 1.85，文章正文独立约束阅读宽度。

通用页标题、首页主张与文章长标题按场景分别设置；文章标题不套首页的大字号。输入字段保持 16px，标签和目录采用 14px。数字信息使用等宽数字特性，Markdown 编辑器才使用等宽字体。

首页中文主张按原文逗号分为两段，每段保持语义完整；中文字号使用 clamp(1.5rem, 7vw, 3.9rem)，英文沿用 display token。摄影遮罩从左侧深蓝过渡到右侧较透明的蓝色，兼顾文字和场景辨识。

## Layout

居中容器最大宽度 1440px。断点为 640、768、1024、1280、1440px；水平留白遵循现有 Tailwind container。桌面导航高 80px、手机 72px，主体顶部为其预留空间。

服务使用有分隔线的水平目录；地区使用可筛选的目的地列表；资讯以摘要行和单篇重点文章呈现；详情与长文保留上下级导航。桌面表单分栏，手机自然堆叠，字段和长网址不得撑宽页面。

通用内页标题区上下留白为手机 32px、桌面 40px，紧随其后的首个内容区收紧至 32–48px。服务条目的手机图标与标题同行。联系页手机端先给电话、邮件快捷入口，再显示完整表单，联系方式明细与流程说明随后展示。

## Elevation & Depth

主要内容以色调分层和边框区分，常规面板不使用阴影。抽屉沿用 Radix 对话框的遮罩与浮层行为。主要行动采用纯色，摄影遮罩服务于文字可读性。

## Shapes

面板和咨询条采用 panel 圆角；按钮、字段、筛选控件采用 control 圆角。注意项目自定义 Tailwind 的 rounded-md 实际为 10px，并非默认 Tailwind 的 6px。列表和区块本身无需逐项套卡片。

## Components

主要按钮最小高度 48px，禁用态降低不透明度；次要按钮使用白底和边界。链接箭头在悬停时移动 3px，持续 180ms。

字段有可见标签、明确的必填或选填说明。提交期间禁用字段组；成功与失败在表单内反馈。首页线路咨询使用 GET 将起运地、目的地带到联系页，由完整表单继续提交。

完整表单在开头解释 * 代表必填，并在对应标签标示；首页咨询条有可见任务标题。文章目录在桌面为右侧栏，在手机和平板为正文前的原生可折叠目录，复用同一组稳定锚点。

白色固定导航显示当前页面；手机抽屉使用焦点约束、Escape 关闭和点击路径后关闭。跳转到主要内容的入口在键盘聚焦时出现。正文标题由 Markdown 源行生成稳定锚点，目录取自实际渲染的标题，支持 ATX 和 Setext。

全局焦点为主蓝 2px 环及 4px 间隔。首页只做一次 600ms 整体进入；减少动态效果偏好关闭平滑滚动并压缩过渡。选区、光标与滚动条采用同一色系。

## Do's and Don'ts

- Do 保留真实服务、目的地、公司信息及现有品牌标志。
- Do 为官网、资料和后台选择各自适合的内容密度。
- Do 用语义结构、文字与可见状态共同解释交互。
- Don't 把物流图片包装为未经证实的公司设施或运输案例。
- Don't 用新数据、时效、运价、客户或资质填补视觉空间。
- Don't 混用旧米白红色风格、渐变按钮或装饰性网格。
