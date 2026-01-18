import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";

const starter = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: Arial; padding: 16px; }
      .box { padding: 14px; border: 1px dashed #555; border-radius: 12px; }
    </style>
  </head>
  <body>
    <h2>Спробуй HTML тут 👇</h2>
    <div class="box">
      <p>Зміни цей код і подивись на результат справа.</p>
    </div>
  </body>
</html>`;

export default function Playground() {
  const [code, setCode] = useState(starter);
  const srcDoc = useMemo(() => String(code), [code]);

  return (
    <div className="grid grid-2" style={{ marginTop: 18 }}>
      <div className="card">
        <h1 className="h1">Playground</h1>
        <p className="small">Введи HTML зліва — результат зʼявиться справа.</p>
        <div style={{ height: 520, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", marginTop: 12 }}>
          <Editor height="520px" defaultLanguage="html" value={code} onChange={v => setCode(v || "")} options={{ minimap: { enabled: false }, fontSize: 13 }} theme="vs-dark" />
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Preview</h2>
        <div className="preview">
          <iframe title="preview" style={{ width: "100%", height: 650, border: 0 }} sandbox="allow-scripts allow-forms" srcDoc={srcDoc} />
        </div>
      </div>
    </div>
  );
}
