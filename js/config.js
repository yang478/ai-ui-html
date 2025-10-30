window.CONFIG = {
            purposes: [
                { id: 'website', name: '网站', desc: '公司官网、产品展示等', icon: 'fas fa-globe', color: 'text-blue-500' },
                { id: 'mobile-app', name: '移动应用', desc: 'iOS、Android 等平台', icon: 'fas fa-mobile-alt', color: 'text-green-500' },
                { id: 'dashboard', name: '仪表盘', desc: '数据分析、监控等', icon: 'fas fa-chart-line', color: 'text-purple-500' },
                { id: 'ecommerce', name: '电子商务', desc: '在线商店、购物平台等', icon: 'fas fa-shopping-cart', color: 'text-orange-500' },
                { id: 'marketing', name: '营销推广', desc: '广告页面、活动推广等', icon: 'fas fa-bullhorn', color: 'text-pink-500' },
                { id: 'social-media', name: '社交媒体', desc: '社交平台、社区应用等', icon: 'fas fa-users', color: 'text-blue-400' },
                { id: 'education', name: '教育平台', desc: '学习系统、在线课堂等', icon: 'fas fa-graduation-cap', color: 'text-yellow-600' },
                { id: 'productivity', name: '生产力工具', desc: '任务管理、协作工具等', icon: 'fas fa-tasks', color: 'text-green-600' },
                { id: 'entertainment', name: '娱乐应用', desc: '视频、游戏、音乐等', icon: 'fas fa-film', color: 'text-red-600' },
                { id: 'health', name: '健康应用', desc: '健身、医疗监测等', icon: 'fas fa-heartbeat', color: 'text-red-500' },
                { id: 'travel', name: '旅行服务', desc: '旅游规划、预订服务等', icon: 'fas fa-plane', color: 'text-cyan-500' },
                { id: 'finance', name: '金融工具', desc: '投资分析、预算管理等', icon: 'fas fa-chart-pie', color: 'text-green-500' },
                { id: 'other', name: '其他', desc: '自定义目的', icon: 'fas fa-ellipsis-h', color: 'text-gray-500' },
            ],
            industries: [
                { id: 'tech', name: '科技' }, { id: 'finance', name: '金融' }, { id: 'healthcare', name: '医疗健康' },
                { id: 'education', name: '教育' }, { id: 'entertainment', name: '娱乐' }, { id: 'food', name: '餐饮' },
                { id: 'travel', name: '旅游' }, { id: 'real-estate', name: '房地产' }, { id: 'fashion', name: '时尚' },
                { id: 'retail', name: '零售' }, { id: 'manufacturing', name: '制造业' }, { id: 'transportation', name: '交通运输' },
                { id: 'energy', name: '能源' }, { id: 'agriculture', name: '农业' }, { id: 'construction', name: '建筑' },
                { id: 'media', name: '媒体' }, { id: 'sports', name: '体育' }, { id: 'gaming', name: '游戏' },
                { id: 'automotive', name: '汽车' }, { id: 'legal', name: '法律' }, { id: 'government', name: '政府' },
                { id: 'nonprofit', name: '非营利组织' }, { id: 'art', name: '艺术文化' }, { id: 'other', name: '其他' },
            ],
            styles: [
                { id: '简约', name: '简约', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=200&h=150&q=80' },
                { id: '现代', name: '现代', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=200&h=150&q=80' },
                { id: '复古', name: '复古', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=150' },
                { id: '卡通', name: '卡通', image: 'https://images.unsplash.com/photo-1619950835688-1bddaffce4a0?w=500&auto=format&fit=crop&q=60' },
                { id: '科技', name: '科技', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&h=150&q=80' },
                { id: '手绘', name: '手绘', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=200&h=150&q=80' },
                { id: '极简', name: '极简', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=200&h=150&q=80' },
                { id: '扁平化', name: '扁平化', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&h=150&q=80' },
            ],
            components: {
                navigation: [
                    { name: '导航栏', icon: 'fas fa-bars' },
                    { name: '搜索框', icon: 'fas fa-search' },
                    { name: '面包屑导航', icon: 'fas fa-bread-slice' },
                    { name: '侧边导航', icon: 'fas fa-list-ul' },
                    { name: '导航卡片', icon: 'fas fa-th-large' },
                    { name: '返回顶部按钮', icon: 'fas fa-arrow-up' },
                ],
                content: [
                    { name: 'Hero区域', icon: 'fas fa-star' },
                    { name: '内容区块', icon: 'fas fa-columns' },
                    { name: '图片画廊', icon: 'fas fa-images' },
                    { name: '轮播图', icon: 'far fa-image' },
                    { name: '视频播放器', icon: 'fas fa-video' },
                    { name: '客户评价', icon: 'fas fa-quote-left' },
                    { name: '团队成员展示', icon: 'fas fa-users' },
                    { name: '产品展示', icon: 'fas fa-shopping-bag' },
                    { name: '博客文章', icon: 'fas fa-file-alt' },
                    { name: 'FAQ折叠面板', icon: 'fas fa-question-circle' },
                    { name: '代码展示', icon: 'fas fa-code' },
                ],
                interaction: [
                    { name: '联系表单', icon: 'fas fa-envelope' },
                    { name: '评论区', icon: 'fas fa-comments' },
                    { name: '社交分享', icon: 'fas fa-share-alt' },
                    { name: '悬浮操作按钮', icon: 'fas fa-bolt' },
                    { name: '订阅弹窗', icon: 'fas fa-rss' },
                    { name: 'Tab切换', icon: 'fas fa-table' },
                ],
                data: [
                    { name: '表格', icon: 'fas fa-table' },
                    { name: '分页', icon: 'fas fa-ellipsis-h' },
                    { name: '数据图表', icon: 'fas fa-chart-bar' },
                    { name: '统计卡片', icon: 'fas fa-chart-pie' },
                    { name: '进度条', icon: 'fas fa-tasks' },
                ],
                mobile: [
                    { name: '底部导航栏', icon: 'fas fa-mobile-alt' },
                    { name: '卡片列表', icon: 'fas fa-th-list' },
                    { name: '滑动手势组件', icon: 'fas fa-hand-pointer' },
                    { name: '头像列表', icon: 'fas fa-user-circle' },
                ],
                dialog: [
                    { name: '模态框', icon: 'far fa-window-maximize' },
                    { name: '抽屉面板', icon: 'fas fa-columns' },
                    { name: '通知条', icon: 'fas fa-bell' },
                    { name: '确认弹窗', icon: 'fas fa-question' },
                    { name: 'Toast 提示', icon: 'fas fa-comment' },
                ],
                forms: [
                    { name: '文本输入', icon: 'fas fa-i-cursor' },
                    { name: '数字输入', icon: 'fas fa-hashtag' },
                    { name: '下拉选择', icon: 'fas fa-caret-down' },
                    { name: '级联选择', icon: 'fas fa-sitemap' },
                    { name: '日期选择', icon: 'fas fa-calendar-alt' },
                    { name: '日期范围', icon: 'fas fa-calendar' },
                    { name: '时间选择', icon: 'fas fa-clock' },
                    { name: '文件上传', icon: 'fas fa-upload' },
                    { name: '开关', icon: 'fas fa-toggle-on' },
                    { name: '复选框', icon: 'far fa-check-square' },
                    { name: '单选框', icon: 'far fa-dot-circle' },
                    { name: '滑块', icon: 'fas fa-sliders-h' },
                    { name: '步进器', icon: 'fas fa-sort-numeric-up' },
                    { name: '标签输入', icon: 'fas fa-tags' },
                    { name: '验证码', icon: 'fas fa-shield-alt' },
                    { name: '富文本编辑器', icon: 'fas fa-paragraph' },
                ],
                feedback: [
                    { name: '骨架屏', icon: 'fas fa-border-all' },
                    { name: '空状态', icon: 'fas fa-inbox' },
                    { name: '结果页', icon: 'fas fa-check-circle' },
                    { name: '加载状态', icon: 'fas fa-spinner' },
                    { name: '进度指示', icon: 'fas fa-percent' },
                    { name: '通知提示', icon: 'fas fa-bell' },
                    { name: '警告提示', icon: 'fas fa-exclamation-triangle' },
                    { name: '气泡确认', icon: 'fas fa-question-circle' },
                    { name: '校验提示', icon: 'fas fa-exclamation-circle' },
                    { name: 'Snackbar', icon: 'fas fa-bell' },
                ],
                table: [
                    { name: '固定列表头', icon: 'fas fa-thumbtack' },
                    { name: '固定列', icon: 'fas fa-thumbtack' },
                    { name: '可编辑单元格', icon: 'fas fa-pen' },
                    { name: '合计行', icon: 'fas fa-equals' },
                    { name: '列筛选', icon: 'fas fa-filter' },
                    { name: '列排序', icon: 'fas fa-sort-amount-down' },
                    { name: '行选择', icon: 'fas fa-check-square' },
                    { name: '树形表格', icon: 'fas fa-project-diagram' },
                    { name: '拖拽列宽', icon: 'fas fa-arrows-alt-h' },
                    { name: '导出 CSV', icon: 'fas fa-file-export' },
                    { name: '导入 CSV', icon: 'fas fa-file-import' },
                ],
                auth: [
                    { name: '登录', icon: 'fas fa-sign-in-alt' },
                    { name: '注册', icon: 'fas fa-user-plus' },
                    { name: '忘记密码', icon: 'fas fa-unlock-alt' },
                    { name: '二步验证', icon: 'fas fa-shield-alt' },
                    { name: '绑定第三方', icon: 'fas fa-link' },
                    { name: '权限管理', icon: 'fas fa-user-shield' },
                    { name: '角色管理', icon: 'fas fa-users-cog' },
                    { name: '个人资料', icon: 'fas fa-id-card' },
                    { name: '偏好设置', icon: 'fas fa-sliders-h' },
                ],
                'data-display': [
                    { name: '描述列表', icon: 'fas fa-list' },
                    { name: 'KPI 指标', icon: 'fas fa-bullseye' },
                    { name: '时间轴', icon: 'fas fa-stream' },
                    { name: '树', icon: 'fas fa-tree' },
                    { name: '徽章', icon: 'fas fa-certificate' },
                    { name: '标签', icon: 'fas fa-tag' },
                    { name: '头像组', icon: 'fas fa-user-friends' },
                    { name: '日历', icon: 'fas fa-calendar-week' },
                    { name: '手风琴', icon: 'fas fa-bars' },
                    { name: '可排序列表', icon: 'fas fa-sort' },
                    { name: '虚拟列表', icon: 'fas fa-list-ol' },
                ],
                media: [
                    { name: '音频播放器', icon: 'fas fa-music' },
                    { name: '文件预览', icon: 'fas fa-file' },
                    { name: '文档预览', icon: 'fas fa-file-alt' },
                    { name: 'Lightbox', icon: 'far fa-images' },
                    { name: '图片标注', icon: 'fas fa-draw-polygon' },
                    { name: '视频字幕', icon: 'fas fa-closed-captioning' },
                ],
                map: [
                    { name: '地图展示', icon: 'fas fa-map' },
                    { name: '热力图', icon: 'fas fa-fire' },
                    { name: '路线规划', icon: 'fas fa-route' },
                    { name: '位置选择器', icon: 'fas fa-map-marker-alt' },
                ],
                onboarding: [
                    { name: '引导气泡', icon: 'fas fa-comment-dots' },
                    { name: '功能引导', icon: 'fas fa-magic' },
                    { name: '教程卡片', icon: 'fas fa-graduation-cap' },
                    { name: '遮罩高亮', icon: 'fas fa-highlighter' },
                ],
                a11y: [
                    { name: '字号切换', icon: 'fas fa-text-height' },
                    { name: '高对比度', icon: 'fas fa-adjust' },
                    { name: '键盘导航', icon: 'fas fa-keyboard' },
                    { name: '读屏友好', icon: 'fas fa-universal-access' },
                ],
                i18n: [
                    { name: '语言切换', icon: 'fas fa-language' },
                    { name: '多语言日期货币', icon: 'fas fa-coins' },
                    { name: 'RTL 支持', icon: 'fas fa-align-right' },
                    { name: '文案占位', icon: 'fas fa-text-width' },
                ],
                ecommerce: [
                    { name: '商品卡', icon: 'fas fa-box-open' },
                    { name: 'SKU 选择', icon: 'fas fa-th' },
                    { name: '优惠券输入', icon: 'fas fa-ticket-alt' },
                    { name: '购物车', icon: 'fas fa-shopping-cart' },
                    { name: '结算流程', icon: 'fas fa-cash-register' },
                    { name: '地址管理', icon: 'fas fa-map-marked-alt' },
                    { name: '支付方式', icon: 'fas fa-credit-card' },
                    { name: '订单进度', icon: 'fas fa-shipping-fast' },
                    { name: '促销倒计时', icon: 'fas fa-hourglass-half' },
                    { name: '价格表', icon: 'fas fa-table' },
                    { name: '评价打分', icon: 'fas fa-star-half-alt' },
                    { name: 'CTA 区块', icon: 'fas fa-bullhorn' },
                ],
            },
  sectionTitles: {
                navigation: { title: '导航类组件', icon: 'fas fa-bars' },
                content: { title: '内容类组件', icon: 'fas fa-file-alt' },
                interaction: { title: '交互类组件', icon: 'fas fa-mouse-pointer' },
                data: { title: '数据类组件', icon: 'fas fa-chart-bar' },
                mobile: { title: '移动端组件', icon: 'fas fa-mobile-alt' },
                dialog: { title: '弹窗类组件', icon: 'far fa-window-maximize' },
                forms: { title: '表单与输入', icon: 'fas fa-i-cursor' },
                feedback: { title: '反馈与状态', icon: 'fas fa-info-circle' },
                table: { title: '表格增强', icon: 'fas fa-table' },
                auth: { title: '认证与账户', icon: 'fas fa-user-shield' },
                'data-display': { title: '数据展示', icon: 'fas fa-stream' },
                media: { title: '媒体与预览', icon: 'fas fa-photo-video' },
                map: { title: '地图与位置', icon: 'fas fa-map' },
                onboarding: { title: '引导与教程', icon: 'fas fa-magic' },
                a11y: { title: '无障碍', icon: 'fas fa-universal-access' },
                i18n: { title: '国际化', icon: 'fas fa-language' },
                ecommerce: { title: '电商组件', icon: 'fas fa-shopping-cart' },
  },
  clarificationCards: {
    default: [
      {
        id: 'coreGoal',
        title: '🎯 核心目标',
        question: '这个页面主要是为了？',
        options: ['展示信息', '引导操作', '收集数据', '娱乐互动'],
        mapping: {
          '展示信息': { style: '简约', components: ['内容区块', '轮播图'] },
          '引导操作': { style: '现代', components: ['悬浮操作按钮', '联系表单'] },
          '收集数据': { style: '现代', components: ['联系表单', '表格'] },
          '娱乐互动': { style: '卡通', components: ['评论区', '视频播放器'] }
        }
      },
      {
        id: 'userRole',
        title: '👥 用户角色',
        question: '主要使用者是？',
        options: ['学生', '教师', '家长', '管理员']
      },
      {
        id: 'devicePriority',
        title: '📱 设备优先级',
        question: '主要使用设备？',
        options: ['手机', '平板', '桌面']
      },
      {
        id: 'emotionalTone',
        title: '🎨 情感调性',
        question: '希望传达什么感觉？',
        options: ['专业严谨', '轻松有趣', '温暖亲切', '科技未来'],
        mapping: {
          '轻松有趣': { style: '卡通' },
          '科技未来': { style: '科技' }
        }
      }
    ]
    ,
    education: [
      {
        id: 'eduGoal',
        title: '🎯 教学目标',
        question: '页面主要用途？',
        options: ['课程展示', '作业提交', '学习进度', '考试测评'],
        multiSelect: true,
        mapping: {
          '课程展示': { components: ['产品展示', '博客文章'], style: '简约' },
          '作业提交': { components: ['联系表单'], style: '现代' },
          '学习进度': { components: ['统计卡片', '进度条'], style: '现代' },
          '考试测评': { components: ['表格', '数据图表'], style: '现代' }
        }
      },
      {
        id: 'eduAudience',
        title: '👥 受众',
        question: '主要用户是谁？',
        options: ['学生', '教师', '家长', '管理员'],
        allowCustom: true,
        customPlaceholder: '例如：教研员、校领导...'
      },
      {
        id: 'eduDevice',
        title: '📱 设备优先级',
        question: '主要使用设备？',
        options: ['手机', '平板', '桌面']
      },
      {
        id: 'eduTone',
        title: '🎨 情感调性',
        question: '希望传达什么感觉？',
        options: ['严谨专业', '轻松友好', '科技现代'],
        mapping: {
          '轻松友好': { style: '卡通' },
          '科技现代': { style: '科技' }
        }
      }
    ],
    health: [
      {
        id: 'healthGoal',
        title: '❤️ 健康目标',
        question: '用户主要完成什么任务？',
        options: ['监测数据', '记录症状', '预约就诊', '用药提醒'],
        multiSelect: true,
        mapping: {
          '监测数据': { components: ['数据图表', '统计卡片'] },
          '记录症状': { components: ['联系表单'] },
          '预约就诊': { components: ['联系表单', '进度条'] },
          '用药提醒': { components: ['通知条'] }
        }
      },
      {
        id: 'healthTone',
        title: '🎨 情感调性',
        question: '希望传达的感觉？',
        options: ['专业可信', '温暖关怀', '科技前沿'],
        mapping: {
          '专业可信': { style: '简约' },
          '温暖关怀': { style: '极简' },
          '科技前沿': { style: '科技' }
        }
      },
      {
        id: 'healthCustom',
        title: '📝 特殊需求',
        question: '是否有特殊合规或无障碍要求？',
        allowCustom: true,
        customPlaceholder: '例如：HIPAA 合规、色弱友好...'
      }
    ],
    finance: [
      {
        id: 'finFocus',
        title: '💰 业务重点',
        question: '主要展示或操作内容？',
        options: ['资产概览', '交易记录', '风险提示', '报表导出'],
        multiSelect: true,
        mapping: {
          '资产概览': { components: ['统计卡片'] },
          '交易记录': { components: ['表格', '分页'] },
          '风险提示': { components: ['通知条'] },
          '报表导出': { components: ['数据图表'] }
        }
      },
      {
        id: 'finTone',
        title: '🎨 调性',
        question: '风格倾向？',
        options: ['稳健严肃', '现代简洁', '高端黑金'],
        mapping: {
          '稳健严肃': { style: '简约' },
          '现代简洁': { style: '现代' }
        }
      },
      {
        id: 'finCustom',
        title: '📝 自定义补充',
        question: '合规或品牌规范？',
        allowCustom: true
      }
    ],
    travel: [
      {
        id: 'travelGoal',
        title: '✈️ 用户目标',
        question: '用户主要想做什么？',
        options: ['目的地发现', '行程规划', '订票/订酒', '分享攻略'],
        multiSelect: true,
        mapping: {
          '目的地发现': { components: ['图片画廊', '导航卡片'] },
          '行程规划': { components: ['内容区块', '进度条'] },
          '订票/订酒': { components: ['联系表单'] },
          '分享攻略': { components: ['博客文章', '社交分享'] }
        }
      },
      {
        id: 'travelDevice',
        title: '📱 设备优先级',
        question: '优先适配设备？',
        options: ['手机', '平板', '桌面']
      },
      {
        id: 'travelTone',
        title: '🎨 情感调性',
        question: '希望传达？',
        options: ['活力', '文艺', '专业'],
        mapping: {
          '活力': { style: '扁平化' },
          '文艺': { style: '复古' },
          '专业': { style: '简约' }
        }
      }
    ],
    ecommerce: [
      {
        id: 'ecoFocus',
        title: '🛒 业务重点',
        question: '希望用户做什么？',
        options: ['浏览商品', '加入购物车', '立即购买', '查看评价'],
        multiSelect: true,
        mapping: {
          '浏览商品': { components: ['产品展示', '图片画廊'] },
          '加入购物车': { components: ['购物车'], style: '现代' },
          '立即购买': { components: ['悬浮操作按钮'], style: '现代' },
          '查看评价': { components: ['客户评价'] }
        }
      },
      {
        id: 'ecoPromo',
        title: '🏷️ 营销元素',
        question: '营销信息要素（可多选）',
        options: ['促销倒计时', '优惠券提示', '销量/库存提示', '分期/免息说明'],
        multiSelect: true
      }
    ],
    dashboard: [
      {
        id: 'dashMetrics',
        title: '📊 核心指标',
        question: '主要关注哪些指标？',
        options: ['实时数据', '趋势变化', '对比分析', '告警状态'],
        multiSelect: true,
        mapping: {
          '实时数据': { components: ['统计卡片'] },
          '趋势变化': { components: ['数据图表'] },
          '对比分析': { components: ['数据图表', '表格'] },
          '告警状态': { components: ['通知条'] }
        }
      },
      {
        id: 'dashLayout',
        title: '🧩 布局偏好',
        question: '偏好布局风格？',
        options: ['卡片式', '列表式', '网格图'],
        allowCustom: true
      }
    ]
  },
  promptSuggestions: {
    default: ['响应式布局', '无障碍支持', '加载状态', '错误处理', '微交互'],
    website: ['Hero 区域', '清晰导航', '联系入口', '响应式布局', 'SEO 结构'],
    'mobile-app': ['移动端优先', '触控反馈', '底部导航', '骨架屏加载'],
    dashboard: ['统计卡片', '数据图表', '筛选器', '区块布局', '导出 CSV'],
    ecommerce: ['购物车图标', '一键购买', '商品评分', '促销倒计时', 'SKU 选择'],
    marketing: ['转化引导', '社交分享', '信任背书', 'A/B 测试位'],
    'social-media': ['用户头像', '点赞/评论', '分享动效', '话题标签'],
    education: ['学生友好', '家长入口', '课程进度可视化', '作业提交', '试题卡样式'],
    productivity: ['快捷操作', '键盘快捷键', '待办清单', '批量操作'],
    entertainment: ['沉浸体验', '媒体控件', '推荐算法位', '夜间模式'],
    health: ['健康监测', '风险提示', '医嘱说明', '数据可视化'],
    travel: ['目的地卡片', '地图组件', '行程规划', '订票流程'],
    finance: ['数据对齐', '风险提示', '表格排序', '图表对比'],
    other: ['模块化组件', '文案占位', '轻量动画', '清晰层级']
  }
};
// Provide global identifier for other scripts using CONFIG directly
