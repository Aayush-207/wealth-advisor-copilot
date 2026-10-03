import sys
with open('frontend/src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '      {!turns.length ? ('
end_str = '      ) : ('

start_idx = content.find(start_str)
end_idx = content.find(end_str, start_idx)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx + len(start_str)]
    after = content[end_idx:]
    new_jsx = '''
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
'''
    with open('frontend/src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(before + new_jsx + after)
    print('Success')
else:
    print('Failed to find markers')
