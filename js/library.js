// Component Library Aggregator for ExoCode
// This file aggregates all component modules and provides a unified interface

window.ExoLibrary = window.ExoLibrary || {
    cats: {},
    items: []
};

// 完整的类别定义（避免重复定义）
Object.assign(window.ExoLibrary.cats, {
    'nav': 'Navbar 导航',
    'hero': 'Hero 首屏', 
    'feature': 'Features 特性',
    'stats': 'Stats 数据',
    'pricing': 'Pricing 价格',
    'cta': 'Call to Action',
    'faq': 'FAQ 问答',
    'footer': 'Footer 页脚',
    'form': 'Forms 表单'
});

// 组件聚合函数
(function() {
    // 确保组件数组存在
    if (!Array.isArray(window.ExoLibrary.items)) {
        window.ExoLibrary.items = [];
    }
    
    // 去重函数 - 避免重复添加相同ID的组件
    function deduplicateItems(items) {
        const seen = new Set();
        return items.filter(item => {
            if (seen.has(item.id)) {
                console.warn(`Duplicate component ID detected: ${item.id}`);
                return false;
            }
            seen.add(item.id);
            return true;
        });
    }
    
    // 初始化时确保没有重复项
    window.ExoLibrary.items = deduplicateItems(window.ExoLibrary.items);
    
    // 提供扩展接口
    window.ExoLibrary.addComponent = function(component) {
        if (!component || !component.id || !component.cat || !component.name || !component.html) {
            console.error('Invalid component format:', component);
            return false;
        }
        
        // 检查是否已存在相同ID的组件
        const existingIndex = this.items.findIndex(item => item.id === component.id);
        if (existingIndex !== -1) {
            console.warn(`Component with ID "${component.id}" already exists, replacing it`);
            this.items[existingIndex] = component;
        } else {
            this.items.push(component);
        }
        return true;
    };
    
    // 批量添加组件
    window.ExoLibrary.addComponents = function(components) {
        if (!Array.isArray(components)) {
            console.error('Expected an array of components');
            return false;
        }
        
        let successCount = 0;
        components.forEach(comp => {
            if (this.addComponent(comp)) {
                successCount++;
            }
        });
        
        console.log(`Successfully added ${successCount}/${components.length} components`);
        return successCount === components.length;
    };
    
    // 获取所有组件
    window.ExoLibrary.getAllComponents = function() {
        return [...this.items];
    };
    
    // 按类别获取组件
    window.ExoLibrary.getComponentsByCategory = function(category) {
        return this.items.filter(item => item.cat === category);
    };
    
    // 按ID获取组件
    window.ExoLibrary.getComponentById = function(id) {
        return this.items.find(item => item.id === id);
    };
    
    // 搜索组件
    window.ExoLibrary.searchComponents = function(query) {
        const q = query.toLowerCase();
        return this.items.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.cat.toLowerCase().includes(q)
        );
    };
})();

console.log('ExoLibrary initialized with', window.ExoLibrary.items.length, 'components');