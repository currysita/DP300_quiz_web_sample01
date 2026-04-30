/**
 * 問題集定義リスト
 * 問題集を追加する場合はここにエントリを追加し、data/ に対応 JSON を置く。
 */
const QUIZ_LIST = [
  {
    id: 'q001-050',
    title: 'DP-300 問題集 第1回',
    range: '問題 1〜50',
    file: 'data/q001-050.json'
  },
  {
    id: 'q051-100',
    title: 'DP-300 問題集 第2回',
    range: '問題 51〜100',
    file: 'data/q051-100.json'
  },
  {
    id: 'q101-150',
    title: 'DP-300 問題集 第3回',
    range: '問題 101〜150',
    file: 'data/q101-150.json'
  },
  {
    id: 'q151-200',
    title: 'DP-300 問題集 第4回',
    range: '問題 151〜200',
    file: 'data/q151-200.json'
  },
  {
    id: 'q201-250',
    title: 'DP-300 問題集 第5回',
    range: '問題 201〜250',
    file: 'data/q201-250.json'
  },
  {
    id: 'q251-300',
    title: 'DP-300 問題集 第6回',
    range: '問題 251〜300',
    file: 'data/q251-300.json'
  },
  {
    id: 'q301-327',
    title: 'DP-300 問題集 第7回',
    range: '問題 301〜327',
    file: 'data/q301-327.json'
  }
];

// ────────────────────────────────────────────
// localStorage ユーティリティ
// キー: quiz_progress_{quizId}
// 値:  { "{questionId}": { answered, correct, selected } }
// ────────────────────────────────────────────

function progressKey(quizId) {
  return 'quiz_progress_' + quizId;
}

function loadProgress(quizId) {
  try {
    return JSON.parse(localStorage.getItem(progressKey(quizId))) || {};
  } catch {
    return {};
  }
}

function saveProgress(quizId, progress) {
  localStorage.setItem(progressKey(quizId), JSON.stringify(progress));
}

function recordAnswer(quizId, questionId, correct, selected) {
  const progress = loadProgress(quizId);
  progress[String(questionId)] = { answered: true, correct, selected };
  saveProgress(quizId, progress);
}

function resetProgress(quizId) {
  localStorage.removeItem(progressKey(quizId));
}

/**
 * 問題集の進捗サマリーを返す。
 * @returns {{ correct: number, incorrect: number, unanswered: number, total: number }}
 */
function calcSummary(quizId, questions) {
  const progress = loadProgress(quizId);
  let correct = 0, incorrect = 0;
  for (const q of questions) {
    const rec = progress[String(q.id)];
    if (rec && rec.answered) {
      rec.correct ? correct++ : incorrect++;
    }
  }
  return { correct, incorrect, unanswered: questions.length - correct - incorrect, total: questions.length };
}

// ────────────────────────────────────────────
// URLパラメータ取得
// ────────────────────────────────────────────

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}
