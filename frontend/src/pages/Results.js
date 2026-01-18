import React, { useEffect, useState } from "react";
import { getResults } from "../api";

export default function Results() {
  const [items, setItems] = useState([]);
  useEffect(() => { getResults().then(setItems); }, []);

  return (
    <div className="card" style={{ marginTop: 18 }}>
      <h1 className="h1">Останні результати</h1>
      <div className="grid" style={{ marginTop: 12 }}>
        {items.map(r => (
          <div key={r.id} className="card" style={{ display:"flex", justifyContent:"space-between" }}>
            <div>
              <div className="badge">#{r.id}</div>
              <div className="small" style={{ marginTop: 8 }}>{new Date(r.created_at).toLocaleString()}</div>
            </div>
            <div className="badge">Бал: {r.score}/{r.total}</div>
          </div>
        ))}
        {!items.length && <div className="small">Поки що немає результатів.</div>}
      </div>
    </div>
  );
}
