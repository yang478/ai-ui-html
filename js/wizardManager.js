        // 向导步骤管理
window.wizardManager = {
            init() {
                this.bindEvents();
                this.clarificationActive = false;
                this.initAccordions();
                // Always-on realtime layout
                this.activateRealtimeLayout();
            },

            bindEvents() {
                try {
                    Object.entries(elements.navigationButtons || {}).forEach(([key, button]) => {
                        if (button && typeof button.addEventListener === 'function') {
                            button.addEventListener('click', () => this.handleNavigation(key));
                        }
                    });
                } catch(_) {}
            },

            activateRealtimeLayout() {
                try {
                    const stepEls = [elements.wizardSteps.step1, elements.wizardSteps.step2, elements.wizardSteps.step3, elements.wizardSteps.step4, elements.wizardSteps.step5].filter(Boolean);
                    const outputSection = document.getElementById('outputSection');
                    const rightCard = document.getElementById('outputRightCard');
                    const rightMount = document.getElementById('outputRightMount');
                    // 显示所有步骤，隐藏进度和导航
                    stepEls.forEach(el => { if (el) el.classList.remove('hidden'); });
                    if (elements.progressContainer) elements.progressContainer.classList.add('hidden');
                    Object.values(elements.navigationButtons || {}).forEach(btn => { try { btn.classList.add('hidden'); } catch(_) {} });
                    // 渲染澄清卡片（若有）
                    try { window.clarificationManager?.renderCards?.(); } catch(_) {}
                    // 默认展开所有手风琴
                    this.setAllAccordion(false);
                    // 将输出区块移动到右侧卡片内
                    if (rightCard && rightMount && outputSection) {
                        rightCard.classList.remove('hidden');
                        try { rightMount.appendChild(outputSection); } catch(_) {}
                    }
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

            handleNavigation(buttonId) {
                const actions = {
                    nextStep1: () => this.showClarificationStep(),
                    // 注意：样式页的按钮ID仍是 nextStep2，但新编号应前往第4步（颜色）
                    nextStep2: () => this.moveToStep(4),
                    // 颜色页按钮ID仍是 nextStep3，但新编号应前往第5步（生成）
                    nextStep3: () => this.moveToStep(5),
                    prevStep2: () => this.moveToStep(2),
                    prevStep3: () => this.moveToStep(3),
                    prevStep4: () => this.moveToStep(4)
                };

                if (actions[buttonId]) {
                    actions[buttonId]();
                }
            },

            showClarificationStep() {
                const clarStep = document.getElementById('wizardStep1_5');
                if (clarStep) {
                    elements.wizardSteps[`step${state.currentStep}`].classList.add('hidden');
                    clarStep.classList.remove('hidden');
                    this.clarificationActive = true;
                    try { window.clarificationManager?.renderCards?.(); } catch(_) {}
                    this.updateProgress(2);
                    state.currentStep = 2;
                } else {
                    this.moveToStep(2);
                }
            },

            moveToStep(step) {
                // 隐藏当前步骤
                elements.wizardSteps[`step${state.currentStep}`].classList.add('hidden');

                // 显示目标步骤
                elements.wizardSteps[`step${step}`].classList.remove('hidden');

                // 更新进度条和步骤状态
                this.updateProgress(step);

                // 更新当前步骤
                state.currentStep = step;
            },

            updateProgress(step) {
                try {
                    if (elements.progressBar) {
                        const progressWidth = step * 20;
                        elements.progressBar.style.width = `${progressWidth}%`;
                    }
                    // 更新步骤状态（在无进度条时静默跳过）
                    for (let i = 1; i <= 5; i++) {
                        const stepElement = elements.steps && elements.steps[`step${i}`];
                        if (!stepElement) continue;
                        if (i < step) {
                            stepElement.classList.add('completed');
                            stepElement.classList.remove('active');
                        } else if (i === step) {
                            stepElement.classList.add('active');
                            stepElement.classList.remove('completed');
                        } else {
                            stepElement.classList.remove('completed', 'active');
                        }
                    }
                } catch(_) {}
            }
        };
