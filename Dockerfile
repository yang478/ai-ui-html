# 构建阶段 - 使用具体版本号避免潜在兼容问题
FROM nginx:alpine as builder

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制静态文件
COPY index.html .

# 生产镜像阶段
FROM nginx:alpine

# 从构建阶段复制成果
COPY --from=builder /usr/share/nginx/html/index.html /usr/share/nginx/html/

# 健康检查指令
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["nginx", "-g", "daemon off;"]