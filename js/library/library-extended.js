// Extended Components for ExoCode
// 覆盖弹窗、反馈、表格增强、认证、电商等高级场景
window.ExoLibrary = window.ExoLibrary || {};
window.ExoLibrary.cats = window.ExoLibrary.cats || {};
window.ExoLibrary.items = window.ExoLibrary.items || [];

// 类别扩展（覆盖 18 个方向）
Object.assign(window.ExoLibrary.cats, {
    // 高层方向
    'content': '内容类组件',
    'interaction': '交互类组件',
    'data': '数据类组件',
    'mobile': '移动端组件',
    'input': '表单与输入',
    // 细分方向
    'modal': '弹窗类组件',
    'feedback': '反馈与状态',
    'table-advanced': '表格增强',
    'auth': '认证与账户',
    'media': '媒体与预览',
    'map': '地图与位置',
    'guide': '引导与教程',
    'a11y': '无障碍',
    'i18n': '国际化',
    'ecommerce': '电商组件',
    'advanced': '高级交互组件',
    'custom': '自定义组件'
});

// ======================== 高层方向：内容 / 交互 / 数据 / 移动端 / 输入 ========================

// 内容类组件
window.ExoLibrary.items.push(
    {
        id: 'content1',
        cat: 'content',
        name: '两列图文内容区块',
        html: `<section class="py-16 bg-gray-50/5">
    <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
            <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">Use cases</h2>
            <p class="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-3">为你的团队搭建统一的前端工作台</p>
            <p class="text-sm text-gray-500 mb-4">通过组件组合与 Prompt 生成，你可以在一处管理设计规范、页面结构与代码导出，大幅缩短从想法到上线的路径。</p>
            <ul class="space-y-2 text-sm text-gray-400">
                <li class="flex items-start gap-2"><span class="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span><span>产品团队：快速产出投放落地页与 A/B 版本。</span></li>
                <li class="flex items-start gap-2"><span class="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span><span>数据团队：搭建内部仪表盘与运营面板。</span></li>
                <li class="flex items-start gap-2"><span class="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span><span>个人开发者：沉淀可复用的组件库与模板。</span></li>
            </ul>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4 flex flex-col justify-between">
                <p class="text-[11px] text-gray-400 mb-1">模板数量</p>
                <p class="text-2xl font-bold text-[var(--text)]">100+</p>
                <p class="mt-1 text-[11px] text-gray-500">覆盖导航、内容、表单、数据可视化等核心场景。</p>
            </div>
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4 flex flex-col justify-between">
                <p class="text-[11px] text-gray-400 mb-1">适配终端</p>
                <p class="text-2xl font-bold text-[var(--text)]">3</p>
                <p class="mt-1 text-[11px] text-gray-500">Desktop / Tablet / Mobile 响应式布局。</p>
            </div>
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4 col-span-2">
                <p class="text-[11px] text-gray-400 mb-1">适配场景</p>
                <div class="flex flex-wrap gap-1.5">
                    <span class="px-2 py-1 rounded-full bg-gray-100/5 border border-gray-200/20 text-gray-300">SaaS 控制台</span>
                    <span class="px-2 py-1 rounded-full bg-gray-100/5 border border-gray-200/20 text-gray-300">营销落地页</span>
                    <span class="px-2 py-1 rounded-full bg-gray-100/5 border border-gray-200/20 text-gray-300">内部运营工具</span>
                    <span class="px-2 py-1 rounded-full bg-gray-100/5 border border-gray-200/20 text-gray-300">个人作品集</span>
                </div>
            </div>
        </div>
    </div>
</section>`
    },
    {
        id: 'content2',
        cat: 'content',
        name: '图片画廊内容区',
        html: `<section class="py-16 bg-[var(--bg)]">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
                <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">Gallery</h2>
                <p class="text-2xl font-bold text-[var(--text)] tracking-tight">组件库使用场景一瞥</p>
            </div>
            <p class="text-xs text-gray-500 max-w-sm">适合展示界面截图、组件组合示例或设计语言演变过程。</p>
        </div>
        <div class="grid md:grid-cols-3 gap-3">
            <div class="aspect-video rounded-[var(--radius)] bg-gradient-to-br from-slate-900 to-slate-800 border border-gray-200/10 flex items-center justify-center text-[11px] text-gray-500">
                Hero + Stats + CTA 组合
            </div>
            <div class="aspect-video rounded-[var(--radius)] bg-gradient-to-br from-slate-900 to-slate-800 border border-gray-200/10 flex items-center justify-center text-[11px] text-gray-500">
                Dashboard Widgets 布局
            </div>
            <div class="aspect-video rounded-[var(--radius)] bg-gradient-to-br from-slate-900 to-slate-800 border border-gray-200/10 flex items-center justify-center text-[11px] text-gray-500">
                移动端卡片列表
            </div>
        </div>
    </div>
</section>`
    }
);

// 交互类组件（评论区、社交分享等）
window.ExoLibrary.items.push(
    {
        id: 'interaction1',
        cat: 'interaction',
        name: '评论区列表',
        html: `<section class="py-10 bg-[var(--bg)]">
    <div class="max-w-3xl mx-auto px-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase">Comments</h2>
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)] text-xs hover:brightness-110">写下你的想法</button>
        </div>
        <div class="space-y-4 text-xs">
            <article class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-3">
                <header class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[10px] font-semibold">AC</span>
                        <span class="text-gray-200">Alex Chen</span>
                    </div>
                    <span class="text-[10px] text-gray-500">2 小时前</span>
                </header>
                <p class="text-[11px] text-gray-400">组件库结构设计得很好，建议增加更多「移动端+电商」方向的模板。</p>
            </article>
            <article class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-3">
                <header class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-semibold">PM</span>
                        <span class="text-gray-200">Product Team</span>
                    </div>
                    <span class="text-[10px] text-gray-500">昨天</span>
                </header>
                <p class="text-[11px] text-gray-400">后续计划加入任务看板、通知中心等高级交互组件，欢迎提需求。</p>
            </article>
        </div>
    </div>
</section>`
    },
    {
        id: 'interaction2',
        cat: 'interaction',
        name: '社交分享条',
        html: `<section class="py-4 bg-[var(--bg)] border-t border-gray-200/10">
    <div class="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p class="text-[11px] text-gray-500">觉得这个模板有用？分享给你的团队。</p>
        <div class="flex items-center gap-2 text-gray-400">
            <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10">
                <i class="fa-brands fa-weixin text-[12px]"></i><span>微信</span>
            </button>
            <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10">
                <i class="fa-brands fa-github text-[12px]"></i><span>GitHub</span>
            </button>
            <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 border border-dashed border-gray-200/40 hover:border-gray-200/80">
                <i class="fa-regular fa-copy text-[11px]"></i><span>复制链接</span>
            </button>
        </div>
    </div>
</section>`
    }
);

// 数据类组件（表格、分页、数据图表等）
window.ExoLibrary.items.push(
    {
        id: 'data1',
        cat: 'data',
        name: '表格 + 分页条',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between mb-3 text-xs">
            <p class="text-gray-400">共 <span class="text-[var(--text)] font-mono">128</span> 条记录</p>
            <div class="inline-flex items-center gap-1 text-gray-400">
                <span class="hidden sm:inline">每页显示</span>
                <select class="bg-gray-100/5 border border-gray-200/20 rounded-[var(--radius)] px-2 py-1 text-[11px]">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
        </div>
        <div class="overflow-hidden rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 text-xs">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200/20">
                    <thead class="bg-black/40">
                        <tr class="text-gray-400">
                            <th class="px-4 py-2 text-left font-medium">名称</th>
                            <th class="px-4 py-2 text-left font-medium">类型</th>
                            <th class="px-4 py-2 text-left font-medium">更新时间</th>
                            <th class="px-4 py-2 text-right font-medium">状态</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200/10 text-gray-300">
                        <tr>
                            <td class="px-4 py-2">SaaS 控制台</td>
                            <td class="px-4 py-2 text-gray-400">Dashboard</td>
                            <td class="px-4 py-2 text-gray-400">2024-05-01</td>
                            <td class="px-4 py-2 text-right">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">上线中</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2">营销落地页模板 A/B</td>
                            <td class="px-4 py-2 text-gray-400">Landing</td>
                            <td class="px-4 py-2 text-gray-400">2024-04-18</td>
                            <td class="px-4 py-2 text-right">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300">测试中</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200/10 text-[11px] text-gray-400">
                <p>第 <span class="font-mono text-gray-200">1</span> / <span class="font-mono text-gray-200">13</span> 页</p>
                <div class="inline-flex items-center gap-1">
                    <button class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10">上一页</button>
                    <button class="px-2 py-1 rounded-[var(--radius)] bg-[var(--primary)] text-white">1</button>
                    <button class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10">2</button>
                    <button class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10">下一页</button>
                </div>
            </div>
        </div>
    </div>
</section>`
    },
    {
        id: 'data2',
        cat: 'data',
        name: '数据卡片 + 简单图表占位',
        html: `<section class="py-16 bg-gray-50/5">
    <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr,1fr] gap-8 items-start">
        <div>
            <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">Metrics</h2>
            <p class="text-2xl font-bold text-[var(--text)] tracking-tight mb-4">关键转化指标</p>
            <div class="grid sm:grid-cols-3 gap-4 text-xs">
                <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                    <p class="text-[11px] text-gray-400 mb-1">注册转化率</p>
                    <p class="text-xl font-bold text-[var(--text)]">42%</p>
                    <p class="mt-1 text-[11px] text-emerald-400">较上周 +8%</p>
                </div>
                <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                    <p class="text-[11px] text-gray-400 mb-1">订阅转化率</p>
                    <p class="text-xl font-bold text-[var(--text)]">12%</p>
                    <p class="mt-1 text-[11px] text-emerald-400">较上周 +3%</p>
                </div>
                <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                    <p class="text-[11px] text-gray-400 mb-1">留存率（30 日）</p>
                    <p class="text-xl font-bold text-[var(--text)]">78%</p>
                    <p class="mt-1 text-[11px] text-gray-400">行业平均 65%</p>
                </div>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4 text-xs">
            <p class="text-[11px] text-gray-400 mb-2">图表占位</p>
            <div class="aspect-[4/3] rounded-[var(--radius)] bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[10px] text-gray-500">
                <span>Chart placeholder · 接入实际图表库（ECharts / Chart.js 等）后可替换为真实图表</span>
            </div>
        </div>
    </div>
</section>`
    }
);

// 移动端组件
window.ExoLibrary.items.push(
    {
        id: 'mobile1',
        cat: 'mobile',
        name: '移动端底部导航栏',
        html: `<nav class="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/20 bg-[var(--bg)]/95 backdrop-blur">
    <div class="max-w-md mx-auto px-4 py-2 flex items-center justify-between text-[10px] text-gray-400">
        <button class="flex flex-col items-center gap-0.5 text-[var(--primary)]">
            <i class="fa-solid fa-house text-sm"></i>
            <span>首页</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 hover:text-[var(--text)]">
            <i class="fa-solid fa-layer-group text-sm"></i>
            <span>组件</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 hover:text-[var(--text)]">
            <i class="fa-solid fa-chart-simple text-sm"></i>
            <span>数据</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 hover:text-[var(--text)]">
            <i class="fa-solid fa-user text-sm"></i>
            <span>我的</span>
        </button>
    </div>
</nav>`
    },
    {
        id: 'mobile2',
        cat: 'mobile',
        name: '移动端卡片列表',
        html: `<section class="pt-6 pb-20 bg-[var(--bg)]">
    <div class="max-w-md mx-auto px-4 space-y-3 text-xs">
        <header class="flex items-center justify-between mb-2">
            <h2 class="text-sm font-semibold text-[var(--text)]">最近项目</h2>
            <button class="text-[11px] text-[var(--primary)]">查看全部</button>
        </header>
        <article class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-3 flex items-center justify-between gap-3">
            <div>
                <h3 class="text-xs font-semibold text-[var(--text)] mb-0.5">Analytics Dashboard</h3>
                <p class="text-[11px] text-gray-500">上次修改：2 小时前</p>
            </div>
            <span class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px]">进行中</span>
        </article>
        <article class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-3 flex items-center justify-between gap-3">
            <div>
                <h3 class="text-xs font-semibold text-[var(--text)] mb-0.5">Landing Page · v3</h3>
                <p class="text-[11px] text-gray-500">上次修改：昨天</p>
            </div>
            <span class="px-2 py-1 rounded-full bg-gray-100/10 text-gray-400 text-[10px]">草稿</span>
        </article>
    </div>
</section>`
    }
);

// 表单与输入（小型输入控件片段）
window.ExoLibrary.items.push(
    {
        id: 'input1',
        cat: 'input',
        name: '筛选工具条',
        html: `<section class="py-4 bg-[var(--bg)] border-b border-gray-200/10">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-gray-400">
            <i class="fa-solid fa-sliders text-[11px]"></i>
            <span>筛选条件</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <select class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 text-[11px] text-gray-300">
                <option>项目类型</option>
                <option>SaaS 控制台</option>
                <option>营销落地页</option>
                <option>电商站点</option>
            </select>
            <select class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 text-[11px] text-gray-300">
                <option>更新时间</option>
                <option>最近 7 天</option>
                <option>最近 30 天</option>
            </select>
            <div class="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 text-gray-400">
                <i class="fa-solid fa-magnifying-glass text-[10px]"></i>
                <span>搜索项目…</span>
            </div>
        </div>
    </div>
</section>`
    },
    {
        id: 'input2',
        cat: 'input',
        name: '日期范围选择条（占位）',
        html: `<section class="py-4 bg-gray-50/5">
    <div class="max-w-xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="text-[11px] text-gray-500">统计时间范围</div>
        <div class="flex flex-wrap items-center gap-2">
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)]">近 7 天</button>
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">近 30 天</button>
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10 inline-flex items-center gap-1">
                <i class="fa-regular fa-calendar text-[10px]"></i>
                <span>自定义</span>
            </button>
        </div>
    </div>
</section>`
    }
);

// 弹窗类组件
window.ExoLibrary.items.push(
    {
        id: 'modal1',
        cat: 'modal',
        name: '居中模态框',
        html: `<section class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="max-w-md w-full mx-4 rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] shadow-2xl p-6">
        <div class="flex items-start justify-between gap-4 mb-4">
            <div>
                <h2 class="text-base font-bold text-[var(--text)] mb-1">保存当前布局为模板？</h2>
                <p class="text-xs text-gray-500">你可以将当前组件组合保存为预设模板，方便后续项目快速复用。</p>
            </div>
            <button class="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100/5 border border-gray-200/10 text-gray-400 hover:text-[var(--text)] hover:bg-gray-100/10 transition">
                <i class="fa-solid fa-xmark text-xs"></i>
            </button>
        </div>
        <div class="flex items-center gap-3 text-xs text-gray-400 mb-4">
            <i class="fa-solid fa-layer-group text-[var(--primary)]"></i>
            <span>包含导航、Hero、Feature、Pricing 等区块配置。</span>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 justify-end text-xs">
            <button class="px-3 py-2 rounded-[var(--radius)] border border-gray-200/20 text-gray-400 hover:text-[var(--text)] hover:bg-gray-100/5 transition">稍后再说</button>
            <button class="px-3 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white font-semibold hover:brightness-110 transition">保存为模板</button>
        </div>
    </div>
</section>`
    }
);

// 反馈与状态
window.ExoLibrary.items.push(
    {
        id: 'feedback1',
        cat: 'feedback',
        name: '空状态 + CTA',
        html: `<section class="min-h-[40vh] flex items-center justify-center bg-gray-50/5">
    <div class="max-w-md mx-auto text-center px-6 py-10 rounded-[var(--radius)] border border-dashed border-gray-200/40 bg-[var(--bg)]">
        <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
            <i class="fa-regular fa-folder-open text-sm"></i>
        </div>
        <h2 class="text-lg font-bold text-[var(--text)] mb-1">还没有任何组件</h2>
        <p class="text-xs text-gray-500 mb-4">从组件资源库中选择导航、内容区块或表单组件，快速搭建你的第一个页面。</p>
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white text-xs font-semibold hover:brightness-110 transition">
            <i class="fa-solid fa-plus"></i>
            <span>打开组件库</span>
        </button>
    </div>
</section>`
    }
);

// 表格增强
window.ExoLibrary.items.push(
    {
        id: 'tableAdv1',
        cat: 'table-advanced',
        name: '可筛选数据表格',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <div>
                <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-1">Data table</h2>
                <p class="text-xl font-bold text-[var(--text)] tracking-tight">团队与访问权限</p>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-xs">
                <div class="inline-flex items-center gap-2 px-2 py-1 rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5">
                    <i class="fa-solid fa-filter text-gray-400"></i>
                    <span class="text-gray-400">角色：</span>
                    <button class="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Owner</button>
                    <button class="px-2 py-0.5 rounded-full bg-gray-100/5 text-gray-400">Editor</button>
                    <button class="px-2 py-0.5 rounded-full bg-gray-100/5 text-gray-400">Viewer</button>
                </div>
                <div class="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 text-gray-400">
                    <i class="fa-solid fa-magnifying-glass text-[11px]"></i>
                    <span>搜索成员…</span>
                </div>
            </div>
        </div>
        <div class="overflow-hidden rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 text-xs">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200/20">
                    <thead class="bg-black/40 sticky top-0">
                        <tr class="text-gray-400">
                            <th class="px-4 py-2 text-left font-medium">成员</th>
                            <th class="px-4 py-2 text-left font-medium">角色</th>
                            <th class="px-4 py-2 text-left font-medium">最近活跃</th>
                            <th class="px-4 py-2 text-left font-medium text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200/10 text-gray-300">
                        <tr>
                            <td class="px-4 py-2">Alex Chen</td>
                            <td class="px-4 py-2">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Owner</span>
                            </td>
                            <td class="px-4 py-2 text-gray-400">1 小时前</td>
                            <td class="px-4 py-2 text-right">
                                <button class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10 transition">编辑</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2">Design Team</td>
                            <td class="px-4 py-2">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">Editor</span>
                            </td>
                            <td class="px-4 py-2 text-gray-400">昨天</td>
                            <td class="px-4 py-2 text-right">
                                <button class="px-2 py-1 rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 hover:bg-gray-100/10 transition">编辑</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>`
    }
);

// 认证与账户
window.ExoLibrary.items.push(
    {
        id: 'auth1',
        cat: 'auth',
        name: '账户与工作区切换',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-[1.1fr,1fr] gap-6 items-start text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4">
            <div class="flex items-center justify-between mb-3">
                <div>
                    <p class="text-[11px] text-gray-400">当前账户</p>
                    <p class="text-sm font-semibold text-[var(--text)]">alex.chen@company.com</p>
                </div>
                <button class="px-3 py-1.5 rounded-[var(--radius)] border border-gray-200/20 text-gray-300 hover:bg-gray-100/10 transition">退出登录</button>
            </div>
            <div class="border-t border-gray-200/10 pt-3">
                <p class="text-[11px] text-gray-400 mb-2">工作区</p>
                <div class="space-y-1">
                    <button class="w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--text)]">
                        <span class="flex items-center gap-2">
                            <span class="w-5 h-5 rounded bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                                <i class="fa-solid fa-building text-[10px]"></i>
                            </span>
                            <span>Enterprise AI Workbench</span>
                        </span>
                        <span class="text-[10px] text-emerald-400">当前</span>
                    </button>
                    <button class="w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius)] hover:bg-gray-100/5 text-gray-300">
                        <span class="flex items-center gap-2">
                            <span class="w-5 h-5 rounded bg-gray-100/5 flex items-center justify-center text-gray-400">
                                <i class="fa-solid fa-briefcase text-[10px]"></i>
                            </span>
                            <span>Side Project Studio</span>
                        </span>
                        <span class="text-[10px] text-gray-500">只读</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-dashed border-amber-400/40 bg-amber-500/5 p-4">
            <p class="text-[11px] font-semibold text-amber-400 mb-1">提示</p>
            <p class="text-[11px] text-amber-100 mb-2">你可以在此扩展权限矩阵、成员角色管理与审计日志，适配复杂 B2B 场景。</p>
            <p class="text-[11px] text-amber-100/80">生成 Prompt 时可将本区块描述为「认证与账户」组件，用于指导 LLM 输出相应 HTML。</p>
        </div>
    </div>
</section>`
    }
);

// 媒体与预览
window.ExoLibrary.items.push(
    {
        id: 'media1',
        cat: 'media',
        name: '文件预览卡片',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4 text-xs">
        <article class="md:col-span-2 rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4 flex gap-4 items-start">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-500 text-white flex items-center justify-center text-xl font-bold">
                <span>.PDF</span>
            </div>
            <div class="flex-1">
                <h3 class="text-sm font-semibold text-[var(--text)] mb-1">ExoCode-Design-Spec-v2.4.pdf</h3>
                <p class="text-[11px] text-gray-400 mb-2">更新于 2 小时前 · 1.2 MB · 由 Alex 上传</p>
                <div class="flex flex-wrap items-center gap-2">
                    <button class="px-3 py-1.5 rounded-[var(--radius)] bg-[var(--primary)] text-white hover:brightness-110 transition">在线预览</button>
                    <button class="px-3 py-1.5 rounded-[var(--radius)] border border-gray-200/20 text-gray-300 hover:bg-gray-100/5 transition">下载</button>
                    <button class="inline-flex items-center gap-1 px-2 py-1.5 rounded-[var(--radius)] border border-dashed border-gray-200/40 text-gray-400 hover:border-gray-200/80 transition">
                        <i class="fa-regular fa-copy text-[10px]"></i>
                        <span>复制分享链接</span>
                    </button>
                </div>
            </div>
        </article>
        <aside class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4">
            <p class="text-[11px] text-gray-400 mb-1">媒体与预览</p>
            <p class="text-[11px] text-gray-500">适合接在文档列表或版本历史后，用于展示当前选中文件的预览与快捷操作。</p>
        </aside>
    </div>
</section>`
    }
);

// 地图与位置
window.ExoLibrary.items.push(
    {
        id: 'map1',
        cat: 'map',
        name: '简单地图卡片',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-[1.1fr,1fr] gap-6 items-stretch text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-3 relative overflow-hidden">
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_10%_20%,var(--primary)_0,transparent_45%),radial-gradient(circle_at_80%_80%,#22c55e_0,transparent_45%)]"></div>
            <div class="relative">
                <div class="flex items-center justify-between mb-2 text-[11px] text-gray-400">
                    <span>Active regions</span>
                    <span class="inline-flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Live</span>
                </div>
                <div class="aspect-[4/3] rounded-[var(--radius)] bg-slate-900/70 border border-slate-700/60 flex items-center justify-center text-[10px] text-gray-500">
                    <span>Map placeholder · 接入真实地图 SDK 时可替换为 iframe 或 canvas 渲染内容</span>
                </div>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4 space-y-2">
            <p class="text-[11px] font-semibold text-[var(--text)]">地图与位置</p>
            <p class="text-[11px] text-gray-500">适合作为「门店分布」「数据热力图」或「线路规划」模块的视觉容器。</p>
            <ul class="text-[11px] text-gray-400 space-y-1">
                <li>• 支持标注节点、区域高亮、热力层覆盖</li>
                <li>• 结合数据类组件展示区域维度 KPI</li>
                <li>• 可以在 Prompt 中描述具体地图需求，让 LLM 生成更贴合的实现</li>
            </ul>
        </div>
    </div>
</section>`
    }
);

// 引导与教程
window.ExoLibrary.items.push(
    {
        id: 'guide1',
        cat: 'guide',
        name: '三步功能引导',
        html: `<section class="py-12 bg-gray-50/5">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-2">Onboarding</h2>
        <p class="text-2xl font-bold text-[var(--text)] tracking-tight mb-6">三步完成你的第一个工作台</p>
        <div class="grid md:grid-cols-3 gap-4 text-xs">
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                <div class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold mb-3">1</div>
                <h3 class="text-sm font-semibold text-[var(--text)] mb-1">选择项目类型与风格</h3>
                <p class="text-[11px] text-gray-500">从 SaaS、Landing、运营中台等预设类型中选择，并配置 Design Tokens。</p>
            </div>
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                <div class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold mb-3">2</div>
                <h3 class="text-sm font-semibold text-[var(--text)] mb-1">拖拽组合组件</h3>
                <p class="text-[11px] text-gray-500">从组件资源库中添加导航、内容区、数据卡片等模块，构建页面结构。</p>
            </div>
            <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
                <div class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold mb-3">3</div>
                <h3 class="text-sm font-semibold text-[var(--text)] mb-1">生成并导出 Prompt</h3>
                <p class="text-[11px] text-gray-500">在 Prompt Dock 中优化提示词，一键复制到你的 LLM 工具中使用。</p>
            </div>
        </div>
    </div>
</section>`
    }
);

// 无障碍
window.ExoLibrary.items.push(
    {
        id: 'a11y1',
        cat: 'a11y',
        name: '无障碍工具条',
        html: `<section class="py-6 bg-[var(--bg)] border-b border-gray-200/10">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-gray-500">
            <i class="fa-solid fa-universal-access text-[var(--primary)]"></i>
            <span class="text-[11px]">无障碍模式 · 优化键盘导航与对比度</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex items-center gap-1 rounded-full bg-gray-100/5 border border-gray-200/20 px-2 py-1">
                <span class="text-[11px] text-gray-400">字号</span>
                <button class="w-6 h-6 rounded-full bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">A-</button>
                <button class="w-6 h-6 rounded-full bg-gray-100/10 text-[var(--text)] font-semibold">A</button>
                <button class="w-6 h-6 rounded-full bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">A+</button>
            </div>
            <div class="inline-flex items-center gap-1 rounded-full bg-gray-100/5 border border-gray-200/20 px-2 py-1">
                <span class="text-[11px] text-gray-400">对比度</span>
                <button class="px-2 py-1 rounded-full bg-gray-100/10 text-gray-300">默认</button>
                <button class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300">高对比度</button>
            </div>
            <button class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <i class="fa-solid fa-keyboard text-[10px]"></i>
                <span>查看快捷键</span>
            </button>
        </div>
    </div>
</section>`
    }
);

// 国际化
window.ExoLibrary.items.push(
    {
        id: 'i18n1',
        cat: 'i18n',
        name: '语言与区域切换栏',
        html: `<section class="py-4 bg-[var(--bg)] border-b border-gray-200/10">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-gray-500">
            <i class="fa-solid fa-globe text-[var(--primary)]"></i>
            <span>当前语言：简体中文 (zh-CN)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex items-center gap-1 rounded-full bg-gray-100/5 border border-gray-200/20 px-2 py-1">
                <button class="px-2 py-1 rounded-full bg-[var(--primary)] text-white">中文</button>
                <button class="px-2 py-1 rounded-full bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">English</button>
                <button class="px-2 py-1 rounded-full bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">日本語</button>
            </div>
            <div class="inline-flex items-center gap-2 text-gray-400">
                <span>日期格式：2024-05-01</span>
                <span class="w-px h-3 bg-gray-600/60"></span>
                <span>货币：CNY ¥</span>
            </div>
            <button class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100/5 border border-dashed border-gray-200/40 text-gray-400 hover:border-gray-200/80">
                <i class="fa-solid fa-arrows-left-right text-[10px]"></i>
                <span>预览 RTL 布局</span>
            </button>
        </div>
    </div>
</section>`
    }
);

// 电商组件
window.ExoLibrary.items.push(
    {
        id: 'ecom1',
        cat: 'ecommerce',
        name: '商品卡片 + SKU 选择',
        html: `<section class="py-12 bg-gray-50/5">
    <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-[1.1fr,1fr] gap-8 items-start text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4 flex flex-col sm:flex-row gap-4">
            <div class="w-full sm:w-48 aspect-[4/5] rounded-[var(--radius)] bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-200/20 flex items-center justify-center text-gray-500">
                <span class="text-[11px]">Product preview</span>
            </div>
            <div class="flex-1 flex flex-col gap-3">
                <header>
                    <p class="text-[11px] text-emerald-400 mb-1">New</p>
                    <h2 class="text-base font-semibold text-[var(--text)]">AI 前端工作台 Pro 主题包</h2>
                    <p class="text-[11px] text-gray-500">包含 40+ 生产级页面段落与完整设计系统。</p>
                </header>
                <div class="space-y-2">
                    <p class="text-[11px] text-gray-400">选择授权类型</p>
                    <div class="flex flex-wrap gap-2">
                        <button class="px-3 py-1.5 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)]">个人</button>
                        <button class="px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">团队 (5 人)</button>
                        <button class="px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">企业</button>
                    </div>
                    <p class="text-[11px] text-gray-400">选择主题风格</p>
                    <div class="flex flex-wrap gap-2">
                        <button class="w-7 h-7 rounded-full bg-indigo-500 border-2 border-white/80"></button>
                        <button class="w-7 h-7 rounded-full bg-emerald-500 border-2 border-transparent opacity-60"></button>
                        <button class="w-7 h-7 rounded-full bg-amber-500 border-2 border-transparent opacity-60"></button>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-auto">
                    <div>
                        <p class="text-[11px] text-gray-400">价格</p>
                        <p class="text-lg font-bold text-[var(--text)]">¥ 299</p>
                    </div>
                    <button class="px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white font-semibold hover:brightness-110 transition">
                        <i class="fa-solid fa-cart-plus mr-1"></i>加入购物车
                    </button>
                </div>
            </div>
        </div>
        <aside class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
            <p class="text-[11px] text-gray-400 mb-1">电商组件</p>
            <p class="text-[11px] text-gray-500 mb-2">适合作为电商站点商品详情页的上半部分，与评价、推荐等模块组合使用。</p>
            <ul class="text-[11px] text-gray-400 space-y-1">
                <li>• SKU 选择（授权 / 版本 / 颜色）</li>
                <li>• 主 CTA（加入购物车 / 立即购买）</li>
                <li>• 可与价格表、优惠提示等组件联动</li>
            </ul>
        </aside>
    </div>
</section>`
    }
);

// 高级交互组件
window.ExoLibrary.items.push(
    {
        id: 'advanced1',
        cat: 'advanced',
        name: '可拖拽排序列表（占位）',
        html: `<section class="py-10 bg-[var(--bg)]">
    <div class="max-w-4xl mx-auto px-6">
        <div class="flex items-center justify-between mb-3">
            <div>
                <h2 class="text-sm font-semibold tracking-[0.2em] text-[var(--primary)] uppercase mb-1">Interactive</h2>
                <p class="text-xl font-bold text-[var(--text)] tracking-tight">编辑首页模块顺序</p>
            </div>
            <p class="text-[11px] text-gray-500">拖拽左侧句柄调整模块顺序（交互逻辑可由 JS 实现）。</p>
        </div>
        <div class="space-y-2 text-xs">
            <div class="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-gray-200/30 bg-gray-100/5">
                <div class="flex flex-col gap-0.5 text-gray-500 cursor-move">
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                </div>
                <span class="text-gray-300 flex-1">1. Hero 首屏</span>
                <span class="text-[11px] text-gray-500">固定</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-dashed border-[var(--primary)]/50 bg-[var(--primary)]/5">
                <div class="flex flex-col gap-0.5 text-[var(--primary)] cursor-move">
                    <span class="w-3 h-0.5 rounded bg-[var(--primary)]/80"></span>
                    <span class="w-3 h-0.5 rounded bg-[var(--primary)]/80"></span>
                    <span class="w-3 h-0.5 rounded bg-[var(--primary)]/80"></span>
                </div>
                <span class="text-gray-100 flex-1">2. Feature 特性展示</span>
                <span class="text-[11px] text-[var(--primary)]">正在调整</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-gray-200/30 bg-gray-100/5">
                <div class="flex flex-col gap-0.5 text-gray-500 cursor-move">
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                    <span class="w-3 h-0.5 rounded bg-gray-500/60"></span>
                </div>
                <span class="text-gray-300 flex-1">3. 数据概览 / Stats</span>
                <span class="text-[11px] text-gray-500">可排序</span>
            </div>
        </div>
    </div>
</section>`
    }
);

// 自定义组件占位
window.ExoLibrary.items.push(
    {
        id: 'custom1',
        cat: 'custom',
        name: '自定义组件容器',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-4xl mx-auto px-6 rounded-[var(--radius)] border border-dashed border-gray-200/40 bg-gray-100/5 p-6 text-xs">
        <div class="flex items-start gap-3 mb-3">
            <div class="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                <i class="fa-solid fa-puzzle-piece text-sm"></i>
            </div>
            <div class="flex-1">
                <h2 class="text-sm font-semibold text-[var(--text)] mb-1">自定义组件</h2>
                <p class="text-[11px] text-gray-500">将你现有项目中的任意 HTML 片段贴入此区域，ExoCode 会与其它预设组件一同生成完整页面与 Prompt。</p>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-dashed border-gray-200/40 bg-black/20 p-4 text-[11px] text-gray-500 font-mono leading-relaxed">
            <!-- 在这里粘贴你的自定义组件 HTML 片段，或在 Prompt 中详细描述组件结构和行为 -->\n
            &lt;!-- Custom component placeholder --&gt;\n
            &lt;section class="py-8"&gt;...&lt;/section&gt;
        </div>
        <p class="mt-3 text-[11px] text-gray-500">提示：生成 Prompt 时可以将本区块描述为「自定义组件」，引导 LLM 在对应位置保留扩展空间。</p>
    </div>
</section>`
    }
);

// 扩展：为各方向补充更多模板
window.ExoLibrary.items.push(
    // 弹窗类组件：右侧抽屉
    {
        id: 'modal2',
        cat: 'modal',
        name: '右侧抽屉面板',
        html: `<section class="fixed inset-0 flex justify-end bg-black/50 backdrop-blur-sm">
    <div class="w-full max-w-md h-full bg-[var(--bg)] border-l border-gray-200/20 shadow-2xl flex flex-col text-xs">
        <header class="px-4 py-3 border-b border-gray-200/10 flex items-center justify-between">
            <div>
                <p class="text-[11px] text-gray-400">页面设置</p>
                <h2 class="text-sm font-semibold text-[var(--text)]">组件组合与布局</h2>
            </div>
            <button class="w-7 h-7 rounded-full bg-gray-100/5 border border-gray-200/20 text-gray-400 hover:bg-gray-100/10 hover:text-[var(--text)]">
                <i class="fa-solid fa-xmark text-[11px]"></i>
            </button>
        </header>
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <div>
                <p class="text-[11px] text-gray-500 mb-1">布局预设</p>
                <div class="grid grid-cols-3 gap-2">
                    <button class="px-2 py-1.5 rounded-[var(--radius)] bg-[var(--primary)]/10 text-[var(--primary)]">经典</button>
                    <button class="px-2 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">营销</button>
                    <button class="px-2 py-1.5 rounded-[var(--radius)] bg-gray-100/5 text-gray-300 hover:bg-gray-100/10">数据</button>
                </div>
            </div>
            <div>
                <p class="text-[11px] text-gray-500 mb-1">可见模块</p>
                <div class="space-y-1">
                    <label class="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" checked class="w-3 h-3 rounded border-gray-300 bg-gray-100/5"/>
                        <span>Hero 首屏</span>
                    </label>
                    <label class="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" checked class="w-3 h-3 rounded border-gray-300 bg-gray-100/5"/>
                        <span>Feature 特性</span>
                    </label>
                    <label class="flex items-center gap-2 text-gray-300">
                        <input type="checkbox" class="w-3 h-3 rounded border-gray-300 bg-gray-100/5"/>
                        <span>Blog 内容区</span>
                    </label>
                </div>
            </div>
        </div>
        <footer class="px-4 py-3 border-t border-gray-200/10 flex items-center justify-between">
            <p class="text-[11px] text-gray-500">所做修改将应用于预览区域。</p>
            <button class="px-4 py-1.5 rounded-[var(--radius)] bg-[var(--primary)] text-white text-[11px] font-semibold hover:brightness-110">
                应用
            </button>
        </footer>
    </div>
</section>`
    },
    // 反馈与状态：骨架屏
    {
        id: 'feedback2',
        cat: 'feedback',
        name: '列表骨架屏',
        html: `<section class="py-10 bg-[var(--bg)]">
    <div class="max-w-3xl mx-auto px-6 space-y-3">
        <div class="h-4 w-32 rounded-full bg-gray-100/10 animate-pulse"></div>
        <div class="space-y-2">
            <div class="h-12 rounded-[var(--radius)] bg-gray-100/5 overflow-hidden">
                <div class="h-full w-1/2 bg-gradient-to-r from-gray-800/40 via-gray-700/40 to-gray-800/40 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
            </div>
            <div class="h-12 rounded-[var(--radius)] bg-gray-100/5 overflow-hidden">
                <div class="h-full w-2/3 bg-gradient-to-r from-gray-800/40 via-gray-700/40 to-gray-800/40 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
            </div>
            <div class="h-12 rounded-[var(--radius)] bg-gray-100/5 overflow-hidden">
                <div class="h-full w-1/3 bg-gradient-to-r from-gray-800/40 via-gray-700/40 to-gray-800/40 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
            </div>
        </div>
    </div>
</section>`
    },
    // 表格增强：固定表头
    {
        id: 'tableAdv2',
        cat: 'table-advanced',
        name: '固定表头表格',
        html: `<section class="py-10 bg-gray-50/5">
    <div class="max-w-5xl mx-auto px-6 rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] text-xs overflow-hidden">
        <div class="h-8 flex items-center justify-between px-4 border-b border-gray-200/10 text-gray-400">
            <span>表格示例 · 支持固定表头与滚动内容</span>
            <span class="font-mono text-[11px] text-gray-500">ROWS: 24</span>
        </div>
        <div class="max-h-56 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-200/10">
                <thead class="sticky top-0 bg-black/60 backdrop-blur text-gray-400">
                    <tr>
                        <th class="px-4 py-2 text-left font-medium">ID</th>
                        <th class="px-4 py-2 text-left font-medium">名称</th>
                        <th class="px-4 py-2 text-left font-medium">状态</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/10 text-gray-300">
                    <tr><td class="px-4 py-2 font-mono text-[11px]">#001</td><td class="px-4 py-2">Marketing Landing</td><td class="px-4 py-2 text-emerald-400">Active</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-[11px]">#002</td><td class="px-4 py-2">Analytics Dashboard</td><td class="px-4 py-2 text-emerald-400">Active</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-[11px]">#003</td><td class="px-4 py-2">Internal Tools</td><td class="px-4 py-2 text-amber-300">Draft</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>`
    },
    // 认证与账户：权限矩阵
    {
        id: 'auth2',
        cat: 'auth',
        name: '权限矩阵表格',
        html: `<section class="py-12 bg-gray-50/5">
    <div class="max-w-4xl mx-auto px-6 text-xs">
        <h2 class="text-sm font-semibold text-[var(--text)] mb-3">角色与权限矩阵</h2>
        <div class="overflow-x-auto rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)]">
            <table class="min-w-full divide-y divide-gray-200/10">
                <thead class="bg-black/40 text-gray-400">
                    <tr>
                        <th class="px-4 py-2 text-left font-medium">模块</th>
                        <th class="px-4 py-2 text-center font-medium">Owner</th>
                        <th class="px-4 py-2 text-center font-medium">Editor</th>
                        <th class="px-4 py-2 text-center font-medium">Viewer</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/10 text-gray-300">
                    <tr>
                        <td class="px-4 py-2">项目与模板</td>
                        <td class="px-4 py-2 text-center text-emerald-400"><i class="fa-solid fa-check"></i></td>
                        <td class="px-4 py-2 text-center text-emerald-400"><i class="fa-solid fa-check"></i></td>
                        <td class="px-4 py-2 text-center text-emerald-400"><i class="fa-solid fa-eye"></i></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2">成员管理</td>
                        <td class="px-4 py-2 text-center text-emerald-400"><i class="fa-solid fa-check"></i></td>
                        <td class="px-4 py-2 text-center text-gray-600"><i class="fa-solid fa-minus"></i></td>
                        <td class="px-4 py-2 text-center text-gray-600"><i class="fa-solid fa-minus"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>`
    },
    // 媒体与预览：媒体播放器卡片
    {
        id: 'media2',
        cat: 'media',
        name: '媒体播放器卡片',
        html: `<section class="py-10 bg-[var(--bg)]">
    <div class="max-w-md mx-auto px-6 text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4 space-y-3">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-[11px] text-gray-400">播放列表 · Demo</p>
                    <p class="text-sm font-semibold text-[var(--text)]">Design System Walkthrough</p>
                </div>
                <span class="text-[11px] text-gray-500 font-mono">12:34</span>
            </div>
            <div class="h-1.5 rounded-full bg-gray-800/80 overflow-hidden">
                <div class="h-full w-2/3 bg-gradient-to-r from-[var(--primary)] to-emerald-400"></div>
            </div>
            <div class="flex items-center justify-between text-gray-300">
                <div class="flex items-center gap-3">
                    <button class="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                        <i class="fa-solid fa-play text-xs"></i>
                    </button>
                    <button class="text-[11px] text-gray-400 hover:text-[var(--text)]">上一段</button>
                    <button class="text-[11px] text-gray-400 hover:text-[var(--text)]">下一段</button>
                </div>
                <button class="text-[11px] text-gray-400 hover:text-[var(--text)]">
                    <i class="fa-solid fa-closed-captioning mr-1"></i>字幕
                </button>
            </div>
        </div>
    </div>
</section>`
    },
    // 地图与位置：门店列表 + 小地图占位
    {
        id: 'map2',
        cat: 'map',
        name: '门店列表 + 地图占位',
        html: `<section class="py-12 bg-gray-50/5">
    <div class="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1.1fr,1fr] gap-6 items-start text-xs">
        <div class="space-y-2">
            <h2 class="text-sm font-semibold text-[var(--text)] mb-1">线下体验店</h2>
            <article class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-3 flex items-center justify-between gap-3">
                <div>
                    <p class="text-xs font-semibold text-[var(--text)]">上海 · 陆家嘴</p>
                    <p class="text-[11px] text-gray-500">浦东新区世纪大道 100 号</p>
                </div>
                <span class="text-[11px] text-emerald-400">营业中</span>
            </article>
            <article class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-3 flex items-center justify-between gap-3">
                <div>
                    <p class="text-xs font-semibold text-[var(--text)]">北京 · 中关村</p>
                    <p class="text-[11px] text-gray-500">海淀区科学院南路 88 号</p>
                </div>
                <span class="text-[11px] text-gray-400">即将开业</span>
            </article>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-slate-900/80 p-3 flex items-center justify-center text-[10px] text-gray-500">
            <span>Mini map placeholder · 可接入真实地图 SDK</span>
        </div>
    </div>
</section>`
    },
    // 引导与教程：引导提示条
    {
        id: 'guide2',
        cat: 'guide',
        name: '顶部引导提示条',
        html: `<section class="py-3 bg-[var(--primary)]/10 border-b border-[var(--primary)]/30">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2 text-[var(--text)]">
            <span class="w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[11px]">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </span>
            <span>新手引导：3 步完成你的第一个页面。</span>
        </div>
        <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-[var(--primary)] text-white">开始引导</button>
            <button class="px-3 py-1.5 rounded-[var(--radius)] bg-gray-100/10 text-gray-200">稍后再说</button>
        </div>
    </div>
</section>`
    },
    // 无障碍：键盘导航提示
    {
        id: 'a11y2',
        cat: 'a11y',
        name: '键盘导航提示',
        html: `<section class="py-3 bg-black text-xs border-b border-gray-800">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-2 text-gray-300">
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-keyboard text-emerald-400"></i>
            <span>你可以使用键盘在组件间导航。</span>
        </div>
        <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">
                <span>J / K</span><span class="text-gray-500">上下移动</span>
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 font-mono text-[10px]">
                <span>Enter</span><span class="text-gray-500">选择组件</span>
            </span>
        </div>
    </div>
</section>`
    },
    // 国际化：多语言配置一览
    {
        id: 'i18n2',
        cat: 'i18n',
        name: '多语言日期与货币配置',
        html: `<section class="py-10 bg-gray-50/5">
    <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4 text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
            <p class="text-[11px] text-gray-400 mb-1">简体中文 · zh-CN</p>
            <p class="text-sm font-semibold text-[var(--text)] mb-1">2024-05-01 · ¥1,234.56</p>
            <p class="text-[11px] text-gray-500">年月日顺序，货币符号前置。</p>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
            <p class="text-[11px] text-gray-400 mb-1">English (US) · en-US</p>
            <p class="text-sm font-semibold text-[var(--text)] mb-1">May 1, 2024 · $1,234.56</p>
            <p class="text-[11px] text-gray-500">月/日/年，千分位逗号分隔。</p>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-4">
            <p class="text-[11px] text-gray-400 mb-1">Arabic · ar</p>
            <p class="text-sm font-semibold text-[var(--text)] mb-1">٢٠٢٤/٠٥/٠١ · ر.س.‏ ١٬٢٣٤٫٥٦</p>
            <p class="text-[11px] text-gray-500">可用于预览 RTL + 阿拉伯数字格式。</p>
        </div>
    </div>
</section>`
    },
    // 电商组件：购物车摘要
    {
        id: 'ecom2',
        cat: 'ecommerce',
        name: '购物车侧边栏摘要',
        html: `<section class="py-12 bg-[var(--bg)]">
    <div class="max-w-md ml-auto px-6 text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-gray-100/5 p-4 space-y-3">
            <header class="flex items-center justify-between">
                <p class="text-sm font-semibold text-[var(--text)]">购物车</p>
                <span class="text-[11px] text-gray-500">2 件商品</span>
            </header>
            <div class="space-y-2">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-xs text-[var(--text)]">Pro 主题包</p>
                        <p class="text-[11px] text-gray-500">个人授权</p>
                    </div>
                    <p class="text-xs font-semibold text-[var(--text)]">¥ 299</p>
                </div>
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-xs text-[var(--text)]">组件库扩展包</p>
                        <p class="text-[11px] text-gray-500">团队授权</p>
                    </div>
                    <p class="text-xs font-semibold text-[var(--text)]">¥ 499</p>
                </div>
            </div>
            <div class="border-t border-gray-200/10 pt-3 flex items-center justify-between">
                <p class="text-[11px] text-gray-500">合计</p>
                <p class="text-base font-bold text-[var(--text)]">¥ 798</p>
            </div>
            <button class="w-full mt-1 px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white font-semibold hover:brightness-110">
                去结算
            </button>
        </div>
    </div>
</section>`
    },
    // 高级交互组件：任务看板列占位
    {
        id: 'advanced2',
        cat: 'advanced',
        name: '任务看板列（占位）',
        html: `<section class="py-10 bg-gray-50/5">
    <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4 text-xs">
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-3 space-y-2">
            <header class="flex items-center justify-between">
                <p class="text-[11px] font-semibold text-gray-300">Backlog</p>
                <span class="text-[11px] text-gray-500">3</span>
            </header>
            <div class="space-y-2">
                <div class="rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 p-2">
                    <p class="text-[11px] text-[var(--text)]">支持自定义组件导入</p>
                </div>
                <div class="rounded-[var(--radius)] bg-gray-100/5 border border-gray-200/20 p-2">
                    <p class="text-[11px] text-[var(--text)]">添加移动端导航模板</p>
                </div>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-3 space-y-2">
            <header class="flex items-center justify-between">
                <p class="text-[11px] font-semibold text-gray-300">In Progress</p>
                <span class="text-[11px] text-gray-500">2</span>
            </header>
            <div class="space-y-2">
                <div class="rounded-[var(--radius)] bg-[var(--primary)]/10 border border-[var(--primary)]/40 p-2">
                    <p class="text-[11px] text-[var(--text)]">完善数据类组件模板</p>
                </div>
            </div>
        </div>
        <div class="rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-3 space-y-2">
            <header class="flex items-center justify-between">
                <p class="text-[11px] font-semibold text-gray-300">Done</p>
                <span class="text-[11px] text-gray-500">1</span>
            </header>
            <div class="space-y-2">
                <div class="rounded-[var(--radius)] bg-emerald-500/10 border border-emerald-500/40 p-2">
                    <p class="text-[11px] text-[var(--text)]">新增 FAQ 与表单组件</p>
                </div>
            </div>
        </div>
    </div>
</section>`
    },
    // 自定义组件：说明片段
    {
        id: 'custom2',
        cat: 'custom',
        name: '自定义框架组件说明',
        html: `<section class="py-10 bg-gray-50/5">
    <div class="max-w-4xl mx-auto px-6 rounded-[var(--radius)] border border-gray-200/20 bg-[var(--bg)] p-5 text-xs">
        <h2 class="text-sm font-semibold text-[var(--text)] mb-2">在此嵌入 React / Vue 组件</h2>
        <p class="text-[11px] text-gray-500 mb-3">如果你的项目已经使用 React、Vue 或其他前端框架，可以在这里描述组件的 Props、交互行为与状态流转，让 LLM 生成更贴近实际的实现代码。</p>
        <ul class="text-[11px] text-gray-400 space-y-1 mb-3">
            <li>• 组件名称：如 <code class="font-mono text-[11px]">AnalyticsOverviewCard</code></li>
            <li>• 输入参数：如 <code class="font-mono text-[11px]">metrics</code>、<code class="font-mono text-[11px]">timeRange</code></li>
            <li>• 交互行为：点击、悬停、拖拽等</li>
        </ul>
        <p class="text-[11px] text-gray-500">你也可以直接在 Prompt 中粘贴现有组件代码片段，本容器会在导出的 HTML 中为你预留挂载区域。</p>
    </div>
</section>`
    }
);
