import React, { useEffect, useMemo, useState } from "react";
import { getQuiz, postResult } from "../api";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { getQuiz().then(setQuestions); }, []);

  const total = questions.length;

  console.log("answers", answers);
console.log("first question", questions[0]);


const score = useMemo(() => {
  let s = 0;
  for (const q of questions) {
    if (Number(answers[q.id]) === Number(q.answer_index)) s++;
  }
  return s;
}, [answers, questions]);


  async function submit() {
    setSubmitted(true);
    setSaving(true);
    try { await postResult(score, total); } finally { setSaving(false); }
  }

  if (!questions.length) return <div className="card" style={{ marginTop: 18 }}>Завантаження тесту...</div>;

  return (
    <div className="card" style={{ marginTop: 18 }}>
      <h1 className="h1">Тестування (10 питань)</h1>
      <p className="small">Обери варіант відповіді. Після відправки побачиш результат та пояснення.</p>

      <div style={{ marginTop: 12 }} className="grid">
        {questions.map((q, idx) => (
          <div key={q.id} className="card">
            <div className="badge">Питання {idx + 1}</div>
            <div style={{ fontWeight: 800, marginTop: 10 }}>{q.prompt}</div>

            <div style={{ marginTop: 10 }} className="grid">
              {q.options.map((opt, i) => {
                const checked = answers[q.id] === i;
                const correct = submitted && i === q.answer_index;
                const wrong = submitted && checked && i !== q.answer_index;
                return (
                  <label key={i} className="card" style={{ padding: 12, borderColor: correct ? "rgba(0,255,140,0.35)" : wrong ? "rgba(255,80,80,0.35)" : "rgba(255,255,255,0.12)" }}>
                    <input type="radio" name={`q_${q.id}`} checked={checked} disabled={submitted} onChange={() => setAnswers(a => ({ ...a, [q.id]: i }))} style={{ marginRight: 10 }} />
                    <span className="mono">{opt}</span>
                  </label>
                );
              })}
            </div>

            {submitted && <div className="small" style={{ marginTop: 10 }}><b>Пояснення:</b> {q.explanation}</div>}
          </div>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop: 14 }}>
        <div className="badge">Бал: {submitted ? score : "?"} / {total}</div>
        {!submitted ? (
          <button className="btn" onClick={submit} disabled={saving}>{saving ? "Збереження..." : "Завершити тест"}</button>
        ) : (
          <div className="small">Результат збережено ✅</div>
        )}
      </div>
    </div>
  );
}
