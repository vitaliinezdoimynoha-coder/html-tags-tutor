const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function getSessionId() {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    localStorage.setItem("sessionId", id);
  }
  return id;
}

export async function getTags({ q = "", category = "" } = {}) {
  const url = new URL(API + "/api/tags");
  if (q) url.searchParams.set("q", q);
  if (category) url.searchParams.set("category", category);
  return (await fetch(url)).json();
}

export async function getTag(slug) {
  const r = await fetch(API + "/api/tags/" + slug);
  if (!r.ok) throw new Error("Tag not found");
  return r.json();
}

export async function getQuiz() {
  const r = await fetch(API + "/api/questions");
  return r.json();
}

export async function postResult(score, total, details = null) {
  const sessionId = getSessionId();

  const r = await fetch(API + "/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, score, total, details }),
  });

  return r.json();
}

export async function getResults() {
  return (await fetch(API + "/api/results")).json();
}
