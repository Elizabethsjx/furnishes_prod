# 动画静态检查与多屏验证

日期：2026-10-20。范围：本次企业首页及 9 个公开分支/咨询页面，共 10 个路由；并检查保留的独立 3D 示例及旧首页动画源代码的边界。账户产品界面不在本次企业网站改版范围。

## 新页面动画检查

| 对象           | 静态检查结果                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| 首屏墙体出现   | 仅 opacity / transform；1.25s，播放一次，结束保持最终状态                                                             |
| 首屏家具出现   | 仅 opacity / transform；延迟 0.65s + 时长 1.3s，总长 1.95s，无无限循环                                                |
| 业务卡 hover   | 仅 hover-capable 且 no-preference 时上移 4px，0.18s；触摸用户不依赖此效果                                             |
| 按钮状态       | 0.18s CSS transition，无布局尺寸动画                                                                                  |
| reduced motion | 禁用新增区块中的 animation / transition / smooth scroll；完整插画直接可见                                             |
| JavaScript     | 新插画没有 RAF、定时器、滚动监听、IntersectionObserver 或 WebGL 初始化                                                |
| 内容可见性     | 文本和主要按钮不参与入场隐藏；禁用 CSS 动画不影响阅读和导航                                                           |
| 原生手机菜单   | details/summary，无自定义高度动画；键盘可打开和导航                                                                   |
| 全局路由过渡   | 已有 0.28s opacity fade；原 CSS 支持 reduced motion；按目的页面标记解除遮罩，保留安全超时；新首页补 data-landing-root |
| 过渡颜色       | 首页及新企业子页改用 #fff2e5，避免继续显示旧橙色/桃色；账户与法律页保留原表面颜色                                     |

静态浏览器检查使用 prefers-reduced-motion: reduce，所有截图设置 animations: disabled。未录制或分析动画运行中的帧率、卡顿或真实触摸惯性。

## 保留源码与独立示例审查

- Heritage 的 ScrollStories：scroll 为 passive；RAF 合并测量；有 reduced-motion 分支、ResizeObserver disconnect、监听器和 RAF 清理。新首页不再挂载这组长滚动故事。
- WorkflowExplainer：监听 reduced-motion，提供播放状态与 interval 清理。新业务页面不用自动循环讲解器。
- CozyRoom：存在 RAF 渲染、reduced-motion 状态、卸载时取消 RAF 和释放 geometry/material/renderer。新首页不加载该 WebGL 模块。
- useSequentialAutoplay：旧 hook 有视口状态与 interval 清理，但自身没有 reduced-motion 或 document visibility 暂停逻辑。未用于本次企业页面；若再次启用，应补齐这些条件。
- 原始 landing.module.css 含多组入场及切换动画，有 reduced-motion 样式；原始 3D 首页不再作为首页 query 分支对外展示。旧代码留存不等于已做全面性能认证。
- `/examples/family-apartment.html` 是单独的交互式应用，用户主动点击才加载；其源文件 `examples-src/family-apartment/app.js` 含连续 RAF 渲染。没有把它算进本次“静态企业页面”的零运行动画结果；如后续要求它也遵守 reduced-motion 和后台暂停，需要单独调整并重新生成该独立文件。

## 多屏验证范围

测试矩阵：320×740、390×844、430×932、768×1024、1024×768、1440×1000、1920×1080、3840×2160。

10 个路由 × 8 个 viewport = 80 组检查：HTTP 200、一个主 h1、无横向溢出、无已加载损坏图片、无运行中的 CSS/WAAPI 动画，均通过。另验证移动菜单键盘打开、商业页导航、返回首页、项目类型与系列预填、表单必填校验和旧 query 路由跳转。没有发出测试邮件。

字体测量与截图在 `qa/`。Chrome 首次尝试遭遇本机 GPU 进程问题，改用 `--disable-gpu` 后检查通过。这是测试环境处理，不是网站设备兼容性保证。

## 验证边界

- 验证的是桌面 Chrome 中的 CSS viewport；未执行 iPhone/iPad Safari 真机、WebKit 或 Firefox 检查。
- SVG、原生表单和 details/summary 没有使用需额外 polyfill 的自定义移动交互，但真机触摸、字体 fallback、邮件客户端行为仍需上线前设备检查。
- 咨询采用 mailto 草稿/剪贴板，不是后端提交；不会产生服务器收件成功提示。
- 工厂照片、产品渲染、认证证明和供应商业绩授权尚未提供，因此不作为本版已完成素材。
- 生产编译与单元检查结果另见交付记录；不以开发服务器 200 代替生产构建结论。

## 最终检查记录

- `next build --webpack`：通过，包括 TypeScript、静态页生成与路由收集。没有复制原项目 `.env`；独立工作副本的生产启动会提示 AUTH_SECRET / SMTP / APP_ORIGIN 未配置，不能把本次公开页面验收解释成后端生产环境已就绪。
- SEO + 路由过渡单元测试：21 / 21 通过。
- 更新后的首页/商业页验收：6 / 6 通过，在生产构建的本地服务验证。reducedMotion 通过当前 Playwright 支持的 `contextOptions` 设置。
- 80 组静态多屏检查：通过；最终三种业务插画已刷新四张首页截图。
- 修改文件的 Prettier 检查：通过。
- 未运行整个账户/API/支付测试套件，也未做真实邮件发送、真实客户数据操作或线上发布。

复核命令（先启动本机 3026 端口的预览，可用 CORPORATE_PREVIEW_URL 改地址）：

```bash
node scripts/verify-corporate-static.cjs
node node_modules/@playwright/test/cli.js test --config scripts/corporate-playwright.config.ts
node node_modules/vitest/vitest.mjs run src/lib/seo.test.ts src/components/route-handoff/route-handoff-logic.test.ts
node node_modules/next/dist/bin/next build --webpack
```

浏览器脚本默认使用本机安装的 Google Chrome，其他环境通过 CHROME_PATH 指定可执行文件。原首页的字体基线是此次保存的测量快照；临时评审路由已删除，日后重跑脚本不会重新生成原首页基线。

## 夕阳色修订复核

全站改为品牌橘、蜜桃、暖杏与深棕；首屏与底部使用静态渐变，没有新增动态动画。重新验证 80 组静态屏宽、6 个页面验收；截图前加载 off-screen 图片，避免 lazy loading 造成全页截图留白。字号与字体报告按本版重测。首次版本的生产编译记录不代表本轮重新执行生产打包；本轮复核范围为静态响应式、页面行为、类型与相关单元测试。


## Three.js整合版本 · 2026-10-20

已完成12路由×8视口=96项静态检查，最新截图及测量覆盖在qa/目录。使用减少动态效果，Three.js暂停，开场不显示；无横向溢出、损坏图片或运行中的CSS动画，未捕获页面脚本错误。字体加载完成。详细结果、编译及功能回归状态见spatial-validation.md。
