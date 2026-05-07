jsxconst REALMS = [
  { name: "연기경(鍊氣境)", minPower: 0, desc: "기운을 다스리기 시작하는 단계" },
  { name: "축기경(築氣境)", minPower: 150, desc: "내공이 쌓여 형태를 갖추는 단계" },
  { name: "화경(化境)", minPower: 350, desc: "기운이 몸과 하나되는 단계" },
  { name: "현묘경(玄妙境)", minPower: 600, desc: "삶의 이치가 무공으로 발현되는 단계" },
  { name: "절정(絕頂)", minPower: 900, desc: "오직 깨달음만이 남는 단계" },
];
const typeConfig = {
  enlightenment: { label: "깨달음", color: "#c8a96e", icon: "☯" },
  encounter: { label: "기연", color: "#6eb5c8", icon: "⚔" },
  growth: { label: "수련", color: "#8cc86e", icon: "🔥" },
  demon: { label: "심마", color: "#c86e6e", icon: "💀" },
};
const gainMap = { enlightenment: 15, encounter: 20, growth: 8, demon: 5 };
const INITIAL_LOGS = [{ id: 1, type: "enlightenment", date: new Date().toLocaleDateString("ko-KR"), title: "심지선관법 제1식", content: "긍정이 먼저요, 객관은 그 다음이다. 스트레스 없는 삶이 그 무엇보다 소중한 이치임을 깨달았다. 멘탈을 굳건히 한 뒤에야 세상을 바로 볼 수 있다.", innerPowerGain: 15 }];
const INITIAL_SKILLS = [
  { name: "절제보법(節制步法)", desc: "감정이 몰릴 때 이성으로 귀환하는 심법. 아직 불안정하나 방향은 잡혔다.", level: 2, isNew: false },
  { name: "무채색 기공(無彩色氣功)", desc: "화려함 없이 본질만 남기는 수련. 슬림하고 절제된 외형이 그 증거다.", level: 3, isNew: false },
  { name: "심지선관법(心志先觀法)", desc: "오늘 깨달은 심법. 긍정으로 심지를 굳힌 뒤 객관으로 세상을 본다.", level: 1, isNew: true },
];
const INITIAL_DEMONS = [{ id: 1, name: "미완성의 인연(未完成因緣)", desc: "끝나지도 시작되지도 않은 관계. 이 집착이 다음 경지로 가는 관문이다.", resolved: false }];

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

function MartialLife() {
  const [view, setView] = React.useState("profile");
  const [logs, setLogs] = React.useState(() => loadFromStorage("ml_logs", INITIAL_LOGS));
  const [skills, setSkills] = React.useState(() => loadFromStorage("ml_skills", INITIAL_SKILLS));
  const [demons, setDemons] = React.useState(() => loadFromStorage("ml_demons", INITIAL_DEMONS));
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ type: "enlightenment", title: "", content: "" });
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => { localStorage.setItem("ml_logs", JSON.stringify(logs)); }, [logs]);
  React.useEffect(() => { localStorage.setItem("ml_skills", JSON.stringify(skills)); }, [skills]);
  React.useEffect(() => { localStorage.setItem("ml_demons", JSON.stringify(demons)); }, [demons]);

  const totalPower = logs.reduce((s, l) => s + (l.innerPowerGain || 0), 0);
  const currentRealm = [...REALMS].reverse().find(r => totalPower >= r.minPower) || REALMS[0];
  const nextRealm = REALMS[REALMS.indexOf(currentRealm) + 1];
  const progress = nextRealm ? Math.min(((totalPower - currentRealm.minPower) / (nextRealm.minPower - currentRealm.minPower)) * 100, 100) : 100;
  const totalEnlightenments = logs.filter(l => l.type === "enlightenment").length;
  const totalEncounters = logs.filter(l => l.type === "encounter").length;

  const submitLog = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const newLog = { id: Date.now(), type: form.type, date: new Date().toLocaleDateString("ko-KR"), title: form.title, content: form.content, innerPowerGain: gainMap[form.type] };
    setLogs(prev => [newLog, ...prev]);
    if (form.type === "enlightenment") {
      setSkills(prev => [{ name: form.title, desc: form.content.slice(0, 55) + (form.content.length > 55 ? "…" : ""), level: 1, isNew: true }, ...prev.map(s => ({ ...s, isNew: false }))]);
    }
    if (form.type === "demon") {
      setDemons(prev => [...prev, { id: Date.now(), name: form.title, desc: form.content, resolved: false }]);
    }
    setNotification({ type: form.type, gain: gainMap[form.type] });
    setTimeout(() => setNotification(null), 3000);
    setForm({ type: "enlightenment", title: "", content: "" });
    setShowForm(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d0", fontFamily: "'Noto Serif KR', 'Noto Serif', Georgia, serif" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 15%, rgba(200,169,110,0.05) 0%, transparent 55%)" }} />
      {notification && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", border: `1px solid ${typeConfig[notification.type].color}`, padding: "10px 22px", zIndex: 100, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: typeConfig[notification.type].color, letterSpacing: 3 }}>{typeConfig[notification.type].icon} {typeConfig[notification.type].label} 획득</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>내공 +{notification.gain} 증가하였다</div>
        </div>
      )}
      <div style={{ borderBottom: "1px solid #1e1e1e", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 3 }}>무림비록(武林秘錄)</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>영준의 수련일지</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#c8a96e" }}>{currentRealm.name}</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>내공 {totalPower}</div>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
        {[{ key: "profile", label: "무인전" }, { key: "logs", label: "수련록" }, { key: "skills", label: "무공보" }, { key: "demons", label: "심마" }].map(t => (
          <button key={t.key} onClick={() => setView(t.key)} style={{ flex: 1, padding: "13px 4px", background: "none", border: "none", borderBottom: view === t.key ? "2px solid #c8a96e" : "2px solid transparent", color: view === t.key ? "#c8a96e" : "#555", fontSize: 11, letterSpacing: 2, cursor: "pointer" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ padding: "20px", maxWidth: 560, margin: "0 auto" }}>
        {view === "profile" && (
          <div>
            <div style={{ border: "1px solid #222", padding: "24px 20px", marginBottom: 16, background: "#111", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 6 }}>무채색문파(無彩色門派)</div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, marginBottom: 3 }}>영준</div>
              <div style={{ fontSize: 12, color: "#c8a96e", letterSpacing: 2, marginBottom: 20 }}>무명검객 → 단단해지는 중인 자</div>
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#c8a96e" }}>{currentRealm.name}</span>
                  <span style={{ fontSize: 10, color: "#555" }}>{totalPower}{nextRealm ? ` / ${nextRealm.minPower}` : " (정점)"}</span>
                </div>
                <div style={{ height: 2, background: "#1e1e1e", borderRadius: 1 }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #c8a96e, #e8c98e)", borderRadius: 1 }} />
                </div>
                {nextRealm && <div style={{ fontSize: 10, color: "#444", marginTop: 6, textAlign: "right" }}>다음: {nextRealm.name}</div>}
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 14, fontStyle: "italic", lineHeight: 1.8 }}>"{currentRealm.desc}"</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[{ label: "깨달음", value: totalEnlightenments, color: "#c8a96e" }, { label: "기연", value: totalEncounters, color: "#6eb5c8" }, { label: "기록", value: logs.length, color: "#8cc86e" }].map(s => (
                <div key={s.label} style={{ border: "1px solid #1e1e1e", padding: "14px 10px", textAlign: "center", background: "#111" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid #1e1e1e", padding: "18px", background: "#111" }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 14 }}>무인의 본질</div>
              {[{ trait: "실전형 성장", desc: "실수를 양분 삼아 스스로를 단련하는 자" }, { trait: "내면 중심", desc: "소음 속에서도 내면에서 답을 찾는 자" }, { trait: "부동심(不動心)을 향해", desc: "여유롭게 흔들리지 않는 경지를 목표로 함" }].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < 2 ? "1px solid #181818" : "none" }}>
                  <div style={{ color: "#c8a96e", fontSize: 12, paddingTop: 2 }}>◆</div>
                  <div>
                    <div style={{ fontSize: 13, marginBottom: 2 }}>{t.trait}</div>
                    <div style={{ fontSize: 11, color: "#666" }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "logs" && (
          <div>
            <button onClick={() => setShowForm(v => !v)} style={{ width: "100%", padding: "13px", background: showForm ? "transparent" : "#c8a96e", color: showForm ? "#c8a96e" : "#0d0d0d", border: "1px solid #c8a96e", fontSize: 11, letterSpacing: 3, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>
              {showForm ? "✕  닫기" : "+ 오늘의 수련 기록"}
            </button>
            {showForm && (
              <div style={{ border: "1px solid #222", padding: "18px", marginBottom: 16, background: "#111" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {Object.entries(typeConfig).map(([key, cfg]) => (
                    <button key={key} onClick={() => setForm(f => ({ ...f, type: key }))} style={{ padding: "9px", border: `1px solid ${form.type === key ? cfg.color : "#222"}`, background: form.type === key ? `${cfg.color}15` : "#0d0d0d", color: form.type === key ? cfg.color : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                      {cfg.icon} {cfg.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>제목</div>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="기록의 이름" style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }} />
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>내용</div>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="오늘 있었던 일, 느낀 것, 깨달은 것" rows={4} style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 12, marginBottom: 14, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", lineHeight: 1.8 }} />
                <button onClick={submitLog} style={{ width: "100%", padding: "11px", background: typeConfig[form.type].color, color: "#0d0d0d", border: "none", fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                  기록하여 내공을 쌓는다 (+{gainMap[form.type]})
                </button>
              </div>
            )}
            {logs.map(log => (
              <div key={log.id} style={{ borderLeft: `3px solid ${typeConfig[log.type].color}`, border: `1px solid #1e1e1e`, padding: "14px 18px", marginBottom: 10, background: "#111" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: typeConfig[log.type].color, letterSpacing: 2 }}>{typeConfig[log.type].icon} {typeConfig[log.type].label}</span>
                  <span style={{ fontSize: 10, color: "#444" }}>{log.date}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{log.title}</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>{log.content}</div>
                <div style={{ fontSize: 10, color: typeConfig[log.type].color, marginTop: 8, textAlign: "right" }}>내공 +{log.innerPowerGain}</div>
              </div>
            ))}
          </div>
        )}
        {view === "skills" && (
          <div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 18 }}>깨달음이 쌓일수록 새로운 무공이 열린다</div>
            {skills.map((sk, i) => (
              <div key={i} style={{ border: `1px solid ${sk.isNew ? "#c8a96e44" : "#1e1e1e"}`, padding: "18px", marginBottom: 10, background: sk.isNew ? "#141209" : "#111", position: "relative" }}>
                {sk.isNew && <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, color: "#c8a96e", border: "1px solid #c8a96e44", padding: "2px 7px", letterSpacing: 2 }}>NEW</div>}
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{sk.name}</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                  {Array.from({ length: 5 }).map((_, j) => (<div key={j} style={{ width: 18, height: 2, background: j < sk.level ? "#c8a96e" : "#222" }} />))}
                  <span style={{ fontSize: 9, color: "#555", marginLeft: 4 }}>Lv.{sk.level}</span>
                </div>
                <div style={{ fontSize: 11, color: "#777", lineHeight: 1.8, fontStyle: "italic" }}>"{sk.desc}"</div>
              </div>
            ))}
          </div>
        )}
        {view === "demons" && (
          <div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 18 }}>심마는 극복할 때 비로소 다음 경지의 문이 열린다</div>
            {demons.map((d) => (
              <div key={d.id} style={{ border: "1px solid #1e1e1e", borderLeft: `3px solid ${d.resolved ? "#8cc86e" : "#c86e6e"}`, padding: "18px", marginBottom: 10, background: "#111" }}>
                <div style={{ fontSize: 10, color: d.resolved ? "#8cc86e" : "#c86e6e", letterSpacing: 2, marginBottom: 6 }}>{d.resolved ? "✓ 극복됨" : "💀 미해결"}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "#777", lineHeight: 1.8, fontStyle: "italic" }}>"{d.desc}"</div>
                {!d.resolved && (
                  <div style={{ marginTop: 14, padding: "9px", background: "#0d0d0d", border: "1px solid #1a1a1a", fontSize: 10, color: "#555", lineHeight: 1.8 }}>
                    ※ 이 심마와 관련된 깨달음을 수련록에 기록하면 다음 경지로 나아갈 수 있다.
                  </div>
                )}
              </div>
            ))}
            <div style={{ border: "1px dashed #1e1e1e", padding: "18px", textAlign: "center", color: "#444", fontSize: 11, lineHeight: 1.8 }}>
              새로운 심마는 수련록에서<br />'심마' 유형으로 기록하면 자동 등록된다
            </div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { transition: all 0.15s; }
        input, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MartialLife));
