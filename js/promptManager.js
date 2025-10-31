window.promptManager = {
            isGenerating: false,
            isCopyAnimationRunning: false,
            _rtTimer: null,
            _rtDelay: 400,
            init() {
                this.bindEvents();
                // 初始化建议区
                this.updateSuggestions();
                // 初始化历史版本下拉
                try { this.updateVersionSelector(); } catch (_) {}
            },

            bindEvents() {
                // 左侧原按钮
                elements.generatePromptButton?.addEventListener('click', () => {
                    // 避免重复点击
                    if (!this.isGenerating) {
                        this.generatePrompt();
                    }
                });
                // 右侧顶部按钮（如果存在）
                const topBtn = document.getElementById('generatePromptTop');
                if (topBtn) {
                    topBtn.addEventListener('click', () => {
                        if (!this.isGenerating) {
                            this.generatePrompt();
                        }
                    });
                }
                elements.copyPromptBtn.addEventListener('click', () => this.copyPrompt());
                elements.additionalDetails.addEventListener('input', (e) => {
                    state.selections.additionalDetails = e.target.value;
                    // 实时更新
                    this.scheduleRealtimeUpdate();
                });
                // 监听目的变化后刷新建议（当用户在步骤1选择后，渲染完成时可被调用）
                document.addEventListener('purposeChanged', () => this.updateSuggestions());
                // 二次优化按钮
                const optimizeBtn = elements.optimizePromptButton || document.getElementById('optimizePrompt');
                if (optimizeBtn) optimizeBtn.addEventListener('click', () => this.optimizePrompt());

                // 历史版本选择（容错：若未在 elements 收集，则按 id 查找）
                const versionSelect = elements.versionSelect || document.getElementById('versionSelect');
                if (versionSelect) {
                    versionSelect.addEventListener('change', (e) => {
                        const val = e.target.value;
                        if (val) this.loadVersion(val);
                    });
                    this.ensureVersionControls(versionSelect);
                }
                // 手动保存当前版本（容错同上）
                const saveBtn = elements.saveCurrentVersion || document.getElementById('saveCurrentVersion');
                if (saveBtn) {
                    saveBtn.addEventListener('click', () => {
                        const label = prompt('请输入版本备注（可选）:', '手动保存');
                        const content = elements.generatedPrompt?.value || '';
                        if (content.trim()) this.saveVersion(content, label || '手动保存');
                    });
                }
            },

            // 防抖触发：根据当前 selections 重新生成提示词并更新UI
            scheduleRealtimeUpdate() {
                try { if (!state.realtime) return; } catch(_) {}
                if (this._rtTimer) clearTimeout(this._rtTimer);
                this._rtTimer = setTimeout(() => {
                    try {
                        const txt = this.buildPrompt();
                        if (elements.generatedPrompt) elements.generatedPrompt.value = txt;
                        // 联动：建议与预览
                        try { this.updateSuggestions(); } catch(_) {}
                        try { window.componentManager?.updateComponentPreview?.(); } catch(_) {}
                    } catch (e) { console.warn('实时更新失败', e); }
                }, this._rtDelay);
            },

            async generatePrompt() {

                // 设置生成状态为true
                this.isGenerating = true;
                
                // 显示按钮loading状态
                this.toggleButtonLoading(true);

                // 显示生成中状态
                if (elements.generatedPrompt) elements.generatedPrompt.value = 'AI正在努力生成提示词，请稍等...';
                elements.aiProgressBar.style.width = '0%';
                elements.aiProgressBar.classList.add('ai-progress-bar');

                // 模拟进度
                setTimeout(() => {
                    elements.aiProgressBar.style.width = '30%';
                }, 100);

                try {
                    // 构建基础提示词
                    const basePrompt = this.buildPrompt();
                    
                    // 检查用户是否配置了OpenAI接口（支持从本地存储或 .env/env.json/meta 自动读取）
                    const settings = await window.openAISettingsManager.getSettings();
                    const isConfigured = settings.apiKey && settings.apiKey.trim() !== '';
                    
                    if (isConfigured) {
                        // 设置进度提示
                        if (elements.generatedPrompt) elements.generatedPrompt.value = '正在连接AI服务，增强提示词...';
                        elements.aiProgressBar.style.width = '50%';
                        
                        try {
                            // 调用OpenAI接口扩展提示词
                            const enhancedPrompt = await this.enhancePromptWithOpenAI(basePrompt, settings);
                            if (elements.generatedPrompt) elements.generatedPrompt.value = enhancedPrompt;
                            elements.aiProgressBar.style.width = '100%';
                            elements.aiProgressBar.classList.remove('ai-progress-bar');
                            // 自动保存版本
                            try { this.saveVersion(enhancedPrompt, 'AI 生成'); } catch (_) {}
                            this.showToast('使用AI成功增强了提示词！', 'success');
                        } catch (openaiError) {
                            console.error('调用OpenAI接口失败:', openaiError);
                            // 如果调用失败，则使用基础提示词
                            if (elements.generatedPrompt) elements.generatedPrompt.value = basePrompt;
                            elements.aiProgressBar.style.width = '100%';
                            elements.aiProgressBar.classList.remove('ai-progress-bar');
                            // 自动保存版本（基础）
                            try { this.saveVersion(basePrompt, 'AI 生成'); } catch (_) {}
                            this.showToast('AI增强失败，已使用基础提示词', 'error');
                        }
                    } else {
                        // 未配置 API：立即使用基础提示词，无需人为延迟
                        if (elements.generatedPrompt) elements.generatedPrompt.value = basePrompt;
                        elements.aiProgressBar.style.width = '100%';
                        elements.aiProgressBar.classList.remove('ai-progress-bar');
                        // 自动保存版本（基础）
                        try { this.saveVersion(basePrompt, '基础生成'); } catch (_) {}
                        this.updateSuggestions();
                    }
                } catch (error) {
                    if (elements.generatedPrompt) elements.generatedPrompt.value = '生成提示词时出错，请重试';
                    elements.aiProgressBar.classList.remove('ai-progress-bar');
                    console.error('生成提示词错误:', error);
                } finally {
                    // 无论成功失败，都恢复按钮状态
                    setTimeout(() => {
                        this.toggleButtonLoading(false);
                        // 恢复生成状态
                        this.isGenerating = false;
                    }, 1000); // 稍微延迟恢复，确保用户看到状态变化
                }
            },
            // 控制按钮loading状态的方法（支持指定按钮）
            toggleButtonLoading(isLoading, buttonId) {
                const leftBtn = elements.generatePromptButton || null;
                const topBtn = document.getElementById('generatePromptTop');
                const targets = [];
                if (buttonId) {
                    const t = document.getElementById(buttonId);
                    if (t) targets.push(t);
                } else {
                    if (leftBtn) targets.push(leftBtn);
                    if (topBtn) targets.push(topBtn);
                }
                if (!targets.length) return;
                targets.forEach(targetBtn => {
                    const buttonText = targetBtn.querySelector('.button-text');
                    const loadingSpinner = targetBtn.querySelector('.loading-spinner');
                    const syncIcon = targetBtn.querySelector('i.fa-sync-alt');
                    if (isLoading) {
                        targetBtn.classList.add('opacity-75', 'cursor-not-allowed');
                        if (buttonText) buttonText.textContent = (targetBtn.id === 'generatePrompt' || targetBtn.id === 'generatePromptTop') ? '生成中...' : '处理中...';
                        if (loadingSpinner) loadingSpinner.classList.remove('hidden');
                        if (syncIcon) syncIcon.classList.add('fa-spin');
                    } else {
                        targetBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                        if (buttonText) buttonText.textContent = (targetBtn.id === 'generatePrompt' || targetBtn.id === 'generatePromptTop') ? '生成提示词' : '优化提示词';
                        if (loadingSpinner) loadingSpinner.classList.add('hidden');
                        if (syncIcon) syncIcon.classList.remove('fa-spin');
                    }
                });
            },
            async enhancePromptWithOpenAI(basePrompt, settings) {
                const { apiKey, baseUrl, model } = settings;
                
                // 构建向OpenAI发送的数据
                const systemPrompt = (settings.systemPrompt && settings.systemPrompt.trim()) || `你是一个资深的LLM Prompt工程师，请根据用户的选择生成一个详细的Prompt，让AI根据这个Prompt生成一个详细的UI设计提示词。返回的内容应该是纯文本格式，不要包含任何markdown标记或解释。以"设计一个"开头，提供清晰的UI设计指导。`;
                const temperature = Math.min(2, Math.max(0, Number(settings.temperature ?? 0.7)));
                
                const requestData = {
                    model: model,
                    messages: [
                        { 
                            role: "system", 
                            content: systemPrompt
                        },
                        { 
                            role: "user", 
                    content: `请优化以下UI设计提示词，使其更加详细、专业和有指导性，并保留原有结构与“输出形式”一行：\n\n${basePrompt}`
                        }
                    ],
                    temperature: temperature,
                    max_tokens: Number(settings.maxTokens || 8000)
                };

                // 构建API请求
                const endpoint = `${baseUrl}/chat/completions`;
                
                // 发送请求到OpenAI
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(requestData)
                });
                
                // 处理响应
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`OpenAI API错误: ${response.status} ${errorData.error?.message || response.statusText}`);
                }
                
                const data = await response.json();
                return data.choices[0].message.content.trim();
            },

            buildPrompt() {
                const {
                    purposeText = '网站',
                    industryText = '科技',
                    style = '简约',
                    color = '#6366F1',
                    components = [],
                    additionalDetails = ''
                } = state.selections;

                const componentsString = components.length > 0
                    ? `包含以下组件：${components.join('、')}。`
                    : '没有特定的组件要求。';

                const lines = [];
                lines.push(`设计一个${purposeText}界面原型，适用于${industryText}行业。`);
                lines.push('');
                lines.push('基本要求：');
                lines.push(`- 设计风格：${style}`);
                lines.push(`- 主题色：${color}`);
                lines.push(`- 组件需求：${componentsString}`);
                // 不再添加该行
                if (additionalDetails) lines.push(`- 额外要求：${additionalDetails}`);
                lines.push('');
                lines.push('请确保设计：');
                lines.push('1. 现代且专业的视觉效果');
                lines.push('2. 完全响应式布局');
                lines.push('3. 符合最新的用户体验设计规范');
                lines.push('4. 清晰的视觉层次和信息架构');
                lines.push('5. 适当的留白和间距处理');
                lines.push('');
                lines.push('输出形式：使用 HTML + Tailwind CSS + JS 输出完整的设计稿效果图');
                return lines.join('\n');
            },

            // 已移除相关自动生成逻辑

            // 新增：二次优化功能
            async optimizePrompt() {
                const currentPrompt = elements.generatedPrompt?.value?.trim() || '';
                const feedback = elements.optimizationFeedback?.value?.trim() || '';

                if (!currentPrompt) {
                    this.showToast('请先生成提示词', 'error');
                    return;
                }

                const settings = await window.openAISettingsManager.getSettings();
                if (!settings.apiKey?.trim()) {
                    this.showToast('请先在设置中配置 API Key', 'error');
                    return;
                }

                // 显示 loading
                this.toggleButtonLoading(true, 'optimizePrompt');
                try {
                    const systemPrompt = (settings.systemPrompt && settings.systemPrompt.trim()) || `你是一个资深的UI/UX提示词工程师。请根据用户的反馈，对现有提示词进行优化，保留原始结构和意图，尤其保留“输出形式”一行，仅做增强。输出纯文本，不要解释。`;

                    const userMessage = feedback
                        ? `原始提示词：\n${currentPrompt}\n\n用户反馈：${feedback}`
                        : `请对以下提示词进行专业优化，使其更清晰、详细、具备设计指导性：\n${currentPrompt}`;

                    const temp = Math.min(2, Math.max(0, Number(settings.temperature ?? 0.7)));
                    const maxTokens = Number(settings.maxTokens || 8000);

                    const response = await fetch(`${settings.baseUrl}/chat/completions`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
                        body: JSON.stringify({
                            model: settings.model,
                            messages: [
                                { role: 'system', content: systemPrompt },
                                { role: 'user', content: userMessage }
                            ],
                            temperature: temp,
                            max_tokens: maxTokens
                        })
                    });

                    if (!response.ok) throw new Error(`API 错误: ${response.status}`);
                    const data = await response.json();
                    const optimized = data.choices?.[0]?.message?.content?.trim() || '';
                    if (!optimized) throw new Error('未返回有效内容');

                    // 自动保存为新版本
                    this.saveVersion(optimized, feedback ? `优化（反馈：${feedback}）` : 'AI 优化');

                    if (elements.generatedPrompt) elements.generatedPrompt.value = optimized;
                    this.showToast('提示词已优化', 'success');
                } catch (err) {
                    console.error('优化失败:', err);
                    this.showToast('优化失败，请重试', 'error');
                } finally {
                    this.toggleButtonLoading(false, 'optimizePrompt');
                }
            },

            // 版本管理：保存版本
            saveVersion(content, label = '手动保存') {
                try {
                    const key = 'prompt_versions';
                    const versions = JSON.parse(localStorage.getItem(key) || '[]');
                    const counterKey = key + '_counter';
                    let counter = parseInt(localStorage.getItem(counterKey) || '0', 10);
                    counter = Number.isFinite(counter) ? counter + 1 : 1;
                    const newVersion = {
                        id: 'v' + counter,
                        content: content,
                        label: label,
                        timestamp: Date.now()
                    };
                    versions.push(newVersion);
                    // 最多保存10个版本
                    if (versions.length > 10) versions.shift();
                    localStorage.setItem(key, JSON.stringify(versions));
                    localStorage.setItem(counterKey, String(counter));
                    this.updateVersionSelector(newVersion.id);
                } catch (e) { console.warn('保存版本失败', e); }
            },

            // 版本管理：更新下拉菜单
            updateVersionSelector(preferId) {
                try {
                    const select = elements.versionSelect || document.getElementById('versionSelect');
                    if (!select) return;
                    const versions = JSON.parse(localStorage.getItem('prompt_versions') || '[]');
                    // 新版本放前面，便于快速切换最近一次
                    versions.sort((a, b) => b.timestamp - a.timestamp);
                    if (!versions.length) {
                        select.innerHTML = '<option value="">无历史版本</option>';
                        return;
                    }
                    const cur = preferId || select.value;
                    select.innerHTML = versions.map(v => {
                        const time = new Date(v.timestamp).toLocaleTimeString();
                        const safeLabel = (v.label || '历史版本');
                        return `<option value="${v.id}">${safeLabel} (${time})</option>`;
                    }).join('');
                    // 尝试保留用户当前选择
                    if (cur && versions.some(v => v.id === cur)) {
                        select.value = cur;
                    } else {
                        select.value = versions[0]?.id || '';
                    }
                } catch (e) { /* 忽略渲染错误 */ }
            },

            // 版本管理：加载指定版本
            loadVersion(versionId) {
                try {
                    const versions = JSON.parse(localStorage.getItem('prompt_versions') || '[]');
                    const version = versions.find(v => v.id === versionId);
                    if (version && elements.generatedPrompt) {
                        elements.generatedPrompt.value = version.content;
                        this.showToast(`已切换到版本：${version.label}`);
                    }
                } catch (e) { console.warn('加载版本失败', e); }
            },

            // 版本管理：删除指定版本
            deleteVersion(versionId) {
                try {
                    const key = 'prompt_versions';
                    const versions = JSON.parse(localStorage.getItem(key) || '[]');
                    const idx = versions.findIndex(v => v.id === versionId);
                    if (idx >= 0) {
                        const removed = versions.splice(idx, 1)[0];
                        localStorage.setItem(key, JSON.stringify(versions));
                        this.updateVersionSelector();
                        this.showToast(`已删除版本：${removed.label || removed.id}`);
                    }
                } catch (e) { console.warn('删除版本失败', e); }
            },

            // 版本管理：清空全部版本
            clearVersions() {
                try {
                    localStorage.removeItem('prompt_versions');
                    // 不重置计数器，避免 ID 冲突；如需重置，可同时清空 _counter
                    this.updateVersionSelector();
                    const select = elements.versionSelect || document.getElementById('versionSelect');
                    if (select) select.innerHTML = '<option value="">无历史版本</option>';
                    this.showToast('历史版本已清空');
                } catch (e) { console.warn('清空版本失败', e); }
            },

            // UI：为历史版本下拉添加删除/清空控制
            ensureVersionControls(selectEl) {
                try {
                    if (!selectEl || selectEl.dataset.controlsBound) return;
                    selectEl.dataset.controlsBound = '1';
                    // 键盘删除：在下拉有焦点时按 Delete 删除当前选择
                    selectEl.addEventListener('keydown', (e) => {
                        if (e.key === 'Delete') {
                            const id = selectEl.value;
                            if (id) this.deleteVersion(id);
                        }
                    });
                    // 操作按钮改为放在下方一行，避免与选择器同排拥挤
                    const bar = document.createElement('div');
                    bar.className = 'mt-2 flex items-center gap-2 flex-wrap';
                    const delBtn = document.createElement('button');
                    delBtn.type = 'button';
                    delBtn.className = 'btn btn-secondary btn-sm';
                    delBtn.textContent = '删除当前';
                    delBtn.addEventListener('click', () => {
                        const id = selectEl.value;
                        if (id) this.deleteVersion(id);
                    });
                    const clearBtn = document.createElement('button');
                    clearBtn.type = 'button';
                    clearBtn.className = 'btn btn-secondary btn-sm';
                    clearBtn.textContent = '清空历史';
                    clearBtn.addEventListener('click', () => {
                        if (confirm('确认清空全部历史版本？')) this.clearVersions();
                    });
                    // 将“保存当前”按钮也移动到下方一行
                    let saveBtn = document.getElementById('saveCurrentVersion');
                    if (saveBtn && saveBtn.parentNode) {
                        try { saveBtn.parentNode.removeChild(saveBtn); } catch(_) {}
                    }
                    if (!saveBtn) {
                        // 兜底：如果没有该按钮，则创建一个
                        saveBtn = document.createElement('button');
                        saveBtn.id = 'saveCurrentVersion';
                        saveBtn.textContent = '保存当前';
                    }
                    // 统一三个按钮的样式
                    saveBtn.type = 'button';
                    saveBtn.className = 'btn btn-secondary btn-sm';
                    // 确保点击事件已绑定
                    if (!saveBtn._bound) {
                        saveBtn.addEventListener('click', () => {
                            const label = prompt('请输入版本备注（可选）:', '手动保存');
                            const content = elements.generatedPrompt?.value || '';
                            if (content.trim()) this.saveVersion(content, label || '手动保存');
                        });
                        saveBtn._bound = true;
                    }
                    bar.appendChild(delBtn);
                    bar.appendChild(clearBtn);
                    bar.appendChild(saveBtn);
                    // 将按钮条插入到选择器所在行的下一行
                    const row = selectEl.closest('div');
                    if (row && row.parentNode) {
                        row.parentNode.insertBefore(bar, row.nextSibling);
                    } else if (selectEl.parentNode) {
                        // 退化处理：直接插到 select 后换行
                        const br = document.createElement('br');
                        selectEl.parentNode.insertBefore(br, selectEl.nextSibling);
                        selectEl.parentNode.insertBefore(bar, br.nextSibling);
                    }
                } catch (_) {}
            },

            // 添加提示通知方法
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
            },

            async copyPrompt() {
                const promptText = elements.generatedPrompt?.value || '';

                if (!promptText ||
                    promptText === '请点击"生成提示词"按钮来获取您的 UI 设计提示词...' ||
                    promptText === 'AI正在努力生成提示词，请稍等...' ||
                    promptText === '正在连接AI服务，增强提示词...') {
                    return;
                }

                const fallbackCopy = (text) => {
                    try {
                        const ta = document.createElement('textarea');
                        ta.value = text;
                        ta.setAttribute('readonly', '');
                        ta.style.position = 'fixed';
                        ta.style.top = '-9999px';
                        ta.style.left = '-9999px';
                        document.body.appendChild(ta);
                        ta.select();
                        const ok = document.execCommand('copy');
                        document.body.removeChild(ta);
                        return ok;
                    } catch (_) { return false; }
                };

                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(promptText);
                        this.showCopySuccess();
                    } else {
                        const ok = fallbackCopy(promptText);
                        if (ok) this.showCopySuccess(); else throw new Error('fallback failed');
                    }
                } catch (err) {
                    console.error('复制失败:', err);
                    const ok = fallbackCopy(promptText);
                    if (ok) this.showCopySuccess(); else this.showCopyError();
                }
            },

            showCopySuccess() {
                 // 如果动画正在运行，先强制结束上一次动画
                 if (this.isCopyAnimationRunning) {
                    // 先移除类
                    elements.copyStatus.classList.remove('fade-in-out');
                    elements.copyPromptBtn.classList.remove('copy-animation');
                    
                    // 强制重排以重置动画状态
                    void elements.copyStatus.offsetWidth;
                    void elements.copyPromptBtn.offsetWidth;
                }
                
                // 设置动画运行状态
                this.isCopyAnimationRunning = true;
                elements.copyStatus.textContent = '复制成功！';
                elements.copyStatus.classList.add('fade-in-out');
                elements.copyPromptBtn.classList.add('copy-animation');

                setTimeout(() => {
                    elements.copyStatus.classList.remove('fade-in-out');
                    elements.copyPromptBtn.classList.remove('copy-animation');
                    this.isCopyAnimationRunning = false;
                }, 1500);
            },

            showCopyError() {
                // 如果动画正在运行，先强制结束上一次动画
                if (this.isCopyAnimationRunning) {
                    elements.copyStatus.classList.remove('fade-in-out');
                    void elements.copyStatus.offsetWidth;
                }
                
                // 设置动画运行状态
                this.isCopyAnimationRunning = true;
                
                // 更新错误文本并添加动画类
                elements.copyStatus.textContent = '复制失败，请手动复制';
                elements.copyStatus.classList.add('fade-in-out');

                setTimeout(() => {
                    elements.copyStatus.classList.remove('fade-in-out');
                    this.isCopyAnimationRunning = false;
                }, 1500);
            },

            updateSuggestions() {
                const wrap = elements.suggestionTags;
                if (!wrap) return;
                const purpose = state.selections.purpose || 'default';
                const suggestions = (window.CONFIG?.promptSuggestions?.[purpose]) || (window.CONFIG?.promptSuggestions?.default) || [];
                wrap.innerHTML = suggestions.map(tag => `
                    <button class="tag px-3 py-1 text-xs" data-suggestion="${tag}">${tag}</button>
                `).join('');
                wrap.onclick = (e) => {
                    const btn = e.target.closest('button.tag[data-suggestion]');
                    if (!btn || !elements.generatedPrompt) return;
                    const textarea = elements.generatedPrompt;
                    const suggestion = btn.dataset.suggestion;
                    const start = textarea.selectionStart || 0;
                    const end = textarea.selectionEnd || 0;
                    const text = textarea.value || '';
                    textarea.value = text.slice(0, start) + suggestion + text.slice(end);
                    const pos = start + suggestion.length;
                    textarea.focus();
                    textarea.setSelectionRange(pos, pos);
                };
            },

            getCurrentPrompt() {
                return elements.generatedPrompt?.value || '';
            }
        };
