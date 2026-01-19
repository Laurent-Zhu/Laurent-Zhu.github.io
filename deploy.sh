#!/bin/bash

# Laurent Zhu Portfolio - GitHub Pages Deploy Script
# 将此脚本放在仓库根目录运行

echo "🚀 开始部署个人主页到 GitHub Pages..."
echo "================================"

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 找不到 index.html 文件"
    echo "请确保此脚本在正确的项目目录中运行"
    exit 1
fi

# 检查 Git 是否已配置
if ! git config user.name >/dev/null 2>&1; then
    echo "⚠️  Git 用户名未配置，正在设置..."
    read -p "请输入你的名字: " git_name
    git config --global user.name "$git_name"
fi

if ! git config user.email >/dev/null 2>&1; then
    echo "⚠️  Git 邮箱未配置，正在设置..."
    read -p "请输入你的邮箱: " git_email
    git config --global user.email "$git_email"
fi

# 初始化 Git 仓库（如果需要）
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📁 添加文件到 Git..."
git add .

# 输入提交信息
commit_message="Update portfolio - $(date '+%Y-%m-%d %H:%M')"
read -p "输入提交信息 (按 Enter 使用默认值): " input_message
if [ ! -z "$input_message" ]; then
    commit_message="$input_message"
fi

# 提交
echo "💾 提交更改..."
git commit -m "$commit_message"

# 检查远程仓库
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  未配置远程仓库"
    read -p "请输入你的 GitHub 仓库 URL (例如: https://github.com/Laurent-Zhu/Laurent-Zhu.github.io): " repo_url
    
    if [ ! -z "$repo_url" ]; then
        git remote add origin "$repo_url"
    else
        echo "❌ 错误: 未提供仓库 URL"
        exit 1
    fi
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
echo "注意: 如果是第一次推送，可能需要输入 GitHub 用户名和密码/Token"
echo "推荐使用 Personal Access Token 代替密码"
echo ""

git push -u origin main

echo ""
echo "✅ 部署完成！"
echo "================================"
echo "请访问 https://laurent-zhu.github.io 查看你的网站"
echo "注意: 首次部署可能需要 1-2 分钟才能生效"
echo ""
echo "💡 提示: 在 GitHub 仓库设置中确认 GitHub Pages 已启用"
echo "   Settings → Pages → Source 设为 'main' 分支"
