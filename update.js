const fs = require('fs');
const file = 'frontend/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '      {!turns.length ? (';
const endStr = '      ) : (';

const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const before = content.substring(0, startIdx + startStr.length + 1);
  const after = content.substring(endIdx);
  
  const newJSX = 
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", textAlign: "center", padding: "0 20px" }}>
          <div style={{ marginBottom: "2rem", color: "#6356a4" }}>
            <Mark />
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            What can I help you clarify?
          </h1>
          <p style={{ color: "#7c7d83", marginBottom: "3rem", fontSize: "14px" }}>
            Explore considered answers backed by official bank references.
          </p>
          <div style={{ width: "100%", maxWidth: "700px", marginBottom: "2rem" }}>
            <Composer
              input={input}
              setInput={setInput}
              textarea={textarea}
              submit={submit}
              loading={loading}
              stop={stop}
            />
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", maxWidth: "800px" }}>
            {prompts.map((p) => (
              <button
                key={p.title}
                onClick={() => submit(p.text)}
                style={{
                  background: "transparent", border: "1px solid #dcd7e6", borderRadius: "20px",
                  padding: "8px 16px", fontSize: "12px", color: "#656874",
                  cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "#a898c5"; e.currentTarget.style.background = "#fff"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "#dcd7e6"; e.currentTarget.style.background = "transparent"; }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
;
  
  content = before + newJSX + after;
  fs.writeFileSync(file, content);
  console.log('Update successful');
} else {
  console.log('Markers not found');
}
