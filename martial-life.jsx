const REALMS = [
  { name: "삼류(三流)", minPower: 0, desc: "무림의 첫 걸음. 아직 기운조차 다스리지 못한다." },
  { name: "이류(二流)", minPower: 80, desc: "기초를 익히고 스스로를 단련하기 시작했다." },
  { name: "일류(一流)", minPower: 200, desc: "무림에서 인정받는 경지. 기운이 안정되었다." },
  { name: "절정(絕頂)", minPower: 380, desc: "일류를 넘어선 자. 스스로의 길을 걷기 시작한다." },
  { name: "초절정(超絕頂)", minPower: 600, desc: "무림 최고수의 반열에 오른 자." },
  { name: "화경(化境)", minPower: 900, desc: "기운이 몸과 하나되는 단계. 무공이 자연스러워진다." },
  { name: "현경(玄境)", minPower: 1300, desc: "현묘한 이치를 깨달은 자. 세상이 다르게 보인다." },
  { name: "생사경(生死境)", minPower: 1800, desc: "삶과 죽음의 경계를 초월한 자." },
  { name: "자연경(自然境)", minPower: 2500, desc: "자연과 하나된 경지. 무림의 전설이 된다." },
];

const typeConfig = {
  enlightenment: { label: "깨달음", color: "#c8a96e", icon: "☯" },
  encounter: { label: "기연", color: "#6eb5c8", icon: "⚔" },
  growth: { label: "수련", color: "#8cc86e", icon: "🔥" },
  demon: { label: "심마", color: "#c86e6e", icon: "💀" },
};

const gainMap = { enlightenment: 15, encounter: 20, growth: 8, demon: 5 };

const SECT_DATA = {
  shaolin: { name: "소림사(少林寺)", align: "정파", color: "#e8a84e", title: "불굴의 수행자", desc: "태산북두. 고통을 양분 삼아 성장하는 자. 심마를 밟고 일어선 금강불괴의 무인이다.", traits: "인내 · 극복 · 불굴" },
  wudang: { name: "무당파(武當派)", align: "정파", color: "#6eb5c8", title: "이치를 탐구하는 도인", desc: "태극의 이치로 세상을 보는 자. 부드러움으로 강함을 이기며 깨달음이 곧 무공이다.", traits: "지혜 · 이치 · 도가" },
  hwasan: { name: "화산파(華山派)", align: "정파", color: "#c87878", title: "매화의 검수", desc: "끊임없는 단련으로 정상을 향하는 자. 매화가 혹한을 이기듯 너의 무공도 피어날 것이다.", traits: "단련 · 집중 · 검술" },
  ami: { name: "아미파(峨嵋派)", align: "정파", color: "#c8a0c8", title: "청정한 수련자", desc: "내면의 청정함으로 무공을 쌓는 자. 아미의 선녀처럼 고결한 무인이다.", traits: "청정 · 내면 · 절제" },
  gaebang: { name: "개방(丐幇)", align: "정파", color: "#a8c87e", title: "천하를 유랑하는 협객", desc: "인연과 만남으로 성장하는 자. 의리가 무공보다 강하며 천하가 곧 너의 스승이다.", traits: "의리 · 기연 · 유랑" },
  namgung: { name: "남궁세가(南宮世家)", align: "정파", color: "#c8a96e", title: "검과 지혜를 겸비한 자", desc: "창궁무애검의 기상으로 무림의 중심을 향하는 자. 균형과 절제가 너의 무기다.", traits: "균형 · 검술 · 지략" },
  dangga: { name: "사천당가(四川唐家)", align: "정사지간", color: "#8ec8a0", title: "지략으로 움직이는 자", desc: "보이지 않는 곳에서 세상을 움직이는 자. 지략과 분석이 곧 너의 무기다.", traits: "지략 · 분석 · 은밀" },
  jegal: { name: "제갈세가(諸葛世家)", align: "정파", color: "#7eb5c8", title: "천하의 군사", desc: "제갈량의 후손. 진법과 전략으로 세상을 설계하는 자. 무공보다 지략이 먼저다.", traits: "지략 · 전략 · 분석" },
  haomun: { name: "하오문(下汚門)", align: "사파", color: "#888888", title: "강호를 떠도는 자", desc: "세상 모든 곳에서 배우는 자. 정보가 곧 무기이며 강호의 이면을 꿰뚫어 본다.", traits: "정보 · 유랑 · 적응" },
  magio: { name: "마교(魔敎)", align: "마교", color: "#8e6eb5", title: "어둠을 품은 구도자", desc: "강자존의 이치를 따르는 자. 어둠 속에서 빛을 찾으며 천마의 길을 걷는다.", traits: "강함 · 독립 · 극단" },
  bukhaebinggung: { name: "북해빙궁(北海氷宮)", align: "새외", color: "#a0c8e8", title: "고독한 설원의 무인", desc: "극한의 고독 속에서 스스로를 단련하는 자. 냉정함이 곧 너의 무공이다.", traits: "고독 · 냉정 · 독자" },
  unknown: { name: "무채색문파(無彩色門派)", align: "독립", color: "#aaaaaa", title: "자신만의 길을 걷는 자", desc: "정해진 틀 없이 스스로를 만들어가는 자. 무림 최고의 이단아. 새로운 전설이 될 것이다.", traits: "자유 · 독립 · 개척" },
};

const ALIGN_COLORS = { "정파": "#c8a96e", "마교": "#8e6eb5", "사파": "#888888", "새외": "#6eb5c8", "정사지간": "#8ec8a0", "독립": "#aaaaaa" };

function analyzeSect(logs) {
  if (logs.length < 5) return null;
  var total = logs.length;
  var e = logs.filter(function(l) { return l.type === "enlightenment"; }).length;
  var g = logs.filter(function(l) { return l.type === "growth"; }).length;
  var en = logs.filter(function(l) { return l.type === "encounter"; }).length;
  var d = logs.filter(function(l) { return l.type === "demon"; }).length;
  var dr = logs.filter(function(l) { return l.isDemonResolution; }).length;
  var er = e / total;
  var gr = g / total;
  var enr = en / total;
  var dr2 = dr / total;
  var demonR = d / total;
  if (dr2 >= 0.2) return SECT_DATA.shaolin;
  if (er >= 0.55) return SECT_DATA.wudang;
  if (gr >= 0.55) return SECT_DATA.hwasan;
  if (enr >= 0.45) return SECT_DATA.gaebang;
  if (demonR >= 0.4) return SECT_DATA.magio;
  if (er >= 0.3 && enr >= 0.25) return SECT_DATA.namgung;
  if (er >= 0.3 && gr >= 0.3) return SECT_DATA.wudang;
  if (er >= 0.3 && demonR >= 0.1 && enr < 0.2) return SECT_DATA.dangga;
  if (er >= 0.35 && enr < 0.2) return SECT_DATA.ami;
  if (gr >= 0.4 && er >= 0.2) return SECT_DATA.hwasan;
  if (enr >= 0.3 && demonR >= 0.15) return SECT_DATA.haomun;
  if (demonR >= 0.25) return SECT_DATA.magio;
  if (enr >= 0.35) return SECT_DATA.gaebang;
  if (gr >= 0.4) return SECT_DATA.hwasan;
  if (er >= 0.3 && g < 3) return SECT_DATA.jegal;
  if (er >= 0.3) return SECT_DATA.wudang;
  if (total < 15 && demonR >= 0.1 && enr < 0.2) return SECT_DATA.bukhaebinggung;
  return SECT_DATA.unknown;
}

function loadFromStorage(key, fallback) {
  try {
    var saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch(e) {
    return fallback;
  }
}

function MartialLife() {
  var storedName = localStorage.getItem("ml_name");
  var [screen, setScreen] = React.useState(storedName ? "main" : "setup");
  var [name, setName] = React.useState(storedName || "");
  var [nameInput, setNameInput] = React.useState("");
  var [view, setView] = React.useState("profile");
  var [logs, setLogs] = React.useState(function() { return loadFromStorage("ml_logs", []); });
  var [skills, setSkills] = React.useState(function() { return loadFromStorage("ml_skills", []); });
  var [demons, setDemons] = React.useState(function() { return loadFromStorage("ml_demons", []); });
  var [showForm, setShowForm] = React.useState(false);
  var [form, setForm] = React.useState({ type: "enlightenment", title: "", content: "", isDemonResolution: false });
  var [notification, setNotification] = React.useState(null);

  React.useEffect(function() { localStorage.setItem("ml_logs", JSON.stringify(logs)); }, [logs]);
  React.useEffect(function() { localStorage.setItem("ml_skills", JSON.stringify(skills)); }, [skills]);
  React.useEffect(function() { localStorage.setItem("ml_demons", JSON.stringify(demons)); }, [demons]);

  var totalPower = logs.reduce(function(s, l) { return s + (l.innerPowerGain || 0); }, 0);
  var currentRealm = REALMS.slice().reverse().find(function(r) { return totalPower >= r.minPower; }) || REALMS[0];
  var realmIdx = REALMS.indexOf(currentRealm);
  var nextRealm = realmIdx < REALMS.length - 1 ? REALMS[realmIdx + 1] : null;
  var progress = nextRealm ? Math.min(((totalPower - currentRealm.minPower) / (nextRealm.minPower - currentRealm.minPower)) * 100, 100) : 100;
  var totalEnlightenments = logs.filter(function(l) { return l.type === "enlightenment"; }).length;
  var totalEncounters = logs.filter(function(l) { return l.type === "encounter"; }).length;
  var sectInfo = analyzeSect(logs);

  function startJourney() {
    if (!nameInput.trim()) return;
    localStorage.setItem("ml_name", nameInput.trim());
    setName(nameInput.trim());
    setScreen("main");
  }

  function resolveDemon(id) {
    setDemons(function(prev) { return prev.map(function(d) { return d.id === id ? Object.assign({}, d, { resolved: true }) : d; }); });
  }

  function submitLog() {
    if (!form.title.trim() || !form.content.trim()) return;
    var gain = (form.type === "enlightenment" && form.isDemonResolution) ? 30 : gainMap[form.type];
    var newLog = { id: Date.now(), type: form.type, date: new Date().toLocaleDateString("ko-KR"), title: form.title, content: form.content, innerPowerGain: gain, isDemonResolution: form.isDemonResolution };
    setLogs(function(prev) { return [newLog].concat(prev); });
    if (form.type === "enlightenment") {
      var desc = form.content.slice(0, 55) + (form.content.length > 55 ? "…" : "");
      setSkills(function(prev) { return [{ name: form.title, desc: desc, level: 1, isNew: true }].concat(prev.map(function(s) { return Object.assign({}, s, { isNew: false }); })); });
    }
    if (form.type === "demon") {
      setDemons(function(prev) { return prev.concat([{ id: Date.now(), name: form.title, desc: form.content, resolved: false }]); });
    }
    setNotification({ type: form.type, gain: gain, bonus: form.isDemonResolution });
    setTimeout(function() { setNotification(null); }, 3500);
    setForm({ type: "enlightenment", title: "", content: "", isDemonResolution: false });
    setShowForm(false);
  }

  var tabs = [
    { key: "profile", label: "무인전" },
    { key: "logs", label: "수련록" },
    { key: "skills", label: "무공보" },
    { key: "demons", label: "심마" },
  ];

  var unresolvedDemons = demons.filter(function(d) { return !d.resolved; });

  if (screen === "setup") {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d0", fontFamily: "'Noto Serif KR','Noto Serif',Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 10, letterSpacing: 6, color: "#555", marginBottom: 16 }}>무림비록(武林秘錄)</div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, marginBottom: 12 }}>입문(入門)</div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 8, textAlign: "center", lineHeight: 2 }}>
          무림에 발을 들이는 자여,<br />그대의 이름을 밝혀라.
        </div>
        <div style={{ fontSize: 11, color: "#444", marginBottom: 40, textAlign: "center", lineHeight: 1.8 }}>
          수련을 쌓으면 그대의 성향에 맞는<br />문파가 스스로 정해질 것이다.
        </div>
        <input
          value={nameInput}
          onChange={function(e) { setNameInput(e.target.value); }}
          onKeyDown={function(e) { if (e.key === "Enter") startJourney(); }}
          placeholder="이름을 입력하라"
          style={{ width: "100%", maxWidth: 300, padding: "14px 16px", background: "#111", border: "1px solid #333", color: "#e8e0d0", fontSize: 16, marginBottom: 16, textAlign: "center", fontFamily: "inherit", letterSpacing: 2, outline: "none", boxSizing: "border-box" }}
        />
        <button
          onClick={startJourney}
          style={{ width: "100%", maxWidth: 300, padding: "14px", background: "#c8a96e", color: "#0d0d0d", border: "none", fontSize: 13, letterSpacing: 4, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}
        >
          무림에 입문한다
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#e8e0d0", fontFamily: "'Noto Serif KR','Noto Serif',Georgia,serif" }}>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 15%, rgba(200,169,110,0.05) 0%, transparent 55%)" }}></div>

      {notification && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", border: "1px solid " + typeConfig[notification.type].color, padding: "10px 24px", zIndex: 100, textAlign: "center", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 10, color: typeConfig[notification.type].color, letterSpacing: 3 }}>{typeConfig[notification.type].icon} {typeConfig[notification.type].label} 획득</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>내공 +{notification.gain} 증가{notification.bonus ? " 🔥 심마극복 2배!" : ""}</div>
        </div>
      )}

      <div style={{ borderBottom: "1px solid #1e1e1e", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 3 }}>무림비록(武林秘錄)</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>{name}의 수련일지</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#c8a96e" }}>{currentRealm.name}</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>내공 {totalPower}</div>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
        {tabs.map(function(t) {
          return (
            <button
              key={t.key}
              onClick={function() { setView(t.key); }}
              style={{ flex: 1, padding: "13px 4px", background: "none", border: "none", borderBottom: view === t.key ? "2px solid #c8a96e" : "2px solid transparent", color: view === t.key ? "#c8a96e" : "#555", fontSize: 11, letterSpacing: 2, cursor: "pointer" }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "20px", maxWidth: 560, margin: "0 auto" }}>

        {view === "profile" && (
          <div>

            <div style={{ border: "1px solid #222", padding: "24px 20px", marginBottom: 16, background: "#111", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)" }}></div>
              {sectInfo ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: sectInfo.color, letterSpacing: 2 }}>{sectInfo.name}</div>
                    <div style={{ fontSize: 9, color: ALIGN_COLORS[sectInfo.align] || "#888", border: "1px solid " + (ALIGN_COLORS[sectInfo.align] || "#888"), padding: "1px 6px", letterSpacing: 1 }}>{sectInfo.align}</div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, marginBottom: 3 }}>{name}</div>
                  <div style={{ fontSize: 12, color: sectInfo.color, letterSpacing: 2, marginBottom: 6 }}>{sectInfo.title}</div>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 16 }}>{sectInfo.traits}</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 6 }}>문파 미정</div>
                  <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, marginBottom: 3 }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#555", letterSpacing: 2, marginBottom: 12 }}>무명의 입문자</div>
                  <div style={{ fontSize: 11, color: "#444", padding: "10px", background: "#0d0d0d", border: "1px solid #1a1a1a", lineHeight: 1.8, marginBottom: 16 }}>
                    수련록을 5개 이상 기록하면<br />그대의 성향에 맞는 문파가 정해진다.
                  </div>
                </div>
              )}
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#c8a96e" }}>{currentRealm.name}</span>
                  <span style={{ fontSize: 10, color: "#555" }}>{totalPower}{nextRealm ? " / " + nextRealm.minPower : " (최고경지)"}</span>
                </div>
                <div style={{ height: 2, background: "#1e1e1e", borderRadius: 1 }}>
                  <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg, #c8a96e, #e8c98e)", borderRadius: 1, transition: "width 0.6s ease" }}></div>
                </div>
                {nextRealm && (
                  <div style={{ fontSize: 10, color: "#444", marginTop: 6, textAlign: "right" }}>다음 경지: {nextRealm.name}</div>
                )}
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 12, fontStyle: "italic", lineHeight: 1.8 }}>"{currentRealm.desc}"</div>
              {sectInfo && (
                <div style={{ marginTop: 14, padding: "10px", background: "#0d0d0d", border: "1px solid #1a1a1a", fontSize: 11, color: "#777", lineHeight: 1.8, fontStyle: "italic" }}>
                  "{sectInfo.desc}"
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "깨달음", value: totalEnlightenments, color: "#c8a96e" },
                { label: "기연", value: totalEncounters, color: "#6eb5c8" },
                { label: "기록", value: logs.length, color: "#8cc86e" },
              ].map(function(s) {
                return (
                  <div key={s.label} style={{ border: "1px solid #1e1e1e", padding: "14px 10px", textAlign: "center", background: "#111" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginTop: 3 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ border: "1px solid #1e1e1e", padding: "18px", background: "#111" }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 14 }}>무인의 본질</div>
              {[
                { trait: "실전형 성장", desc: "실수를 양분 삼아 스스로를 단련하는 자" },
                { trait: "내면 중심", desc: "소음 속에서도 내면에서 답을 찾는 자" },
                { trait: "부동심(不動心)을 향해", desc: "여유롭게 흔들리지 않는 경지를 목표로 함" },
              ].map(function(t, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < 2 ? "1px solid #181818" : "none" }}>
                    <div style={{ color: "#c8a96e", fontSize: 12, paddingTop: 2 }}>◆</div>
                    <div>
                      <div style={{ fontSize: 13, marginBottom: 2 }}>{t.trait}</div>
                      <div style={{ fontSize: 11, color: "#666" }}>{t.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {view === "logs" && (
          <div>

            <button
              onClick={function() { setShowForm(function(v) { return !v; }); }}
              style={{ width: "100%", padding: "13px", background: showForm ? "transparent" : "#c8a96e", color: showForm ? "#c8a96e" : "#0d0d0d", border: "1px solid #c8a96e", fontSize: 11, letterSpacing: 3, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}
            >
              {showForm ? "✕  닫기" : "+ 오늘의 수련 기록"}
            </button>

            {showForm && (
              <div style={{ border: "1px solid #222", padding: "18px", marginBottom: 16, background: "#111" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {Object.entries(typeConfig).map(function(entry) {
                    var k = entry[0];
                    var cfg = entry[1];
                    return (
                      <button
                        key={k}
                        onClick={function() { setForm(function(f) { return Object.assign({}, f, { type: k, isDemonResolution: false }); }); }}
                        style={{ padding: "9px", border: "1px solid " + (form.type === k ? cfg.color : "#222"), background: form.type === k ? "rgba(0,0,0,0.3)" : "#0d0d0d", color: form.type === k ? cfg.color : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        {cfg.icon} {cfg.label}
                      </button>
                    );
                  })}
                </div>
                {form.type === "enlightenment" && unresolvedDemons.length > 0 && (
                  <div
                    onClick={function() { setForm(function(f) { return Object.assign({}, f, { isDemonResolution: !f.isDemonResolution }); }); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", background: form.isDemonResolution ? "rgba(200,110,110,0.08)" : "#0d0d0d", border: "1px solid " + (form.isDemonResolution ? "#c86e6e" : "#222"), marginBottom: 14, cursor: "pointer" }}
                  >
                    <div style={{ width: 14, height: 14, border: "1px solid " + (form.isDemonResolution ? "#c86e6e" : "#555"), background: form.isDemonResolution ? "#c86e6e" : "transparent", flexShrink: 0 }}></div>
                    <div style={{ fontSize: 11, color: form.isDemonResolution ? "#c86e6e" : "#666" }}>
                      💀 심마 극복 관련 깨달음 <span style={{ color: "#c8a96e" }}>(내공 2배 +30)</span>
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>제목</div>
                <input
                  value={form.title}
                  onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { title: e.target.value }); }); }}
                  placeholder={form.type === "enlightenment" ? "오늘 깨달은 것의 이름" : form.type === "encounter" ? "누구와 어떤 만남" : form.type === "demon" ? "심마의 이름" : "수련의 이름"}
                  style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
                />
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>내용</div>
                <textarea
                  value={form.content}
                  onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { content: e.target.value }); }); }}
                  placeholder="오늘 있었던 일, 느낀 것, 깨달은 것"
                  rows={4}
                  style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 12, marginBottom: 14, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", lineHeight: 1.8, outline: "none" }}
                ></textarea>
                <button
                  onClick={submitLog}
                  style={{ width: "100%", padding: "11px", background: typeConfig[form.type].color, color: "#0d0d0d", border: "none", fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}
                >
                  기록하여 내공을 쌓는다 (+{(form.type === "enlightenment" && form.isDemonResolution) ? 30 : gainMap[form.type]})
                </button>
              </div>
            )}

            {logs.length === 0 && (
              <div style={{ textAlign: "center", color: "#444", fontSize: 12, padding: "40px 0", lineHeight: 2 }}>
                아직 기록이 없다.<br />오늘의 수련을 기록하라.
              </div>
            )}

            {logs.map(function(log) {
              return (
                <div key={log.id} style={{ borderLeft: "3px solid " + typeConfig[log.type].color, border: "1px solid #1e1e1e", padding: "14px 18px", marginBottom: 10, background: "#111" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, color: typeConfig[log.type].color, letterSpacing: 2 }}>{typeConfig[log.type].icon} {typeConfig[log.type].label}</span>
                      {log.isDemonResolution && (
                        <span style={{ fontSize: 9, color: "#c86e6e", border: "1px solid rgba(200,110,110,0.3)", padding: "1px 5px" }}>심마극복</span>
                      )}
                    </div>
                    <span style={{ fontSize: 10, color: "#444" }}>{log.date}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{log.title}</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>{log.content}</div>
                  <div style={{ fontSize: 10, color: typeConfig[log.type].color, marginTop: 8, textAlign: "right" }}>내공 +{log.innerPowerGain}</div>
                </div>
              );
            })}

          </div>
        )}

        {view === "skills" && (
          <div>

            <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 18 }}>깨달음이 쌓일수록 새로운 무공이 열린다</div>

            {skills.length === 0 && (
              <div style={{ textAlign: "center", color: "#444", fontSize: 12, padding: "40px 0", lineHeight: 2 }}>
                아직 무공이 없다.<br />깨달음을 기록하면 무공이 열린다.
              </div>
            )}

            {skills.map(function(sk, i) {
              return (
                <div key={i} style={{ border: "1px solid " + (sk.isNew ? "rgba(200,169,110,0.3)" : "#1e1e1e"), padding: "18px", marginBottom: 10, background: sk.isNew ? "#141209" : "#111", position: "relative" }}>
                  {sk.isNew && (
                    <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, color: "#c8a96e", border: "1px solid rgba(200,169,110,0.3)", padding: "2px 7px", letterSpacing: 2 }}>NEW</div>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{sk.name}</div>
                  <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                    {Array.from({ length: 5 }).map(function(_, j) {
                      return <div key={j} style={{ width: 18, height: 2, background: j < sk.level ? "#c8a96e" : "#222" }}></div>;
                    })}
                    <span style={{ fontSize: 9, color: "#555", marginLeft: 4 }}>Lv.{sk.level}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#777", lineHeight: 1.8, fontStyle: "italic" }}>"{sk.desc}"</div>
                </div>
              );
            })}

          </div>
        )}

        {view === "demons" && (
          <div>

            <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 18 }}>심마는 극복할 때 비로소 다음 경지의 문이 열린다</div>

            {demons.length === 0 && (
              <div style={{ textAlign: "center", color: "#444", fontSize: 12, padding: "40px 0", lineHeight: 2 }}>
                아직 심마가 없다.<br />수련록에 심마를 기록하면 등록된다.
              </div>
            )}

            {demons.map(function(d) {
              return (
                <div key={d.id} style={{ border: "1px solid #1e1e1e", borderLeft: "3px solid " + (d.resolved ? "#8cc86e" : "#c86e6e"), padding: "18px", marginBottom: 10, background: "#111" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: d.resolved ? "#8cc86e" : "#c86e6e", letterSpacing: 2 }}>
                      {d.resolved ? "✓ 극복됨" : "💀 미해결"}
                    </div>
                    {!d.resolved && (
                      <button
                        onClick={function() { resolveDemon(d.id); }}
                        style={{ fontSize: 9, color: "#8cc86e", border: "1px solid rgba(140,200,110,0.3)", background: "transparent", padding: "2px 8px", cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}
                      >
                        극복 완료
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "#777", lineHeight: 1.8, fontStyle: "italic" }}>"{d.desc}"</div>
                  {!d.resolved && (
                    <div style={{ marginTop: 14, padding: "9px", background: "#0d0d0d", border: "1px solid #1a1a1a", fontSize: 10, color: "#555", lineHeight: 1.8 }}>
                      ※ 이 심마 관련 깨달음을 수련록에 기록하면 내공 2배를 획득한다.
                    </div>
                  )}
                </div>
              );
            })}

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
