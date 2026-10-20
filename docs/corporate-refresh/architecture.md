# Furnishes 企业网站：homepage + branches

日期：2026-10-20。基于本机 `demo-commercial-refresh` 工作目录；未声称已与 GitHub 远端最新提交同步。此文档描述本次已实现的页面，而非仅供参考的规划。

## 业务定位与现有内容审查

企业定位：Furniture sourcing & spatial planning for homes, workplaces and shared spaces。

原站默认首页以家庭生活、家具模块和 BTO 方案为主；商业版只通过 `?experience=commercial` 访问；联系页是文章式联系方式；BTO 是方案阶段案例。账户内的 AI 聊天、画布、订单、风格问卷是工作台能力，不应直接列成多项已经对外成熟交付的独立业务。原 `Interior Design Studio` 总描述过于宽泛，已收拢到可由现有内容支持的家具选型与空间规划。

| 业务领域                         | 服务对象                 | 具体工作                             | 交付物                                   | 业务边界                         |
| -------------------------------- | ------------------------ | ------------------------------------ | ---------------------------------------- | -------------------------------- |
| Residential furniture sourcing   | 家庭、住宅业主           | 按预算、风格、尺寸及使用需求选家具   | 产品清单、规格、饰面选项、参考报价       | 不承诺库存或固定到岸价           |
| Commercial furniture sourcing    | 企业、办公及共享空间项目 | 整理数量、功能及规格，协调供应商选项 | 项目家具表、参考价格、约定范围的项目报价 | 安装、运输、交期、售后逐项目确认 |
| Spatial planning & visualisation | 家庭、企业、设计合作方   | 平面图转空间参考、摆放家具、比较布局 | 可讨论的 3D 空间方案及选型清单           | 非施工图；精确模型可用性需确认   |

产品系列、案例、制造合作方是支撑业务的内容分支，不与三个核心业务平级包装成额外收费服务。酒店整装、施工总包、声学性能、独家代理暂不作为已证实的服务承诺。

## 已实现路由

```text
/                              企业首页
├── /residential               住宅家具选型
├── /commercial                商业空间家具
├── /space-planning            空间规划与可视化
├── /how-it-works               四步流程
├── /collections                家具与模型系列
├── /projects                   Furnishes 案例目录
│   └── /projects/bto-family    BTO 方案案例详情
├── /partners/huagui            华桂供应合作介绍
└── /contact                    项目咨询 / 邮件简报

保留：/login、/account/*、/quiz、/privacy-policy、/terms、/refund-policy
保留：/examples/family-apartment.html（独立交互示例）
兼容：/?experience=commercial → /commercial
兼容：/?experience=original → /
```

桌面导航：Homes / Business / Space planning / Collections / Our work，加 Start a project。
手机和平板：原生 details/summary 折叠菜单，保留流程、合作方与登录入口，支持键盘；不依赖 hover。
页脚：How it works / Our supply partner / Contact / Privacy / Terms。
所有新增页面使用同一个 CorporateShell，单一 h1、skip link、对应路由标记和 canonical metadata。sitemap 增加新路由与 BTO 详情，继续遵循原有 indexing 开关。

## 首页 outline

1. 首屏：品牌、家具选型与空间规划定位、中英文简短叙述；主要按钮跳业务入口，次要按钮看流程。轻量房间插画显示墙体与家具依次出现，标明 Concept illustration。
2. 品牌分隔条：Singapore / Asia，连接不同空间的一套工作方法。
3. 四步流程：需求 → 家具选型 → 空间可视化 → 调整与报价。链接详细流程。
4. 精选案例：BTO 图片、简短需求、真实项目状态。链接案例详情。
5. 三个业务入口：住宅、商业、空间规划。每张卡说明适用需求，直接进入服务页；另链接产品系列。
6. 供应合作：华桂名称、合作范围、模型资料作用。以排版字样表达，不冒充官方 logo，不编造工厂照片。
7. 统一项目咨询 CTA。
8. 企业页脚与辅助导航。

首屏不加载 Three.js、滚动劫持或自动轮播。信息始终在文档中；动画不是解锁内容的条件。

## 分支页 outline 与转化路径

| 路由                 | Outline                                                                                  | 主按钮 / 下一步                        |
| -------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| /residential         | 服务定位 → 客厅餐厅/卧室储物/学习空间 → 交付物与范围 → BTO 案例                          | /contact?type=residential              |
| /commercial          | 商业项目定位 → 接待休闲/协作/办公家具 → 家具表与报价范围 → 华桂合作                      | /contact?type=commercial               |
| /space-planning      | 平面图到空间 → 输入/模型/家具摆放 → 交付物和准确性说明 → 交互示例                        | /contact?type=space-planning           |
| /how-it-works        | 四步总览 → 每步客户输入与具体交付 → 模型说明 → 真实案例                                  | /contact                               |
| /collections         | 型号资料说明 → 趣/雅/智/轩四组，每组 3 个真实文件型号参考 → 桌几/办公系列/静音舱资料范围 | 带系列名的 /contact 查询参数           |
| /projects            | 案例定位 → BTO 项目卡 → 项目阶段及供应商案例区分                                         | /projects/bto-family                   |
| /projects/bto-family | 项目状态 → 需求 → 三组家具参考 → 平面图与 3D 示例 → 已交付内容                           | /contact                               |
| /partners/huagui     | 供应合作身份 → 双方职责 → 已收到的模型资料 → 选型与咨询                                  | /collections、/contact?type=commercial |
| /contact             | 项目说明 → 联系方式 → 项目表单 → 生成邮件/复制简报                                       | 用户在邮件客户端完成发送               |

表单字段：姓名、邮箱、公司、业务类型、地点、预算与币种、目标时间、面积/数量、需求。姓名/邮箱/业务类型/需求为必填。没有后端自动收件或 CRM 入库；没有伪造“提交成功”。平面图在邮件中附加。预算输入不用固定币种替用户作假设。

## 供应商内容证据边界

依据用户确认的新合作与本地“模型整合”材料，使用华桂身份及模型库范围。已解压目录可见 91 个 .max 文件（含变体/备份）、6 个 .stp 文件，另有压缩包及 11 个酷家乐链接；这些是文件数，不是 SKU、现货或已认证产品数。

本版未发布厂房面积、成立年限、获奖、品牌客户 logo、产能及认证数字。补齐正式简介、图片授权、有效检测报告、项目供货范围和当前供应条件后再丰富合作方详情。媒体线索可供核实：<https://www.sohu.com/a/911284509_121123868>；不作为本版页面中的已确认数字。

SNAPOD 资料只作为待确认的静音舱线索，不断言华桂拥有该品牌或自行制造。BTO 案例明确属于 Furnishes 方案服务，不归因给华桂。模型系列卡不是实时电商目录。

## 内容与技术维护

- 页面入口：`src/app/(public)/.../page.tsx`。
- 统一外壳：`src/features/corporate/CorporateShell.tsx`。
- 首页：`CorporateHome.tsx`；分支模板：`BranchPages.tsx`；案例：`FamilyCase.tsx`。
- 业务文案和流程：`content.ts`。
- 轻量插画：`SpaceScene.tsx`；样式：`corporate.module.css`。
- 项目邮件简报：`ProjectEnquiry.tsx`。
- SEO：`src/lib/seo.ts`，每页 metadata；路由过渡背景同步为米白。
- 原 Heritage/Commercial/原始 3D 首页源文件保留，已不由首页入口渲染；不要把它们的旧标题测试继续当作新首页验收标准。

## 响应式设计

| 屏幕                       | 实现策略                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| 320–430 CSS px / iPhone 类 | 单列首屏与分支卡；窄于 360 时流程单列，其余手机流程两列；单列表单；44px 以上主要点击区域；16px 输入字号 |
| 768 / iPad 竖屏            | 双列首屏、两列流程，折叠菜单；内容保留自然换行                                                          |
| 1024 / iPad 横屏           | 保留双列布局、折叠菜单，避免导航挤压                                                                    |
| 1440–1920 / 电脑           | 完整导航，三列业务卡、四列流程，正文最大宽度 1440px                                                     |
| 3840 / 4K                  | 正文最大宽度 1680px，增加基础字号和留白，不无限拉长阅读行                                               |

宽度以 CSS viewport 为准，不等同于硬件物理像素；Retina 与缩放后的实际 viewport 可能更小。断点按可用宽度而非设备名称决定。

## 验证与交付

详见 `typography.md`、`motion-and-qa.md` 与 `qa/static-checks.json`。本轮动画做源代码检查与 reduced-motion 静态检查，不对运动中的帧率作测试结论。本地验证不等于 iOS Safari 实机认证。未发布或推送远端。
