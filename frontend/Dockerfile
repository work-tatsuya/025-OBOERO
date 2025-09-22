# Node.js をベースにする
FROM node:20-slim

WORKDIR /app

# 依存関係をコピーしてインストール
COPY package.json package-lock.json* ./
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]
