# Spatial refresh 验证与交付状态

## 2026-10-20 暖色 mono + 橘色主色（本轮，修订同日早前的纯灰褐版本）

范围：企业首页、导航与首屏 Three.js 概念场景。已确认的方向是“整体暖色单色（mono），主打色为调色板第一格橘色”。早前版本把陶土/橘色全部收敛为灰褐，方向有误；本轮底色仍是奶油—纸白—深褐的单色阶梯，但橘色回到主色位置，只做填充与图形，不承载小字号文字。

- 色彩令牌：`--paper #FAF0E3`、`--paper-2 #F8E8D3`、`--paper-3 #F6DDC2`、`--surface #FFFCF7`、`--ink #3B2A1A`、`--ink-soft #4A3521`、`--muted #7B5E43`、`--line #EDD8C0`、`--line-strong #D9B892`、`--accent #F2AE7E`、`--accent-hover #ECA26B`、`--accent-soft #F8DDBE`、`--accent-brown #9C7249`、`--accent-deep #7E5738`、`--on-accent #3B2A1A`；`--rust` 仍为 `--accent-deep` 的别名，避免旧选择器失效。
- 实测对比度（WCAG）：纸底 ink 12.17:1、muted 5.29:1、accent-deep 5.64:1；`--paper-2` 上 ink 11.41:1、muted 4.96:1；桃色 `#F8DDBE` 上 ink 10.49:1、muted 4.56:1。橘 `#F2AE7E` 与纸底只有 1.67:1，因此只用于按钮、色带、插图等填充；其上文字用 ink（7.27:1），hover `#ECA26B` 仍有 6.49:1。表单描边用 `--accent-brown`（对 surface 4.17:1），满足非文字 3:1。
- 橘色落点：导航 “Discuss a project”、首屏主按钮、步骤卡顶线、eyebrow 前 20px 短线、次链接 2px 下划线、供应商面板 5px 顶边、转化区按钮与强调句、文本选区、开场椅子填充，以及 3D 沙发座垫与房间地毯。
- 首屏底色：奶油纸白为底，右侧叠桃色渐变与顶部橘色径向光，让奶油色墙体从背景分离；左侧仍由纸色 veil 保证文案对比度。
- 顶部导航：沿用无边框玻璃（`backdrop-filter: blur(18px)` + 两端淡出细线）；≤1150px 单行 `furnishes + MENU ＋`，登录与 CTA 收进 `<details>` 抽屉；≤700px 头部约 67px。抽屉打开时 summary 用橘色填充。
- 首屏文案：H1 仍为 `Your space. / Thoughtfully furnished.`，引导句与底部说明沿用上一轮；标题不再叠加橘色高亮条，避免两条粗色带压住下一行字。
- 场景材质：墙体奶油 `#E8D2B3`、楼板橡木、房间地毯桃/杏色；座垫橘 `#E08A4A` 与桃 `#EAAE80`，靠背深褐，扶手奶油；`flatShading` 关闭，布料 roughness 0.74、bumpScale 0.02。曝光 0.74→0.70、主光 1.15→1.05，避免浅色材质过曝成白色。
- 场景构图与开场：`FAR_ZOOM 0.42`、贴地换位 `PER 96 / HOLD 38 / TRANS 10`、建筑体自地面生长（1.05s、0.028s 错峰）、家具 +0.12m 轻落 0.7s，均与上一轮一致；3D 开场只存在于保留的 `LandingPage` 代码中，公开首页仍传 `skipIntro`，e2e 的 reduced-motion 断言不受影响。
- CSS 开场：内联 11 路径休闲椅线稿保留，椅子填充改为 52% 橘色、描边 accent-deep，背景改为纸色→桃色径向渐变；1px 进度线用 accent-deep。开场仍未接入公开首页。
- OG 图：`opengraph-image.tsx` 改为奶油纸底 `#FAF0E3`、墨色字、左侧 6px 橘色竖线。
- 兼容：`SpaceScene` 概念插画、WebGL 不可用时的房屋 fallback、房间标签 hover 底色同步换成新梯队，避免旧灰褐残留在页面角落。

验证（本轮）：

- TypeScript：通过。
- 改动文件 ESLint：通过。仓库全量 `pnpm lint` 仍有 19 个既有错误，全部位于未改动的 `scripts/verify-corporate-static.cjs`（CommonJS 与浏览器全局）。
- Vitest：本轮只改 CSS、SVG 与 Three.js 调色板，未改逻辑；沿用上一轮结果 497 passed / 35 skipped，另有 1 个用例失败、8 个集成测试文件因本机 `127.0.0.1:5433` 数据库未启动无法运行，与本次改动无关。
- 静态浏览器检查：96/96 通过（12 路由 × 320/390/430/768/1024/1440/1920/3840）；每页单一 h1、无横向溢出、无损坏图片、`getAnimations` 运行数 0、页面错误 0；含手机键盘菜单、分支导航、返回首页、询价预填、表单校验与旧 query 跳转。
- Playwright：9/9 通过（`CORPORATE_PREVIEW_URL=http://localhost:3000`；早前一轮为 127.0.0.1，亦为 9/9）。
- 截图：`qa/home-390|768|1024|1440|2560|3840.png`、`qa/spatial-hero-desktop.png`、`qa/spatial-hero-phone.png`、`qa/spatial-hero-0.8s.png`（冻结计时器捕获的完整开场）、`qa/spatial-hero-2.5s|6s|12s.png`、`qa/opengraph.png`；原始检查结果在 `qa/static-checks.json`。

仍未完成：真实供应商家具的可交互 GLB 尚未导出，首页小屋仍是概念几何，不是具体商品模型；“更像真实住宅”目前来自比例、材质、阴影与去 HUD 化，不等于已经使用真实家具资产。


## 既有交付状态

日期：2026-10-20。既有交付状态如下；本轮只改视觉与 3D 呈现，路由、询价流程和内容结构未变。

- TypeScript：通过。
- 改动涉及的React/Three.js页面 ESLint：通过。
- 相关单元测试：28/28通过（SEO、路由转场、landing生命周期）。
- 静态浏览器检查：96/96通过；12路由×320/390/430/768/1024/1440/1920/3840像素视口；每页HTTP200、单一h1、无横向溢出、图片解码成功、无运行中的CSS动画；页面错误0。
- 静态检查附带交互：手机键盘菜单、分支导航、返回首页、询价预填、表单校验、旧入口跳转通过；没有发送邮件。
- 最新字体统计见typography.md末尾，截图和原始测量见qa/。
- 完整Playwright回归：9/9通过。最终补查登录目标地址、减少动态效果下缩放重绘及房间操作：2/2通过。
- 最终源码生产构建：通过（Next.js webpack；TypeScript、70个静态页面生成及构建追踪完成）。使用独立暂存目录，没有占用本地开发目录的构建输出。
- 最终首屏截图及四尺寸完整首页截图已更新；暂停后窗口变化会重绘，手机房间标签有边缘保护。
- 构建暂存环境未提供FAL密钥，构建提示相关生成调用不可用；这不影响公开页面编译，也不能作为线上AI已经配置的证据。

## 未完成与验证边界

1. 真实华桂可交互3D家具：未完成。91个松散MAX及ZIP递归清单均无可直接使用的GLB/glTF/FBX/OBJ。每类3个候选已记录，需3ds Max导出。已接入两张真实供应商渲染图；首页小屋仍是概念场景。
2. 线上认证、AI调用和项目保存未做端到端测试，没有修改密钥或调用付费AI。
3. 正式域名的部署仓库/分支绑定未验证。本次收尾没有推送或发布；继续时已有79af387（Rebuilding Frontpage）提交，不能据此推断正式域名已部署该提交。
4. 视口测试不是iPhone/iPad真实Safari设备测试；动画按用户要求只做静态和状态检查。

## 交接

完整接续prompt在AI-HANDOFF.md。源代码位于用户指定demo-commercial-refresh分支；继续工作时已存在提交79af387（Rebuilding Frontpage）。本次仅补齐验证记录与最终截图。预览以http://127.0.0.1:3000启动；本地服务停止后需重新运行。
