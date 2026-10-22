---
version: 1
slug: "components-home-client-tsx"
primary_target: "components/home-client.tsx"
related_targets: ["components/navbar.tsx","components/footer.tsx","app/services","app/regions","app/about","app/contact","app/news","app/admin"]
---

# 全站重构 / 首页

Mode: Persuade. Related surfaces: service and region directories/details, About, Contact, business notes/articles, admin login/setup/publish.

## Direction contract

THESIS: 用户于 2026-10-22 用截图否定旧首页的大气程度，并要求 imagegen 再重构。保持已选蓝白正式企业方向，以开阔跨境运输摄影建立官网门面，重建首屏及服务叙事，拒绝仓库纹理加巨大白色询价卡的旧构图。

OWN-WORLD: 蓝白国际物流企业形象。深蓝、纸白与自然山地摄影；保留标志，使用更有分量的无衬线标题、全幅运输影像、简洁图文服务入口与小圆角行动控件。imagegen 产生铁路、公路、仓储三张一致摄影语言的场景示意，不冒充公司实拍、车队或设施。

STORY: 第一屏知道这是中国至中亚跨境物流执行服务，可立即进入同页线路咨询或浏览目的地；向下先看三类运输服务，再看真实城市方向、公司工作方式与业务笔记，最后补全货物信息。后台与阅读页保留操作精度。

FIRST VIEWPORT: 桌面白色品牌导航 88px；开阔铁路与远山占据 620–900px 影像，左侧大字“中国至中亚 / 跨境物流执行服务”，下方保留真实业务简介与两个明确行动，底部有三项真实服务入口。巨型表单移出主画面，紧接首屏为平面化线路咨询带。390px 主体与列车分别裁切适配，按钮可换行，服务入口保持可读，图片标明生成场景示意。2084px 用户截图宽度列为必测。

FORM: 保持用户于 2026-10-21 选择的国际航运企业正式方向，seed:671bd3bc7755bf3c；2026-10-22 用户截图要求重建其构图并引入 imagegen，旧 HTML 草图不再作为构图标准。沿用用户已确认代码优先，生成的是网页使用的真实栅格资产而非界面合成图。新提示词及来源记录见 .impeccable/assets/imagegen-v3.json。

Signature interaction: 首页线路输入原样带到联系页；服务和地区详情可继续到已填目的地的咨询。移动导航有焦点约束、Escape 关闭和路径切换关闭。动效使用克制的链接箭头位移与一次整体进入，尊重 reduced-motion。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
