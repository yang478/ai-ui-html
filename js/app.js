        /**
         * ExoCode V9 Core Logic
         * - State Management
         * - Virtual DOM Simulation
         * - Uses external component library (ExoLibrary)
         */

        const DB = {
            purposes: [
                { id: 'saas', name: 'SaaS Dashboard', icon: 'fa-chart-simple', desc: '数据面板与管理后台' },
                { id: 'landing', name: 'Landing Page', icon: 'fa-rocket', desc: '高转化率营销落地页' },
                { id: 'ecommerce', name: 'E-Commerce', icon: 'fa-bag-shopping', desc: '在线商城与商品展示' },
                { id: 'blog', name: 'Content Blog', icon: 'fa-feather-pointed', desc: '沉浸式阅读体验' },
                { id: 'portfolio', name: 'Portfolio', icon: 'fa-user-astronaut', desc: '个人作品集与简历' },
                { id: 'app', name: 'Mobile Web App', icon: 'fa-mobile-screen', desc: '移动端优先应用' }
            ],
            styles: [
                { id: 'modern', name: 'Modern Clean', color: '#6366f1', radius: 8, font: 'sans', bg: '#ffffff', text: '#0f172a' },
                { id: 'dark', name: 'Cyber Dark', color: '#a855f7', radius: 4, font: 'mono', bg: '#09090b', text: '#e4e4e7' },
                { id: 'minimal', name: 'Swiss Minimal', color: '#18181b', radius: 0, font: 'sans', bg: '#fafaf9', text: '#1c1917' },
                { id: 'corporate', name: 'Enterprise Blue', color: '#2563eb', radius: 6, font: 'sans', bg: '#f8fafc', text: '#1e293b' }
            ],
            // 使用全局组件库
            library: window.ExoLibrary || { cats: {}, items: [] }
        };

        const App = {
            State: {
                data: {
                    purpose: 'saas',
                    context: '',
                    style: 'modern',
                    tokens: { primary: '#6366f1', radius: 8, font: 'sans' },
                    components: [] 
                },
                customStorageKey: 'exocode-custom-config-v1',
                custom: {
                    purposes: [],
                    styles: []
                },
                
                init() {
                    this.loadCustom();
                    this.renderPurposeGrid();
                    this.renderStyleGrid();
                    this.selectPurpose('saas');
                    this.selectStyle('modern');
                    if (App.Prompt) App.Prompt.compile();
                },

                selectPurpose(id) {
                    this.data.purpose = id;
                    // Update UI
                    document.querySelectorAll('.purpose-card').forEach(el => {
                        if(el.dataset.id === id) {
                            el.classList.add('ring-2', 'ring-indigo-500', 'bg-gray-800');
                        } else {
                            el.classList.remove('ring-2', 'ring-indigo-500', 'bg-gray-800');
                        }
                    });
                    if (App.Prompt) App.Prompt.compile();
                },

                selectStyle(id) {
                    this.data.style = id;
                    const s = this.getAllStyles().find(x => x.id === id);
                    if (!s) return;
                    this.data.tokens.primary = s.color;
                    this.data.tokens.radius = s.radius;
                    this.data.tokens.font = s.font;
                    
                    // Update UI Controls
                    document.getElementById('picker-color').value = s.color;
                    document.getElementById('val-color').innerText = s.color;
                    document.getElementById('range-radius').value = s.radius;
                    document.getElementById('val-radius').innerText = s.radius + 'px';
                    document.getElementById('sel-font').value = s.font;

                    // Highlight Card
                    document.querySelectorAll('.style-card').forEach(el => {
                        if(el.dataset.id === id) el.classList.add('card-selected');
                        else el.classList.remove('card-selected');
                    });

                    App.Engine.updateLivePreview();
                    if (App.Prompt) App.Prompt.compile();
                },

                updateToken(key, val) {
                    this.data.tokens[key] = val;
                    if(key === 'primary') document.getElementById('val-color').innerText = val;
                    if(key === 'radius') document.getElementById('val-radius').innerText = val + 'px';
                    App.Engine.updateLivePreview();
                    if (App.Prompt) App.Prompt.compile();
                },

                setContext(txt) { 
                    this.data.context = txt; 
                    if (App.Prompt) App.Prompt.compile();
                },
                resetStyle() { this.selectStyle('modern'); },

                addComponent(id) {
                    const item = DB.library.items.find(x => x.id === id);
                    if(!item) return;
                    this.data.components.push({ ...item, uid: Date.now() + Math.random() });
                    this.renderComponentList();
                    App.Engine.updateLivePreview();
                    if (App.Prompt) App.Prompt.compile();
                    App.Modal.close('library');
                },

                removeComponent(uid) {
                    this.data.components = this.data.components.filter(c => c.uid !== uid);
                    this.renderComponentList();
                    App.Engine.updateLivePreview();
                    if (App.Prompt) App.Prompt.compile();
                },

                getAllPurposes() {
                    return [...DB.purposes, ...this.custom.purposes];
                },

                getAllStyles() {
                    return [...DB.styles, ...this.custom.styles];
                },

                loadCustom() {
                    try {
                        const raw = localStorage.getItem(this.customStorageKey);
                        if (!raw) return;
                        const saved = JSON.parse(raw);
                        if (saved.purposes && Array.isArray(saved.purposes)) {
                            this.custom.purposes = saved.purposes;
                        }
                        if (saved.styles && Array.isArray(saved.styles)) {
                            this.custom.styles = saved.styles;
                        }
                    } catch (e) {
                        // ignore
                    }
                },

                persistCustom() {
                    try {
                        localStorage.setItem(this.customStorageKey, JSON.stringify(this.custom));
                    } catch (e) {
                        // ignore
                    }
                },

                openCustomPurposeModal() {
                    // inline 编辑模式：将"自定义项目类型"卡片变成输入状态
                    this.editingCustomPurpose = true;
                    this.renderPurposeGrid();
                },

                saveCustomPurpose() {
                    const nameEl = document.getElementById('inline-purpose-name');
                    if (!nameEl) return;
                    const name = nameEl.value.trim();
                    if (!name) {
                        alert('请填写项目类型名称');
                        return;
                    }
                    const id = `custom-purpose-${Date.now().toString(36)}`;

                    this.custom.purposes.push({
                        id,
                        name,
                        icon: 'fa-wand-magic-sparkles',
                        desc: '自定义业务类型'
                    });
                    this.persistCustom();
                    this.editingCustomPurpose = false;
                    this.renderPurposeGrid();
                    this.selectPurpose(id);
                },

                cancelCustomPurpose() {
                    this.editingCustomPurpose = false;
                    this.renderPurposeGrid();
                },

                openCustomStyleModal() {
                    // inline 编辑模式：基于当前 Design Tokens 保存为预设
                    this.editingCustomStyle = true;
                    this.renderStyleGrid();
                },

                saveCustomStyle() {
                    const nameEl = document.getElementById('inline-style-name');
                    if (!nameEl) return;
                    const name = nameEl.value.trim();
                    if (!name) {
                        alert('请填写风格名称');
                        return;
                    }

                    const s = this.data;
                    const radius = s.tokens.radius;
                    const font = s.tokens.font;

                    // 根据当前选中的基础风格推导明暗
                    const baseStyle = DB.styles.find(x => x.id === this.data.style) || DB.styles[0];
                    const isDark = baseStyle && (baseStyle.bg === '#09090b' || baseStyle.text === '#e4e4e7');

                    let bg = '#ffffff';
                    let text = '#0f172a';
                    if (isDark) {
                        bg = '#09090b';
                        text = '#e4e4e7';
                    }

                    const id = `custom-style-${Date.now().toString(36)}`;

                    this.custom.styles.push({
                        id,
                        name,
                        color: s.tokens.primary,
                        radius,
                        font,
                        bg,
                        text
                    });
                    this.persistCustom();
                    this.editingCustomStyle = false;
                    this.renderStyleGrid();
                    this.selectStyle(id);
                },

                cancelCustomStyle() {
                    this.editingCustomStyle = false;
                    this.renderStyleGrid();
                },

                deleteCustomPurpose(id) {
                    const before = this.custom.purposes.length;
                    this.custom.purposes = this.custom.purposes.filter(p => p.id !== id);
                    if (this.custom.purposes.length === before) return;
                    this.persistCustom();
                    if (this.data.purpose === id) {
                        this.data.purpose = (DB.purposes[0] && DB.purposes[0].id) || 'saas';
                    }
                    this.renderPurposeGrid();
                    if (App.Prompt) App.Prompt.compile();
                },

                deleteCustomStyle(id) {
                    const before = this.custom.styles.length;
                    this.custom.styles = this.custom.styles.filter(s => s.id !== id);
                    if (this.custom.styles.length === before) return;
                    this.persistCustom();
                    if (this.data.style === id) {
                        this.selectStyle((DB.styles[0] && DB.styles[0].id) || 'modern');
                    }
                    this.renderStyleGrid();
                    if (App.Prompt) App.Prompt.compile();
                },

                renderPurposeGrid() {
                    const el = document.getElementById('purpose-grid');
                    const all = this.getAllPurposes();

                    const cards = all.map(p => {
                        const isCustom = typeof p.id === 'string' && p.id.indexOf('custom-purpose-') === 0;
                        return `
                        <div onclick="App.State.selectPurpose('${p.id}')" data-id="${p.id}" class="purpose-card p-3 bg-white/5 border border-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <i class="fa-solid ${p.icon} text-gray-300 mb-2"></i>
                                    <div class="font-bold text-xs text-white">${p.name}</div>
                                </div>
                                ${isCustom ? `<button onclick="event.stopPropagation(); App.State.deleteCustomPurpose('${p.id}')" class="text-[10px] text-gray-500 hover:text-red-400"><i class="fa-solid fa-trash"></i></button>` : ''}
                            </div>
                            <div class="text-[10px] text-gray-500 leading-tight mt-1">${p.desc}</div>
                        </div>
                    `;
                    }).join('');

                    const customCard = this.editingCustomPurpose ? `
                        <div class="p-3 border-2 border-dashed border-indigo-500/60 rounded-lg bg-indigo-500/10 flex flex-col gap-2">
                            <div class="text-[11px] font-bold text-indigo-300 flex items-center gap-2">
                                <i class="fa-solid fa-pen"></i>
                                <span>新建自定义项目类型</span>
                            </div>
                            <input id="inline-purpose-name" type="text" class="input-field rounded p-2 text-xs" placeholder="例如：会员运营中台 / 数据分析工作台" onkeydown="if(event.key==='Enter'){App.State.saveCustomPurpose()} if(event.key==='Escape'){App.State.cancelCustomPurpose()}">
                            <div class="flex justify-end gap-2 pt-1">
                                <button onclick="App.State.cancelCustomPurpose()" class="px-2 py-1 text-[10px] rounded bg-white/5 text-gray-300 hover:bg-white/10 transition">取消</button>
                                <button onclick="App.State.saveCustomPurpose()" class="px-3 py-1 text-[10px] rounded bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition">保存</button>
                            </div>
                        </div>
                    ` : `
                        <div onclick="App.State.openCustomPurposeModal()" class="p-3 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-white/30 hover:bg-white/5 flex flex-col items-start justify-center gap-1">
                            <div class="flex items-center gap-2 text-xs font-bold text-gray-300">
                                <i class="fa-solid fa-plus text-indigo-400"></i>
                                <span>自定义项目类型</span>
                            </div>
                            <div class="text-[10px] text-gray-500">为你的业务创建专属模板</div>
                        </div>
                    `;

                    el.innerHTML = cards + customCard;
                },

                renderStyleGrid() {
                    const el = document.getElementById('style-grid');
                    const all = this.getAllStyles();

                    const cards = all.map(s => {
                        const isCustom = typeof s.id === 'string' && s.id.indexOf('custom-style-') === 0;
                        return `
                        <div onclick="App.State.selectStyle('${s.id}')" data-id="${s.id}" class="style-card relative p-3 bg-white/5 border border-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all overflow-hidden">
                            <div class="absolute right-0 top-0 w-6 h-6 rounded-bl-lg" style="background:${s.color}; opacity:0.5"></div>
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <div class="font-bold text-xs text-white mb-1">${s.name}</div>
                                    <div class="flex gap-1 text-[10px] text-gray-500 font-mono">
                                        <span>${s.font}</span>
                                        <span>•</span>
                                        <span>R:${s.radius}</span>
                                    </div>
                                </div>
                                ${isCustom ? `<button onclick="event.stopPropagation(); App.State.deleteCustomStyle('${s.id}')" class="text-[10px] text-gray-500 hover:text-red-400"><i class="fa-solid fa-trash"></i></button>` : ''}
                            </div>
                        </div>
                    `;
                    }).join('');

                    const customCard = this.editingCustomStyle ? `
                        <div class="p-3 border-2 border-dashed border-indigo-500/60 rounded-lg bg-indigo-500/10 flex flex-col gap-2">
                            <div class="text-[11px] font-bold text-indigo-300 flex items-center gap-2">
                                <i class="fa-solid fa-pen"></i>
                                <span>将当前配置保存为风格预设</span>
                            </div>
                            <input id="inline-style-name" type="text" class="input-field rounded p-2 text-xs" placeholder="例如：霓虹科技感 / 极简黑白" onkeydown="if(event.key==='Enter'){App.State.saveCustomStyle()} if(event.key==='Escape'){App.State.cancelCustomStyle()}">
                            <p class="text-[10px] text-gray-500 leading-snug">预设会使用当前的主色、圆角与字体配置。</p>
                            <div class="flex justify-end gap-2 pt-1">
                                <button onclick="App.State.cancelCustomStyle()" class="px-2 py-1 text-[10px] rounded bg-white/5 text-gray-300 hover:bg-white/10 transition">取消</button>
                                <button onclick="App.State.saveCustomStyle()" class="px-3 py-1 text-[10px] rounded bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition">保存</button>
                            </div>
                        </div>
                    ` : `
                        <div onclick="App.State.openCustomStyleModal()" class="p-3 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-white/30 hover:bg-white/5 flex flex-col items-start justify-center gap-1">
                            <div class="flex items-center gap-2 text-xs font-bold text-gray-300">
                                <i class="fa-solid fa-plus text-indigo-400"></i>
                                <span>自定义视觉风格</span>
                            </div>
                            <div class="text-[10px] text-gray-500">设置专属主色、圆角与字体</div>
                        </div>
                    `;

                    el.innerHTML = cards + customCard;
                },

                renderComponentList() {
                    const list = document.getElementById('component-list');
                    const count = document.getElementById('comp-count');
                    count.innerText = `${this.data.components.length} items`;
                    
                    if(this.data.components.length === 0) {
                        list.innerHTML = `<div class="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 gap-2 hover:border-white/20 transition-colors cursor-pointer" onclick="App.Modal.open('library')"><i class="fa-solid fa-plus-circle text-2xl opacity-50"></i><span class="text-xs">点击添加组件</span></div>`;
                        return;
                    }

                    list.innerHTML = this.data.components.map((c, i) => `
                        <div class="group flex items-center justify-between p-3 bg-[#1c1c1f] border border-white/5 rounded-md animate-slide-up" style="animation-delay: ${i*50}ms">
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded bg-black/30 text-[10px] flex items-center justify-center text-gray-500 font-mono">${i+1}</div>
                                <div>
                                    <div class="text-xs font-bold text-gray-300">${c.name}</div>
                                    <div class="text-[9px] text-gray-600 uppercase tracking-wider">${DB.library.cats[c.cat]}</div>
                                </div>
                            </div>
                            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onclick="App.State.removeComponent(${c.uid})" class="text-gray-500 hover:text-red-400 transition"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    `).join('');
                    
                    // Scroll to bottom
                    list.scrollTop = list.scrollHeight;
                }
            },

            UI: {
                setStep(n) {
                    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
                    document.getElementById(`step-${n}`).classList.add('active');
                    
                    for(let i=1; i<=3; i++) {
                        const btn = document.getElementById(`step-btn-${i}`);
                        if(i === n) {
                            btn.className = "flex-1 py-2 text-xs font-bold rounded shadow-sm transition-all flex items-center justify-center gap-2 bg-gray-800 text-white border border-white/10";
                        } else {
                            btn.className = "flex-1 py-2 text-xs font-bold rounded text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2 hover:bg-white/5";
                        }
                    }
                }
            },

            Modal: {
                open(id) {
                    if(id === 'library') App.Library.init();
                    if(id === 'code') App.Utils.renderCodeView();
                    if(id === 'settings' && App.Settings && App.Settings.renderForm) App.Settings.renderForm();
                    
                    const el = document.getElementById('modal-'+id);
                    const content = document.getElementById('modal-'+id+'-content');
                    
                    el.classList.remove('hidden');
                    // Small delay for transition
                    setTimeout(() => {
                        content.classList.remove('scale-95', 'opacity-0');
                    }, 10);
                },
                close(id) {
                    const el = document.getElementById('modal-'+id);
                    const content = document.getElementById('modal-'+id+'-content');
                    content.classList.add('scale-95', 'opacity-0');
                    setTimeout(() => el.classList.add('hidden'), 300);
                }
            },

            Settings: {
                storageKey: 'exocode-ai-settings-v1',
                data: {
                    activeProvider: 'openai',
                    autoFix: true,
                    providers: {
                        openai: {
                            id: 'openai',
                            label: 'OpenAI',
                            baseUrl: 'https://api.openai.com/v1',
                            apiKey: '',
                            model: 'gpt-4.1-mini',
                            temperature: 0.7,
                            maxContextTokens: 4096,
                            systemPrompt: 'You are an expert Frontend Architect. Build a single-file HTML5 application.'
                        },
                        anthropic: {
                            id: 'anthropic',
                            label: 'Anthropic',
                            baseUrl: 'https://api.anthropic.com',
                            apiKey: '',
                            model: 'claude-3-5-sonnet-latest',
                            temperature: 0.7,
                            maxContextTokens: 4096,
                            systemPrompt: 'You are an expert Frontend Architect. Build a single-file HTML5 application.'
                        },
                        ollama: {
                            id: 'ollama',
                            label: 'Ollama',
                            baseUrl: 'http://localhost:11434',
                            apiKey: '',
                            model: 'qwen2.5-coder:latest',
                            temperature: 0.3,
                            maxContextTokens: 4096,
                            systemPrompt: 'You are an expert Frontend Architect working with a local model.'
                        }
                    }
                },

                init() {
                    // 尝试从本地恢复配置
                    try {
                        const raw = localStorage.getItem(this.storageKey);
                        if (raw) {
                            const saved = JSON.parse(raw);
                            this.data = {
                                ...this.data,
                                ...saved,
                                providers: {
                                    ...this.data.providers,
                                    ...(saved.providers || {})
                                }
                            };
                        }
                    } catch (e) {
                        // ignore parse errors
                    }

                    const providerSelect = document.getElementById('ai-provider');
                    if (providerSelect) {
                        providerSelect.addEventListener('change', (ev) => {
                            const id = ev.target.value;
                            if (this.data.providers[id]) {
                                this.data.activeProvider = id;
                                this.renderForm();
                                this.persist();
                            }
                        });
                    }

                    const tempInput = document.getElementById('ai-temperature');
                    if (tempInput) {
                        tempInput.addEventListener('input', (ev) => {
                            const span = document.getElementById('ai-temperature-display');
                            if (span) span.innerText = ev.target.value;
                        });
                    }

                    const autoFixCheckbox = document.getElementById('ai-auto-fix');
                    if (autoFixCheckbox) {
                        autoFixCheckbox.addEventListener('change', (ev) => {
                            this.data.autoFix = !!ev.target.checked;
                            this.persist();
                        });
                    }

                    this.renderForm();
                },

                renderForm() {
                    const cfg = this.getActiveConfig();
                    if (!cfg) return;

                    const providerSelect = document.getElementById('ai-provider');
                    if (providerSelect) providerSelect.value = this.data.activeProvider;

                    const baseUrl = document.getElementById('ai-base-url');
                    if (baseUrl) baseUrl.value = cfg.baseUrl || '';

                    const apiKey = document.getElementById('ai-api-key');
                    if (apiKey) apiKey.value = cfg.apiKey || '';

                    const model = document.getElementById('ai-model');
                    if (model) model.value = cfg.model || '';

                    const temp = document.getElementById('ai-temperature');
                    const tempDisplay = document.getElementById('ai-temperature-display');
                    if (temp) {
                        const tVal = typeof cfg.temperature === 'number' ? cfg.temperature : 0.7;
                        temp.value = String(tVal);
                        if (tempDisplay) tempDisplay.innerText = String(tVal);
                    }

                    const ctx = document.getElementById('ai-max-context');
                    if (ctx) ctx.value = cfg.maxContextTokens != null ? String(cfg.maxContextTokens) : '';

                    const sys = document.getElementById('ai-system-prompt');
                    if (sys) sys.value = cfg.systemPrompt || '';

                    const autoFixCheckbox = document.getElementById('ai-auto-fix');
                    if (autoFixCheckbox) autoFixCheckbox.checked = !!this.data.autoFix;
                },

                save() {
                    const cfg = this.getActiveConfig();
                    if (!cfg) return;

                    const baseUrl = document.getElementById('ai-base-url');
                    const apiKey = document.getElementById('ai-api-key');
                    const model = document.getElementById('ai-model');
                    const temp = document.getElementById('ai-temperature');
                    const ctx = document.getElementById('ai-max-context');
                    const sys = document.getElementById('ai-system-prompt');

                    if (baseUrl) cfg.baseUrl = baseUrl.value.trim();
                    if (apiKey) cfg.apiKey = apiKey.value.trim();
                    if (model) cfg.model = model.value.trim();
                    if (temp) {
                        const parsed = parseFloat(temp.value);
                        if (!Number.isNaN(parsed)) cfg.temperature = parsed;
                    }
                    if (ctx) {
                        const parsedCtx = parseInt(ctx.value, 10);
                        if (!Number.isNaN(parsedCtx)) cfg.maxContextTokens = parsedCtx;
                    }
                    if (sys) cfg.systemPrompt = sys.value.trim();

                    this.persist();
                    if (App.Prompt && App.Prompt.compile) App.Prompt.compile();
                    App.Modal.close('settings');
                    alert('AI 设置已保存（仅保存在本地浏览器）');
                },

                persist() {
                    try {
                        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
                    } catch (e) {
                        // ignore quota errors
                    }
                },

                getActiveConfig() {
                    return this.data.providers[this.data.activeProvider];
                },

                getSystemPrompt() {
                    const cfg = this.getActiveConfig();
                    if (cfg && cfg.systemPrompt && cfg.systemPrompt.trim()) {
                        return cfg.systemPrompt.trim();
                    }
                    return 'You are an expert Frontend Architect. Build a single-file HTML5 application.';
                }
            },

            Library: {
                init() {
                    const cats = document.getElementById('lib-categories');
                    cats.innerHTML = `<button onclick="App.Library.filter('all')" class="w-full text-left px-3 py-2 text-xs text-white bg-indigo-600 rounded font-bold mb-2">全部组件</button>`;
                    Object.entries(DB.library.cats).forEach(([k, v]) => {
                        cats.innerHTML += `<button onclick="App.Library.filter('${k}')" class="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded transition mb-0.5">${v}</button>`;
                    });
                    this.filter('all');
                },
                filter(key) {
                    const grid = document.getElementById('lib-grid');
                    const items = key === 'all' ? DB.library.items : DB.library.items.filter(x => x.cat === key);
                    
                    grid.innerHTML = items.map(item => `
                        <div onclick="App.State.addComponent('${item.id}')" class="group bg-[#1c1c1f] border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all relative h-32 flex flex-col">
                            <div class="flex-1 bg-[#111] flex items-center justify-center relative overflow-hidden">
                                <span class="text-[10px] text-gray-600 font-mono z-10">< ${item.cat.toUpperCase()} /></span>
                                <div class="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div class="p-3 bg-[#1c1c1f] border-t border-white/5 flex justify-between items-center">
                                <span class="text-xs font-bold text-gray-300">${item.name}</span>
                                <i class="fa-solid fa-plus text-indigo-500 opacity-0 group-hover:opacity-100 transition-transform group-hover:rotate-90"></i>
                            </div>
                        </div>
                    `).join('');
                },
                search(q) {
                    if(!q) return this.filter('all');
                    const items = DB.library.items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
                    const grid = document.getElementById('lib-grid');
                    grid.innerHTML = items.map(item => `
                        <div onclick="App.State.addComponent('${item.id}')" class="bg-[#1c1c1f] border border-white/5 rounded-lg p-4 cursor-pointer hover:border-indigo-500">
                            <h4 class="text-sm font-bold text-white">${item.name}</h4>
                        </div>
                    `).join('');
                }
            },

            Prompt: {
                data: {
                    refinements: [],
                    iterations: [],
                    isRunning: false,
                    versions: [],
                    activeVersionIndex: 0
                },

                toggleDock() {
                    const dock = document.getElementById('prompt-dock');
                    const arrow = document.getElementById('dock-arrow');
                    if (!dock || !arrow) return;
                    const collapsedClass = 'translate-y-[calc(100%-48px)]';
                    const isCollapsed = dock.classList.contains(collapsedClass);
                    if (isCollapsed) {
                        dock.classList.remove(collapsedClass);
                        arrow.classList.add('rotate-180');
                    } else {
                        dock.classList.add(collapsedClass);
                        arrow.classList.remove('rotate-180');
                    }
                },

                addRefinement() {
                    const input = document.getElementById('refine-input');
                    if (!input) return;
                    const val = input.value.trim();
                    if (!val) return;
                    this.data.refinements.push(val);
                    input.value = '';
                    this.compile();
                    const dock = document.getElementById('prompt-dock');
                    const arrow = document.getElementById('dock-arrow');
                    if (dock && arrow) {
                        dock.classList.remove('translate-y-[calc(100%-48px)]');
                        arrow.classList.add('rotate-180');
                    }
                },

                sendIteration() {
                    const input = document.getElementById('prompt-iteration-input');
                    if (!input) return;
                    const val = input.value.trim();
                    if (!val) return;
                    if (!this.data.iterations) this.data.iterations = [];
                    this.data.iterations.push({
                        role: 'user',
                        content: val,
                        ts: Date.now()
                    });
                    input.value = '';
                    this.renderIterationLog();
                    this.run();
                },

                renderIterationLog() {
                    const logEl = document.getElementById('prompt-iteration-log');
                    if (!logEl) return;
                    if (!this.data.iterations || !this.data.iterations.length) {
                        logEl.innerHTML = '<div class="text-[10px] text-gray-500">暂无对话，先在上方生成 Prompt，或直接输入本轮优化说明。</div>';
                        return;
                    }
                    logEl.innerHTML = this.data.iterations.map(msg => {
                        const role = msg.role === 'assistant' ? 'LLM' : 'You';
                        const colorClass = msg.role === 'assistant'
                            ? 'bg-indigo-500/10 border-indigo-500/40'
                            : 'bg-white/5 border-white/10';
                        return `<div class="px-2 py-1 rounded ${colorClass} text-[10px] text-gray-300"><span class="text-[9px] text-gray-500 mr-1">${role}:</span>${msg.content}</div>`;
                    }).join('');
                    logEl.scrollTop = logEl.scrollHeight;
                },

                updateIterationStatus() {
                    const el = document.getElementById('prompt-iteration-status');
                    if (!el) return;

                    if (this.data.isRunning) {
                        el.className = 'text-[10px] text-indigo-400';
                        el.innerText = 'Calling LLM...';
                        return;
                    }

                    if (!App.Settings || !App.Settings.getActiveConfig) {
                        el.className = 'text-[10px] text-gray-600';
                        el.innerText = 'No LLM configured';
                        return;
                    }

                    const cfg = App.Settings.getActiveConfig();
                    const providerId = App.Settings.data && App.Settings.data.activeProvider;
                    if (!cfg) {
                        el.className = 'text-[10px] text-gray-600';
                        el.innerText = 'No LLM configured';
                        return;
                    }

                    if (providerId === 'ollama') {
                        el.className = 'text-[10px] text-emerald-400';
                        el.innerText = '本地模型已配置（Ollama）';
                    } else if (cfg.apiKey && cfg.apiKey.trim()) {
                        el.className = 'text-[10px] text-emerald-400';
                        el.innerText = `${cfg.label || 'LLM'} 已配置`;
                    } else {
                        el.className = 'text-[10px] text-amber-500';
                        el.innerText = '未填写 API Key，将使用当前 Base URL';
                    }
                },

                renderVersionOptions() {
                    const select = document.getElementById('prompt-version-select');
                    if (!select) return;
                    const versions = this.data.versions || [];
                    if (!versions.length) {
                        select.innerHTML = '<option value="0">Base</option>';
                        select.value = '0';
                        return;
                    }
                    select.innerHTML = versions.map((v, i) => {
                        const label = v.label || (i === 0 ? 'Base' : `v${i}`);
                        return `<option value="${i}">${label}</option>`;
                    }).join('');
                    const idx = this.data.activeVersionIndex || 0;
                    select.value = String(idx);
                },

                switchVersion(idxStr) {
                    const idx = parseInt(idxStr, 10);
                    if (Number.isNaN(idx)) return;
                    if (!this.data.versions || !this.data.versions[idx]) return;
                    this.data.activeVersionIndex = idx;
                    const promptOutput = document.getElementById('prompt-output');
                    if (promptOutput) {
                        promptOutput.value = this.data.versions[idx].text || '';
                    }
                    this.renderVersionOptions();
                },

                upsertBaseVersion(text) {
                    if (!this.data.versions || !Array.isArray(this.data.versions)) {
                        this.data.versions = [];
                    }
                    const ts = Date.now();
                    if (!this.data.versions.length) {
                        this.data.versions.push({
                            id: 'base',
                            label: 'Base',
                            text,
                            ts
                        });
                    } else {
                        this.data.versions[0].text = text;
                        this.data.versions[0].ts = ts;
                    }
                    if (this.data.activeVersionIndex == null) {
                        this.data.activeVersionIndex = 0;
                    }
                },

                addRefinedVersion(text) {
                    if (!this.data.versions || !Array.isArray(this.data.versions)) {
                        this.data.versions = [];
                    }
                    const ts = Date.now();
                    const index = this.data.versions.length;
                    const label = `v1.${index}`;
                    this.data.versions.push({
                        id: `ref-${ts}`,
                        label,
                        text,
                        ts
                    });
                    this.data.activeVersionIndex = index;
                },

                compile() {
                    const s = App.State.data;
                    const styleDef = DB.styles.find(x => x.id === s.style) || {};
                    const purposeDef = DB.purposes.find(p => p.id === s.purpose) || { name: s.purpose };

                    const prevBase = document.getElementById('prev-base');
                    const prevContext = document.getElementById('prev-context');
                    const refList = document.getElementById('refinement-list');
                    const promptOutput = document.getElementById('prompt-output');
                    const status = document.getElementById('prompt-status');

                    if (!prevBase || !prevContext || !refList || !promptOutput || !status) return;

                    prevBase.innerText = `Template: ${purposeDef.name}, Style: ${styleDef.name || s.style}`;
                    prevContext.innerText = s.context || 'No context provided';

                    refList.innerHTML = this.data.refinements.map(r => (
                        `<div class="p-2 bg-red-500/10 border border-red-500/30 rounded text-[10px] text-gray-300">Refine: "${r}"</div>`
                    )).join('');

                    const settings = App.Settings && App.Settings.getSystemPrompt ? App.Settings : null;
                    const systemPrompt = settings ? App.Settings.getSystemPrompt() : 'You are an expert Frontend Architect. Build a single-file HTML5 application.';

                    let p = systemPrompt + '\n\n';

                    p += '### 1. DESIGN SYSTEM\n';
                    p += `- Project Type: ${purposeDef.name} (${s.purpose})\n`;
                    p += `- Visual Style Preset: ${styleDef.name || s.style}\n`;
                    p += `- Primary Color: ${s.tokens.primary}\n`;
                    p += `- Border Radius: ${s.tokens.radius}px\n`;
                    p += `- Font: ${s.tokens.font}\n`;
                    p += '- CSS Framework: Tailwind CSS via CDN\n\n';

                    p += '### 2. CONTEXT\n';
                    p += (s.context || 'Generic application; you decide suitable copy and content.') + '\n\n';

                    if (this.data.refinements.length) {
                        p += '### 3. REFINEMENTS\n';
                        this.data.refinements.forEach(r => {
                            p += `- ${r}\n`;
                        });
                        p += '\n';
                    }

                    p += '### 4. STRUCTURE (ORDERED SECTIONS)\n';
                    if (s.components.length) {
                        s.components.forEach((c, i) => {
                            const catName = DB.library.cats[c.cat] || c.cat;
                            p += `${i + 1}. ${c.name} (${catName})\n`;
                        });
                    } else {
                        p += '1. Decide a reasonable structure based on the context (hero, features, CTA, footer, etc.).\n';
                    }

                    p += '\n### 5. OUTPUT FORMAT\n';
                    p += 'Return ONLY a single HTML document. Include `<script src="https://cdn.tailwindcss.com"></script>` in `<head>`. Do not include explanations.\n';

                    this.upsertBaseVersion(p);

                    const activeIdx = this.data.activeVersionIndex || 0;
                    const activeVersion = this.data.versions[activeIdx] || this.data.versions[0];
                    promptOutput.value = activeVersion ? activeVersion.text : p;

                    if (this.data.versions.length > 1) {
                        status.innerText = `Refined (v1.${this.data.versions.length - 1})`;
                        status.className = 'text-[10px] text-red-400';
                    } else if (this.data.refinements.length) {
                        status.innerText = `Refined (local notes)`;
                        status.className = 'text-[10px] text-red-400';
                    } else {
                        status.innerText = 'Base Version';
                        status.className = 'text-[10px] text-gray-500';
                    }

                    this.renderVersionOptions();
                    this.renderIterationLog();
                    this.updateIterationStatus();
                },

                copyPrompt() {
                    const output = document.getElementById('prompt-output');
                    if (!output) return;
                    output.select();
                    try {
                        document.execCommand('copy');
                        alert('Prompt 已复制到剪贴板');
                    } catch (e) {
                        alert('复制失败，请手动复制');
                    }
                },

                normalizePromptFromLLM(raw) {
                    if (!raw) return '';
                    let txt = String(raw).trim();
                    if (!txt) return '';

                    if (txt.startsWith('```')) {
                        const lines = txt.split('\n');
                        const first = lines[0].trim();
                        if (first.startsWith('```')) {
                            lines.shift();
                        }
                        while (lines.length && lines[lines.length - 1].trim().startsWith('```')) {
                            lines.pop();
                        }
                        txt = lines.join('\n').trim();
                    }
                    return txt;
                },

                async callOpenAICompatible(providerId, cfg, messages) {
                    const baseUrl = (cfg.baseUrl || '').replace(/\/$/, '');
                    let url = baseUrl;

                    if (providerId === 'ollama') {
                        url = `${baseUrl}/v1/chat/completions`;
                    } else {
                        url = `${baseUrl}/chat/completions`;
                    }

                    const body = {
                        model: cfg.model || (providerId === 'ollama' ? 'qwen2.5-coder:latest' : 'gpt-4.1-mini'),
                        messages,
                        temperature: typeof cfg.temperature === 'number' ? cfg.temperature : 0.7,
                        stream: false
                    };

                    const headers = {
                        'Content-Type': 'application/json'
                    };
                    if (cfg.apiKey && cfg.apiKey.trim() && providerId !== 'ollama') {
                        headers.Authorization = `Bearer ${cfg.apiKey.trim()}`;
                    }

                    const res = await fetch(url, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(body)
                    });

                    if (!res.ok) {
                        const txt = await res.text();
                        throw new Error(`HTTP ${res.status}: ${txt}`);
                    }

                    const json = await res.json();
                    let text = '';

                    if (json && Array.isArray(json.choices) && json.choices[0]) {
                        const choice = json.choices[0];
                        if (choice.message && typeof choice.message.content === 'string') {
                            text = choice.message.content;
                        } else if (typeof choice.text === 'string') {
                            text = choice.text;
                        }
                    } else if (json && json.message && typeof json.message.content === 'string') {
                        text = json.message.content;
                    }

                    if (!text) {
                        throw new Error('LLM 返回内容为空，无法生成优化后的 Prompt');
                    }

                    return this.normalizePromptFromLLM(text);
                },

                async run() {
                    const promptOutput = document.getElementById('prompt-output');
                    if (!promptOutput) {
                        alert('未找到 Prompt 输出区域');
                        return;
                    }
                    const base = this.data.versions && this.data.versions[0] ? this.data.versions[0].text : promptOutput.value;
                    const basePrompt = (base || '').trim();
                    if (!basePrompt) {
                        alert('请先在左侧完成配置以生成基础 Prompt');
                        return;
                    }

                    if (!App.Settings || !App.Settings.getActiveConfig) {
                        alert('未找到 AI 设置模块，请刷新页面后重试。');
                        return;
                    }

                    const cfg = App.Settings.getActiveConfig();
                    const providerId = App.Settings.data && App.Settings.data.activeProvider;

                    if (!cfg || !providerId) {
                        alert('请先在设置中配置 LLM 接口信息。');
                        return;
                    }

                    if (providerId !== 'openai' && providerId !== 'ollama') {
                        alert('当前内置调用逻辑仅支持 OpenAI / OpenAI 兼容 API。其他厂商请继续使用复制 Prompt 的方式。');
                        return;
                    }

                    if (providerId === 'openai' && (!cfg.apiKey || !cfg.apiKey.trim()) && (!cfg.baseUrl || (cfg.baseUrl.indexOf('localhost') === -1 && cfg.baseUrl.indexOf('127.0.0.1') === -1))) {
                        alert('请在设置中填写 OpenAI API Key，或将 Base URL 指向本地 / 代理服务。');
                        return;
                    }

                    if (this.data.isRunning) return;
                    this.data.isRunning = true;
                    this.updateIterationStatus();

                    const consoleStatus = document.getElementById('console-status');
                    if (consoleStatus) {
                        consoleStatus.innerHTML = '<span class="text-indigo-400">Calling LLM...</span>';
                    }

                    try {
                        const messages = [];
                        const sys = 'You are an elite prompt engineer. Given a base prompt and refinement notes, return an updated prompt that keeps the same overall structure and wording style, only making minimal changes to reflect the refinements. Always preserve the existing section headings and order. Answer ONLY with the refined prompt.';
                        messages.push({ role: 'system', content: sys });

                        let refinementsText = '';
                        if (this.data.iterations && this.data.iterations.length) {
                            refinementsText = this.data.iterations.map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`).join('\n');
                        }

                        const userContent = [
                            'BASE PROMPT:\n',
                            basePrompt,
                            '\n\nREFINEMENT NOTES (latest first):\n',
                            refinementsText || 'None yet, but please lightly optimize wording and clarity without changing the structure.'
                        ].join('');

                        messages.push({ role: 'user', content: userContent });

                        const refined = await this.callOpenAICompatible(providerId, cfg, messages);

                        this.addRefinedVersion(refined);
                        this.renderVersionOptions();

                        const activeIdx = this.data.activeVersionIndex || 0;
                        const activeVersion = this.data.versions[activeIdx] || this.data.versions[0];
                        promptOutput.value = activeVersion ? activeVersion.text : refined;

                        if (consoleStatus) {
                            consoleStatus.innerText = 'Prompt Refinement Successful.';
                        }
                    } catch (e) {
                        console.error(e);
                        alert('调用 LLM 优化 Prompt 失败：' + (e && e.message ? e.message : '未知错误'));
                        if (consoleStatus) {
                            consoleStatus.innerText = 'LLM Error.';
                        }
                    } finally {
                        this.data.isRunning = false;
                        this.updateIterationStatus();
                    }
                }
            },

            Engine: {
                generate() {
                    const btn = document.getElementById('btn-generate');
                    const loader = document.getElementById('loader-overlay');
                    const txt = document.getElementById('loader-text');
                    
                    btn.disabled = true;
                    loader.classList.remove('opacity-0', 'pointer-events-none');

                    const steps = [
                        "Analyzing design context...",
                        "Generating color tokens...",
                        "Compiling Tailwind classes...",
                        "Optimizing DOM structure...",
                        "Applying responsiveness...",
                        "Finalizing output..."
                    ];

                    let i = 0;
                    const interval = setInterval(() => {
                        if (i < steps.length) {
                            txt.innerText = steps[i];
                            // Log to console
                            document.getElementById('console-status').innerHTML = `<span class="text-indigo-400">${steps[i]}</span>`;
                            i++;
                        } else {
                            clearInterval(interval);
                            btn.disabled = false;
                            loader.classList.add('opacity-0', 'pointer-events-none');
                            this.updateLivePreview();
                            document.getElementById('console-status').innerText = "Build Successful.";
                        }
                    }, 400);
                },

                updateLivePreview() {
                    const frame = document.getElementById('preview-frame');
                    if (!frame || !frame.contentDocument) return;
                    const doc = frame.contentDocument;

                    const s = App.State.data;
                    const allStyles = App.State.getAllStyles ? App.State.getAllStyles() : DB.styles;
                    const styleDef = allStyles.find(x => x.id === s.style) || DB.styles[0];
                    
                    // Construct CSS Variables
                    const cssVars = `
                        :root { 
                            --primary: ${s.tokens.primary}; 
                            --radius: ${s.tokens.radius}px;
                            --bg: ${styleDef.bg};
                            --text: ${styleDef.text};
                        }
                    `;

                    // Construct font family (fonts are loaded once in preview document)
                    let fontFamily = 'sans-serif';
                    if (s.tokens.font === 'sans') {
                        fontFamily = '"Inter", sans-serif';
                    } else if (s.tokens.font === 'serif') {
                        fontFamily = '"Playfair Display", serif';
                    } else {
                        fontFamily = '"JetBrains Mono", monospace';
                    }

                    // Construct Content
                    let content = s.components.map(c => c.html).join('\n');
                    if (!content) {
                        content = `<div class="min-h-screen flex flex-col items-center justify-center opacity-50 gap-4"><div class="text-4xl font-bold text-gray-300">PREVIEW</div><div class="text-sm text-gray-400">添加组件以开始构建</div></div>`;
                    }

                    const existingRoot = doc.getElementById('exocode-preview-root');
                    const styleEl = doc.getElementById('exocode-preview-style');

                    const styleCss = `
                        ${cssVars}
                        body { 
                            background-color: var(--bg); 
                            color: var(--text); 
                            font-family: ${fontFamily};
                            transition: background 0.3s ease;
                        }
                        /* Clean Scrollbar */
                        ::-webkit-scrollbar { width: 8px; }
                        ::-webkit-scrollbar-track { background: transparent; }
                        ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
                    `;

                    // 首次或外部导入后：初始化预览文档结构，只执行一次重写
                    if (!existingRoot || !styleEl) {
                        doc.open();
                        doc.write(`
                            <!DOCTYPE html>
                            <html class="${s.style !== 'modern' && s.style !== 'minimal' ? 'dark' : ''}">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <script src="https://cdn.tailwindcss.com"><\/script>
                                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
                                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
                                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
                                <script>
                                    tailwind.config = {
                                        darkMode: 'class',
                                        theme: {
                                            extend: {
                                                colors: { 
                                                    gray: { 900: '#111', 800: '#222' } 
                                                }
                                            }
                                        }
                                    }
                                <\/script>
                                <style id="exocode-preview-style">
                                    ${styleCss}
                                </style>
                            </head>
                            <body>
                                <div id="exocode-preview-root">${content}</div>
                            </body>
                            </html>
                        `);
                        doc.close();
                    } else {
                        // 复用已有文档：只更新样式和主体内容，避免重复加载 Tailwind 与字体
                        const htmlEl = doc.documentElement;
                        if (htmlEl) {
                            htmlEl.className = (s.style !== 'modern' && s.style !== 'minimal') ? 'dark' : '';
                        }
                        styleEl.textContent = styleCss;
                        existingRoot.innerHTML = content;
                    }
                },

                loadFromHtml(html) {
                    const frame = document.getElementById('preview-frame');
                    if (!frame || !frame.contentDocument) return;
                    const doc = frame.contentDocument;
                    doc.open();
                    doc.write(html || '');
                    doc.close();
                }
            },

            Preview: {
                resize(w) {
                    document.getElementById('preview-container').style.width = w;
                },
                download() {
                    const html = document.getElementById('preview-frame').contentDocument.documentElement.outerHTML;
                    const blob = new Blob([html], {type: 'text/html'});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'exocode_export.html';
                    a.click();
                }
            },

            Utils: {
                // Simple Syntax Highlighter
                renderCodeView() {
                    const doc = document.getElementById('preview-frame').contentDocument;
                    if (!doc) return;
                    let html = doc.documentElement.outerHTML;

                    // Basic HTML escaping
                    html = html
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;");

                    // Syntax highlighting (Regex based - Simple version)
                    html = html.replace(/(&lt;\/?)(\w+)(.*?)(&gt;)/g, '<span class="token-tag">$1$2</span>$3<span class="token-tag">$4</span>');
                    html = html.replace(/ class=&quot;(.*?)&quot;/g, ' <span class="token-attr">class</span>=<span class="token-val">"$1"</span>');

                    document.getElementById('code-viewer').innerHTML = `<pre>${html}</pre>`;
                },
                copyCode() {
                    const doc = document.getElementById('preview-frame').contentDocument;
                    navigator.clipboard.writeText(doc.documentElement.outerHTML).then(() => {
                        alert("代码已复制到剪贴板");
                    });
                }
            }
        };

        // Boot
        window.addEventListener('DOMContentLoaded', () => {
            App.State.init();
            if (App.Settings && App.Settings.init) {
                App.Settings.init();
            }
        });
