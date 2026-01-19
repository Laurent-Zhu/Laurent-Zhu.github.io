---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100d6cba080cdde30a3eb467ccb7d27954d879e530b86ac5cde9c77a8e7b3ffec94022054bfffc7062c8ae8b0a0f6c8bd7adeaf447738292e45e57e326e0389b85b4f74
    ReservedCode2: 3045022100fdd616ef76bd94eb971794335c300e18d507c174a3e2b9f11bfda7d8419d928802207031efc23adef66569c86ace8fcef1cb0a9bb744111b9aa0ce057113eaa7ddc5
---

# Laurent Zhu Personal Portfolio

这是一个使用现代化技术栈构建的个人主页，托管于 GitHub Pages。

## 项目预览

- **设计风格**: 科技极简主义 (Tech Minimalist)
- **配色方案**: 深色主题，蓝色强调色
- **响应式设计**: 完美适配桌面端、平板和手机
- **动画效果**: 平滑的滚动动画、打字机效果、悬停交互

## 页面结构

1. **导航栏** - 固定顶部，移动端适配汉堡菜单
2. **首屏区域** - 包含个人介绍和动态打字效果
3. **关于我** - 个人简介和统计数据
4. **技能栈** - 分类展示技术技能，带动画进度条
5. **项目展示** - 响应式网格布局展示项目
6. **联系信息** - 邮箱、GitHub 链接等
7. **页脚** - 版权信息和 GitHub Pages 标识

## 快速开始

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" 号，选择 "New repository"
3. 仓库名称必须为：`Laurent-Zhu.github.io`
4. 选择 "Public"
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 上传项目文件

```bash
# 克隆仓库到本地
git clone https://github.com/Laurent-Zhu/Laurent-Zhu.github.io.git
cd Laurent-Zhu.github.io

# 复制所有文件到仓库目录
# index.html, style.css, script.js, README.md, deploy.sh

# 提交并推送
git add .
git commit -m "Initial commit: Personal portfolio website"
git push origin main
```

### 3. 访问你的网站

部署完成后，访问: **https://laurent-zhu.github.io**

## 自定义内容

### 修改个人信息

编辑 `index.html` 文件：

```html
<!-- 导航栏名称 -->
<span class="logo-text">Laurent.Zhu</span>

<!-- 首屏标题 -->
<h1 class="hero-title">Laurent Zhu</h1>

<!-- 关于我段落 -->
<p>在这里添加你的个人简介...</p>

<!-- 联系邮箱 -->
<a href="mailto:your-email@example.com">your-email@example.com</a>
```

### 修改技能展示

编辑 `script.js` 文件中的 `projects` 数组：

```javascript
const projects = [
    {
        title: '项目名称',
        description: '项目描述',
        icon: 'ri-icon-name',  // RemixIcon 图标名称
        tags: ['React', 'Node.js'],  // 技术标签
        github: 'https://github.com/your-username/project',
        demo: 'https://your-demo-url.com'
    },
    // 添加更多项目...
];
```

### 修改技能进度条

编辑 `index.html` 文件中的技能部分：

```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">技能名称</span>
        <span class="skill-level">85%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" style="--progress: 85%"></div>
    </div>
</div>
```

### 使用自己的头像

1. 准备一张头像图片，尺寸建议 300x300 像素
2. 将图片保存为 `assets/avatar.jpg` 或 `assets/avatar.png`
3. 编辑 `index.html`，找到 `hero-avatar` 部分，替换为：

```html
<div class="hero-avatar">
    <img src="assets/avatar.jpg" alt="Laurent Zhu" class="avatar-image">
    <div class="avatar-glow"></div>
</div>
```

4. 在 `style.css` 中添加图片样式：

```css
.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-xl);
    position: relative;
    z-index: 2;
}
```

## 图标说明

本项目使用 [RemixIcon](https://remixicon.com/) 图标库。

常用图标：
- `ri-user-smile-line` - 用户头像
- `ri-code-line` - 代码
- `ri-terminal-line` - 终端
- `ri-github-fill` - GitHub
- `ri-layout-2-line` - 网页布局
- `ri-server-line` - 服务器
- `ri-database-2-line` - 数据库

完整图标列表请访问: https://remixicon.com/

## 部署验证

部署完成后，检查以下内容：

- [ ] 网站可以正常访问
- [ ] 所有页面链接正常工作
- [ ] 移动端显示正常
- [ ] 动画效果正常显示
- [ ] GitHub 链接指向正确仓库

## 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代布局和动画
- **JavaScript (ES6+)** - 交互逻辑
- **RemixIcon** - 图标库
- **Google Fonts** - 字体资源 (Inter, JetBrains Mono)

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 文件结构

```
Laurent-Zhu.github.io/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # JavaScript 逻辑
├── assets/         # 资源文件夹
│   └── images/     # 图片资源
├── README.md       # 说明文档
└── deploy.sh       # 部署脚本
```

## 许可证

MIT License - 欢迎Fork和Star！

## 联系方式

- GitHub: [@Laurent-Zhu](https://github.com/Laurent-Zhu)
- Email: laurent.zhu@example.com

---

Made with ❤️ by Laurent Zhu
