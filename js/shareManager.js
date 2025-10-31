// Share/Export manager for selections and prompt
(function(){
  const M = {
    init() {
      const btnShare = document.getElementById('copyShareLink');
      const btnJson = document.getElementById('exportJson');
      const btnMd = document.getElementById('exportMarkdown');
      if (btnShare) btnShare.addEventListener('click', () => this.copyShareLink());
      if (btnJson) btnJson.addEventListener('click', () => this.exportJson());
      if (btnMd) btnMd.addEventListener('click', () => this.exportMarkdown());
    },
    copyShareLink() {
      try {
        const url = window.stateManager?.buildShareUrl?.() || location.href;
        navigator.clipboard.writeText(url).then(() => this.toast('分享链接已复制'));
      } catch(err) {
        this.toast('复制失败，请手动复制', 'error');
      }
    },
    exportJson() {
      const data = window.stateManager?.getSelections?.() || {};
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      this.downloadBlob(blob, 'ui_prompt_config.json');
    },
    exportMarkdown() {
      let content = '';
      try {
        content = window.promptManager?.getCurrentPrompt?.() || window.promptManager?.buildPrompt?.() || '';
      } catch(_) {}
      if (!content) content = '（空）';
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      this.downloadBlob(blob, 'ui_prompt.md');
    },
    downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    },
    toast(message, type='success') {
      const div = document.createElement('div');
      div.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${type==='success'?'bg-green-500':'bg-red-500'} shadow-lg z-50 transform transition-transform duration-300 translate-y-10 opacity-0`;
      div.textContent = message;
      document.body.appendChild(div);
      setTimeout(()=>{ div.classList.remove('translate-y-10','opacity-0'); },10);
      setTimeout(()=>{ div.classList.add('translate-y-10','opacity-0'); setTimeout(()=>div.remove(),300); }, 2000);
    }
  };
  window.shareManager = M;
})();
