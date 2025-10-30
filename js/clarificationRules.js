// Dynamic clarification rules: compose cards by purpose + industry + style
(function(){
  function dedupeById(list){
    const seen = new Set();
    const out = [];
    for (const item of list) {
      if (!item || !item.id) continue;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
    return out;
  }

  function styleExtraCard(style){
    if (!style) return null;
    // Provide a generic style nuance card
    return {
      id: 'styleNuance',
      title: '🎨 风格细化',
      question: `关于“${style}”风格的偏好？`,
      options: ['更极简', '更动效', '对比更强', '圆角/柔和', '扁平图标', '拟物质感'],
      multiSelect: true
    };
  }

  function buildClarificationCards(state, CONFIG){
    const sel = (state && state.selections) || {};
    const purpose = sel.purpose || 'default';
    const industry = sel.industry || '';
    const style = sel.style || '';
    const cc = (CONFIG && CONFIG.clarificationCards) || {};

    let cards = [];
    // Always start with default
    if (Array.isArray(cc.default)) cards = cards.concat(cc.default);
    // Add purpose-specific if available
    if (Array.isArray(cc[purpose])) cards = cards.concat(cc[purpose]);

    // Add industry-specific set if matches known keys
    const industryMap = {
      finance: 'finance',
      education: 'education',
      healthcare: 'health',
      health: 'health',
      travel: 'travel',
      ecommerce: 'ecommerce'
    };
    const mapped = industryMap[industry];
    if (mapped && Array.isArray(cc[mapped])) {
      cards = cards.concat(cc[mapped]);
    }

    // Add a generic style refinement card
    const extra = styleExtraCard(style);
    if (extra) cards.push(extra);

    // Dedupe by id and cap to a reasonable amount
    cards = dedupeById(cards);
    const MAX = 8;
    if (cards.length > MAX) cards = cards.slice(0, MAX);
    return cards;
  }

  window.clarificationRules = { buildClarificationCards };
})();

