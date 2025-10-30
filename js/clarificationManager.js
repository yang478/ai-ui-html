window.clarificationManager = {
  currentCardIndex: 0,
  answers: {},

  init() {
    this.bindEvents();
  },

  getCards() {
    // Prefer dynamic rules if provided
    try {
      if (window.clarificationRules?.buildClarificationCards) {
        return window.clarificationRules.buildClarificationCards(window.state, window.CONFIG) || [];
      }
    } catch(_) {}
    const purpose = (window.state?.selections?.purpose) || 'default';
    const cards = (window.CONFIG?.clarificationCards?.[purpose]) || (window.CONFIG?.clarificationCards?.default) || [];
    return cards;
  },

  findCard(cardId) {
    return this.getCards().find(c => c.id === cardId);
  },

  renderCards() {
    const container = document.getElementById('clarificationCardContainer');
    if (!container) return;
    const cards = this.getCards();
    if (!cards.length) {
      container.innerHTML = '<div class="text-gray-500">暂无可用的澄清卡片</div>';
      return;
    }
    this.currentCardIndex = 0;
    container.innerHTML = cards.map((card, index) => `
      <div class="card p-4" data-card-id="${card.id}" data-card-index="${index}">
        ${card.title ? `<h3 class="font-bold text-lg mb-2">${card.title}</h3>` : ''}
        ${card.question ? `<p class="mb-4">${card.question}</p>` : ''}
        <div class="flex flex-wrap gap-2">
          ${(card.options || []).map(opt => `
            <button class="tag px-4 py-2 rounded-full" data-option="${opt}">${opt}</button>
          `).join('')}
        </div>
        ${card.allowCustom ? `
        <div class="mt-3 flex gap-2">
          <input type="text" id="clarCustom-${card.id}" data-card-id="${card.id}"
            class="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="${card.customPlaceholder || '自定义补充...'}">
          <button class="icon-button icon-button--neutral rounded-md px-3 py-2" data-action="add-custom" data-card-id="${card.id}">添加</button>
        </div>
        ` : ''}
      </div>
    `).join('');
    this.updateNavControls();
  },

  bindEvents() {
    const container = document.getElementById('clarificationCardContainer');
    if (container) {
      container.addEventListener('click', (e) => {
        const tagBtn = e.target.closest('button.tag[data-option]');
        if (tagBtn) {
          const cardEl = tagBtn.closest('[data-card-id]');
          const cardId = cardEl?.dataset?.cardId;
          const option = tagBtn.dataset.option;
          const cfg = this.findCard(cardId);
          if (cfg?.multiSelect) {
            this.toggleMultiOption(cardId, option, tagBtn);
          } else {
            this.selectSingleOption(cardId, option, tagBtn);
          }
          return;
        }

        const addBtn = e.target.closest('button[data-action="add-custom"]');
        if (addBtn) {
          const cardId = addBtn.dataset.cardId;
          this.addCustomAnswer(cardId);
        }
      });

      container.addEventListener('keydown', (e) => {
        const input = e.target.closest('input[id^="clarCustom-"]');
        if (!input) return;
        if (e.key === 'Enter') {
          const cardId = input.dataset.cardId;
          this.addCustomAnswer(cardId);
        }
      });
    }

    const nextBtn = document.getElementById('nextClarification');
    const prevBtn = document.getElementById('prevClarification');
    const skipBtn = document.getElementById('skipClarification');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const cards = this.getCards();
      const isLast = this.currentCardIndex >= (cards.length - 1);
      if (isLast) {
        this.finish();
      } else {
        this.nextCard();
      }
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (this.currentCardIndex <= 0) {
        this.goBackToStep1();
      } else {
        this.prevCard();
      }
    });
    if (skipBtn) skipBtn.addEventListener('click', () => this.skip());
  },

  ensureArrayAnswer(cardId) {
    if (!Array.isArray(this.answers[cardId])) this.answers[cardId] = [];
  },

  toggleMultiOption(cardId, option, btnEl) {
    if (!cardId) return;
    this.ensureArrayAnswer(cardId);
    const list = this.answers[cardId];
    const idx = list.indexOf(option);
    if (idx >= 0) {
      list.splice(idx, 1);
      btnEl.classList.remove('selected');
    } else {
      list.push(option);
      btnEl.classList.add('selected');
    }
    try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
  },

  selectSingleOption(cardId, option, btnEl) {
    if (!cardId) return;
    this.answers[cardId] = option;
    // 视觉反馈：单选卡仅保留当前选中
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!card) return;
    card.querySelectorAll('.tag').forEach(t => t.classList.remove('selected'));
    if (btnEl) btnEl.classList.add('selected');
    try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
  },

  addCustomAnswer(cardId) {
    const input = document.getElementById(`clarCustom-${cardId}`);
    if (!input) return;
    const text = (input.value || '').trim();
    if (!text) return;
    const cfg = this.findCard(cardId);
    if (cfg?.multiSelect) {
      this.ensureArrayAnswer(cardId);
      if (!this.answers[cardId].includes(text)) this.answers[cardId].push(text);
    } else {
      this.answers[cardId] = text;
    }
    // 在选项区追加一个选中态标签供视觉反馈
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    const tagsWrap = card?.querySelector('.flex.flex-wrap.gap-2');
    if (tagsWrap) {
      const chip = document.createElement('button');
      chip.className = 'tag px-4 py-2 rounded-full selected';
      chip.dataset.option = text;
      chip.textContent = text;
      tagsWrap.appendChild(chip);
    }
    input.value = '';
    try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
  },

  nextCard() {
    const cards = this.getCards();
    const container = document.getElementById('clarificationCardContainer');
    if (!container || !cards.length) return;
    const current = container.querySelector(`[data-card-index="${this.currentCardIndex}"]`);
    if (current) current.classList.add('hidden');
    this.currentCardIndex = Math.min(this.currentCardIndex + 1, cards.length - 1);
    const next = container.querySelector(`[data-card-index="${this.currentCardIndex}"]`);
    if (next) next.classList.remove('hidden');
    this.updateNavControls();
  },

  prevCard() {
    const cards = this.getCards();
    const container = document.getElementById('clarificationCardContainer');
    if (!container || !cards.length) return;
    const current = container.querySelector(`[data-card-index="${this.currentCardIndex}"]`);
    if (current) current.classList.add('hidden');
    this.currentCardIndex = Math.max(this.currentCardIndex - 1, 0);
    const prev = container.querySelector(`[data-card-index="${this.currentCardIndex}"]`);
    if (prev) prev.classList.remove('hidden');
    this.updateNavControls();
  },

  goBackToStep1() {
    const clarStep = document.getElementById('wizardStep1_5');
    if (clarStep) clarStep.classList.add('hidden');
    if (elements?.wizardSteps?.step1) elements.wizardSteps.step1.classList.remove('hidden');
    if (typeof window.wizardManager?.updateProgress === 'function') {
      window.wizardManager.updateProgress(1);
    }
    if (window.state) window.state.currentStep = 1;
    try { window.wizardManager.clarificationActive = false; } catch(_) {}
  },

  applyMappings() {
    const cards = this.getCards();
    let customDetailParts = [];
    let summaryParts = [];
    cards.forEach(card => {
      const answer = this.answers[card.id];
      const applyOne = (val) => {
        const map = card.mapping?.[val];
        if (map?.style) window.state.selections.style = map.style;
        if (Array.isArray(map?.components) && map.components.length) {
          const set = new Set(window.state.selections.components || []);
          map.components.forEach(c => set.add(c));
          window.state.selections.components = Array.from(set);
        }
        // 若不是预设选项，则视为自定义，汇总到 additionalDetails
        if (!(card.options || []).includes(val)) {
          customDetailParts.push(`${card.title || card.question || card.id}: ${val}`);
        }
      };
      if (Array.isArray(answer)) {
        answer.forEach(applyOne);
        if (answer.length) {
          summaryParts.push(`${card.title || card.question || card.id}: ${answer.join('、')}`);
        }
      } else if (typeof answer === 'string' && answer) {
        applyOne(answer);
        summaryParts.push(`${card.title || card.question || card.id}: ${answer}`);
      }
    });
    if (customDetailParts.length) {
      const extra = customDetailParts.join('；');
      const prev = window.state.selections.additionalDetails || '';
      window.state.selections.additionalDetails = prev ? `${prev}\n${extra}` : extra;
    }
    // 保存简要汇总，便于在提示词中直接体现澄清选择
    if (summaryParts.length) {
      window.state.selections.clarificationSummary = summaryParts.join('；');
    }
  },

  finish() {
    this.applyMappings();
    this.hide();
    if (window.wizardManager?.moveToStep) window.wizardManager.moveToStep(2);
  },

  skip() {
    this.hide();
    if (window.wizardManager?.moveToStep) window.wizardManager.moveToStep(2);
  },

  hide() {
    const clarStep = document.getElementById('wizardStep1_5');
    if (clarStep) clarStep.classList.add('hidden');
    this.currentCardIndex = 0;
    this.answers = {};
  }
};

// 控制上一张按钮可用状态
window.clarificationManager.updateNavControls = function () {
  const prevBtn = document.getElementById('prevClarification');
  const nextBtn = document.getElementById('nextClarification');
  if (!prevBtn) return;
  const atFirst = this.currentCardIndex <= 0;
  // 在第一张时，prev 作为“返回”，保持可点击
  prevBtn.disabled = false;
  prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  prevBtn.textContent = atFirst ? '返回' : '上一张';

  if (nextBtn) {
    const cards = this.getCards();
    const isLast = this.currentCardIndex >= (cards.length - 1);
    nextBtn.textContent = isLast ? '完成' : '下一张';
  }
};
