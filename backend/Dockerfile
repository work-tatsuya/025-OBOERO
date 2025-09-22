# ベースイメージ
FROM python:3.11-slim

# 作業ディレクトリ
WORKDIR /app

# 依存パッケージのインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# プロジェクトのコードをコピー
COPY . .

# コンテナ起動時のコマンド
CMD ["gunicorn", "oboero.wsgi:application", "--bind", "0.0.0.0:8000"]