import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTags } from "../api";

export default function Home() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => { getTags({ q, category }).then(setTags); }, [q, category]);

  const categories = useMemo(() => ["", ...Array.from(new Set(tags.map(t => t.category)))], [tags]);

  return (
    <div className="grid" style={{ marginTop: 18 }}>
      <div className="card">
        <h1 className="h1">Каталог HTML-тегів</h1>
        <p className="small">Пошук, приклади, атрибути, пояснення. Обери тег щоб відкрити деталі.</p>

        <div className="grid" style={{ gridTemplateColumns: "1fr 220px", marginTop: 12 }}>
          <input className="input" placeholder="Пошук: p, img, form..." value={q} onChange={e => setQ(e.target.value)} />
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c || "Всі категорії"}</option>)}
          </select>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", marginTop: 14 }}>
          {tags.map(t => (
            <Link key={t.slug} to={`/tags/${t.slug}`} className="card" style={{ padding: 14 }}>
              <div className="badge">{t.category}</div>
              <div style={{ marginTop: 10, fontSize: 18, fontWeight: 800 }} className="mono">{t.name}</div>
              <div className="small" style={{ marginTop: 6 }}>{t.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
