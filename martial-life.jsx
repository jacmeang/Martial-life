const REALMS = [
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
