// FAQ Components
window.ExoLibrary = window.ExoLibrary || {};
window.ExoLibrary.cats = window.ExoLibrary.cats || {};
window.ExoLibrary.items = window.ExoLibrary.items || [];

// FAQ 类别
Object.assign(window.ExoLibrary.cats, {
    'faq': 'FAQ 问答'
});

// FAQ 组件
window.ExoLibrary.items.push(
    {
        id: 'faq1',
        cat: 'faq',
        name: '两列常见问题',
        html: `<section class="py-20 bg-gray-50/5"><div class="max-w-5xl mx-auto px-6"><div class="mb-8 text-center"><h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">FAQ</h2><p class="text-3xl font-bold text-[var(--text)] tracking-tight mb-2">常见问题解答</p><p class="text-sm text-gray-500">帮助新手快速理解生成流程，减少重复咨询。</p></div><div class="grid md:grid-cols-2 gap-6 text-sm text-gray-400"><div class="space-y-4"><div><h3 class="text-[var(--text)] font-semibold mb-1">生成的页面是否可商用？</h3><p>可以。你可以在个人或企业项目中自由使用生成的 HTML/CSS 代码。</p></div><div><h3 class="text-[var(--text)] font-semibold mb-1">支持哪些设计风格？</h3><p>预设了极简、企业、创意、科技等多种风格，并支持自定义颜色与字体。</p></div><div><h3 class="text-[var(--text)] font-semibold mb-1">是否需要前端基础？</h3><p>不需要。通过组件组合 + Prompt 引导，即使非前端工程师也可以产出高质量界面。</p></div></div><div class="space-y-4"><div><h3 class="text-[var(--text)] font-semibold mb-1">可以导出为设计系统吗？</h3><p>可以将组件组合导出为基础设计规范，方便后续接入 Figma / Design Token 流程。</p></div><div><h3 class="text-[var(--text)] font-semibold mb-1">支持哪些组件类型？</h3><p>导航、表单、表格、图表、弹窗、空状态等 100+ 预设组件，并持续更新。</p></div><div><h3 class="text-[var(--text)] font-semibold mb-1">有免费额度吗？</h3><p>本地模型方案完全免费，接入云端 LLM 时按各平台计费规则执行。</p></div></div></div></div></section>`
    },
    {
        id: 'faq2',
        cat: 'faq',
        name: '可折叠 FAQ 列表',
        html: `<section class="py-16 bg-[var(--bg)]"><div class="max-w-3xl mx-auto px-6"><div class="mb-6"><h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">Still have questions?</h2><p class="text-2xl font-bold text-[var(--text)] tracking-tight">关于工作流与模型配置</p></div><div class="space-y-2 text-sm text-gray-300"><details class="group rounded-[var(--radius)] border border-gray-200/10 bg-[var(--bg)] p-3"><summary class="flex items-center justify-between cursor-pointer list-none"><span>如何接入本地模型（Ollama）？</span><span class="text-gray-500 group-open:rotate-90 transition-transform"><i class="fa-solid fa-chevron-right text-[10px]"></i></span></summary><p class="mt-2 text-gray-400">在设置中选择 Ollama，填写本地 Base URL（默认 http://localhost:11434），模型名称如 <code class="font-mono text-xs">qwen2.5-coder:latest</code>，即可在 Prompt Dock 中直接调用。</p></details><details class="group rounded-[var(--radius)] border border-gray-200/10 bg-[var(--bg)] p-3"><summary class="flex items-center justify-between cursor-pointer list-none"><span>如何保存自定义设计风格？</span><span class="text-gray-500 group-open:rotate-90 transition-transform"><i class="fa-solid fa-chevron-right text-[10px]"></i></span></summary><p class="mt-2 text-gray-400">在右侧「Design Tokens」中调整主色、圆角和字体后，点击「自定义视觉风格」卡片即可将当前配置保存为预设，方便在不同项目间复用。</p></details><details class="group rounded-[var(--radius)] border border-gray-200/10 bg-[var(--bg)] p-3"><summary class="flex items-center justify-between cursor-pointer list-none"><span>组件可以与现有代码库混用吗？</span><span class="text-gray-500 group-open:rotate-90 transition-transform"><i class="fa-solid fa-chevron-right text-[10px]"></i></span></summary><p class="mt-2 text-gray-400">可以。组件基于 TailwindCSS 与语义化 HTML，你可以在任意前端框架中直接引用或按需改造。</p></details></div></div></section>`
    }
);
