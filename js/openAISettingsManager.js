window.openAISettingsManager = {
            defaultSettings: {
                apiKey: '',
                baseUrl: 'https://api.openai.com/v1',
                model: 'gpt-4o',
                maxTokens: 8000,
                temperature: 0.7,
                systemPrompt: ''
            },
            envSettings: null,
            envLoadPromise: null,

            init() {
                // 初始化设置按钮和模态框
                const settingsButton = document.getElementById('settingsButton');
                const settingsModal = document.getElementById('settingsModal');
                const closeSettingsModal = document.getElementById('closeSettingsModal');
                const saveSettings = document.getElementById('saveSettings');
                const resetSettings = document.getElementById('resetSettings');
                const modelSelect = document.getElementById('modelSelect');
                const customModelContainer = document.getElementById('customModelContainer');
                // 尝试异步加载环境配置（env.json / .env / meta）
                this.envLoadPromise = this.loadEnvSettings().then(() => {
                    // 若本地未保存设置且检测到 env 配置，则将其显示到表单（不自动持久化）
                    const savedSettings = localStorage.getItem('openai_settings');
                    if (!savedSettings && this.envSettings) {
                        try {
                            document.getElementById('apiKey').value = this.envSettings.apiKey || '';
                            document.getElementById('baseUrl').value = this.envSettings.baseUrl || this.defaultSettings.baseUrl;

                            const modelSelectEl = document.getElementById('modelSelect');
                            const customModelInputEl = document.getElementById('customModelInput');
                            const customModelContainerEl = document.getElementById('customModelContainer');
                            const predefinedModels = Array.from(modelSelectEl.options).map(opt => opt.value);
                            const modelVal = (this.envSettings.model || this.defaultSettings.model);
                            if (predefinedModels.includes(modelVal)) {
                                modelSelectEl.value = modelVal;
                                customModelContainerEl.classList.add('hidden');
                            } else {
                                modelSelectEl.value = 'custom';
                                customModelInputEl.value = modelVal;
                                customModelContainerEl.classList.remove('hidden');
                            }
                        } catch (_) { /* 忽略 UI 回填错误 */ }
                    }
                }).catch(() => {});

                // 加载保存的设置（优先级：本地 > env > 默认）
                this.loadSettings();

                // 设置按钮点击事件
                settingsButton.addEventListener('click', () => {
                    settingsModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // 防止背景滚动
                });

                // 关闭按钮点击事件
                closeSettingsModal.addEventListener('click', () => {
                    settingsModal.classList.remove('show');
                    document.body.style.overflow = '';
                });

                // 点击背景关闭模态框
                settingsModal.addEventListener('click', (e) => {
                    if (e.target === settingsModal) {
                        settingsModal.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                });

                // 模型选择变化事件
                modelSelect.addEventListener('change', () => {
                    if (modelSelect.value === 'custom') {
                        customModelContainer.classList.remove('hidden');
                } else {
                        customModelContainer.classList.add('hidden');
                    }
                });

                // 保存设置
                saveSettings.addEventListener('click', () => {
                    this.saveSettings();
                    settingsModal.classList.remove('show');
                    document.body.style.overflow = '';

                    // 显示保存成功提示
                    this.showToast('设置已保存');
                });

                // 重置设置
                resetSettings.addEventListener('click', () => {
                    this.resetSettings();
                });
            },

            loadSettings() {
                try {
                    const savedSettings = localStorage.getItem('openai_settings');
                    const settings = savedSettings ? JSON.parse(savedSettings) : this.defaultSettings;

                    // 调试日志已移除，避免泄露敏感信息
                    // 填充表单
                    document.getElementById('apiKey').value = settings.apiKey || '';
                    document.getElementById('baseUrl').value = settings.baseUrl || this.defaultSettings.baseUrl;
                    document.getElementById('modelSelect').value = settings.model || this.defaultSettings.model;
                    const maxTokensEl = document.getElementById('maxTokens');
                    const tempEl = document.getElementById('temperature');
                    const sysPromptEl = document.getElementById('systemPrompt');
                    if (maxTokensEl) maxTokensEl.value = settings.maxTokens || this.defaultSettings.maxTokens;
                    if (tempEl) tempEl.value = (typeof settings.temperature === 'number' ? settings.temperature : (settings.temperature ? Number(settings.temperature) : this.defaultSettings.temperature));
                    if (sysPromptEl) sysPromptEl.value = settings.systemPrompt || '';

                    // 处理模型选择
                    const modelSelect = document.getElementById('modelSelect');
                    const customModelInput = document.getElementById('customModelInput');
                    const customModelContainer = document.getElementById('customModelContainer');

                    // 检查是否是预定义的模型选项
                    const predefinedModels = Array.from(modelSelect.options).map(opt => opt.value);
                    if (predefinedModels.includes(settings.model)) {
                        modelSelect.value = settings.model;
                        customModelContainer.classList.add('hidden');
                    } else {
                        // 如果是自定义模型
                        modelSelect.value = 'custom';
                        customModelInput.value = settings.model || '';
                        customModelContainer.classList.remove('hidden');
                    }

                } catch (error) {
                    console.error('加载设置时发生错误:', error);
                    this.resetSettings();
                }
            },

            saveSettings() {
                try {
                    const modelSelect = document.getElementById('modelSelect');
                    const customModelInput = document.getElementById('customModelInput');
                    const maxTokensEl = document.getElementById('maxTokens');
                    const tempEl = document.getElementById('temperature');
                    const sysPromptEl = document.getElementById('systemPrompt');

                    // 确定要保存的模型值
                    let modelValue = modelSelect.value;
                    if (modelValue === 'custom') {
                        modelValue = customModelInput.value.trim();
                        // 如果自定义模型为空，则使用默认值
                        if (!modelValue) {
                            modelValue = this.defaultSettings.model;
                            this.showToast('自定义模型名称为空，将使用默认模型', 'warning');
                        }
                    }
                    let maxTokensVal = parseInt(maxTokensEl?.value || this.defaultSettings.maxTokens, 10);
                    if (!Number.isFinite(maxTokensVal) || maxTokensVal <= 0) maxTokensVal = this.defaultSettings.maxTokens;
                    let tempVal = parseFloat(tempEl?.value ?? this.defaultSettings.temperature);
                    if (!Number.isFinite(tempVal)) tempVal = this.defaultSettings.temperature;
                    if (tempVal < 0) tempVal = 0; if (tempVal > 2) tempVal = 2;
                    const settings = {
                        apiKey: document.getElementById('apiKey').value,
                        baseUrl: document.getElementById('baseUrl').value || this.defaultSettings.baseUrl,
                        model: modelValue,
                        maxTokens: maxTokensVal,
                        temperature: tempVal,
                        systemPrompt: (sysPromptEl?.value || '').trim()
                    };

                    localStorage.setItem('openai_settings', JSON.stringify(settings));
                } catch (error) {
                    console.error('保存设置时发生错误:', error);
                    this.showToast('保存设置失败', 'error');
                }
            },

            resetSettings() {
                document.getElementById('apiKey').value = '';
                document.getElementById('baseUrl').value = this.defaultSettings.baseUrl;
                document.getElementById('modelSelect').value = this.defaultSettings.model;
                document.getElementById('customModelInput').value = '';
                document.getElementById('customModelContainer').classList.add('hidden');
                const maxTokensEl = document.getElementById('maxTokens');
                const tempEl = document.getElementById('temperature');
                const sysPromptEl = document.getElementById('systemPrompt');
                if (maxTokensEl) maxTokensEl.value = this.defaultSettings.maxTokens;
                if (tempEl) tempEl.value = this.defaultSettings.temperature;
                if (sysPromptEl) sysPromptEl.value = '';
                this.showToast('设置已重置');
            },

            async getSettings() {
                try {
                    if (this.envLoadPromise) {
                        try { await this.envLoadPromise; } catch (_) {}
                    }
                    const savedSettings = localStorage.getItem('openai_settings');
                    if (savedSettings) return JSON.parse(savedSettings);
                    if (this.envSettings) return this.envSettings;
                    return this.defaultSettings;
                } catch (error) {
                    console.error('获取设置时发生错误:', error);
                    return this.defaultSettings;
                }
            },

            async loadEnvSettings() {
                // 支持三种来源：<meta>、env.json、.env（若可访问）
                const merged = {};

                // 1) meta 标签（可选）
                try {
                    const metaApiKey = document.querySelector('meta[name="openai-api-key"]')?.content || document.querySelector('meta[name="OPENAI_API_KEY"]')?.content;
                    const metaBaseUrl = document.querySelector('meta[name="openai-base-url"]')?.content || document.querySelector('meta[name="OPENAI_BASE_URL"]')?.content;
                    const metaModel = document.querySelector('meta[name="openai-model"]')?.content || document.querySelector('meta[name="OPENAI_MODEL"]')?.content;
                    if (metaApiKey) merged.apiKey = metaApiKey;
                    if (metaBaseUrl) merged.baseUrl = metaBaseUrl;
                    if (metaModel) merged.model = metaModel;
                } catch (_) { }

                // 2) env.json（键名兼容 OPENAI_* 或驼峰）
                try {
                    const resp = await fetch('env.json', { cache: 'no-store' });
                    if (resp.ok) {
                        const j = await resp.json();
                        merged.apiKey = merged.apiKey || j.OPENAI_API_KEY || j.apiKey || j.openaiApiKey || '';
                        merged.baseUrl = merged.baseUrl || j.OPENAI_BASE_URL || j.baseUrl || j.baseURL || '';
                        merged.model = merged.model || j.OPENAI_MODEL || j.model || '';
                        merged.maxTokens = merged.maxTokens || j.OPENAI_MAX_TOKENS || j.maxTokens || '';
                        merged.temperature = merged.temperature || j.OPENAI_TEMPERATURE || j.temperature || '';
                    }
                } catch (_) { }

                // 3) .env（简单解析 KEY=VALUE）
                try {
                    const resp = await fetch('.env', { cache: 'no-store' });
                    if (resp.ok) {
                        const text = await resp.text();
                        const lines = text.split(/\r?\n/);
                        for (const line of lines) {
                            const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
                            if (!m) continue;
                            const key = m[1];
                            let value = m[2];
                            // 规范化：移除首尾的引号（单/双引号）
                            try { value = value.replace(/^[\'\"]|[\'\"]$/g, ''); } catch (_) {}
                            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
                                value = value.slice(1, -1);
                            }
                            if (key === 'OPENAI_API_KEY' && !merged.apiKey) merged.apiKey = value;
                            if (key === 'OPENAI_BASE_URL' && !merged.baseUrl) merged.baseUrl = value;
                            if (key === 'OPENAI_MODEL' && !merged.model) merged.model = value;
                            if (key === 'OPENAI_MAX_TOKENS' && !merged.maxTokens) merged.maxTokens = value;
                            if (key === 'OPENAI_TEMPERATURE' && !merged.temperature) merged.temperature = value;
                        }
                    }
                } catch (_) { }

                if (merged.apiKey || merged.baseUrl || merged.model || merged.maxTokens) {
                    this.envSettings = {
                        apiKey: merged.apiKey || '',
                        baseUrl: merged.baseUrl || this.defaultSettings.baseUrl,
                        model: merged.model || this.defaultSettings.model,
                        maxTokens: Number(merged.maxTokens || this.defaultSettings.maxTokens),
                        temperature: Number(merged.temperature || this.defaultSettings.temperature)
                    };
                }
                return this.envSettings;
            },

            showToast(message, type = 'success') {
                // 创建 toast 元素
                const toast = document.createElement('div');
                toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-lg z-50 transform transition-transform duration-300 translate-y-10 opacity-0`;
                toast.textContent = message;

                // 添加到页面
                document.body.appendChild(toast);

                // 触发动画
                setTimeout(() => {
                    toast.classList.remove('translate-y-10', 'opacity-0');
                }, 10);

                // 自动关闭
                setTimeout(() => {
                    toast.classList.add('translate-y-10', 'opacity-0');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 3000);
            }
        };
