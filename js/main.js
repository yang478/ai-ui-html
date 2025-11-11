/**
 * Apple Style AI Prompt Generator - Core Logic
 * A comprehensive single-file implementation.
 */

const app = (() => {
    // --- LLM Configuration ---
    const DEFAULT_LLM_CONFIG = {
        baseUrl: 'https://api.openai.com/v1',
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1000
    };

    // Load LLM config from LocalStorage
    let llmConfig = { ...DEFAULT_LLM_CONFIG };
    const savedConfig = localStorage.getItem('llmConfig');
    if (savedConfig) {
        try {
            const parsed = JSON.parse(savedConfig);
            llmConfig = { ...llmConfig, ...parsed };
        } catch (e) { console.error('Failed to load LLM config', e); }
    }

    // --- LLM Chat State ---
    let chatState = {
        isOpen: true,
        messages: []
    };

    // Load chat history
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
        try {
            const parsed = JSON.parse(savedChat);
            chatState.messages = parsed;
        } catch (e) { console.error('Failed to load chat history', e); }
    }

    // --- Data Models ---
    const DATA = {
        purposes: [
            { id: 'dashboard', title: '数据仪表盘', icon: '📊', desc: '用于数据可视化、分析和后台管理的复杂界面。' },
            { id: 'landing', title: '营销落地页', icon: '🚀', desc: '高转化率的产品介绍页面，强调视觉冲击力。' },
            { id: 'ecommerce', title: '电商平台', icon: '🛍️', desc: '商品展示、购物车和结账流程。' },
            { id: 'saas', title: 'SaaS 应用', icon: '💻', desc: '功能丰富的网络应用程序界面。' },
            { id: 'mobile', title: '移动端 App', icon: '📱', desc: 'iOS/Android 原生应用界面设计。' },
            { id: 'portfolio', title: '个人作品集', icon: '🎨', desc: '展示创意作品和个人简历的简约页面。' },
            { id: 'blog', title: '内容博客', icon: '📝', desc: '注重阅读体验的文章列表和详情页。' },
            { id: 'settings', title: '设置中心', icon: '⚙️', desc: '复杂的配置选项、表单和用户资料管理。' }
        ],
        styles: [
            { id: 'apple', title: 'Modern Apple', desc: '极致简约，大量留白，模糊半透明效果，完美的圆角和阴影。', color: '#007AFF' },
            { id: 'minimal', title: '极致极简', desc: '黑白为主，极少的装饰元素，强调排版和内容本身。', color: '#000000' },
            { id: 'material', title: 'Material V3', desc: 'Google设计语言，动态色彩，高对比度，卡片式布局。', color: '#6750A4' },
            { id: 'brutalist', title: '新粗野主义', desc: '大胆的边框，高饱和度色彩，复古且不拘一格的排版。', color: '#FF5722' },
            { id: 'corporate', title: '专业商务', desc: '稳重、值得信赖的蓝色系，传统的布局，信息密度较高。', color: '#0A66C2' },
            { id: 'playful', title: '活泼趣味', desc: '圆润的字体，鲜艳的色彩，丰富的微交互和插画元素。', color: '#FFC107' }
        ],
        // Enhanced Components: 18 categories, 100+ components
        components: {
            '导航': {
                icon: '🧭',
                color: '#007AFF',
                components: [
                    { id: 'navbar', name: '导航栏', desc: '标准水平导航，包含Logo和主菜单' },
                    { id: 'sidebar', name: '侧边栏', desc: '垂直折叠菜单，适合复杂后台系统' },
                    { id: 'breadcrumb', name: '面包屑导航', desc: '显示当前页面路径层级' },
                    { id: 'tabs', name: '选项卡', desc: '同级内容之间的快速切换' },
                    { id: 'menu', name: '下拉菜单', desc: '多级下拉导航菜单' },
                    { id: 'pagination', name: '分页', desc: '分页导航控件' },
                    { id: 'steps', name: '步骤条', desc: '显示流程步骤进度' },
                    { id: 'affix', name: '回到顶部', desc: '固定位置返回顶部按钮' }
                ]
            },
            '表单': {
                icon: '📝',
                color: '#34C759',
                components: [
                    { id: 'input', name: '文本输入', desc: '单行文本输入框' },
                    { id: 'textarea', name: '多行输入', desc: '多行文本输入区域' },
                    { id: 'select', name: '下拉选择', desc: '单选下拉选择器' },
                    { id: 'multiselect', name: '多选', desc: '多选下拉选择器' },
                    { id: 'checkbox', name: '复选框', desc: '多项选择控件' },
                    { id: 'radio', name: '单选框', desc: '单选项选择控件' },
                    { id: 'switch', name: '开关', desc: '开关切换控件' },
                    { id: 'slider', name: '滑块', desc: '范围选择滑块' },
                    { id: 'datepicker', name: '日期选择', desc: '日期选择器' },
                    { id: 'daterange', name: '日期范围', desc: '日期范围选择器' },
                    { id: 'timepicker', name: '时间选择', desc: '时间选择器' },
                    { id: 'upload', name: '文件上传', desc: '文件上传组件' },
                    { id: 'cascader', name: '级联选择', desc: '多级联动选择器' },
                    { id: 'rate', name: '评分', desc: '星级评分控件' },
                    { id: 'transfer', name: '穿梭框', desc: '双向选择组件' },
                    { id: 'autocomplete', name: '自动完成', desc: '带自动补全的输入框' }
                ]
            },
            '数据展示': {
                icon: '📊',
                color: '#FF9500',
                components: [
                    { id: 'table', name: '数据表格', desc: '带排序、筛选功能的表格' },
                    { id: 'list', name: '列表', desc: '垂直排列的信息列表' },
                    { id: 'card', name: '卡片', desc: '内容卡片容器' },
                    { id: 'badge', name: '徽章', desc: '状态或数量徽章' },
                    { id: 'tag', name: '标签', desc: '分类标签' },
                    { id: 'progress', name: '进度条', desc: '进度指示器' },
                    { id: 'avatar', name: '头像', desc: '用户头像展示' },
                    { id: 'statistic', name: '统计数字', desc: '数据统计展示' },
                    { id: 'descriptions', name: '描述列表', desc: '成对展示描述信息' },
                    { id: 'timeline', name: '时间轴', desc: '时间线展示' },
                    { id: 'tree', name: '树形控件', desc: '树形结构展示' }
                ]
            },
            '反馈': {
                icon: '💬',
                color: '#AF52DE',
                components: [
                    { id: 'alert', name: '警告框', desc: '重要提示信息' },
                    { id: 'modal', name: '模态框', desc: '弹窗对话框' },
                    { id: 'tooltip', name: '提示', desc: '悬停提示信息' },
                    { id: 'toast', name: '通知', desc: '全局通知提示' },
                    { id: 'skeleton', name: '骨架屏', desc: '加载占位动画' },
                    { id: 'spinner', name: '加载', desc: '加载中动画' },
                    { id: 'result', name: '结果页', desc: '操作结果展示' },
                    { id: 'empty', name: '空状态', desc: '无数据占位页' },
                    { id: 'confirm', name: '确认框', desc: '确认操作对话框' }
                ]
            },
            '布局': {
                icon: '📐',
                color: '#32ADE6',
                components: [
                    { id: 'grid', name: '栅格', desc: '响应式栅格布局' },
                    { id: 'flex', name: '弹性布局', desc: 'Flexbox弹性盒子' },
                    { id: 'container', name: '容器', desc: '内容容器' },
                    { id: 'divider', name: '分割线', desc: '内容分割线' },
                    { id: 'space', name: '间距', desc: '调整元素间距' },
                    { id: 'layout', name: '布局', desc: '页面整体布局' },
                    { id: 'col', name: '列', desc: '栅格列组件' },
                    { id: 'row', name: '行', desc: '栅格行组件' }
                ]
            },
            '内容': {
                icon: '📄',
                color: '#FF2D55',
                components: [
                    { id: 'typography', name: '排版', desc: '文字排版样式' },
                    { id: 'quote', name: '引用', desc: '引用文本块' },
                    { id: 'code', name: '代码', desc: '代码展示块' },
                    { id: 'image', name: '图片', desc: '图片展示组件' },
                    { id: 'video', name: '视频', desc: '视频播放器' },
                    { id: 'audio', name: '音频', desc: '音频播放器' }
                ]
            },
            '图表': {
                icon: '📈',
                color: '#5AC8FA',
                components: [
                    { id: 'line-chart', name: '折线图', desc: '趋势折线图表' },
                    { id: 'bar-chart', name: '柱状图', desc: '对比柱状图表' },
                    { id: 'pie-chart', name: '饼图', desc: '占比饼图' },
                    { id: 'area-chart', name: '面积图', desc: '区域面积图' },
                    { id: 'scatter-chart', name: '散点图', desc: '分布散点图' },
                    { id: 'radar-chart', name: '雷达图', desc: '多维雷达图' },
                    { id: 'gauge-chart', name: '仪表盘', desc: '仪表盘图表' },
                    { id: 'heatmap', name: '热力图', desc: '数据热力图' }
                ]
            },
            '导航菜单': {
                icon: '☰',
                color: '#30D158',
                components: [
                    { id: 'dropdown', name: '下拉菜单', desc: '下拉列表菜单' },
                    { id: 'contextmenu', name: '右键菜单', desc: '右键上下文菜单' },
                    { id: 'menu-button', name: '菜单按钮', desc: '带菜单的按钮' },
                    { id: 'mega-menu', name: '巨菜单', desc: '大型导航菜单' }
                ]
            },
            '数据输入': {
                icon: '⌨️',
                color: '#FF9F0A',
                components: [
                    { id: 'input-number', name: '数字输入', desc: '数字专用输入框' },
                    { id: 'input-password', name: '密码输入', desc: '密码输入框' },
                    { id: 'input-search', name: '搜索输入', desc: '带搜索按钮的输入框' },
                    { id: 'input-group', name: '输入组合', desc: '输入框组合控件' },
                    { id: 'input-size', name: '大中小输入框', desc: '不同尺寸输入框' },
                    { id: 'search-table', name: '搜索表格', desc: '带搜索的表格' }
                ]
            },
            '展示': {
                icon: '🖼️',
                color: '#BF5AF2',
                components: [
                    { id: 'image-preview', name: '图片预览', desc: '图片预览组件' },
                    { id: 'image-carousel', name: '图片轮播', desc: '图片轮播组件' },
                    { id: 'avatar-list', name: '头像列表', desc: '头像组展示' },
                    { id: 'preview', name: '文件预览', desc: '文件预览组件' },
                    { id: 'gallery', name: '图片画廊', desc: '图片画廊展示' }
                ]
            },
            '反馈状态': {
                icon: 'ℹ️',
                color: '#64D2FF',
                components: [
                    { id: 'message', name: '消息提示', desc: '页面内消息提示' },
                    { id: 'notification', name: '通知提醒', desc: '系统通知提醒' },
                    { id: 'popover', name: '气泡卡片', desc: '弹出气泡卡片' },
                    { id: 'popconfirm', name: '气泡确认', desc: '弹出确认框' },
                    { id: 'popselect', name: '气泡选择', desc: '弹出选择器' }
                ]
            },
            '高级数据': {
                icon: '🎯',
                color: '#FF375F',
                components: [
                    { id: 'tree-select', name: '树形选择', desc: '树形结构选择器' },
                    { id: 'tree-table', name: '树表格', desc: '树形结构表格' },
                    { id: 'drag-sort', name: '拖拽排序', desc: '拖拽排序组件' },
                    { id: 'resizable', name: '可调整大小', desc: '可调整列宽的表格' },
                    { id: 'fixed-columns', name: '固定列', desc: '固定列的表格' }
                ]
            },
            '业务组件': {
                icon: '💼',
                color: '#FFD60A',
                components: [
                    { id: 'transfer-business', name: '穿梭框', desc: '双向选择组件' },
                    { id: 'tour', name: '引导', desc: '产品功能引导' },
                    { id: 'watermark', name: '水印', desc: '页面水印' },
                    { id: 'anchor-nav', name: '锚点', desc: '页面锚点定位' }
                ]
            },
            '通用': {
                icon: '🔧',
                color: '#64D2FF',
                components: [
                    { id: 'button', name: '按钮', desc: '多种样式的按钮' },
                    { id: 'icon', name: '图标', desc: 'SVG图标组件' },
                    { id: 'link', name: '链接', desc: '文字链接' },
                    { id: 'text', name: '文本', desc: '纯文本展示' },
                    { id: 'paragraph', name: '段落', desc: '文本段落' },
                    { id: 'title', name: '标题', desc: '多级标题' }
                ]
            },
            '实验性': {
                icon: '🧪',
                color: '#BF5AF2',
                components: [
                    { id: 'color-picker', name: '颜色选择器', desc: '颜色选择组件' },
                    { id: 'cropper', name: '图片裁剪', desc: '图片裁剪组件' },
                    { id: 'flowchart', name: '流程图', desc: '可视化流程图' },
                    { id: 'mentions', name: '提及', desc: '@提及组件' },
                    { id: 'password-strength', name: '密码强度', desc: '密码强度检测' }
                ]
            },
            '移动端专用': {
                icon: '📱',
                color: '#30D158',
                components: [
                    { id: 'bottom-nav', name: '底部导航', desc: '移动端底部导航栏' },
                    { id: 'swipe-action', name: '滑动操作', desc: '滑动删除/收藏' },
                    { id: 'pull-refresh', name: '下拉刷新', desc: '下拉刷新组件' },
                    { id: 'action-sheet', name: '操作面板', desc: '底部弹出操作面板' },
                    { id: 'floating-button', name: '悬浮按钮', desc: '移动端悬浮按钮' },
                    { id: 'safe-area', name: '安全区域', desc: '适配刘海屏安全区域' }
                ]
            }
        }
    };

    // 组件统计信息
    const COMPONENT_STATS = {
        totalCategories: Object.keys(DATA.components).length,
        totalComponents: Object.values(DATA.components).reduce((sum, cat) => sum + cat.components.length, 0)
    };

    // --- State Management ---
    let state = {
        step: 1,
        purpose: null,
        style: null,
        primaryColor: '#007AFF', // Default
        components: new Set(),
        promptFormat: 'markdown'
    };

    // Load from LocalStorage
    const savedState = localStorage.getItem('promptCraftState');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            state = { ...state, ...parsed, components: new Set(parsed.components) };
        } catch (e) { console.error('Failed to load state', e); }
    }

    // --- DOM References ---
    const els = {
        stepTitle: document.getElementById('step-title'),
        stepDesc: document.getElementById('step-desc'),
        contentArea: document.getElementById('step-content-area'),
        progressFill: document.getElementById('progress-fill'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        footerStatus: document.getElementById('footer-status'),
        previewCanvas: document.getElementById('preview-canvas'),
        promptText: document.getElementById('prompt-text'),
        selectionTags: document.getElementById('selection-tags'),
        promptFormat: document.getElementById('prompt-format')
    };

    // --- Core Functions ---
    function saveState() {
        const toSave = { ...state, components: Array.from(state.components) };
        localStorage.setItem('promptCraftState', JSON.stringify(toSave));
        updateUI();
    }

    function updateUI() {
        // Update Progress
        els.progressFill.style.width = `${(state.step / 3) * 100}%`;
        els.footerStatus.textContent = `步骤 ${state.step} / 3`;
        
        // Update Buttons
        els.btnPrev.disabled = state.step === 1;
        els.btnNext.innerHTML = state.step === 3 ? 
            `生成完毕 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>` : 
            `下一步 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`;

        // Update Prompt & Preview regardless of step
        generatePrompt();
        updatePreview();
    }

    function renderStep() {
        els.contentArea.innerHTML = ''; // Clear previous content
        els.contentArea.className = 'animate-fade-in'; // Re-trigger animation

        switch(state.step) {
            case 1: renderPurposeStep(); break;
            case 2: renderStyleStep(); break;
            case 3: renderComponentsStep(); break;
        }
        updateUI();
    }

    // --- Step Renderers ---
    function renderPurposeStep() {
        els.stepTitle.textContent = '选择设计目的';
        els.stepDesc.textContent = '您希望构建什么样的用户界面？这将决定整体的结构布局。';
        
        const grid = document.createElement('div');
        grid.className = 'grid-cards';
        
        DATA.purposes.forEach(p => {
            const card = document.createElement('div');
            card.className = `selection-card ${state.purpose === p.id ? 'selected' : ''}`;
            card.onclick = () => { state.purpose = p.id; saveState(); renderStep(); };
            card.innerHTML = `
                <div class="check-mark"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                <div class="card-icon">${p.icon}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
            `;
            grid.appendChild(card);
        });
        els.contentArea.appendChild(grid);
    }

    function renderStyleStep() {
        els.stepTitle.textContent = '定义视觉风格';
        els.stepDesc.textContent = '选择一种设计语言，它将决定配色、排版和组件质感。';

        const grid = document.createElement('div');
        grid.className = 'grid-cards';
        
        DATA.styles.forEach(s => {
            const card = document.createElement('div');
            card.className = `selection-card ${state.style === s.id ? 'selected' : ''}`;
            card.onclick = () => { 
                state.style = s.id; 
                state.primaryColor = s.color; // Auto-set suggested color
                saveState(); 
                renderStep(); 
            };
            // Use a colored dot instead of emoji for style
            card.innerHTML = `
                <div class="check-mark"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                <div class="card-icon" style="color: ${s.color}">
                    <div style="width:24px; height:24px; background:currentColor; border-radius:50%;"></div>
                </div>
                <h3 class="card-title">${s.title}</h3>
                <p class="card-desc">${s.desc}</p>
            `;
            grid.appendChild(card);
        });

        // Extra: Color Picker (Simple version)
        const colorSection = document.createElement('div');
        colorSection.style.marginTop = '40px';
        colorSection.innerHTML = `
            <h3 class="category-title" style="position:static; margin-bottom:12px;">主色调</h3>
            <div class="flex gap-4 items-center">
                <input type="color" id="color-picker" value="${state.primaryColor}" style="height:40px; width:60px; padding:0; border:none; border-radius:8px; cursor:pointer;">
                <span class="text-secondary text-sm">点击色块自定义品牌色</span>
            </div>
        `;
        
        els.contentArea.appendChild(grid);
        els.contentArea.appendChild(colorSection);

        // Bind color picker after appending
        document.getElementById('color-picker').addEventListener('input', (e) => {
            state.primaryColor = e.target.value;
            saveState();
        });
    }

    function renderComponentsStep() {
        els.stepTitle.textContent = '配置功能组件';
        els.stepDesc.textContent = `选择页面中需要包含的关键功能模块（多选）。当前有 ${COMPONENT_STATS.totalCategories} 个类别，共 ${COMPONENT_STATS.totalComponents} 个组件`;

        // 添加搜索框
        const searchContainer = document.createElement('div');
        searchContainer.className = 'component-search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" id="component-search" placeholder="搜索组件...">
                <button id="clear-search" class="clear-btn hidden">×</button>
            </div>
        `;
        els.contentArea.appendChild(searchContainer);

        // 绑定搜索事件
        const searchInput = document.getElementById('component-search');
        const clearBtn = document.getElementById('clear-search');
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value;
            filterComponents(keyword);
            clearBtn.classList.toggle('hidden', !keyword);
        });
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterComponents('');
            clearBtn.classList.add('hidden');
        });

        // 渲染所有组件类别
        renderAllComponentCategories();
    }

    function renderAllComponentCategories() {
        // 清除旧的类别（保留搜索框）
        const oldCategories = els.contentArea.querySelectorAll('.component-category-section');
        oldCategories.forEach(cat => cat.remove());

        for (const [category, data] of Object.entries(DATA.components)) {
            const catContainer = createCategoryElement(category, data);
            els.contentArea.appendChild(catContainer);
        }
    }

    function createCategoryElement(category, data) {
        const section = document.createElement('div');
        section.className = 'component-category-section';
        section.setAttribute('data-category', category);

        const header = document.createElement('h3');
        header.className = 'category-header';
        header.innerHTML = `
            <span class="category-icon" style="color: ${data.color}">${data.icon}</span>
            <span class="category-title">${category}</span>
            <span class="component-count">${data.components.length} 个组件</span>
        `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'component-grid';

        data.components.forEach(comp => {
            const item = createComponentItem(comp, category);
            grid.appendChild(item);
        });

        section.appendChild(grid);
        return section;
    }

    function createComponentItem(comp, category) {
        const item = document.createElement('div');
        const isSelected = state.components.has(comp.id);
        item.className = `component-item ${isSelected ? 'selected' : ''}`;
        item.setAttribute('data-component-id', comp.id);
        item.setAttribute('data-category', category);

        item.onclick = () => {
            if (state.components.has(comp.id)) {
                state.components.delete(comp.id);
            } else {
                state.components.add(comp.id);
            }
            saveState();
            item.classList.toggle('selected', state.components.has(comp.id));
            const checkbox = item.querySelector('.checkbox-custom');
            if (checkbox) {
                checkbox.innerHTML = state.components.has(comp.id) ?
                    '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>' :
                    '';
            }
            updateUI();
        };

        item.innerHTML = `
            <div class="checkbox-custom">
                ${isSelected ? '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>' : ''}
            </div>
            <div class="component-info">
                <div class="component-name">${comp.name}</div>
                <div class="component-desc">${comp.desc}</div>
            </div>
        `;
        return item;
    }

    function filterComponents(keyword) {
        const categories = els.contentArea.querySelectorAll('.component-category-section');
        const lowerKeyword = keyword.toLowerCase();

        categories.forEach(category => {
            const items = category.querySelectorAll('.component-item');
            let visibleCount = 0;

            items.forEach(item => {
                const name = item.querySelector('.component-name')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('.component-desc')?.textContent.toLowerCase() || '';
                const isMatch = !keyword || name.includes(lowerKeyword) || desc.includes(lowerKeyword);

                item.style.display = isMatch ? 'flex' : 'none';
                if (isMatch) visibleCount++;
            });

            // 隐藏没有匹配项的类别
            category.style.display = visibleCount > 0 ? 'block' : 'none';
        });
    }

    // --- Preview Engine ---
    function updatePreview() {
        // 1. Update Canvas Style based on selection
        const root = els.previewCanvas;
        root.style.setProperty('--c-primary', state.primaryColor);
        
        // Simple style tweaks for the mock preview based on selected style
        if (state.style === 'brutalist') {
            root.style.border = '3px solid #000';
            root.style.borderRadius = '0';
            root.querySelectorAll('.mock-card, .mock-btn, .mock-nav-logo').forEach(el => {
                el.style.borderRadius = '0';
                el.style.border = '2px solid #000';
            });
        } else if (state.style === 'minimal') {
            root.style.borderRadius = '0';
             root.querySelectorAll('.mock-card').forEach(el => {
                el.style.border = 'none';
                el.style.background = '#f5f5f5';
            });
        } else {
            // Reset to default (Apple-ish)
            root.style.border = '1px solid var(--c-border-light)';
            root.style.borderRadius = 'var(--radius-lg)';
             root.querySelectorAll('.mock-card, .mock-btn, .mock-nav-logo').forEach(el => {
                el.style.borderRadius = '';
                el.style.border = '';
            });
        }

        // 2. Update Selection Tags
        els.selectionTags.innerHTML = '';
        const addTag = (text, colorStr = 'var(--c-bg-tertiary)') => {
            if (!text) return;
            const tag = document.createElement('span');
            tag.className = 'text-xs font-medium';
            tag.style.padding = '4px 10px';
            tag.style.background = colorStr;
            tag.style.borderRadius = '20px';
            tag.textContent = text;
            els.selectionTags.appendChild(tag);
        };

        const pName = DATA.purposes.find(p => p.id === state.purpose)?.title;
        const sName = DATA.styles.find(s => s.id === state.style)?.title;
        
        if (pName) addTag(pName, '#E5F1FF'); // Light blue for purpose
        if (sName) addTag(sName);
        if (state.components.size > 0) addTag(`${state.components.size} 个组件`);
    }

    // --- Prompt Generation Engine ---
    function generatePrompt() {
        const pObj = DATA.purposes.find(p => p.id === state.purpose);
        const sObj = DATA.styles.find(s => s.id === state.style);
        
        if (!pObj && !sObj) {
            els.promptText.value = "请在左侧完成选择以生成提示词...";
            return;
        }

        const pName = pObj ? pObj.title : '[未选择目的]';
        const sName = sObj ? sObj.title : '[未选择风格]';
        const sDesc = sObj ? sObj.desc : '';
        
        let componentListStr = '';
        state.components.forEach(compId => {
            for (const [catName, catData] of Object.entries(DATA.components)) {
                const comp = catData.components.find(c => c.id === compId);
                if (comp) {
                    componentListStr += `- ${comp.name}: ${comp.desc}\n`;
                    break;
                }
            }
        });
        if (!componentListStr) componentListStr = '- (暂无特定组件要求，请自由发挥)\n';

        // Template Construction
        let prompt = '';

        if (state.promptFormat === 'markdown') {
            prompt = `
# UI 设计需求文档

## 1. 项目概述
为 **${pName}** 设计一套专业的用户界面。
- **设计风格**: ${sName}
- **风格特征**: ${sDesc}
- **主色调**: ${state.primaryColor}

## 2. 核心组件要求
请确保设计包含以下功能模块，并保持视觉一致性：
${componentListStr}
## 3. 设计要求
- **响应式**: 必须完美适配桌面端和移动端。
- **可访问性**: 符合 WCAG 2.1 AA 标准，保证足够的对比度。
- **交互**: 为关键操作（如按钮悬停、点击）设计细腻的微交互反馈。
- **布局**: 使用现代网格系统，保持充足的留白，避免信息过载。

---
*请基于以上需求，生成高保真的 UI 设计图或可直接使用的 HTML/CSS 代码框架。*
            `.trim();
        } else if (state.promptFormat === 'json') {
             const promptObj = {
                role: "UI/UX Designer",
                task: "Create High-Fidelity Mockup",
                project: pName,
                style: {
                    name: sName,
                    description: sDesc,
                    primaryColor: state.primaryColor
                },
                components: Array.from(state.components),
                requirements: ["Responsive", "WCAG 2.1 AA", "Modern Grid Layout"]
             };
             prompt = JSON.stringify(promptObj, null, 2);
        } else {
            // Plain Text
            prompt = `作为一名专业UI设计师，请为【${pName}】设计一套界面。风格采用【${sName}】（${sDesc}），主色调为 ${state.primaryColor}。\n\n需要包含以下组件：\n${componentListStr}\n请确保设计是响应式的，并且符合现代设计趋势，注重用户体验细节。`;
        }

        els.promptText.value = prompt;
    }

    // --- Toast Notification ---
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        // Add icon based on type if needed
        toast.innerHTML = `
            <svg width="20" height="20" fill="none" stroke="${type === 'success' ? '#34C759' : '#FF3B30'}" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${message}
        `;
        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => container.removeChild(toast), 300);
        }, 3000);
    }

    // --- LLM Chat Functions ---
    async function sendMessageToLLM(userMessage, context) {
        if (!llmConfig.apiKey) {
            throw new Error('请先在左上角设置API密钥');
        }

        const messages = [
            {
                role: 'system',
                content: `你是一名专业的UI/UX设计专家。请基于以下设计上下文提供建议：

设计目的: ${context.purpose || '未选择'}
设计风格: ${context.style || '未选择'}
风格特征: ${context.styleDesc || '无'}
主色调: ${context.primaryColor}
选中组件: ${Array.from(context.components).join(', ') || '无'}

请用专业但易懂的语言回答，提供具体可行的建议。回答应简洁明了，重点突出。`
            },
            ...chatState.messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: 'user',
                content: userMessage
            }
        ];

        try {
            const response = await fetch(`${llmConfig.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${llmConfig.apiKey}`
                },
                body: JSON.stringify({
                    model: llmConfig.model,
                    messages: messages,
                    temperature: llmConfig.temperature,
                    max_tokens: llmConfig.maxTokens
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || `API请求失败 (${response.status})`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('API返回数据格式错误');
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('LLM请求错误:', error);
            if (error.message.includes('fetch')) {
                throw new Error('网络连接失败，请检查网络设置或API地址');
            }
            throw error;
        }
    }



    // --- Event Handlers & Public API ---
    return {
        init: () => {
            renderStep();
            // Bind global event listeners that don't need re-binding on render
            els.promptFormat.value = state.promptFormat;
            els.promptFormat.addEventListener('change', (e) => {
                state.promptFormat = e.target.value;
                saveState();
                generatePrompt();
            });

            // Load chat history
        },
        nextStep: () => {
            if (state.step < 3) {
                // Validation
                if (state.step === 1 && !state.purpose) {
                    showToast('请先选择一个设计目的', 'error');
                    return;
                }
                if (state.step === 2 && !state.style) {
                     showToast('请先选择一种视觉风格', 'error');
                     return;
                }
                state.step++;
                saveState();
                renderStep();
            } else {
                showToast('提示词已准备就绪！');
                els.promptText.select(); // Focus the final output
            }
        },
        prevStep: () => {
            if (state.step > 1) {
                state.step--;
                saveState();
                renderStep();
            }
        },
        copyPrompt: () => {
            els.promptText.select();
            navigator.clipboard.writeText(els.promptText.value)
                .then(() => showToast('已复制到剪贴板'))
                .catch(() => showToast('复制失败，请手动复制', 'error'));
        },
        resetState: () => {
            if (confirm('确定要重置所有选择吗？')) {
                localStorage.removeItem('promptCraftState');
                state = { step: 1, purpose: null, style: null, primaryColor: '#007AFF', components: new Set(), promptFormat: 'markdown' };
                renderStep();
                showToast('已重置');
            }
        },
        showHelp: () => {
            alert('PromptCraft AI 帮助\n\n1. 选择目的：确定你要设计的应用类型。\n2. 定义风格：选择喜欢的视觉语言和品牌色。\n3. 配置组件：勾选需要包含的具体功能模块。\n\n完成后，右下角会自动生成结构化的AI提示词，可直接复制用于 Midjourney、Stable Diffusion 或 GPT-4。\n\n💬 AI设计助手：\n使用左上角的设置按钮配置您的API密钥，即可与AI实时对话获取设计建议。');
        },

        // --- AI Assistant Modal ---
        openAiAssistant: function() {
            const modal = document.getElementById('ai-assistant-modal');
            if (!modal) return;
            modal.classList.add('show');
            this.renderAiMessages();
            this.bindAiInputEvents();
            setTimeout(() => {
                const input = document.getElementById('ai-input');
                if (input) input.focus();
            }, 300);
        },

        closeAiAssistant: function() {
            const modal = document.getElementById('ai-assistant-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        },

        bindAiInputEvents: function() {
            const input = document.getElementById('ai-input');
            const sendBtn = document.getElementById('ai-send-btn');
            const charCount = document.querySelector('.ai-char-count');

            if (input && sendBtn) {
                // Remove existing listeners to avoid duplicates
                input.removeEventListener('input', this.handleInputChange);
                input.removeEventListener('keydown', this.handleKeyDown);
                sendBtn.removeEventListener('click', this.handleSendMessage);

                // Add new listeners
                input.addEventListener('input', this.handleInputChange.bind(this));
                input.addEventListener('keydown', this.handleKeyDown.bind(this));
                sendBtn.addEventListener('click', this.handleSendMessage.bind(this));
            }
        },

        handleInputChange: function(e) {
            const input = e.target;
            const sendBtn = document.getElementById('ai-send-btn');
            const charCount = document.querySelector('.ai-char-count');

            // Auto-resize
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';

            // Update character count
            if (charCount) {
                charCount.textContent = input.value.length;
            }

            // Update send button state
            if (sendBtn) {
                sendBtn.disabled = !input.value.trim() || !llmConfig.apiKey;
            }
        },

        handleKeyDown: function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        },

        handleSendMessage: async function() {
            const input = document.getElementById('ai-input');
            const sendBtn = document.getElementById('ai-send-btn');
            const message = input.value.trim();

            if (!message || !llmConfig.apiKey) {
                if (!llmConfig.apiKey) showToast('请先在左上角设置API密钥', 'error');
                return;
            }

            input.value = '';
            input.style.height = 'auto';

            this.addAiMessage('user', message);
            this.showAiTyping();

            sendBtn.disabled = true;

            try {
                const pObj = DATA.purposes.find(p => p.id === state.purpose);
                const sObj = DATA.styles.find(s => s.id === state.style);
                const context = {
                    purpose: pObj?.title,
                    style: sObj?.title,
                    styleDesc: sObj?.desc,
                    primaryColor: state.primaryColor,
                    components: Array.from(state.components).join(', ')
                };

                const response = await sendMessageToLLM(message, context);
                this.addAiMessage('assistant', response);
            } catch (error) {
                this.addAiMessage('error', error.message);
            } finally {
                this.hideAiTyping();
                sendBtn.disabled = false;
                input.focus();
                // Re-bind events to ensure state is updated
                this.bindAiInputEvents();
            }
        },

        addAiMessage: function(role, content) {
            const id = 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const message = { id, role, content, timestamp: Date.now() };
            chatState.messages.push(message);
            localStorage.setItem('chatHistory', JSON.stringify(chatState.messages));
            this.renderAiMessage(message);
        },

        renderAiMessage: function(message) {
            const container = document.getElementById('ai-messages');
            if (!container) return;

            // Remove empty state
            const emptyState = container.querySelector('.ai-empty');
            if (emptyState) emptyState.remove();

            const msgEl = document.createElement('div');
            msgEl.className = `ai-message ${message.role}`;
            msgEl.dataset.id = message.id;
            msgEl.innerHTML = `
                <div class="ai-message-avatar">${message.role === 'user' ? '👤' : '🤖'}</div>
                <div class="ai-message-content">
                    <div class="ai-message-bubble">${this.escapeHtml(message.content)}</div>
                </div>
            `;

            container.appendChild(msgEl);
            container.scrollTop = container.scrollHeight;
        },

        renderAiMessages: function() {
            const container = document.getElementById('ai-messages');
            if (!container) return;

            container.innerHTML = '';

            if (chatState.messages.length === 0) {
                container.innerHTML = `
                    <div class="ai-welcome-screen">
                        <div class="ai-welcome-icon">✨</div>
                        <h2>欢迎使用 AI代码助手</h2>
                        <p>我可以帮助您：</p>
                        <ul class="ai-features">
                            <li>🔍 分析和优化代码</li>
                            <li>💡 提供编程建议</li>
                            <li>🐛 调试错误和解决问题</li>
                            <li>📚 解释技术概念</li>
                        </ul>
                        <div class="ai-warning">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span>请先在左上角设置API密钥</span>
                        </div>
                    </div>
                `;
                return;
            }

            chatState.messages.forEach(msg => this.renderAiMessage(msg));
        },

        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        showAiTyping: function() {
            const container = document.getElementById('ai-messages');
            if (!container) return;

            const typing = document.createElement('div');
            typing.className = 'ai-typing';
            typing.id = 'ai-typing';
            typing.innerHTML = `
                <span>AI正在思考</span>
                <div class="ai-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            container.appendChild(typing);
            container.scrollTop = container.scrollHeight;
        },

        hideAiTyping: function() {
            const typing = document.getElementById('ai-typing');
            if (typing) typing.remove();
        },

        copyAiMessage: function(id) {
            const msg = chatState.messages.find(m => m.id === id);
            if (!msg) return;
            navigator.clipboard.writeText(msg.content)
                .then(() => showToast('已复制到剪贴板'))
                .catch(() => showToast('复制失败', 'error'));
        },

        editAiMessage: function(id) {
            const msg = chatState.messages.find(m => m.id === id);
            if (!msg) return;

            const newContent = prompt('编辑消息:', msg.content);
            if (newContent !== null && newContent.trim()) {
                msg.content = newContent.trim();
                localStorage.setItem('chatHistory', JSON.stringify(chatState.messages));
                this.renderAiMessages();
            }
        },

        deleteAiMessage: function(id) {
            if (!confirm('确定要删除这条消息吗？')) return;

            const index = chatState.messages.findIndex(m => m.id === id);
            if (index !== -1) {
                chatState.messages.splice(index, 1);
                localStorage.setItem('chatHistory', JSON.stringify(chatState.messages));
                this.renderAiMessages();
            }
        },

        handleSelectAll: function(checkbox) {
            const isChecked = checkbox.checked;
            const messages = document.querySelectorAll('.ai-msg');
            messages.forEach(msg => {
                const checkbox = msg.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
            });
            this.updateSelectedCount();
        },

        updateSelectedCount: function() {
            const count = document.querySelectorAll('.ai-msg input[type="checkbox"]:checked').length;
            const countEl = document.getElementById('ai-selected-count');
            if (countEl) {
                countEl.textContent = `${count} 条已选`;
            }
        },

        enterSelectionMode: function() {
            const toolbar = document.getElementById('ai-toolbar');
            if (toolbar) toolbar.style.display = 'flex';

            const messages = document.querySelectorAll('.ai-msg');
            messages.forEach(msg => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.style.position = 'absolute';
                checkbox.style.top = '8px';
                checkbox.style.left = '8px';
                checkbox.style.width = '16px';
                checkbox.style.height = '16px';
                checkbox.style.cursor = 'pointer';
                checkbox.onchange = () => this.updateSelectedCount();
                msg.style.position = 'relative';
                msg.appendChild(checkbox);
            });
        },

        handleBatchCopy: function() {
            const selected = document.querySelectorAll('.ai-msg input[type="checkbox"]:checked');
            if (selected.length === 0) {
                showToast('请先选择要复制的消息', 'error');
                return;
            }

            const selectedMsgs = Array.from(selected).map(cb => {
                const msgEl = cb.closest('.ai-msg');
                const contentEl = msgEl.querySelector('.ai-msg-content');
                const textNode = Array.from(contentEl.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                const content = textNode ? textNode.textContent : contentEl.textContent;
                const isUser = msgEl.classList.contains('user');
                return `${isUser ? '👤 我' : '🤖 AI'}: ${content}`;
            }).join('\n\n');

            navigator.clipboard.writeText(selectedMsgs)
                .then(() => {
                    showToast(`已复制 ${selected.length} 条消息`);
                    this.handleExitSelect();
                });
        },

        handleBatchDelete: function() {
            const selected = document.querySelectorAll('.ai-msg input[type="checkbox"]:checked');
            if (selected.length === 0) {
                showToast('请先选择要删除的消息', 'error');
                return;
            }

            if (confirm(`确定要删除选中的 ${selected.length} 条消息吗？`)) {
                const selectedEls = Array.from(selected).map(cb => cb.closest('.ai-msg'));
                const selectedIds = selectedEls.map(el => el.dataset.id);
                chatState.messages = chatState.messages.filter(m => !selectedIds.includes(m.id));
                localStorage.setItem('chatHistory', JSON.stringify(chatState.messages));
                this.renderAiMessages();
                this.handleExitSelect();
            }
        },

        handleExitSelect: function() {
            const toolbar = document.getElementById('ai-toolbar');
            if (toolbar) toolbar.style.display = 'none';
            const checkboxes = document.querySelectorAll('.ai-msg input[type="checkbox"]');
            checkboxes.forEach(cb => cb.remove());
        },

        // --- API Settings ---
        openApiSettings: function() {
            const modal = document.getElementById('api-settings-modal');
            if (!modal) return;

            // Populate fields
            document.getElementById('api-base-url').value = llmConfig.baseUrl;
            document.getElementById('api-key').value = llmConfig.apiKey;
            document.getElementById('api-model').value = llmConfig.model;

            modal.classList.add('show');
        },

        closeApiSettings: function() {
            const modal = document.getElementById('api-settings-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        },

        saveApiSettings: function() {
            const baseUrl = document.getElementById('api-base-url').value.trim();
            const apiKey = document.getElementById('api-key').value.trim();
            const model = document.getElementById('api-model').value.trim();

            if (!baseUrl) {
                showToast('请输入API Base URL', 'error');
                return;
            }

            if (!apiKey) {
                showToast('请输入API密钥', 'error');
                return;
            }

            if (!model) {
                showToast('请输入模型名称', 'error');
                return;
            }

            // Validate URL
            try {
                new URL(baseUrl);
            } catch (e) {
                showToast('请输入有效的API Base URL', 'error');
                return;
            }

            llmConfig = {
                baseUrl: baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl,
                apiKey: apiKey,
                model: model,
                temperature: llmConfig.temperature,
                maxTokens: llmConfig.maxTokens
            };

            localStorage.setItem('llmConfig', JSON.stringify({
                baseUrl: llmConfig.baseUrl,
                apiKey: llmConfig.apiKey,
                model: llmConfig.model,
                temperature: llmConfig.temperature,
                maxTokens: llmConfig.maxTokens
            }));

            this.closeApiSettings();
            showToast('API设置已保存');
        }
    };
})();

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', app.init);

