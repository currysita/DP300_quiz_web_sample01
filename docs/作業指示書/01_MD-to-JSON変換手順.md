# 作業指示書：questions/*.md → data/*.json 変換

## 目的

`questions/` 以下の Markdown ファイルを、`schema/quiz.schema.json` に準拠した JSON に変換し `data/` に出力する。

---

## ファイル対応表

| 変換元（Markdown） | 変換先（JSON） |
|---|---|
| `questions/q001-050.md` | `data/q001-050.json` |
| `questions/q051-100.md` | `data/q051-100.json` |
| `questions/q101-150.md` | `data/q101-150.json` |
| `questions/q151-200.md` | `data/q151-200.json` |
| `questions/q201-250.md` | `data/q201-250.json` |
| `questions/q251-300.md` | `data/q251-300.json` |
| `questions/q301-327.md` | `data/q301-327.json` |

---

## スキーマ参照先

`schema/quiz.schema.json`

`additionalProperties: false` のため、スキーマに存在しないフィールドは絶対に追加しないこと。

---

## 変換ルール

### JSON トップレベル

| JSONフィールド | 設定値 |
|---|---|
| `id` | ファイル名から拡張子を除いた文字列（例: `q001-050`） |
| `title` | Markdownの `# 見出し` のテキスト（例: `DP-300 問題集 問題 1〜50`） |
| `range` | ファイルの問題番号範囲（例: `問題 1〜50`） |
| `questions` | 下記ルールで変換した問題オブジェクトの配列 |

### 問題オブジェクト（`questions[]` の各要素）

#### `id`
`## 問題 N` の `N` を整数で設定する。

#### `question`
問題文の本文テキスト。`## 問題 N` の直後から選択肢リストの直前まで（`[!WARNING]` ブロックは除く）。

#### `type` / `answer_count`
問題文末尾の表記で判定する。

| 問題文の表記 | `type` | `answer_count` |
|---|---|---|
| `（一つ選択）` | `"single"` | 設定しない |
| `（二つ選択）` | `"multiple"` | `2` |
| `（三つ選択）` | `"multiple"` | `3` |

#### `choices`
`- A. テキスト` 形式の各行を変換する。

```json
{ "label": "A", "text": "テキスト" }
```

#### `answer`
`<details>` ブロック内の `**解答:** X` から取得する。

- single: `"A"` のような文字列
- multiple: `["A", "C"]` のような文字列配列（「A、C」や「A・C」を分割）

#### `explanation`
`<details>` ブロック内の解答行の直後から `</details>` までの全テキスト。

**Markdown テーブル・コードブロックをそのまま含めてよい。** UI 側（marked.js）がレンダリングするため、HTML に変換せず Markdown のまま格納する。

```
**解答:** A

本文テキスト...

| 列1 | 列2 |
|---|---|
| 値A | 値B |
```

上記のような解説テーブルが元 Markdown に存在する場合は、テーブル部分も含めて `explanation` に格納する。

#### `explanation_table`（任意・省略可）
各選択肢の正否を UI でテーブル表示したい場合のみ使用する。通常の変換では省略してよい。

使用する場合は `<details>` ブロック内の Markdown テーブルを変換する。

```json
{ "label": "A", "text": "説明文", "correct": true }
```

- `correct` は「✅ 正解」が含まれる行を `true`、それ以外を `false` とする

#### `deprecated` / `deprecation_note`
`[!WARNING]` ブロックが存在する問題に設定する。

```json
"deprecated": true,
"deprecation_note": "[!WARNING] ブロックのテキスト（Markdown記法除去済み）"
```

ブロックが存在しない場合はこれらのフィールド自体を省略する（`false` を明示しない）。

#### `skip` / `skip_note`
通常は設定しない。変換作業中に出題不可と判断した場合のみ設定する。

---

## 注意事項

- `<!-- ... -->` コメント行は無視する
- 問題番号に欠番がある場合（例: 問題16）はそのまま欠番とし、採番を詰めない
- `~~取り消し線~~` テキストは `explanation` に含めてよい（Markdownのまま）
- 解説テーブルのヘッダー行（`| 選択肢 | 説明 | 正否 |`）は `explanation_table` に含めない
- JSON の文字コードは UTF-8

---

## 出力確認チェックリスト

- [ ] スキーマバリデーションが通る（`additionalProperties` 違反がない）
- [ ] `type: "multiple"` の問題に `answer_count` が設定されている
- [ ] `answer` の型が `type` と一致している（single=文字列、multiple=配列）
- [ ] 欠番がある場合、`id` の連番が詰まっていない
- [ ] `deprecated: true` の問題に `deprecation_note` が設定されている
