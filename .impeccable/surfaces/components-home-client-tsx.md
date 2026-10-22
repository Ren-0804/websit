---
version: 1
slug: "components-home-client-tsx"
primary_target: "components/home-client.tsx"
related_targets: ["components/navbar.tsx","components/footer.tsx","app/services","app/regions","app/about","app/contact","app/news","app/admin"]
---

# 全站重构 / 首页

Mode: Persuade. Related surfaces: service and region directories/details, About, Contact, business notes/articles, admin login/setup/publish.

## Direction contract

THESIS: 用户选择「航运企业识别手册」，官网帮助货主判断服务范围并开始咨询，也帮助现有客户查阅资料。保留真实业务内容与既有功能，替换米白红色工业风。

OWN-WORLD: 航运企业双语识别手册。品牌蓝、纸白、浅冰蓝和深海军蓝；清晰无衬线字体、通栏影像、明晰的标题比例、横向服务目录、直观字段与统一的轻圆角控件。现有蓝色标志保持。

STORY: 第一屏认识丰吉国际的跨境物流工作，输入起运地和目的地；继续了解三类服务、目的地区域与真实业务笔记；联系页补全货物信息并保留原发送流程。后台保持操作效率。

FIRST VIEWPORT: 1440 桌面宽度采用白色固定导航；约 580px 的宽幅物流影像中放置白色主张和说明；咨询区横向嵌在影像底部，有两个明确标签的输入框及继续填写按钮。首屏下可见服务目录开端。390px 时标题、字段和按钮自然堆叠，无横向滚动。

FORM: 国际航运企业识别手册，为七个基础方向的首选；用户于 2026-10-21 通过结构化回复选定 pick；seed:671bd3bc7755bf3c。代码优先。参考 .impeccable/mocks/decision/shipping-identity.html。

Signature interaction: 首页线路输入原样带到联系页；服务和地区详情可继续到已填目的地的咨询。移动导航有焦点约束、Escape 关闭和路径切换关闭。动效使用克制的链接箭头位移与一次整体进入，尊重 reduced-motion。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
