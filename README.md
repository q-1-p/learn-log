# Learn Log

## サービス概要
日々の学習内容を記録できるWebアプリケーションです。

## 環境設定

### 環境変数の設定
1. プロジェクトのルートディレクトリに `.env` ファイルを作成
2. 以下の環境変数を設定:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## 起動方法

### 開発環境での起動
1. 依存パッケージのインストール
```bash
bun install
```

2. 開発サーバーの起動
```bash
bun run dev
```

### テストの実行
```bash
bun run test
```

### ビルド
```bash
bun run build
```