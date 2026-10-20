# Furnishes 空间体验整合 · 2026-10-20

## 基础与范围

仓库 Elizabethsjx/furnishes_prod，分支 demo-commercial-refresh，本地 /Users/shenjunxi/Developer/furnishes-demo。以用户图 1 的 Three.js 家具空间为视觉及交互基础；沿用先前企业页的业务、案例与供应商内容。不是继续以图 2 的平面插画作为首页主视觉。

原版 LandingHero 和 createLandingHeroScene 被直接复用，保留人物、房间聚焦、暂停与空间交互。新增较小的全景取景参数，保留原默认参数以兼容旧组件。开场为约 1.7 秒的 CSS 家具拼装，百分比表达拼装进度而非网络下载进度；每标签页一次，可跳过，减少动态效果时不展示。复杂长开场被简短组装替代，路由转场保留。

## 结构与路由

主导航：Services / Projects / Furniture & suppliers / 3D workspace；右侧项目咨询。手机用可键盘操作的折叠菜单。

| 路由 | 角色与内容 |
| --- | --- |
| / | 空间设计定位、Three.js 小屋、咨询和工作空间入口、案例、四步滑动流程、业务入口、华桂、工作空间介绍、咨询 |
| /services | 业务总览：商业优先，住宅和空间规划次级 |
| /commercial | 商业家具、办公及公共空间 |
| /residential | 住宅家具方案 |
| /space-planning | 空间设计与 3D 可视化服务 |
| /how-it-works | 需求预算 → 选家具 → 平面转3D → 家具导入与空间设计 |
| /projects | 案例总览 |
| /projects/bto-family | BTO 方案案例；保留未交付家具的真实状态 |
| /collections | 真实产品渲染图、趣/雅/智/轩/桌几五个系列 |
| /partners/huagui | 华桂公司背景、产品与合作范围 |
| /workspace | 公开介绍 3D 编辑与 AI 功能，登录入口 |
| /account/canvas | 现有登录后 Playground；不复制新工具，不改访问控制 |
| /contact | 保留询价上下文及邮件草稿流程 |

~~~mermaid
flowchart TD
  H[首页：空间设计与家具] --> S[业务服务 /services]
  H --> P[案例 /projects]
  H --> F[家具与供应商 /collections]
  H --> W[3D工作空间 /workspace]
  H --> C[咨询 /contact]
  S --> B[商业项目]
  S --> R[住宅项目]
  S --> D[空间规划与四步流程]
  P --> E[BTO方案详情]
  F --> G[华桂合作背景]
  F --> M[五个家具系列与真实产品图]
  W --> L[登录并保留目标路径]
  L --> A[现有 /account/canvas]
  A --> V[3D空间与家具调整]
  A --> AI[AI助手]
~~~

## 首页 outline

1. 首屏：Your space. Thoughtfully furnished. + 清楚的空间设计/选家具/3D说明；咨询和工作空间双入口。
2. 已有项目证据：BTO 方案，清楚区分方案交付和家具交付。
3. 滑动流程：桌面 sticky 图示随步骤进入视窗切换；手机顺序阅读，避免抢滚动。
4. 服务：商业第一，住宅第二，空间规划第三。
5. 华桂合作：产品供应知识与 Furnishes 的设计服务相结合。
6. 工作空间：3D、布局调整、AI在同一入口，不拆散菜单。
7. 项目咨询与页脚。

## 字体与色彩

保留原站 Archivo（正文/标题）和 Space Mono（步骤/标签）。新首页显式字体均为非衬线或等宽字体；最终字符占比以 qa/static-checks.json 的渲染测量为准，不能将CSS声明比例当视觉面积比例。旧版 typography.md 数值是历史快照。

主底色 #FAF6F0，场景底 #F8F1E9，正文 #49382D，重点按钮 #A64F2E，浅杏/木色用于家具与辅助区。降低大面积橘色饱和度；没有更换字体资源。首屏手机先文案再场景；桌面采用空间背景加文字保护渐变；4K保持内容宽度和可读字号。

## Playground 后端依赖

代码确认：/account/canvas 使用 requireCurrentSession；CANVAS_PLAYGROUND_ENABLED 不为 0 时启用。Studio 包含 ChatDock 和空间编辑。

Playground AI 使用 /api/chat，依赖 ANTHROPIC_API_KEY 与 ENABLE_BRAIN_PIPELINE；不要混淆为 account conversations 的另一套 OpenAI provider。项目保存调用 /api/studio/projects* 并依赖认证/数据库。没有读取或修改密钥，没有调用付费 AI，没有宣称已完成线上登录/AI/保存全链路验证。

未登录首屏入口使用 /login?next=%2Faccount%2Fcanvas，已有登录的首页可直达。公开介绍页让客户在登录前了解功能。

## 华桂资料与模型

公司背景按用户提供资料摘要展示并注明来源。18,000㎡、28,000㎡、26,000㎡涉及不同阶段和口径，奖项与质量声明尚未独立核实，因此未作为当前指标宣传。

嵌套目录有91个MAX文件（含备份/变体，不等于91个SKU）。对3个ZIP及1566的嵌套ZIP做了清单检查，未发现GLB/glTF/FBX/OBJ/STEP。已有2张1266系列渲染图（双人沙发、单椅）压缩到1200px后接入网页。纹理贴图没有当产品图发布。

每类3个候选文件见 huagui-model-manifest.json。真实家具的可交互3D导入尚未完成：当前Mac环境没有3ds Max，MAX不能直接送入Three.js。需要供应商或具备3ds Max环境的同事导出GLB（建议），或FBX加完整贴图，再转换。收到后校验尺寸单位、轴向、材质、纹理授权，优化几何并在点击时加载；避免首页同时加载15个高模。不要把首页程序生成的概念家具标记为华桂模型。

## 部署

本次收尾未推送、未修改线上部署绑定。继续时已有79af387提交；当前部署状态不能仅凭Git提交推断。仓库内没有证据确认 furnish-es.com 的生产分支；发布前需在实际部署项目中核对。不能仅凭fork关系保证推送不会触发部署。

## 验证

验证结果见同目录 spatial-validation.md；所有截图以减少动态效果/暂停状态进行，不是逐帧动画测试。浏览器视口覆盖不等同真实iOS Safari设备验证。
