# Python 文字化け調査メモ

作成日: 2026-05-01

---

## 現象

Bash ツール（Claude Code）上で Python スクリプトを実行し、日本語を `print()` で出力すると文字化けする。

例：
```
title: DP-300 ���W ��3��
range: ��� 101�`150
```

ファイル（JSON）の中身は正常な UTF-8 であることを Read ツールで確認済み。

---

## 根本原因

```
stdout.encoding = cp932   ← ここが問題
locale              = cp932
filesystemencoding  = utf-8
```

Windows 環境では、コンソール（cmd.exe / PowerShell）の標準出力コードページがデフォルトで **cp932（Shift-JIS）** になっている。

Claude Code の Bash ツールはこのコンソール環境を継承するため、`sys.stdout.encoding` が `cp932` になる。

UTF-8 の文字列を cp932 でエンコードしようとすると、cp932 にマッピングできない文字が `?` や別のバイト列に化ける。

---

## 確認コマンド

```bash
python -c "import sys, locale; print(sys.stdout.encoding); print(locale.getpreferredencoding()); print(sys.getfilesystemencoding())"
```

このプロジェクトの結果：
| 項目 | 値 |
|---|---|
| `sys.stdout.encoding` | cp932 |
| `locale.getpreferredencoding()` | cp932 |
| `sys.getfilesystemencoding()` | utf-8 |

---

## ファイルの内容は正常か？

**Yes。** ファイルの読み書きは `encoding='utf-8'` を明示しているため、ファイル自体は正常な UTF-8 で保存されている。文字化けは「ターミナルへの出力」のみで発生する。

確認方法：日本語文字列をファイルに書き出して Read ツールで確認する。

```python
import json
d = json.load(open('data/q101-150.json', encoding='utf-8'))
open('tmp_check.txt', 'w', encoding='utf-8').write(d['title'])
# → Read ツールで tmp_check.txt を確認する
```

---

## 対処方針

### 1. 日本語を print しない（推奨）

検証スクリプトでは、日本語文字列を直接 print する代わりに、**ASCII で表現できる情報だけを出力する**。

```python
# NG：日本語をそのまま print する
print('title:', d['title'])

# OK：長さや ID など ASCII で確認できる情報を使う
print('title length:', len(d['title']))
print('id:', d['id'])                  # ASCII のみ
print('questions:', len(d['questions']))
print('IDs:', [q['id'] for q in d['questions']])
```

### 2. 日本語をファイル経由で確認する

日本語の内容を確認したい場合は、ファイルに書き出して Read ツールで確認する（上記「ファイルの内容は正常か？」参照）。

### 3. PYTHONUTF8 環境変数（恒久対応）

```bash
PYTHONUTF8=1 python script.py
```

または Python 3.7+ では：

```bash
python -X utf8 script.py
```

これにより `sys.stdout.encoding` が `utf-8` になり、print での文字化けが解消される。ただし Claude Code の Bash ツール経由では毎回指定が必要。

---

## 再発防止チェックリスト

- [ ] 検証スクリプトで日本語を `print()` していないか確認する
- [ ] 数値・ID・リストなど ASCII で済む情報に絞って出力する
- [ ] 日本語内容の確認は Read ツール経由にする
- [ ] ファイル読み書きには必ず `encoding='utf-8'` を明示する

---

## 関連ファイル

- `gen_q051_part2.py`（Q51-Q100 生成スクリプト）
- `gen_q101_part1.py`（Q101-Q125 生成スクリプト）
- `gen_q101_part2.py`（Q101-Q150 最終生成スクリプト）
