/* Lightweight SVG icon system with progressive FA replacement */
(function () {
  const sprite = `\
<svg id="app-svg-sprite" xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">\
  <symbol id="i-generic" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/></symbol>\
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></symbol>\
  <!-- Filled check for crisper small sizes -->\
  <symbol id="i-check-solid" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></symbol>\
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></symbol>\
  <symbol id="i-help-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></symbol>\
  <symbol id="i-sliders" viewBox="0 0 24 24"><line x1="8" y1="4" x2="8" y2="20"/><circle cx="8" cy="8" r="2"/><line x1="16" y1="4" x2="16" y2="20"/><circle cx="16" cy="14" r="2"/></symbol>\
  <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M12 3v6"/><path d="M12 15v6"/><path d="M3 12h6"/><path d="M15 12h6"/><path d="M5 5l4 4"/><path d="M15 15l4 4"/><path d="M19 5l-4 4"/><path d="M5 19l4-4"/></symbol>\
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>\
  <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><rect x="3" y="3" width="12" height="12" rx="2"/></symbol>\
  <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"/><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"/></symbol>\
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>\
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="3" y1="11" x2="21" y2="11"/></symbol>\
  <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></symbol>\
  <symbol id="i-mobile" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></symbol>\
  <symbol id="i-chart-line" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M19 7l-6 6-4-4-4 4"/></symbol>\
  <symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M3 3h2l2 12h12l2-8H6"/></symbol>\
  <symbol id="i-bullhorn" viewBox="0 0 24 24"><path d="M20 8v8l-8 3V5l8 3z"/><path d="M4 10v6a3 3 0 0 0 6 0v-1"/></symbol>\
  <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>\
  <symbol id="i-bars" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>\
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 6-3 8h18c0-2-3  -1-3-8"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></symbol>\
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>\
  <symbol id="i-ellipsis" viewBox="0 0 24 24"><circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></symbol>\
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></symbol>\
  <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></symbol>\
  <symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></symbol>\
  <symbol id="i-arrows-v" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M8 9l4-4 4 4"/><path d="M8 15l4 4 4-4"/></symbol>\
  <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></symbol>\
  <symbol id="i-bread" viewBox="0 0 24 24"><path d="M6 7a6 6 0 0 1 12 0v10a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7z"/></symbol>\
  <symbol id="i-building" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M12 21v-4"/></symbol>\
  <symbol id="i-bullseye" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2"/></symbol>\
  <symbol id="i-chart-bar" viewBox="0 0 24 24"><path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="7" rx="1"/><rect x="12" y="6" width="3" height="11" rx="1"/><rect x="17" y="13" width="3" height="4" rx="1"/></symbol>\
  <symbol id="i-chart-pie" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l7 7"/></symbol>\
  <symbol id="i-code" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6"/><path d="M8 6L2 12l6 6"/></symbol>\
  <symbol id="i-columns" viewBox="0 0 24 24"><rect x="3" y="4" width="8" height="16" rx="2"/><rect x="13" y="4" width="8" height="16" rx="2"/></symbol>\
  <symbol id="i-comment-dots" viewBox="0 0 24 24"><path d="M21 15a7 7 0 1 1-3-12.5"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></symbol>\
  <symbol id="i-comments" viewBox="0 0 24 24"><path d="M21 15a7 7 0 1 1-3-12.5"/><path d="M3 17l2 4 4-2"/></symbol>\
  <symbol id="i-cookie" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="8" r="1"/><circle cx="14" cy="14" r="1"/></symbol>\
  <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12V9z"/><path d="M14 3v6h6"/></symbol>\
  <symbol id="i-paint" viewBox="0 0 24 24"><path d="M4 14h16"/><path d="M4 10h16"/><path d="M4 6h16"/><path d="M20 18H4l2 3h12z"/></symbol>\
  <symbol id="i-film" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 8h18M3 16h18"/></symbol>\
  <symbol id="i-filter" viewBox="0 0 24 24"><path d="M22 3H2l8 10v6l4 2v-8z"/></symbol>\
  <symbol id="i-fingerprint" viewBox="0 0 24 24"><path d="M12 11a4 4 0 0 1 4 4v3"/><path d="M8 21v-5a8 8 0 1 1 16 0v5" transform="translate(-4 0)"/></symbol>\
  <symbol id="i-graduation" viewBox="0 0 24 24"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5a6 6 0 0 0 12 0v-5"/></symbol>\
  <symbol id="i-hand-usd" viewBox="0 0 24 24"><path d="M3 15h8a4 4 0 0 1 4 4v1H9a4 4 0 0 1-4-4z"/><path d="M16 7c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2 2 .9 2 2-2 2-2 2"/></symbol>\
  <symbol id="i-hashtag" viewBox="0 0 24 24"><path d="M5 9h14M3 15h14M10 3L8 21M18 3l-2 18"/></symbol>\
  <symbol id="i-heartbeat" viewBox="0 0 24 24"><path d="M20.8 8.6a5.5 5.5 0 0 0-9.8-3.1A5.5 5.5 0 0 0 1.2 8.6c0 7.1 10 12.8 10 12.8s10-5.7 10-12.8z"/><path d="M3 10h4l2-3 3 6 2-3h7"/></symbol>\
  <symbol id="i-hourglass" viewBox="0 0 24 24"><path d="M6 2h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V2z"/><path d="M6 22h12v-4a6 6 0 0 0-6-6 6 6 0 0 0-6 6v4z"/></symbol>\
  <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M21 19l-7-7-5 5-3-3-3 3"/></symbol>\
  <symbol id="i-images" viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="12" rx="2"/><rect x="3" y="5" width="14" height="12" rx="2"/><path d="M17 19l-5-5-4 4"/></symbol>\
  <symbol id="i-key" viewBox="0 0 24 24"><circle cx="7" cy="14" r="3"/><path d="M10 14h11l-3 3 3 3"/></symbol>\
  <symbol id="i-language" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4 12h16"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/><path d="M8 8h4M8 12h2"/></symbol>\
  <symbol id="i-list-ul" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></symbol>\
  <symbol id="i-location-arrow" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></symbol>\
  <symbol id="i-map-marker" viewBox="0 0 24 24"><path d="M12 22s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="11" r="3"/></symbol>\
  <symbol id="i-mouse" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="20" rx="4"/><path d="M12 6v4"/></symbol>\
  <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0-9-9 4 4 0 0 0 4 4h1a2 2 0 1 1 0 4h1a2 2 0 0 0 2 1z"/></symbol>\
  <symbol id="i-plane" viewBox="0 0 24 24"><path d="M10 21l-2-2 6-7-7-6 2-2 12 9-11 8z"/></symbol>\
  <symbol id="i-qrcode" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM19 14h2v2h-2zM17 19h-3v2h3z"/></symbol>\
  <symbol id="i-quote-left" viewBox="0 0 24 24"><path d="M10 7H6a4 4 0 0 0-4 4v6h8V9a2 2 0 0 0-2-2z"/><path d="M22 7h-4a4 4 0 0 0-4 4v6h8V9a2 2 0 0 0-2-2z"/></symbol>\
  <symbol id="i-robot" viewBox="0 0 24 24"><rect x="6" y="7" width="12" height="10" rx="2"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M12 7V4"/><path d="M8 17v2M16 17v2"/></symbol>\
  <symbol id="i-rss" viewBox="0 0 24 24"><circle cx="5" cy="19" r="1"/><path d="M4 11a8 8 0 0 1 8 8"/><path d="M4 5a14 14 0 0 1 14 14"/></symbol>\
  <symbol id="i-search-location" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8a3 3 0 0 1 3 3c0 2-3 5-3 5s-3-3-3-5a3 3 0 0 1 3-3z"/></symbol>\
  <symbol id="i-share" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/></symbol>\
  <symbol id="i-share-square" viewBox="0 0 24 24"><path d="M4 12v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></symbol>\
  <symbol id="i-shopping-bag" viewBox="0 0 24 24"><path d="M6 7h12l1 13H5z"/><path d="M9 10a3 3 0 0 1 6 0"/></symbol>\
  <symbol id="i-sign-in" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></symbol>\
  <symbol id="i-spinner" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/></symbol>\
  <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.27l-7.19-.61L12 2 9.19 8.66 2 9.27l5.46 4.7L5.82 21z"/></symbol>\
  <symbol id="i-swipe" viewBox="0 0 24 24"><path d="M3 12h6M3 12l2-2M3 12l2 2"/><path d="M12 12l7 2-2 7-6-2V7a2 2 0 0 1 4 0v5"/></symbol>\
  <symbol id="i-sync" viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15 6l-2 2v-6h6l-2 2a7 7 0 0 0 11-4"/><path d="M3 12a9 9 0 0 1 15-6l2-2v6h-6l2-2a7 7 0 0 0-11 4"/></symbol>\
  <symbol id="i-table" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 5v14M15 5v14"/></symbol>\
  <symbol id="i-tags" viewBox="0 0 24 24"><path d="M7 7l10 10-4 4L3 11V7z"/><circle cx="9" cy="9" r="1"/><path d="M17 7l4 4-4 4"/></symbol>\
  <symbol id="i-tasks" viewBox="0 0 24 24"><path d="M3 6h12M3 12h12M3 18h12"/><path d="M19 6l2 2-4 4-2-2"/></symbol>\
  <symbol id="i-terminal" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8l4 4-4 4"/><path d="M13 16h4"/></symbol>\
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></symbol>\
  <symbol id="i-thermometer" viewBox="0 0 24 24"><path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0z"/></symbol>\
  <symbol id="i-video" viewBox="0 0 24 24"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 8l5-3v14l-5-3z"/></symbol>\
  <symbol id="i-window" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></symbol>\
  <symbol id="i-exclamation-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 7v6"/><path d="M12 17h.01"/></symbol>\
  <symbol id="i-exclamation-triangle" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></symbol>\
</svg>`;

  const mapping = {
    'wand-magic-sparkles': 'i-sparkles',
    magic: 'i-sparkles',
    cog: 'i-sliders',
    gear: 'i-sliders',
    question: 'i-help-circle',
    'question-circle': 'i-help-circle',
    check: 'i-check-solid',
    'check-circle': 'i-check-circle',
    search: 'i-search',
    copy: 'i-copy',
    link: 'i-link',
    envelope: 'i-mail',
    'calendar-day': 'i-calendar',
    'calendar-alt': 'i-calendar',
    globe: 'i-globe',
    'mobile-alt': 'i-mobile',
    'mobile-screen-button': 'i-mobile',
    'chart-line': 'i-chart-line',
    'shopping-cart': 'i-cart',
    bullhorn: 'i-bullhorn',
    users: 'i-users',
    bars: 'i-bars',
    bell: 'i-bell',
    'chevron-down': 'i-chevron-down',
    'ellipsis-h': 'i-ellipsis',
    times: 'i-close',
    th: 'i-grid',
    cubes: 'i-grid',
    'users-cog': 'i-users',
    'id-card': 'i-file',
    'sliders-h': 'i-sliders',
    list: 'i-list-ul',
    stream: 'i-ellipsis',
    tree: 'i-globe',
    certificate: 'i-star',
    'user-friends': 'i-users',
    'calendar-week': 'i-calendar',
    'i-cursor': 'i-terminal',
    'info-circle': 'i-exclamation-circle',
    sort: 'i-arrows-v',
    'list-ol': 'i-list-ul',
    music: 'i-bell',
    map: 'i-map-marker',
    fire: 'i-bolt',
    route: 'i-location-arrow',
    'map-marked-alt': 'i-map-marker',
    'credit-card': 'i-key',
    'cash-register': 'i-credit-card',
    'shipping-fast': 'i-plane',
    'star-half-alt': 'i-star',
    tag: 'i-tags',
    'box-open': 'i-file',
    'ticket-alt': 'i-tags',
    coins: 'i-tags',
    'align-right': 'i-chevron-down',
    'arrow-left': 'i-arrow-left',
    'arrow-up': 'i-arrow-up',
    'arrows-alt-v': 'i-arrows-v',
    bolt: 'i-bolt',
    'bread-slice': 'i-bread',
    building: 'i-building',
    bullseye: 'i-bullseye',
    'chart-bar': 'i-chart-bar',
    'chart-pie': 'i-chart-pie',
    code: 'i-code',
    columns: 'i-columns',
    'comment-dots': 'i-comment-dots',
    comments: 'i-comments',
    'cookie-bite': 'i-cookie',
    'file-alt': 'i-file',
    'fill-drip': 'i-paint',
    film: 'i-film',
    filter: 'i-filter',
    fingerprint: 'i-fingerprint',
    'graduation-cap': 'i-graduation',
    'hand-holding-usd': 'i-hand-usd',
    hashtag: 'i-hashtag',
    heartbeat: 'i-heartbeat',
    'hourglass-half': 'i-hourglass',
    image: 'i-image',
    images: 'i-images',
    key: 'i-key',
    language: 'i-language',
    'list-ul': 'i-list-ul',
    'location-arrow': 'i-location-arrow',
    'map-marker-alt': 'i-map-marker',
    'mouse-pointer': 'i-mouse',
    palette: 'i-palette',
    plane: 'i-plane',
    qrcode: 'i-qrcode',
    'quote-left': 'i-quote-left',
    robot: 'i-robot',
    rss: 'i-rss',
    'search-location': 'i-search-location',
    'share-alt': 'i-share',
    'share-square': 'i-share-square',
    'shopping-bag': 'i-shopping-bag',
    'sign-in-alt': 'i-sign-in',
    spinner: 'i-spinner',
    star: 'i-star',
    swipe: 'i-swipe',
    'sync-alt': 'i-sync',
    table: 'i-table',
    tags: 'i-tags',
    tasks: 'i-tasks',
    terminal: 'i-terminal',
    'th-large': 'i-grid',
    'thermometer-half': 'i-thermometer',
    video: 'i-video',
    'window-maximize': 'i-window',
    'exclamation-circle': 'i-exclamation-circle',
    'exclamation-triangle': 'i-exclamation-triangle'
  };

  function injectSprite() {
    if (document.getElementById('app-svg-sprite')) return;
    const holder = document.createElement('div');
    holder.style.position = 'absolute';
    holder.style.width = '0';
    holder.style.height = '0';
    holder.style.overflow = 'hidden';
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = sprite;
    document.body.prepend(holder);
  }

  function classToId(classList) {
    for (const c of classList) {
      if (c.startsWith('fa-')) {
        const name = c.slice(3);
        if (mapping[name]) return mapping[name];
      }
    }
    // if any fa-* exists but unmapped, return generic fallback
    for (const c of classList) if (c.startsWith('fa-')) return 'i-generic';
    return null;
  }

  const sizeMap = new Map([
    ['text-xs', 'icon-sm'],
    ['text-sm', 'icon-sm'],
    ['text-base', 'icon-md'],
    ['text-lg', 'icon-md'],
    ['text-xl', 'icon-lg'],
    ['text-2xl', 'icon-xl'],
    ['text-3xl', 'icon-xl'],
    ['text-4xl', 'icon-xl'],
    ['text-5xl', 'icon-xl'],
    ['text-6xl', 'icon-xl'],
    ['text-7xl', 'icon-xl']
  ]);

  function replaceFaInScope(root) {
    const scope = root || document;
    const list = [];
    if (scope.matches && scope.matches('i.fa, i.fas, i.far, i.fal, i.fab')) list.push(scope);
    list.push(...scope.querySelectorAll('i.fa, i.fas, i.far, i.fal, i.fab'));
    for (const node of list) {
      const id = classToId(node.classList);
      if (!id) continue;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'icon');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      // Use an integer base stroke for better pixel-fitting. Per-size tuning is in CSS.
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', `#${id}`);
      // also set xlink:href for broader compatibility
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${id}`);
      // Keep strokes crisp across sizes
      use.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(use);
      // keep non-FA utility classes; normalize Tailwind text-* size to icon-* size
      const keepRaw = Array.from(node.classList).filter(c => !/^fa[srlb]?$/.test(c) && !c.startsWith('fa-'));
      const keep = [];
      let sized = false;
      for (const c of keepRaw) {
        if (sizeMap.has(c)) {
          keep.push(sizeMap.get(c));
          sized = true;
        } else if (/^text-/.test(c)) {
          // drop Tailwind text color utilities on icons to unify via tokens
          // (size utilities are handled above)
          continue;
        } else {
          keep.push(c);
        }
      }
      if (node.classList.contains('fa-spin') || node.classList.contains('fa-spinner')) keep.push('icon-spin');
      // ensure a predictable default size class
      if (!sized) keep.push('icon-md');
      const extra = /-solid$/.test(id) ? ' icon-filled' : '';
      svg.setAttribute('class', `icon${extra} ${keep.join(' ')}`);
      node.replaceWith(svg);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectSprite();

    // Mark decorative <i> icons as aria-hidden for a11y, before replacement
    try {
      const faNodes = document.querySelectorAll('i.fa, i.fas, i.far, i.fal, i.fab');
      faNodes.forEach(n => n.setAttribute('aria-hidden', 'true'));
    } catch (_) {}

    // First sweep
    replaceFaInScope(document);

    // Observe dynamic DOM changes and replace icons on the fly (scoped and throttled)
    let rafToken = 0;
    const queue = new Set();
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          for (const n of m.addedNodes) {
            if (n && n.nodeType === 1) queue.add(n);
          }
        } else if (m.type === 'attributes' && m.target && m.target.nodeType === 1) {
          queue.add(m.target);
        }
      }
      if (!rafToken) {
        rafToken = requestAnimationFrame(() => {
          const scopes = Array.from(queue);
          queue.clear();
          rafToken = 0;
          for (const s of scopes) replaceFaInScope(s);
        });
      }
    });
    // Narrow observation scope to known dynamic containers instead of the whole body
    const targets = [
      document.getElementById('purposesContainer'),
      document.getElementById('industriesContainer'),
      document.getElementById('stylesContainer'),
      document.getElementById('componentContainer'),
      document.getElementById('currentSelectionCard'),
      document.getElementById('outputRightCard')
    ].filter(Boolean);
    const config = { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] };
    if (targets.length) {
      targets.forEach(t => observer.observe(t, config));
    } else {
      // Fallback: if not found, observe the main container to avoid watching entire body
      const root = document.querySelector('.container') || document.body;
      observer.observe(root, config);
    }

    // Listen for explicit refresh requests from other modules
    document.addEventListener('icons:refresh', (e) => {
      try { replaceFaInScope(e.detail?.scope || document); } catch (_) {}
    });

    // Remove Font Awesome CSS once it's loaded or already available
    try {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .filter(l => /font-awesome|fortawesome/i.test(l.getAttribute('href') || ''));
      links.forEach(l => {
        const removeLink = () => { try { l.parentNode && l.parentNode.removeChild(l); } catch (_) {} };
        if (l.sheet) {
          // already loaded
          removeLink();
        } else {
          l.addEventListener('load', removeLink, { once: true });
          l.addEventListener('error', removeLink, { once: true });
        }
      });
    } catch (_) {}
  });
})();
