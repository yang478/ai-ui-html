// Lightweight state manager and share/import helpers
(function() {
  const SM = {
    get() { return window.state || {}; },
    getSelections() { return (window.state && window.state.selections) || {}; },
    setSelection(key, value, silent=false) {
      if (!window.state) return;
      window.state.selections = window.state.selections || {};
      const prev = { ...window.state.selections };
      window.state.selections[key] = value;
      if (!silent) this.emitChange({ type: 'selection', key, value, prev });
    },
    replaceSelections(next, silent=false) {
      if (!window.state) return;
      const prev = { ...window.state.selections };
      window.state.selections = { ...prev, ...next };
      if (!silent) this.emitChange({ type: 'selections', value: window.state.selections, prev });
    },
    emitChange(detail) {
      try { document.dispatchEvent(new CustomEvent('state:changed', { detail })); } catch(_) {
        document.dispatchEvent(new Event('state:changed'));
      }
    },
    // Base64 helpers for Unicode
    b64encode(str) { try { return btoa(unescape(encodeURIComponent(str))); } catch(_) { return ''; } },
    b64decode(b64) {
      try { return decodeURIComponent(escape(atob(b64))); } catch(_) { return ''; }
    },
    buildShareQuery() {
      const sel = this.getSelections();
      const payload = JSON.stringify(sel);
      return 'config=' + encodeURIComponent(this.b64encode(payload));
    },
    buildShareUrl() {
      const base = location.origin + location.pathname;
      const q = this.buildShareQuery();
      return base + '?' + q;
    },
    parseConfigFromUrl() {
      const params = new URLSearchParams(location.search);
      const raw = params.get('config');
      if (!raw) return null;
      const json = this.b64decode(decodeURIComponent(raw));
      try { return JSON.parse(json); } catch(_) { return null; }
    },
    applyUrlConfig() {
      const cfg = this.parseConfigFromUrl();
      if (!cfg) return false;
      this.replaceSelections(cfg, true);
      // Apply to UI using selectionManager handlers if available
      try {
        // Purpose
        if (cfg.purpose) {
          const el = document.querySelector(`.purpose-card[data-purpose="${cfg.purpose}"]`);
          if (el && window.selectionManager?.handlePurposeSelection) {
            window.selectionManager.handlePurposeSelection(el);
          }
        }
        // Industry
        if (cfg.industry && document.getElementById('industriesContainer')) {
          const tag = document.querySelector(`.industry-tag[data-industry="${cfg.industry}"]`);
          if (tag && window.selectionManager?.handleIndustrySelection) {
            window.selectionManager.handleIndustrySelection(tag);
          }
        }
        // Style
        if (cfg.style) {
          const el = document.querySelector(`.style-card[data-style="${cfg.style}"]`);
          if (el && window.selectionManager?.handleStyleSelection) {
            window.selectionManager.handleStyleSelection(el);
          }
        }
        // Color
        if (cfg.color && window.selectionManager?.updateSelectionDisplay) {
          this.setSelection('color', cfg.color, true);
          const input = document.getElementById('customColorInput');
          const preview = document.getElementById('customColorPreview');
          if (input) input.value = cfg.color;
          if (preview) preview.style.backgroundColor = cfg.color;
          const hidden = document.getElementById('hiddenColorPicker');
          if (hidden) hidden.value = cfg.color;
          window.selectionManager.updateSelectionDisplay('color');
        }
        // Components
        if (Array.isArray(cfg.components) && cfg.components.length) {
          const allTags = document.querySelectorAll('.component-tag');
          allTags.forEach(t => t.classList.remove('selected'));
          cfg.components.forEach(name => {
            const tag = Array.from(allTags).find(t => t.textContent.trim() === name);
            if (tag) tag.classList.add('selected');
          });
          window.state.selections.components = cfg.components.slice();
          if (window.componentManager?.updateComponentPreview) window.componentManager.updateComponentPreview();
          if (window.componentManager?.updateSelectionDisplay) window.componentManager.updateSelectionDisplay();
        }
        // Additional details
        if (typeof cfg.additionalDetails === 'string') {
          window.state.selections.additionalDetails = cfg.additionalDetails;
          const ta = document.getElementById('additionalDetails');
          if (ta) ta.value = cfg.additionalDetails;
        }
      } catch(_) {}
      this.emitChange({ type: 'import', value: cfg });
      return true;
    }
  };

  window.stateManager = SM;
})();
