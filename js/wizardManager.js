        // 向导步骤管理
window.wizardManager = {
            init() {
                this.clarificationActive = false;
                this.initAccordions();
                // Always-on realtime layout
                this.activateRealtimeLayout();
            },

            activateRealtimeLayout() {
                try {
                    // 展示所需的步骤（实时布局）
                    const stepEls = [elements.wizardSteps.step1, elements.wizardSteps.step3, elements.wizardSteps.step4, elements.wizardSteps.step5].filter(Boolean);
                    const outputSection = document.getElementById('outputSection');
                    const rightCard = document.getElementById('outputRightCard');
                    const rightMount = document.getElementById('outputRightMount');
                    // 显示所有步骤，隐藏进度和导航
                    stepEls.forEach(el => { if (el) el.classList.remove('hidden'); });
                    try { elements.wizardSteps.step2?.classList.add('hidden'); } catch(_) {}
                    if (elements.progressContainer) elements.progressContainer.classList.add('hidden');
                    Object.values(elements.navigationButtons || {}).forEach(btn => { try { btn.classList.add('hidden'); } catch(_) {} });
                    // 相关页面逻辑已合并到生成逻辑中，不再渲染卡片
                    // 默认展开所有手风琴
                    this.setAllAccordion(false);
                    // 可视步骤重新编号为 1-4
                    try {
                        const order = [elements.wizardSteps.step1, elements.wizardSteps.step3, elements.wizardSteps.step4, elements.wizardSteps.step5].filter(Boolean);
                        let n = 1;
                        order.forEach(stepEl => {
                            if (!stepEl) return;
                            const badge = stepEl.querySelector('h2 .rounded-full');
                            if (badge) badge.textContent = String(n++);
                        });
                    } catch (_) {}
                    // 将输出区块移动到右侧卡片内
                    if (rightCard && rightMount && outputSection) {
                        rightCard.classList.remove('hidden');
                        try { rightMount.appendChild(outputSection); } catch(_) {}
                    }
                    // 通知布局已激活，供其他模块安全挂载
                    try { document.dispatchEvent(new CustomEvent('layout:activated')); } catch(_) {}
                } catch(_) {}
            },

            initAccordions() {
                // 取消折叠：移除任何残留的 collapsed 标记
                const steps = [elements.wizardSteps.step1, elements.wizardSteps.step2, elements.wizardSteps.step3, elements.wizardSteps.step4, elements.wizardSteps.step5];
                steps.forEach(step => { try { step?.classList?.remove('collapsed'); } catch(_) {} });
            },

            setAllAccordion(collapsed) {
                // 取消折叠：始终移除折叠态
                const steps = [elements.wizardSteps.step1, elements.wizardSteps.step2, elements.wizardSteps.step3, elements.wizardSteps.step4, elements.wizardSteps.step5];
                steps.forEach(step => { try { step?.classList?.remove('collapsed'); } catch(_) {} });
            },

            // 分步导航相关逻辑已移除（实时布局）
        };
