# 设计规范（企业级 UI 指南）

## 色彩规范
- 中性色主色板：背景 `--background`，文字 `--foreground`，边框 `--border`
- 品牌点缀：按钮与图表使用蓝色（示例 `#2563EB`），全局 `--ring` 设定为蓝色高对比
- 对比要求：正文文字与背景对比度 ≥ 4.5:1；按钮与可点击元素 ≥ 3:1

## 字体与排版
- 字体族：`Inter, -apple-system, Segoe UI, Roboto, sans-serif`
- 行高：正文 `1.7`；段落默认 `leading-7`
- 标题层级：
  - `h1`: `text-4xl md:text-5xl font-bold`
  - `h2`: `text-3xl font-bold`
  - `h3`: `text-2xl font-semibold`
- 文字颜色：正文 `text-gray-700`，标题 `text-gray-900`

## 容器与栅格
- 容器配置：居中；默认内边距 `1.5rem`；`2xl` 最大宽度 `1440px`
- 页面区块：统一使用 `.section { py-24 }`
- 栅格：`md:grid-cols-2` 或 `md:grid-cols-3`，间距 `gap-8`

## 间距与留白
- 组件内容内边距：卡片 `p-6~p-8`
- 区块间距：节距统一 `py-24`
- 文本块与标题：标题下方 `mb-6~mb-8`；说明文字 `mb-6`

## 组件规范
- 卡片：中性边框 `border-gray-200/80`，圆角 `rounded-xl`，阴影 `shadow-sm`，悬停 `hover:shadow-lg hover:border-blue-600/40`
- 按钮：品牌色为主；启用 `focus-visible:ring`，保障可访问性
- 图表：使用 `recharts` 客户端渲染，封装在 Client 组件中；统一高度 `h-64`

## 无障碍（AA）
- 焦点可见：所有交互元素启用 `focus-visible` 样式
- 文本替代：图片与图标提供 `alt` 或 `aria-label`
- 键盘操作：组件支持 Tab 导航；弹层与菜单具备可聚焦与关闭逻辑

## 响应式与兼容性
- 断点：`sm 640`、`md 768`、`lg 1024`、`xl 1280`、`2xl 1440`
- 大屏优化：容器 `max-w-6xl~max-w-7xl`，栅格分栏扩展，信息密度适度增加

## 交互与动效
- 微交互：卡片与按钮悬停阴影与色彩增强；列表条目 `group-hover` 文字色提升
- 动画：轻量、非强制；保证性能与无障碍需求

## 实施与测试
- 像素还原：按上述规范统一标题、容器、栅格与组件样式
- 兼容测试：Chrome/Edge/Safari 最新版；移动端 iOS/Android 主流分辨率
- 性能与可访问性：Lighthouse 分析并确保 AA 对比度与焦点可见