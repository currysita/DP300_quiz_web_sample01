# 監視106 — Query Performance Insight

> 対応ユニット: [Query Performance Insight を調べる](https://learn.microsoft.com/ja-jp/training/modules/describe-performance-monitoring/7-explore-query-performance-insight)

---

## 問題 1

Query Performance Insight が使用できるサービスはどれですか？

- A. Azure SQL Database
- B. SQL Server on Azure VM（IaaS）
- C. Azure SQL Managed Instance
- D. SQL Server オンプレミス

<details>
<summary>解答・解説</summary>

**解答:** A

Query Performance Insight は Azure SQL Database 専用の機能で、Azure Portal の「インテリジェント パフォーマンス」セクションからアクセスできます。IaaS の SQL Server やオンプレミス、Managed Instance には提供されていません。

| 選択肢 | 説明 | 正否 |
|---|---|---|
| A. Azure SQL Database | Query Performance Insight の対象サービス | ✅ 正解 |
| B. SQL Server on Azure VM | 対象外。PerfMon や拡張イベントを使用 | ❌ |
| C. Azure SQL Managed Instance | 対象外 | ❌ |
| D. SQL Server オンプレミス | 対象外 | ❌ |

</details>

---

## 問題 2

Query Performance Insight の「リソース消費量の多いクエリ」タブで並べ替えに使用できるメトリックはどれですか？（2 つ選択）

- A. CPU
- B. データ IO
- C. ネットワーク帯域幅
- D. ログ IO

<details>
<summary>解答・解説</summary>

**解答:** A、D

Query Performance Insight では CPU・データ IO・ログ IO のメトリックで並べ替えができます。「リソース消費量の多いクエリ」タブの既定は CPU 順です。ネットワーク帯域幅は並べ替えメトリックに含まれません。

| 選択肢 | 説明 | 正否 |
|---|---|---|
| A. CPU | 並べ替えメトリックとして使用可能（既定） | ✅ 正解 |
| B. データ IO | 並べ替えメトリックとして使用可能 | ❌（正解は A と D） |
| C. ネットワーク帯域幅 | 並べ替えメトリックに含まれない | ❌ |
| D. ログ IO | 並べ替えメトリックとして使用可能 | ✅ 正解 |

</details>

---

## 問題 3

Query Performance Insight でクエリ ID を確認した後、そのクエリをさらに詳しく分析するためにどこを参照しますか？

- A. 拡張イベント セッションの ring_buffer
- B. Azure Monitor のメトリック
- C. クエリ ストア
- D. sys.dm_exec_query_stats DMV

<details>
<summary>解答・解説</summary>

**解答:** C

Query Performance Insight のクエリ ID はクエリ ストア内のクエリ ID と対応しています。Query Performance Insight から収集したメトリックはクエリ ストア自体の中に配置でき、実行プランなどのより詳細な分析が可能です。

| 選択肢 | 説明 | 正否 |
|---|---|---|
| A. 拡張イベントの ring_buffer | クエリ ID との連携機能はない | ❌ |
| B. Azure Monitor のメトリック | クエリレベルの詳細分析はできない | ❌ |
| C. クエリ ストア | QPI のクエリ ID と対応。詳細分析が可能 | ✅ 正解 |
| D. dm_exec_query_stats | 実行中の統計は確認できるが QPI との ID 連携は主にクエリ ストア | ❌ |

</details>

---

## 問題 4

Query Performance Insight について正しい説明はどれですか？

- A. クエリの実行プランを直接表示できる
- B. リソース消費量の多いクエリを上位 5 件まで表示できる
- C. オンプレミスの SQL Server でも Azure Arc 経由で使用できる
- D. データの保持期間は 30 日間に限定される

<details>
<summary>解答・解説</summary>

**解答:** B

Query Performance Insight の「リソース消費量の多いクエリ」タブには上位 5 件のクエリが表示されます。実行プランは表示できませんが、クエリ ID を使ってクエリ ストアからプランを取得できます。

| 選択肢 | 説明 | 正否 |
|---|---|---|
| A. 実行プランを直接表示 | 表示できない。クエリ ストアを介して取得する | ❌ |
| B. 上位 5 件を表示 | 正しい説明 | ✅ 正解 |
| C. Azure Arc 経由でオンプレミスも使用可 | Azure SQL Database 専用機能 | ❌ |
| D. 保持期間は 30 日間 | 保持期間はクエリ ストアの設定に依存 | ❌ |

</details>
