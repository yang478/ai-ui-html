        // 组件管理器
const componentInfo = {
    '导航栏': {
        desc: '页面顶部的导航区域，包含Logo与主要链接。',
        demo: `<nav class="flex items-center justify-between p-3 bg-white rounded">
  <div class="font-semibold">Brand</div>
  <ul class="flex gap-4 text-sm"><li><a href="#">首页</a></li><li><a href="#">产品</a></li><li><a href="#">联系</a></li></ul>
</nav>`
    },
    '内容区块': {
        desc: '承载文本与媒体信息的内容段落，常见卡片式布局。',
        demo: `<section class="p-4 bg-gray-50 rounded">
  <h4 class="font-medium mb-1">区块标题</h4>
  <p class="text-sm text-gray-600">这里是示例内容。可放文字、图片等。</p>
</section>`
    },
    '图片画廊': {
        desc: '多图展示，支持栅格布局与灯箱预览。',
        demo: `<div class="grid grid-cols-3 gap-2">
  <div class="h-12 bg-gray-200 rounded"></div>
  <div class="h-12 bg-gray-200 rounded"></div>
  <div class="h-12 bg-gray-200 rounded"></div>
</div>`
    },
    '轮播图': {
        desc: '横向轮播的图片或内容区域。',
        demo: `<div class="relative overflow-hidden rounded">
  <div class="h-16 bg-gray-200"></div>
</div>`
    },
    '视频播放器': {
        desc: '嵌入式视频播放区域。',
        demo: `<div class="aspect-w-16 aspect-h-9 bg-black rounded flex items-center justify-center text-white">Video</div>`
    },
    '客户评价': {
        desc: '展示用户评价与评分。',
        demo: `<div class="p-3 border rounded text-sm">“非常好用的产品！” — 张三</div>`
    },
    '团队成员展示': {
        desc: '以头像和职称展示团队成员。',
        demo: `<div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-gray-300"></div><div><div class="text-sm">Alex</div><div class="text-xs text-gray-500">Designer</div></div></div>`
    },
    '产品展示': {
        desc: '突出产品图片、名称与价格信息。',
        demo: `<div class="p-3 border rounded"><div class="h-16 bg-gray-200 rounded mb-2"></div><div class="text-sm">产品名称</div><div class="text-xs text-gray-500">¥199</div></div>`
    },
    '博客文章': {
        desc: '文章列表或详情展示。',
        demo: `<article class="text-sm"><h4 class="font-medium">文章标题</h4><p class="text-gray-600">摘要内容...</p></article>`
    },
    'FAQ折叠面板': {
        desc: '常见问题的折叠/展开展示。',
        demo: `<div class="text-sm"><div class="font-medium">Q: 支持退款吗？</div><div class="text-gray-600">A: 7 天内可申请。</div></div>`
    },
    '代码展示': {
        desc: '用于展示代码片段的区块。',
        demo: `<pre class="text-xs bg-gray-900 text-green-200 p-2 rounded">&lt;Button /&gt;</pre>`
    },
    // Forms
    '文本输入': { desc: '用于输入短文本内容，支持占位、校验与长度限制。', demo: `<input class="w-full p-2 border rounded" placeholder="请输入...">` },
    '数字输入': { desc: '数字专用输入框，支持步长、范围与格式化。', demo: `<input type="number" class="w-full p-2 border rounded" min="0" step="1" value="0">` },
    '下拉选择': { desc: '单选下拉，适合较多固定选项。', demo: `<select class="w-full p-2 border rounded"><option>选项A</option><option>选项B</option></select>` },
    '级联选择': { desc: '多级联动选择，如省/市/区。', demo: `<div class="flex gap-2"><select class="p-2 border rounded"><option>省</option></select><select class="p-2 border rounded"><option>市</option></select></div>` },
    '日期选择': { desc: '选择具体日期。', demo: `<input type="date" class="p-2 border rounded">` },
    '日期范围': { desc: '起止日期选择。', demo: `<div class="flex items-center gap-2"><input type="date" class="p-2 border rounded"><span>至</span><input type="date" class="p-2 border rounded"></div>` },
    '时间选择': { desc: '选择具体时间。', demo: `<input type="time" class="p-2 border rounded">` },
    '文件上传': { desc: '支持拖拽/多文件上传与进度显示。', demo: `<input type="file" class="p-2 border rounded">` },
    '开关': { desc: '布尔状态切换，用于快速开/关。', demo: `<label class="inline-flex items-center cursor-pointer"><input type="checkbox" class="hidden"><span class="w-10 h-5 bg-gray-300 rounded-full relative"><span class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></span></span></label>` },
    '复选框': { desc: '多选；可成组使用。', demo: `<label class="text-sm"><input type="checkbox" class="mr-1">我已阅读并同意</label>` },
    '单选框': { desc: '互斥单选选项。', demo: `<div class="text-sm"><label class="mr-3"><input type="radio" name="r">A</label><label><input type="radio" name="r">B</label></div>` },
    '滑块': { desc: '区间取值，支持步长与显示数值。', demo: `<input type="range" min="0" max="100" value="30" class="w-full">` },
    '步进器': { desc: '通过加/减调整数值。', demo: `<div class="flex items-center gap-2"><button class="px-2 py-1 border rounded">-</button><input type="number" value="1" class="w-16 p-1 border rounded text-center"><button class="px-2 py-1 border rounded">+</button></div>` },
    '标签输入': { desc: '录入多个标签项。', demo: `<div class="flex flex-wrap gap-1"><span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">UI</span><span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">设计</span><input class="p-1 border rounded w-24" placeholder="添加..."/></div>` },
    '验证码': { desc: '图形/短信验证码输入区域。', demo: `<div class="flex gap-2"><input class="p-2 border rounded" placeholder="输入验证码"><button class="px-3 py-2 bg-gray-200 rounded">获取</button></div>` },
    '富文本编辑器': { desc: '格式化文本输入，支持加粗/列表/链接等。', demo: `<div class="border rounded p-2 text-sm"><div class="mb-2"><button class="px-2 py-1 border rounded mr-1">B</button><button class="px-2 py-1 border rounded">I</button></div><div contenteditable class="min-h-[60px]">在此编辑...</div></div>` },
    // Feedback
    '骨架屏': { desc: '加载占位动画，缓解白屏。', demo: `<div class="animate-pulse"><div class="h-4 bg-gray-300 rounded mb-2"></div><div class="h-4 bg-gray-300 rounded w-2/3"></div></div>` },
    '空状态': { desc: '无数据占位，提供引导操作。', demo: `<div class="text-center text-sm text-gray-500"><div class="text-3xl mb-1">📭</div>暂无数据</div>` },
    '结果页': { desc: '操作完成后的结果反馈页。', demo: `<div class="text-center"><div class="text-green-500 text-3xl">✔</div><div class="text-sm">操作成功</div></div>` },
    '加载状态': { desc: '局部/全局加载反馈。', demo: `<div class="flex items-center gap-2 text-sm"><i class="fas fa-spinner fa-spin"></i>加载中...</div>` },
    '进度指示': { desc: '线性/环形进度。', demo: `<div class="w-full bg-gray-200 rounded"><div class="h-2 bg-indigo-500 rounded" style="width:60%"></div></div>` },
    '通知提示': { desc: '顶部/右下通知消息。', demo: `<div class="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">这是通知内容</div>` },
    '警告提示': { desc: '重要风险提醒。', demo: `<div class="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">请注意操作风险</div>` },
    '气泡确认': { desc: '在点击前给出确认。', demo: `<div class="inline-block relative"><button class="px-2 py-1 border rounded">删除</button><div class="absolute top-full left-0 mt-1 p-2 text-xs bg-white border rounded">确认删除？</div></div>` },
    '校验提示': { desc: '表单即时校验错误。', demo: `<div class="text-xs text-red-600">请输入有效的邮箱地址</div>` },
    'Snackbar': { desc: '移动端底部短消息。', demo: `<div class="px-3 py-2 bg-gray-800 text-white rounded text-xs">已保存</div>` },
    // Table
    '固定列表头': { desc: '表头固定，提升可读性。', demo: `<div class="h-24 overflow-auto border rounded"><table class="w-full text-xs"><thead class="bg-gray-100 sticky top-0"><tr><th class="p-1">列A</th><th class="p-1">列B</th></tr></thead><tbody><tr><td class="p-1">数据</td><td class="p-1">数据</td></tr><tr><td class="p-1">数据</td><td class="p-1">数据</td></tr></tbody></table></div>` },
    '固定列': { desc: '左/右列固定，横向滚动时可见。', demo: `<div class="text-xs text-gray-500">示意：固定首列/末列</div>` },
    '可编辑单元格': { desc: '表格内直接编辑内容。', demo: `<table class="text-xs w-full border"><tr><td contenteditable class="p-1">可编辑</td><td class="p-1">只读</td></tr></table>` },
    '合计行': { desc: '底部统计合计。', demo: `<table class="text-xs w-full"><tfoot><tr><td class="p-1">合计</td><td class="p-1 text-right">¥1234</td></tr></tfoot></table>` },
    '列筛选': { desc: '按条件过滤列数据。', demo: `<div class="flex gap-2"><input class="p-1 border rounded text-xs" placeholder="过滤..."><button class="px-2 py-1 border rounded text-xs">应用</button></div>` },
    '列排序': { desc: '按列升降序排序。', demo: `<div class="text-xs">点击表头切换排序 ↑↓</div>` },
    '行选择': { desc: '勾选多选/单选行。', demo: `<table class="text-xs w-full"><tr><td><input type="checkbox"></td><td>行1</td></tr><tr><td><input type="checkbox"></td><td>行2</td></tr></table>` },
    '树形表格': { desc: '层级数据的表格展示。', demo: `<div class="text-xs">父级 ▶ 子级</div>` },
    '拖拽列宽': { desc: '拖动分隔线调整列宽。', demo: `<div class="text-xs text-gray-500">拖拽分隔线以调整列宽</div>` },
    '导出 CSV': { desc: '将表格导出为 CSV 文件。', demo: `<button class="px-2 py-1 border rounded text-xs">导出 CSV</button>` },
    '导入 CSV': { desc: '从 CSV 导入数据。', demo: `<div class="text-xs"><input type="file" accept=".csv"></div>` },
    // Auth
    '登录': { desc: '输入账号密码登录系统。', demo: `<form class="text-sm"><input class="w-full p-2 border rounded mb-2" placeholder="邮箱/手机号"><input type="password" class="w-full p-2 border rounded mb-2" placeholder="密码"><button class="w-full px-3 py-2 bg-indigo-600 text-white rounded">登录</button></form>` },
    '注册': { desc: '创建新账户。', demo: `<form class="text-sm"><input class="w-full p-2 border rounded mb-2" placeholder="邮箱"><input type="password" class="w-full p-2 border rounded mb-2" placeholder="密码"><button class="w-full px-3 py-2 bg-indigo-600 text-white rounded">注册</button></form>` },
    '忘记密码': { desc: '找回/重设密码流程。', demo: `<div class="text-sm"><input class="w-full p-2 border rounded mb-2" placeholder="邮箱"><button class="w-full px-3 py-2 bg-gray-200 rounded">发送重置链接</button></div>` },
    '二步验证': { desc: '动态口令/短信验证码验证。', demo: `<div class="flex gap-2 text-sm"><input class="p-2 border rounded" placeholder="6位验证码"><button class="px-3 py-2 bg-gray-200 rounded">验证</button></div>` },
    '绑定第三方': { desc: '绑定微信/Google/GitHub 等。', demo: `<div class="flex gap-2 text-sm"><button class="px-3 py-2 border rounded">GitHub</button><button class="px-3 py-2 border rounded">Google</button></div>` },
    '权限管理': { desc: '为用户分配权限。', demo: `<div class="text-xs"><label><input type="checkbox"> 查看</label> <label><input type="checkbox"> 编辑</label></div>` },
    '角色管理': { desc: '角色与用户的映射。', demo: `<div class="text-xs">Admin ▶ Editor ▶ Viewer</div>` },
    '个人资料': { desc: '展示与编辑个人信息。', demo: `<div class="text-sm"><div>昵称：Alex</div><div>邮箱：alex@example.com</div></div>` },
    '偏好设置': { desc: '自定义主题、语言等。', demo: `<div class="text-sm"><label class="mr-2">语言</label><select class="p-1 border rounded"><option>中文</option><option>English</option></select></div>` },
    // Data display
    '描述列表': { desc: '键值对说明信息展示。', demo: `<dl class="text-sm grid grid-cols-2 gap-2"><dt class="text-gray-500">类型</dt><dd>企业</dd><dt class="text-gray-500">规模</dt><dd>100-500</dd></dl>` },
    'KPI 指标': { desc: '展示关键指标数值。', demo: `<div class="text-center p-3 border rounded"><div class="text-2xl font-bold">98%</div><div class="text-xs text-gray-500">可用率</div></div>` },
    '时间轴': { desc: '按时间顺序展示事件。', demo: `<ul class="text-sm"><li>10:00 创建任务</li><li>10:30 提交审批</li></ul>` },
    '树': { desc: '层级结构的树控件。', demo: `<ul class="text-sm"><li>父级<ul class="ml-4 list-disc"><li>子级A</li><li>子级B</li></ul></li></ul>` },
    '徽章': { desc: '强调状态或数量。', demo: `<span class="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">NEW</span>` },
    '标签': { desc: '分类或关键字标识。', demo: `<div class="flex gap-1"><span class="px-2 py-1 bg-gray-100 rounded text-xs">UI</span><span class="px-2 py-1 bg-gray-100 rounded text-xs">UX</span></div>` },
    '头像组': { desc: '多人头像的组合展示。', demo: `<div class="flex -space-x-2"><div class="w-6 h-6 rounded-full bg-gray-400"></div><div class="w-6 h-6 rounded-full bg-gray-500"></div></div>` },
    '日历': { desc: '日期/月视图。', demo: `<div class="grid grid-cols-7 gap-1 text-xs"><div class="text-gray-400">日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>` },
    '手风琴': { desc: '可展开/收起的内容块。', demo: `<div class="text-sm"><div class="font-medium">标题</div><div class="text-gray-600">内容...</div></div>` },
    '可排序列表': { desc: '拖拽调整顺序。', demo: `<ul class="text-sm"><li>条目A</li><li>条目B</li></ul>` },
    '虚拟列表': { desc: '海量数据按需渲染。', demo: `<div class="text-xs text-gray-500">仅渲染可视区域项</div>` },
    // Media
    '音频播放器': { desc: '播放音频文件。', demo: `<audio controls class="w-full"><source src="" type="audio/mpeg">您的浏览器不支持音频。</audio>` },
    '文件预览': { desc: '预览图片/文件缩略图。', demo: `<div class="h-16 bg-gray-200 rounded flex items-center justify-center text-xs">文件.png</div>` },
    '文档预览': { desc: 'PDF/文档嵌入式查看。', demo: `<div class="h-20 bg-gray-200 rounded flex items-center justify-center text-xs">PDF 预览</div>` },
    'Lightbox': { desc: '点击图片放大预览。', demo: `<div class="text-xs">点击缩略图查看大图</div>` },
    '图片标注': { desc: '在图片上做注释/框选。', demo: `<div class="h-16 bg-gray-200 rounded relative"><div class="absolute top-2 left-2 border-2 border-red-500 w-6 h-4"></div></div>` },
    '视频字幕': { desc: '视频字幕/弹幕显示。', demo: `<div class="text-xs">[00:00:05] 欢迎使用</div>` },
    // Map
    '地图展示': { desc: '地图容器展示地理信息。', demo: `<div class="h-24 bg-gray-200 rounded flex items-center justify-center text-xs">Map</div>` },
    '热力图': { desc: '展示密度热点区域。', demo: `<div class="h-16 bg-gradient-to-r from-yellow-200 via-red-300 to-red-500 rounded"></div>` },
    '路线规划': { desc: '起终点路径展示。', demo: `<div class="text-xs">A ➜ B</div>` },
    '位置选择器': { desc: '在地图上选择坐标点。', demo: `<div class="text-xs">点击地图选择位置</div>` },
    // Onboarding
    '引导气泡': { desc: '在关键功能处展示说明气泡。', demo: `<div class="inline-block relative"><button class="px-2 py-1 border rounded">按钮</button><div class="absolute left-0 mt-1 p-2 text-xs bg-white border rounded">这里是提示</div></div>` },
    '功能引导': { desc: '步骤化引导用户完成流程。', demo: `<ol class="list-decimal ml-5 text-sm"><li>第一步</li><li>第二步</li></ol>` },
    '教程卡片': { desc: '图文并茂的教程步骤。', demo: `<div class="border rounded p-2 text-sm"><div class="font-medium">步骤 1</div><div>说明文字...</div></div>` },
    '遮罩高亮': { desc: '遮罩背景、突出关键区域。', demo: `<div class="relative"><div class="p-2 border rounded">目标区域</div><div class="absolute inset-0 bg-black bg-opacity-30"></div></div>` },
    // a11y
    '字号切换': { desc: '提供一键放大/缩小字体大小。', demo: `<div class="text-sm"><button class="px-2 py-1 border rounded mr-1">A-</button><button class="px-2 py-1 border rounded">A+</button></div>` },
    '高对比度': { desc: '切换到高对比度主题。', demo: `<div class="text-xs">示意：黑底白字</div>` },
    '键盘导航': { desc: 'Tab/方向键访问控件。', demo: `<div class="text-xs">支持键盘操作</div>` },
    '读屏友好': { desc: '添加 aria 属性与语义标签。', demo: `<div class="text-xs">aria-label="close"</div>` },
    // i18n
    '语言切换': { desc: '在多语言间切换界面。', demo: `<div class="text-sm"><button class="px-2 py-1 border rounded mr-1">中文</button><button class="px-2 py-1 border rounded">English</button></div>` },
    '多语言日期货币': { desc: '按地区格式化日期和货币。', demo: `<div class="text-xs">¥1,234.56 / 2025-01-01</div>` },
    'RTL 支持': { desc: '从右到左布局支持。', demo: `<div class="text-xs">示意：RTL</div>` },
    '文案占位': { desc: '在原型阶段填充占位文案。', demo: `<div class="text-xs text-gray-500">Lorem ipsum...</div>` },
    // Ecommerce
    '商品卡': { desc: '展示商品图片、名称与价格。', demo: `<div class="p-3 border rounded"><div class="h-16 bg-gray-200 rounded mb-2"></div><div class="text-sm">商品名</div><div class="text-xs text-gray-500">¥199</div><button class="mt-2 px-2 py-1 bg-indigo-600 text-white rounded text-xs">加入购物车</button></div>` },
    'SKU 选择': { desc: '商品规格选择（颜色/尺码）。', demo: `<div class="flex gap-1 text-xs"><button class="px-2 py-1 border rounded">红</button><button class="px-2 py-1 border rounded">蓝</button></div>` },
    '优惠券输入': { desc: '输入优惠码抵扣。', demo: `<div class="flex gap-2 text-sm"><input class="p-2 border rounded" placeholder="输入优惠码"><button class="px-3 py-2 bg-gray-200 rounded">应用</button></div>` },
    '购物车': { desc: '展示购物车商品与数量。', demo: `<div class="text-sm"><div class="flex justify-between"><span>商品A</span><span>¥99 x1</span></div><div class="flex justify-between"><span>合计</span><span>¥99</span></div></div>` },
    '结算流程': { desc: '填写地址、支付与确认。', demo: `<ol class="list-decimal ml-5 text-sm"><li>填写地址</li><li>选择支付</li><li>确认订单</li></ol>` },
    '地址管理': { desc: '管理收货地址。', demo: `<div class="text-sm"><div>张三 138****8888</div><div>北京市 海淀区 中关村</div></div>` },
    '支付方式': { desc: '选择银行卡/钱包等。', demo: `<div class="text-sm"><label class="mr-2"><input type="radio" name="pay"> 微信</label><label><input type="radio" name="pay"> 支付宝</label></div>` },
    '订单进度': { desc: '下单-发货-收货进度。', demo: `<div class="text-xs">已下单 › 已发货 › 运输中 › 已签收</div>` },
    '促销倒计时': { desc: '活动剩余时间提示。', demo: `<div class="text-sm">距结束 <span class="font-mono">00:12:45</span></div>` },
    '价格表': { desc: '展示套餐/价格对比。', demo: `<div class="grid grid-cols-3 gap-2 text-sm"><div class="p-2 border rounded"><div>基础</div><div class="text-xl">¥0</div></div><div class="p-2 border rounded"><div>专业</div><div class="text-xl">¥99</div></div></div>` },
    '评价打分': { desc: '用户评分与评价。', demo: `<div class="text-yellow-400">★★★★★</div>` },
    'CTA 区块': { desc: '强化转化的行动召唤区域。', demo: `<div class="p-3 bg-indigo-50 border border-indigo-200 rounded text-sm"><div class="font-medium">立即开始</div><button class="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">注册</button></div>` }
};

window.componentManager = {
            init() {
                this._showAllPreview = false;
                this.bindEvents();
                this.initializeSearch();
                this.initializeCategories();
            },

            bindEvents() {
                // 搜索相关事件
                elements.componentSearch.addEventListener('input', () => this.handleSearch());
                elements.clearSearch.addEventListener('click', () => this.clearSearch());

                // 分类切换事件
                elements.categoryPills.forEach(pill => {
                    pill.addEventListener('click', () => this.switchCategory(pill));
                });

                // 组件选择事件（点击和键盘可达性）
                elements.componentTags.forEach(tag => {
                    tag.setAttribute('role', 'button');
                    tag.setAttribute('tabindex', '0');
                    tag.addEventListener('click', () => this.toggleComponent(tag));
                    tag.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.toggleComponent(tag);
                        }
                    });
                });
            },

            initializeSearch() {
                // 初始化搜索框状态
                elements.componentSearch.value = '';
                elements.clearSearch.style.display = 'none';
            },

            initializeCategories() {
                // 默认显示所有组件
                this.showCategory('all');
                elements.categoryPills[0].classList.add('active');
            },

            handleSearch() {
                const searchTerm = elements.componentSearch.value.toLowerCase().trim();
                elements.clearSearch.style.display = searchTerm ? 'block' : 'none';

                let hasResults = false;
                const visibleSections = Array.from(elements.componentContainer.querySelectorAll('.component-section'))
                    .filter(section => section.style.display !== 'none');

                visibleSections.forEach(section => {
                    const components = section.querySelectorAll('.component-tag');
                    let sectionHasResults = false;

                    components.forEach(tag => {
                        const text = tag.textContent.toLowerCase();
                        const shouldShow = text.includes(searchTerm);
                        tag.style.display = shouldShow ? 'flex' : 'none';
                        if (shouldShow) {
                            sectionHasResults = true;
                            hasResults = true;
                        }
                    });

                    // 如果该分类下没有匹配的组件，隐藏整个分类
                    section.style.display = sectionHasResults ? 'block' : 'none';
                });

                // 更新无结果消息显示
                if (elements.noResultsMessage) {
                    elements.noResultsMessage.style.display = hasResults ? 'none' : 'block';
                }
            },

            clearSearch() {
                elements.componentSearch.value = '';
                elements.clearSearch.style.display = 'none';
                if (elements.noResultsMessage) {
                    elements.noResultsMessage.style.display = 'none';
                }
                // 重新显示当前分类的组件
                this.showCategory(state.currentCategory);
            },

            switchCategory(pill) {
                const category = pill.dataset.category;

                // 更新UI状态
                elements.categoryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                // 更新状态并显示相应分类
                state.currentCategory = category;
                this.showCategory(category);

                // 清空搜索框
                elements.componentSearch.value = '';
                elements.clearSearch.style.display = 'none';
            },

            showCategory(category) {
                // 获取所有组件分组
                const sections = elements.componentContainer.querySelectorAll('.component-section');

                sections.forEach(section => {
                    const sectionCategory = section.dataset.category;
                    if (category === 'all' || sectionCategory === category) {
                        section.style.display = 'block';
                        // 显示该分类下的所有组件
                        const components = section.querySelectorAll('.component-tag');
                        components.forEach(component => {
                            component.style.display = 'flex';
                        });
                    } else {
                        section.style.display = 'none';
                        // 隐藏其他分类的组件
                        const components = section.querySelectorAll('.component-tag');
                        components.forEach(component => {
                            component.style.display = 'none';
                        });
                    }
                });

                // 如果有搜索词，则执行搜索过滤
                if (elements.componentSearch.value.trim()) {
                    this.handleSearch();
                }
            },

            toggleComponent(tag) {
                tag.classList.toggle('selected');
                tag.setAttribute('aria-pressed', tag.classList.contains('selected') ? 'true' : 'false');

                // 更新选中的组件列表
                state.selections.components = Array.from(document.querySelectorAll('.component-tag.selected'))
                    .map(t => t.textContent.trim());

                // 更新组件预览
                this.updateComponentPreview();
                this.updateSelectionDisplay();
            },

            updateComponentPreview() {
                const previewContainer = elements.previewContainer;

                if (state.selections.components.length === 0) {
                    previewContainer.innerHTML = `
          <div class="preview-placeholder">
            <p>选择组件后会在这里显示预览</p>
            <i class="fas fa-arrow-left text-2xl mt-2" aria-hidden="true"></i>
          </div>
        `;
                    return;
                }

                const limit = this._showAllPreview ? Number.POSITIVE_INFINITY : 6;
                let previewHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
                state.selections.components.forEach((component, index) => {
                    if (index < limit) {
                        const componentTag = Array.from(elements.componentTags)
                            .find(tag => tag.textContent.trim() === component);

                        if (componentTag) {
                            const iconHTML = componentTag.querySelector('.component-icon').innerHTML;
                            const info = componentInfo[component] || { desc: '基础组件示例。', demo: '<div class="p-2 text-xs text-gray-500">暂无示例</div>' };
                            previewHTML += `
              <div class="preview-component bg-white p-4 rounded-lg shadow-sm cursor-pointer" data-demo-component="${component}">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="component-icon text-indigo-500">${iconHTML}</div>
                    <span class="font-medium">${component}</span>
                  </div>
                  <button class="text-xs text-indigo-600 hover:underline" data-action="toggle-demo">查看示例</button>
                </div>
                <div class="text-xs text-gray-500 mt-2">${info.desc}</div>
                <div class="preview-demo hidden mt-3 border border-gray-200 rounded p-3">${info.demo}</div>
              </div>
            `;
                        }
                    }
                });
                previewHTML += '</div>';

                const total = state.selections.components.length;
                if (total > 6) {
                    if (!this._showAllPreview) {
                        previewHTML += `
          <div class="text-center mt-4">
            <button class="text-indigo-600 hover:underline text-sm" data-action="toggle-preview-limit">
              +${total - 6} 个其他组件 · 显示全部
            </button>
          </div>
        `;
                    } else {
                        previewHTML += `
          <div class="text-center mt-4">
            <button class="text-indigo-600 hover:underline text-sm" data-action="toggle-preview-limit">
              收起
            </button>
          </div>
        `;
                    }
                }

                previewContainer.innerHTML = previewHTML;
                // Delegate click to toggle demo
                previewContainer.onclick = (e) => {
                    const btn = e.target.closest('[data-action="toggle-demo"]');
                    const card = e.target.closest('[data-demo-component]');
                    if (btn && card) {
                        const demo = card.querySelector('.preview-demo');
                        if (demo) demo.classList.toggle('hidden');
                    }
                    const toggle = e.target.closest('[data-action="toggle-preview-limit"]');
                    if (toggle) {
                        this._showAllPreview = !this._showAllPreview;
                        this.updateComponentPreview();
                        return;
                    }
                };
                // 通知图标系统刷新（预览区可能有图标）
                try { document.dispatchEvent(new CustomEvent('icons:refresh', { detail: { scope: previewContainer } })); } catch(_) {}
            },

            updateSelectionDisplay() {
                elements.selectedComponentsCount.innerHTML = `
        <i class="fas fa-cubes mr-2 text-indigo-500" aria-hidden="true"></i>
        <span>已选组件: ${state.selections.components.length} 个</span>
      `;
            }
};
