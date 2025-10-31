const elements = window.elements = {
            // 主题相关（已禁用暗色）

            // 向导步骤相关
            progressBar: document.getElementById('progressBar'),
            steps: {
                step1: document.getElementById('step1'),
                step2: document.getElementById('step2'),
                step3: document.getElementById('step3'),
                step4: document.getElementById('step4')
            },
            wizardSteps: {
                step1: document.getElementById('wizardStep1'),
                // 新的 5 步结构（实时布局）
                step2: document.getElementById('wizardStep1_5'),
                step3: document.getElementById('wizardStep2'),
                step4: document.getElementById('wizardStep3'),
                step5: document.getElementById('wizardStep4')
            },
            // 分步导航已废弃（实时布局），移除相关按钮收集

            // 选择相关
            purposeCards: document.querySelectorAll('.purpose-card[data-purpose]'),
            styleCards: document.querySelectorAll('.style-card[data-style]'),
            industryTags: document.querySelectorAll('.industry-tag'),
            colorSwatches: document.querySelectorAll('.color-swatch'),
            componentTags: document.querySelectorAll('.component-tag'),
            categoryPills: document.querySelectorAll('.category-pill'),
            industriesContainer: document.getElementById('industriesContainer'),

            // 颜色相关
            customColorInput: document.getElementById('customColorInput'),
            customColorPreview: document.getElementById('customColorPreview'),
            applyCustomColor: document.getElementById('applyCustomColor'),
            colorPicker: document.getElementById('hiddenColorPicker'),
            // 自定义目的/行业/风格
            purposeCustomInput: document.getElementById('purposeCustomInput'),
            addCustomPurpose: document.getElementById('addCustomPurpose'),
            styleCustomInput: document.getElementById('styleCustomInput'),
            addCustomStyle: document.getElementById('addCustomStyle'),
            
            // 组件相关
            componentSearch: document.getElementById('componentSearch'),
            clearSearch: document.getElementById('clearSearch'),
            previewContainer: document.getElementById('previewContainer'),
            componentContainer: document.getElementById('componentContainer'),
            componentGroups: document.querySelectorAll('.component-group'),
            noResultsMessage: document.getElementById('noResultsMessage'),

            // 提示词生成相关
            generatePromptButton: document.getElementById('generatePrompt'),
            aiProgressBar: document.getElementById('aiProgressBar'),
            generatedPrompt: document.getElementById('generatedPrompt'),
            suggestionTags: document.getElementById('suggestionTags'),
            additionalDetails: document.getElementById('additionalDetails'),
            copyPromptBtn: document.getElementById('copyPromptBtn'),
            copyStatus: document.getElementById('copyStatus'),
            helpButton: document.getElementById('helpButton'),
            industryCustomInput: document.getElementById('industryCustomInput'),
            addCustomIndustry: document.getElementById('addCustomIndustry'),

            // 选择状态显示
            selectedPurpose: document.getElementById('selectedPurpose'),
            selectedIndustry: document.getElementById('selectedIndustry'),
            selectedStyle: document.getElementById('selectedStyle'),
            selectedColor: document.getElementById('selectedColor'),
            selectedComponentsCount: document.getElementById('selectedComponentsCount'),

        };
const state = window.state = {
            theme: localStorage.getItem('theme') || 'light',
            language: 'zh-CN',
            currentStep: 1,
            currentCategory: 'all', // 当前选中的组件分类
            selections: {
                purpose: '',
                purposeText: '',
                industry: '',
                industryText: '',
                style: '',
                styleText: '',
                color: '#6366F1',
                components: [],
                additionalDetails: ''
            }
        };
        function refreshDynamicElements() {
            elements.purposeCards = document.querySelectorAll('.purpose-card');
            elements.styleCards = document.querySelectorAll('.style-card');
            elements.industryTags = document.querySelectorAll('.industry-tag');
            elements.componentTags = document.querySelectorAll('.component-tag');
            elements.categoryPills = document.querySelectorAll('.category-pill');
            elements.styleCustomInput = document.getElementById('styleCustomInput');
            elements.addCustomStyle = document.getElementById('addCustomStyle');
        }
const dataRenderer = window.dataRenderer = {
            renderAll() {
                this.renderPurposes();
                this.renderIndustries();
                this.renderStyles();
                this.renderComponentCategories();
                this.renderComponents();
                refreshDynamicElements();
            },
            renderComponentCategories() {
                const wrap = document.getElementById('componentCategories') || document.querySelector('.component-categories');
                if (!wrap) return;
                wrap.innerHTML = '';
                const all = document.createElement('span');
                all.className = 'category-pill active';
                all.dataset.category = 'all';
                all.innerHTML = `<i class="fas fa-th"></i> 全部`;
                wrap.appendChild(all);
                const cats = Object.keys(window.CONFIG.components);
                cats.forEach(cat => {
                    const pill = document.createElement('span');
                    pill.className = 'category-pill';
                    pill.dataset.category = cat;
                    const ti = window.CONFIG.sectionTitles[cat] || { title: cat };
                    const icon = ti.icon ? `<i class="${ti.icon}"></i> ` : '';
                    pill.innerHTML = `${icon}${ti.title || cat}`;
                    wrap.appendChild(pill);
                });
            },
            renderPurposes() {
                const c = document.getElementById('purposesContainer');
                if (!c) return;
                c.innerHTML = '';
                c.append(
                    ...window.CONFIG.purposes.map(p => {
                        const el = document.createElement('div');
                        el.className = 'purpose-card p-4 rounded-xl bg-white shadow-sm text-center relative';
                        el.dataset.purpose = p.id;
                        el.innerHTML = `
                            <div class="h-12 flex items-center justify-center mb-3">
                                <i class="${p.icon} text-3xl ${p.color}" aria-hidden="true"></i>
                            </div>
                            <p class="font-medium">${p.name}</p>
                            <p class="text-xs text-gray-500 mt-1">${p.desc}</p>
                        `;
                        return el;
                    })
                );
                // 通知图标系统刷新（仅限目的区）
                try { document.dispatchEvent(new CustomEvent('icons:refresh', { detail: { scope: c } })); } catch(_) {}
            },
            renderIndustries() {
                const c = document.getElementById('industriesContainer');
                if (!c) return;
                c.innerHTML = '';
                c.append(
                    ...window.CONFIG.industries.map(i => {
                        const el = document.createElement('span');
                        el.className = 'industry-tag tag px-3 py-2 rounded-full cursor-pointer';
                        el.dataset.industry = i.id;
                        el.textContent = i.name;
                        try { el.setAttribute('role', 'button'); el.tabIndex = 0; } catch(_) {}
                        return el;
                    })
                );
            },
            renderStyles() {
                const c = document.getElementById('stylesContainer');
                if (!c) return;
                c.innerHTML = '';
                
                // 添加风格卡片
                c.append(
                    ...window.CONFIG.styles.map(s => {
                        const el = document.createElement('div');
                        el.className = 'style-card p-4 rounded-xl bg-white shadow-sm relative';
                        el.dataset.style = s.id;
                        el.innerHTML = `
                            <img src="${s.image}" alt="${s.name}风格" loading="lazy" class="rounded-md mb-3">
                            <p class="font-medium text-center">${s.name}</p>
                        `;
                        return el;
                    })
                );
                
                // 添加自定义风格输入框和按钮
                const customContainer = document.createElement('div');
                customContainer.className = 'col-span-full -mx-3 mt-4 mb-6 flex items-center gap-2';
                customContainer.innerHTML = `
                    <input type="text" id="styleCustomInput" class="flex-1 min-w-0 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="自定义风格，例如：赛博朋克、极简主义">
                    <button id="addCustomStyle" class="icon-button icon-button--neutral rounded-md px-3 py-2">添加</button>
                `;
                c.appendChild(customContainer);
                
                // 通知图标系统刷新（仅限风格区）
                try { document.dispatchEvent(new CustomEvent('icons:refresh', { detail: { scope: c } })); } catch(_) {}
            },
            renderComponents() {
                const c = document.getElementById('componentContainer');
                if (!c) return;
                c.innerHTML = '';
                const cats = Object.keys(window.CONFIG.components);
                cats.forEach(cat => {
                    const section = document.createElement('div');
                    section.className = 'component-section';
                    section.dataset.category = cat;
                    const ti = window.CONFIG.sectionTitles[cat] || { title: cat, icon: '' };
                    section.innerHTML = `
                        <div class="component-section-title">
                            ${ti.icon ? `<i class="${ti.icon} text-indigo-500" aria-hidden="true"></i>` : ''} ${ti.title}
                        </div>
                        <div class="component-group"></div>
                    `;
                    const group = section.querySelector('.component-group');
                    window.CONFIG.components[cat].forEach(item => {
                        const tag = document.createElement('div');
                        tag.className = 'component-tag';
                        tag.dataset.category = cat;
                        tag.innerHTML = `<span class="component-icon"><i class="${item.icon}" aria-hidden="true"></i></span> ${item.name}`;
                        group.appendChild(tag);
                    });
                    c.appendChild(section);
                });
                // 通知图标系统刷新（组件区）
                try { document.dispatchEvent(new CustomEvent('icons:refresh', { detail: { scope: c } })); } catch(_) {}
            }
        };
        function initApp() {
            // 先渲染数据，再刷新元素引用并绑定事件
            dataRenderer.renderAll();
            try { refreshDynamicElements(); } catch(_) {}
            // 只保留左右两栏可滚动，移除左栏内部局部滚动
            try {
                const pc = document.getElementById('purposesContainer');
                if (pc) {
                    pc.style.maxHeight = '';
                    pc.style.overflowY = '';
                    pc.classList.remove('custom-scrollbar');
                }
                const cc = document.getElementById('componentContainer');
                if (cc) {
                    cc.style.maxHeight = '';
                    cc.style.overflow = '';
                    cc.style.overflowY = '';
                    cc.classList.remove('max-h-96', 'overflow-y-auto', 'custom-scrollbar', 'pr-2');
                }
                const sc = document.getElementById('stylesContainer');
                if (sc) {
                    sc.style.maxHeight = '';
                    sc.style.overflow = '';
                    sc.style.overflowY = '';
                    sc.classList.remove('max-h-96', 'overflow-y-auto', 'custom-scrollbar', 'pr-2');
                }
            } catch(_) {}
            // 确保勾选标记初始为隐藏状态，保留元素供交互使用
            try {
                document.querySelectorAll('.check-mark').forEach(el => {
                    el.classList.add('opacity-0');
                    el.style.opacity = '0';
                });
            } catch(_) {}
            // 通过事件驱动，等待布局激活后再放置输出标题与按钮，避免竞态
            function ensureOutputHeaderAndButton() {
                const card = document.getElementById('outputRightCard');
                if (!card) return;
                // header
                let header = card.querySelector('h3');
                if (!header) {
                    header = document.createElement('h3');
                    header.className = 'text-lg font-medium';
                    header.textContent = '输出与优化';
                    card.prepend(header);
                }
                // wrap header & actions
                let bar = document.getElementById('outputHeaderBar');
                if (!bar) {
                    bar = document.createElement('div');
                    bar.id = 'outputHeaderBar';
                    bar.className = 'flex items-center justify-between mb-3 gap-3 flex-wrap';
                    header.parentNode.insertBefore(bar, header);
                    bar.appendChild(header);
                }
                // create the top generate button inside header bar
                let topBtn = document.getElementById('generatePromptTop');
                if (!topBtn) {
                    topBtn = document.createElement('button');
                    topBtn.id = 'generatePromptTop';
                    topBtn.className = 'btn btn-primary btn-sm flex items-center justify-center';
                    topBtn.innerHTML = '<span class="button-text">生成提示词</span> <span class="loading-spinner hidden ml-2"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i></span>';
                    bar.appendChild(topBtn);
                }
                if (!topBtn._bound) {
                    topBtn.addEventListener('click', () => {
                        try {
                            if (window.promptManager && !window.promptManager.isGenerating) window.promptManager.generatePrompt();
                        } catch (_) {}
                    });
                    topBtn._bound = true;
                }
                // 可选：隐藏底部按钮区域（保持单一主按钮）
                const bottomBtn = document.getElementById('generatePrompt');
                if (bottomBtn) {
                    try {
                        const wrap = bottomBtn.closest('div.flex.justify-end');
                        if (wrap) wrap.style.display = 'none';
                    } catch (_) {}
                }
                // 已取消相关模块的注入（不再需要）
                // 通知图标系统刷新（顶部按钮里的 spinner 等）
                try { document.dispatchEvent(new CustomEvent('icons:refresh', { detail: { scope: card } })); } catch(_) {}
            }
            document.addEventListener('layout:activated', ensureOutputHeaderAndButton, { once: true });
            // 简化主题初始化：强制亮色主题
            try { document.documentElement.classList.remove('dark'); } catch(_) {}
            try { localStorage.setItem('theme', 'light'); } catch(_) {}
            try { state.theme = 'light'; } catch(_) {}
            // 移除页脚（应用户要求），以释放更多垂直空间
            try { const f = document.getElementById('pageFooter'); if (f) f.remove(); } catch(_) {}

            // 初始化模块（直接使用 window.* 避免全局别名）
            try { window.helpManager?.init(); } catch(_) {}
            try { window.wizardManager?.init(); } catch(_) {}
            try { window.componentManager?.init(); } catch(_) {}
            try { window.selectionManager?.init(); } catch(_) {}
            // 不再初始化已移除的相关模块
            try { window.promptManager?.init(); } catch(_) {}
            try { window.openAISettingsManager?.init(); } catch(_) {} // 设置管理器初始化
            try { window.shareManager?.init(); } catch(_) {}
            // Apply config from URL after everything bound
            try { window.stateManager?.applyUrlConfig(); } catch(_) {}
            // 动态计算左右栏可视高度（桌面）
            try {
                const left = document.querySelector('.left-pane');
                const right = document.querySelector('.right-pane');
                const compute = () => {
                    const header = document.getElementById('pageHeader');
                    const footer = document.getElementById('pageFooter');
                    if (window.innerWidth < 1024) {
                        if (left) left.style.height = '';
                        if (right) right.style.height = '';
                        document.documentElement.style.overflow = 'auto';
                        document.body.style.overflow = 'auto';
                        return;
                    }
                    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
                    const footerH = footer ? footer.getBoundingClientRect().height : 0;
                    const gap = 24 + (footer ? 24 : 0);
                    let h = window.innerHeight - headerBottom - footerH - gap;
                    if (!Number.isFinite(h) || h < 240) h = Math.max(240, window.innerHeight - 220);
                    if (left) { left.style.height = h + 'px'; left.style.overflowY = 'auto'; }
                    if (right) { right.style.height = h + 'px'; right.style.overflowY = 'auto'; }
                    document.documentElement.style.overflow = 'hidden';
                    document.body.style.overflow = 'hidden';
                };
                compute();
                window.addEventListener('resize', compute);
                window.addEventListener('orientationchange', compute);
            } catch(_) {}
        }
        document.addEventListener('DOMContentLoaded', function () {
            // 页面DOM完全加载后执行的代码
            if (!window.promptGeneratorInitialized) {
                window.promptGeneratorInitialized = true;
                initApp();
            }
        });
