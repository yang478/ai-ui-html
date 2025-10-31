        // 帮助模态管理
window.helpManager = {
            init() {
                const helpButton = elements.helpButton;
                const helpModal = document.getElementById('helpModal');
                const closeHelpModal = document.getElementById('closeHelpModal');
                const closeHelpModalFooter = document.getElementById('closeHelpModalFooter');
                if (!helpButton || !helpModal) return;

                const close = () => {
                    helpModal.classList.remove('show');
                    document.body.style.overflow = '';
                };
                const open = () => {
                    helpModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                };

                helpButton.addEventListener('click', open);
                closeHelpModal?.addEventListener('click', close);
                closeHelpModalFooter?.addEventListener('click', close);
                helpModal.addEventListener('click', (e) => {
                    if (e.target === helpModal) close();
                });
            }
        };
