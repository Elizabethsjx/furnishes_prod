# 给下一位 AI 的接续 prompt

你正在接续 Furnishes 网站改版，请先读取 docs/corporate-refresh/spatial-refresh-plan.md、spatial-validation.md 和 huagui-model-manifest.json，然后检查 git status 和 diff，不要覆盖现有改动。

仓库 /Users/shenjunxi/Developer/furnishes-demo，origin https://github.com/Elizabethsjx/furnishes_prod.git，分支 demo-commercial-refresh。upstream 是队友 Yolo1105 的仓库，不向它提交。用户明确批准实施。

设计基础是线上 furnish-es.com 的原版 Three.js 小屋/人物（用户图1），不是之前平面插画企业首页（图2）。保留 Archivo / Space Mono、短家具组装开场、改进后的转场；颜色柔和，商业项目优先。首页必须快速说明空间设计+预算家具选配+3D可视化，展示真实状态案例、华桂和需求→选品→平面转3D→家具导入流程。3D Playground/AI统一入口。

已复用 LandingHero 与 createLandingHeroScene，新增 corporate/SpatialExperience.tsx、SpatialWorkflow.tsx、spatial.module.css；已调整 CorporateHome/Shell，新增 /services 与 /workspace，接入两张华桂产品渲染图，整理供应商资料和五系列。最新验证及未完成事项以 spatial-validation.md 为准。

重要未完成依赖：用户希望每个主要类别选几件真实3D模型。已选15个MAX候选，所有ZIP递归检查均无网页模型格式。当前没有3ds Max，不能把MAX假装成GLB；需要真实导出文件后再完成Three.js家具预览。不要用程序生成示意家具冒充供应商产品。1266图片只是渲染图。

Playground在/account/canvas，登录保护。AI是/api/chat的Anthropic接口；项目保存需数据库。不要宣称后端已经在线可用，也不要创建虚假聊天返回。只核对配置变量名，不输出密钥。线上部署绑定未确认，不自动推送发布。

工具：Node /Users/shenjunxi/.nvm/versions/node/v24.13.0/bin/node；Git /Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git；Chrome /Applications/Google Chrome.app/Contents/MacOS/Google Chrome。系统git/xcrun不可用。当前目录可能不存在，exec显式设置上述仓库路径或/tmp，shell=/bin/bash,login=false。修改Developer仓库需要环境授权。使用用户现有localhost:3000服务前先确认对应cwd；不要终止用户进程。验收可运行 scripts/corporate-playwright.config.ts 与 scripts/verify-corporate-static.cjs，CORPORATE_PREVIEW_URL=http://localhost:3000。不要把旧QA截图当当前结果。

继续完成剩余验证，检查首页静态截图在iPhone/iPad/desktop/4K的布局，保留减少动态效果、键盘操作、WebGL降级。最后简明汇报完成项、真实限制及可打开的预览/文档。用户希望usage不足时可直接用本prompt交接。
