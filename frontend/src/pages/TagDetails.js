import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getTag } from "../api";

export default function TagDetails() {
  const { slug } = useParams();
  const [tag, setTag] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    getTag(slug).then(t => { setTag(t); setCode(t.example_html || ""); });
  }, [slug]);

  if (!tag) return <div className="card" style={{ marginTop: 18 }}>Завантаження...</div>;

  return (
    <div className="grid grid-2" style={{ marginTop: 18 }}>
      <div className="card">
        <div className="badge">{tag.category}</div>
        <h1 className="h1 mono" style={{ marginTop: 10 }}>{tag.name}</h1>
        <p className="small" style={{ marginTop: 8 }}>{tag.description}</p>

        <div style={{ marginTop: 12 }} className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight: 800 }}>Атрибути</div>
            <div className="small">{(tag.attributes || []).length}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            {(tag.attributes || []).length === 0 ? (
              <div className="small">Немає обов'язкових атрибутів.</div>
            ) : (
              <ul style={{ margin:0, paddingLeft: 18 }}>
                {tag.attributes.map((a, idx) => (
                  <li key={idx}><span className="mono">{a.name}</span> — <span className="small">{a.desc}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div style={{ marginTop: 12 }} className="card">
          <div style={{ fontWeight: 800 }}>Нотатки</div>
          <div className="small" style={{ marginTop: 8 }}>{tag.notes}</div>
        </div>
      </div>

      <div className="grid" style={{ gap: 14 }}>
        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Спробуй сам</div>
          <div style={{ height: 220, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)" }}>
            <Editor
              height="220px"
              defaultLanguage="html"
              value={code}
              onChange={v => setCode(v || "")}
              options={{ minimap: { enabled: false }, fontSize: 13 }}
              theme="vs-dark"
            />
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Preview</div>
          <div className="preview">
            <iframe title="preview" style={{ width: "100%", height: 240, border: 0 }} sandbox="allow-scripts allow-forms" srcDoc={String(code || "")} />
          </div>
        </div>
      </div>
    </div>
  );
}
