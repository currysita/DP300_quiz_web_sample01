# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 作業フロー・優先度ルール

各ステップの優先度（10点満点、高いほど優先）：

| ステップ | 優先度 |
|---|---|
| 要件定義 | 10 |
| 設計書 | 8 |
| 調査 | 5 |
| 実装 | 3 |

---

## プロジェクト概要

資格試験（DP-300）向けのブラウザで動く問題集。HTML + JavaScript + JSON で構成し、GitHub Pages でそのまま動作することを前提とする。サーバーサイド処理なし、ビルドツールなし。

## ディレクトリ構成

```
DP300_quiz_web/                  ← リポジトリルート = GitHub Pages 公開ルート
├── index.html                   # 問題集選択画面
├── quiz.html                    # 問題画面
├── result.html                  # 結果画面
├── app.js                       # 共通ロジック
├── style.css                    # スタイル
├── data/                        # 問題集 JSON
│   ├── q001-050.json
│   └── q051-100.json
├── questions/                   # 元データ（Markdown）。編集はここを正とする
│   ├── q001-050.md
│   └── ...
├── schema/
│   └── quiz.schema.json         # 問題集 JSON のスキーマ定義
├── docs/                        # 設計書・要件定義
│   ├── 要件定義/
│   └── 設計書/
├── CLAUDE.md
└── README.md
```

## 技術スタック・制約

- **フロントエンド**: HTML / JavaScript。jQuery や他の JS ライブラリも必要に応じて使用する
- **CSS**: Bootstrap などの CSS ライブラリを必要に応じて使用する
- **ライブラリ読み込み**: CDN 経由で `<script>` / `<link>` タグで読み込む（npm / バンドラー不使用）
- **データ**: JSON ファイルで問題・選択肢・解答・解説を保持
- **ホスティング**: GitHub Pages 対応（静的ファイルのみ、相対パスで完結）
- ビルドステップなし。ブラウザで直接 `index.html` を開けば動く
- ローカル確認は Live Server 等を使う（`file://` プロトコルでは `fetch()` が失敗する）

## 問題データの形式

元データは `questions/*.md` に Markdown 形式で格納されている。各問題の構造：

- **問題文**: 本文に記載
- **選択肢**: `- A. ...` 形式、2〜6択
- **解答・解説**: `<details><summary>解答・解説</summary>` ブロック内
- **廃止フラグ**: `[!WARNING]` ブロックで廃止・出題注意を注記している問題がある
- **解説テーブル**: 各選択肢の正誤を Markdown テーブルで整理

JSON に変換する際はこの構造を忠実に反映すること。変換はAIに依頼する（自動変換スクリプトは廃止済み）。

## スキーマ

`schema/quiz.schema.json` を参照。`additionalProperties: false` のため、スキーマに存在しないフィールドは追加不可。
