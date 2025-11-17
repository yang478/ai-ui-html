// Call-to-Action Components
window.ExoLibrary = window.ExoLibrary || {};
window.ExoLibrary.cats = window.ExoLibrary.cats || {};
window.ExoLibrary.items = window.ExoLibrary.items || [];

// CTA 类别
Object.assign(window.ExoLibrary.cats, {
    'cta': 'Call to Action'
});

// CTA 组件
window.ExoLibrary.items.push(
    {
        id: 'cta1',
        cat: 'cta',
        name: '中心大号 CTA',
        html: `<section class="py-16 bg-gradient-to-r from-[var(--primary)]/15 via-[var(--primary)]/5 to-emerald-500/10 border-y border-gray-200/10"><div class="max-w-4xl mx-auto px-6 text-center"><h2 class="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-3">准备好生成下一版界面了吗？</h2><p class="text-sm text-gray-600 mb-6 max-w-2xl mx-auto">选择设计目的、视觉风格与组件组合，ExoCode 将为你生成可直接落地的前端页面与高质量 Prompt。</p><div class="flex flex-wrap justify-center gap-3"><button class="inline-flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius)] bg-[var(--primary)] text-white text-sm font-semibold shadow-lg shadow-[var(--primary)]/40 hover:brightness-110 transition"><i class="fa-solid fa-wand-magic-sparkles text-sm"></i><span>开始新一次生成</span></button><button class="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius)] border border-gray-200/20 text-sm text-gray-900 sm:text-gray-200 bg-white/5 hover:bg-white/10 transition"><i class="fa-regular fa-circle-play text-sm"></i><span>查看示例项目</span></button></div></div></section>`
    },
    {
        id: 'cta2',
        cat: 'cta',
        name: '条幅式 CTA + 表单',
        html: `<section class="py-10 bg-[var(--bg)]"><div class="max-w-5xl mx-auto px-6 rounded-2xl border border-gray-200/10 bg-[var(--bg)] p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between"><div><h2 class="text-base font-semibold text-[var(--text)] mb-1">加入设计系统实验室</h2><p class="text-sm text-gray-500 max-w-md">每月收到 1 套完整 UI 模板与 Prompt 配置示例，适合进阶用户持续打磨工作流。</p></div><form class="flex flex-col sm:flex-row gap-3 text-sm w-full sm:w-auto sm:min-w-[260px]"><label class="sr-only" for="cta-email">工作邮箱</label><input id="cta-email" type="email" required placeholder="work@company.com" class="flex-1 px-3 py-2 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60"/><button type="submit" class="px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white font-semibold hover:brightness-110 transition">申请加入</button></form></div></section>`
    }
);
