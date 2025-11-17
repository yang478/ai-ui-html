## ExoCode Architect

一个用于快速搭建前端单页应用的本地静态工具，它通过「配置 → 预览 → Prompt 生成与优化」的方式，帮助你迭代界面方案和提示词。

项目入口为 `index.html`，无任何构建/服务端依赖，适合本地直接打开或放在任意静态服务器上。

---

## 快速开始

- 方式一：直接浏览器打开  
  - 双击或用浏览器打开 `index.html` 即可使用。

- 方式二：本地 HTTP 服务（推荐，用于避免某些浏览器安全限制）  
  ```bash
  cd /path/to/webuiprompt2
  python -m http.server 8000
  ```  
  然后访问：`http://localhost:8000/index.html`

> 说明：本项目采用 Tailwind CDN、原生 JS 与 IFrame 预览，不依赖 Node / 打包工具。

---

## 功能概览

- 配置侧边栏（左侧）
  - Step 1：选择项目类型（SaaS、Landing、运营中台等，可扩展自定义类型）。
  - Step 2：选择视觉风格与 Design Tokens（主色、圆角、字体）。
  - Step 3：在组件库中挑选页面模块（导航、Hero、Feature、Pricing 等），组合出最终页面结构。

- 主画布预览（中间）
  - 基于当前选择的组件和 Design Tokens，实时生成 HTML + Tailwind 布局并写入下方 IFrame。
  - 支持 Desktop / Tablet / Mobile 三种预览宽度，以及导出当前 HTML 源码。

- Prompt Refinery & AI Engine（底部浮动面板）
  - 展示当前「Base Prompt」所包含的设计系统、上下文和结构信息。
  - 支持在此基础上做 Prompt 的多轮迭代和版本管理（用于配合你自己的 LLM 工具或直接接入接口）。

---

## Prompt 优化与版本管理

底部 `PROMPT REFINERY & AI ENGINE` 面板是本项目的提示词工作区，主要包含三个区域：

1. **Iteration Stack（左侧）**
   - 展示当前的基础规格（Base Spec）、上下文（Context）以及你通过 `ADD REFINEMENT` 输入的本地备注。
   - `ADD REFINEMENT` 只影响生成的 Base Prompt 内容，用于在不手动写 Prompt 的情况下，快速补充结构性要求。

2. **Prompt View + 版本选择（中间）**
   - 文本框：`<textarea id="prompt-output">` 会实时显示当前「生效版本」的 Prompt 文本。
   - 右上角版本下拉：`Base / v1.1 / v1.2 ...`
     - `Base`：由左侧配置 + 本地 refinements 生成的基础 Prompt；
     - `v1.x`：通过 LLM 优化后的 Prompt 版本，每次迭代会追加一个版本，而不覆盖 Base。
   - 你可以在下拉中自由切换版本做对比，`Copy` 按钮会复制当前选中版本的完整 Prompt。

3. **LLM Iteration 输入区（下方）**
   - 输入框：填写本轮要对 Prompt 做的优化说明，例如：
     > 请加强导航层次感和动效，但保持原有结构  
   - 每发送一次（回车或点击「发送」按钮）：  
     - 该说明会被加入 Iteration 日志；  
     - 触发一次 LLM 调用，基于 Base Prompt + 所有迭代说明，生成一个**轻量优化版本的 Prompt**；  
     - 新版本会以 `v1.x` 形式出现在版本下拉中，并自动成为当前显示版本。

> 设计原则：  
> - 尽量保持原始 Prompt 的章节结构（Design System / Context / Structure / Output Format 等）；  
> - LLM 只做轻量文字调整，不做「重写成另一个 Prompt」那种大改，以便前后版本对比。

---

## LLM 接入与设置

点击左上角齿轮按钮可打开「全局配置（Settings）」弹窗，配置对接模型服务：

- Provider 支持：
  - `OpenAI`
  - `Anthropic`（目前仅用于配置存储，内置 JS 调用尚未接入）
  - `Ollama`（本地模型，如 `qwen2.5-coder:latest`）

- 主要字段：
  - `Base URL`：OpenAI 兼容接口的根地址，例如：
    - `https://api.openai.com/v1`
    - 本地代理/自托管：`http://localhost:port/v1` 等
  - `API Key`：用于鉴权的密钥（Ollama 默认可为空）。
  - `Model`：如 `gpt-4.1-mini`、`gpt-4.1` 或本地模型名称。
  - `Temperature` / `Max Context` / `System Prompt` 等参数也会被用于 Prompt 的生成与优化。

- 内置 JS 调用支持：
  - 当前 `App.Prompt.run()` 会使用 **OpenAI / OpenAI 兼容接口 或本地 Ollama** 调用：  
    - `openai`：需要有效的 API Key，或把 Base URL 指向本地/代理；  
    - `ollama`：默认走本地 `http://localhost:11434/v1/chat/completions`，不强制要求 Key；  
    - 其他 Provider（如 `anthropic`）目前会弹出提示，仍建议你复制 Prompt 到自己的工具中使用。

- 状态提示：
  - 底部 Prompt 面板中的 `LLM Iteration` 区会显示当前配置状态：未配置 / 已配置 / 调用中等。

---

## 目录结构

- `index.html`：单页应用入口，包含整体布局和主要 UI 结构。
- `css/styles.css`：定制样式（在 Tailwind 工具类基础上的补充）。
- `js/app.js`：核心逻辑：
  - `App.State`：业务状态管理（项目类型、风格、组件等）。
  - `App.Engine`：根据状态生成预览 HTML。
  - `App.Prompt`：Prompt 生成、版本管理、LLM 迭代调用。
  - `App.Settings`：LLM Provider 配置的本地存储与读取。
- `tests/`：预留的测试目录（目前为空，可用于后续引入 Jest/JSDOM 等进行 JS 逻辑测试）。

---

## 注意事项

- 本项目默认不会把任何配置上传到远端，所有 LLM 相关设置只存储在浏览器 `localStorage` 中。  
- 使用外部 LLM 服务时，请妥善保管你的 API Key，并留意费用与访问政策。  
- 如需改动 Prompt 模板结构（例如添加新的章节），建议先在单独分支中实验，以免影响当前版本对比体验。

