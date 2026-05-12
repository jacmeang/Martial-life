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

// =============================================
// 문파 데이터
// =============================================
const SECT_DATA = {
  shaolin:    { name: "소림사(少林寺)",    align: "정파",   color: "#e8a84e", title: "불굴의 수행자",         desc: "고통을 양분 삼아 성장하는 자. 심마를 밟고 일어선 금강불괴의 무인이다.",           traits: "극복 · 인내 · 불굴" },
  wudang:     { name: "무당파(武當派)",    align: "정파",   color: "#6eb5c8", title: "이치를 탐구하는 도인",  desc: "태극의 이치로 세상을 보는 자. 깊은 사색으로 무공을 완성해나가는 무인이다.",       traits: "사색 · 이치 · 깨달음" },
  hwasan:     { name: "화산파(華山派)",    align: "정파",   color: "#c87878", title: "매화의 검수",           desc: "꾸준한 단련으로 정상을 향하는 자. 매화가 혹한을 이기듯 피어날 것이다.",           traits: "단련 · 꾸준함 · 검술" },
  ami:        { name: "아미파(峨嵋派)",    align: "정파",   color: "#c8a0c8", title: "청정한 수련자",         desc: "내면의 감정을 정화하며 성장하는 자. 고결한 심법으로 무공을 완성한다.",             traits: "내면 · 감정 · 청정" },
  gongryon:   { name: "곤륜파(崑崙派)",    align: "정파",   color: "#88aabb", title: "세상과 거리두는 자",    desc: "고독 속에서 홀로 이치를 탐구하는 자. 속세와 거리를 두며 내공을 쌓는다.",           traits: "고독 · 사색 · 신비" },
  jongnam:    { name: "종남파(終南派)",    align: "정파",   color: "#b8a870", title: "현실을 단련하는 자",    desc: "세상 속에서 실용적으로 성장하는 자. 현실의 경험이 곧 무공이 된다.",                 traits: "실용 · 현실 · 적응" },
  haenam:     { name: "해남파(海南派)",    align: "정파",   color: "#6ec8b0", title: "호방한 협객",           desc: "거침없이 세상을 헤쳐나가는 자. 자유로운 기상이 곧 무공의 근원이다.",               traits: "자유 · 호방 · 도전" },
  namgung:    { name: "남궁세가(南宮世家)", align: "정파",  color: "#c8a96e", title: "검과 지혜를 겸비한 자", desc: "균형잡힌 성장으로 무림의 중심을 향하는 자. 창궁무애검의 기상을 품는다.",           traits: "균형 · 검술 · 지략" },
  dangga:     { name: "사천당가(四川唐家)", align: "정사지간", color: "#8ec8a0", title: "지략으로 움직이는 자", desc: "분석하고 설계하며 성장하는 자. 보이지 않는 곳에서 세상을 움직인다.",            traits: "지략 · 분석 · 계획" },
  jegal:      { name: "제갈세가(諸葛世家)", align: "정파",  color: "#7eb5c8", title: "천하의 군사",           desc: "깊은 사색으로 세상을 설계하는 자. 무공보다 지략이 먼저인 무인이다.",               traits: "전략 · 깊은사색 · 지략" },
  paengga:    { name: "하북팽가(河北彭家)", align: "정파",  color: "#c8886e", title: "패기 넘치는 강자",      desc: "직선적이고 강하게 돌파하는 자. 오호단문도처럼 거침없이 나아간다.",                 traits: "패기 · 직선 · 강함" },
  moyong:     { name: "모용세가(慕容世家)", align: "정파",  color: "#a088c8", title: "자신만의 기준을 가진 자", desc: "스스로의 기준으로 성장하는 자. 타인에 흔들리지 않는 독립적인 무인이다.",          traits: "자존 · 독립 · 기준" },
  soyopa:     { name: "소요파(逍遙派)",    align: "정사지간", color: "#70c8a8", title: "자유롭게 유람하는 자", desc: "어디에도 얽매이지 않고 성장하는 자. 세상을 유람하며 모든 것을 흡수한다.",        traits: "자유 · 유랑 · 초탈" },
  dokgo:      { name: "독고세가(獨孤世家)", align: "독립",  color: "#d4a0d4", title: "천하제일의 길을 걷는 자", desc: "혼자만의 극단적인 길을 걷는 자. 독고구검처럼 전무후무한 경지를 향한다.",         traits: "고독 · 극단 · 천재" },
  haomun:     { name: "하오문(下汚門)",    align: "중립",   color: "#888888", title: "강호를 떠도는 자",      desc: "세상 모든 곳에서 배우는 자. 만남과 정보가 곧 내공이 된다.",                         traits: "정보 · 만남 · 적응" },
  gumgak:     { name: "검각(劍閣)",       align: "새외",   color: "#a0b8c8", title: "냉정한 검의 화신",      desc: "차갑고 절제된 검으로 성장하는 자. 감정을 배제하고 오직 검만을 추구한다.",           traits: "절제 · 냉정 · 검술" },
  magio:      { name: "마교(魔敎)",       align: "마교",   color: "#8e6eb5", title: "어둠을 품은 구도자",    desc: "강자존의 이치를 따르는 자. 어둠 속에서 홀로 빛을 찾으며 천마의 길을 걷는다.",       traits: "강함 · 어둠 · 극단" },
  bukhaebinggung: { name: "북해빙궁(北海氷宮)", align: "새외", color: "#a0c8e8", title: "고독한 설원의 무인", desc: "극한의 고독 속에서 스스로를 단련하는 자. 차가운 냉정함이 곧 무공이다.",          traits: "고독 · 냉정 · 독자" },
  unknown:    { name: "무채색문파(無彩色門派)", align: "독립", color: "#aaaaaa", title: "자신만의 길을 걷는 자", desc: "정해진 틀 없이 스스로를 만들어가는 자. 무림 최고의 이단아.",                  traits: "자유 · 독립 · 개척" },
};

const ALIGN_COLORS = {
  "정파": "#c8a96e", "마교": "#8e6eb5", "사파": "#888888",
  "새외": "#6eb5c8", "정사지간": "#8ec8a0", "독립": "#aaaaaa", "중립": "#888888"
};

// =============================================
// 키워드 감지 헬퍼
// =============================================
function countKeywords(logs, keywords) {
  var count = 0;
  for (var i = 0; i < logs.length; i++) {
    var text = ((logs[i].title || "") + " " + (logs[i].content || "")).toLowerCase();
    for (var j = 0; j < keywords.length; j++) {
      if (text.includes(keywords[j])) { count++; break; }
    }
  }
  return count;
}

function avgContentLength(logs) {
  if (!logs.length) return 0;
  return logs.reduce(function(s, l) { return s + (l.content || "").length; }, 0) / logs.length;
}

// 기록 꾸준함: 날짜 수 / 전체 기간
function calcConsistency(logs) {
  if (logs.length < 3) return 0;
  var dates = logs.map(function(l) { return l.date; });
  var unique = dates.filter(function(d, i) { return dates.indexOf(d) === i; });
  return unique.length / logs.length;
}

// =============================================
// 문파 판정 (핵심 함수)
// =============================================
function analyzeSect(logs) {
  if (logs.length < 5) return null;

  var total = logs.length;
  var eCount = logs.filter(function(l) { return l.type === "enlightenment"; }).length;
  var gCount = logs.filter(function(l) { return l.type === "growth"; }).length;
  var enCount = logs.filter(function(l) { return l.type === "encounter"; }).length;
  var dCount = logs.filter(function(l) { return l.type === "demon"; }).length;
  var drCount = logs.filter(function(l) { return l.isDemonResolution; }).length;

  var er = eCount / total;
  var gr = gCount / total;
  var enr = enCount / total;
  var dr = drCount / total;
  var demonR = dCount / total;

  var avgLen = avgContentLength(logs);
  var consistency = calcConsistency(logs);

  // 키워드 점수
  var kw_overcome  = countKeywords(logs, ["극복", "이겼", "버텼", "견뎠", "이겨냈", "해냈"]);
  var kw_inner     = countKeywords(logs, ["감정", "내면", "마음", "느꼈", "마음속", "감정적"]);
  var kw_thought   = countKeywords(logs, ["이치", "깨달", "생각했", "사색", "깨닫", "알았다"]);
  var kw_alone     = countKeywords(logs, ["혼자", "고독", "외로움", "쓸쓸", "홀로", "나만"]);
  var kw_plan      = countKeywords(logs, ["계획", "분석", "전략", "설계", "정리했", "따져"]);
  var kw_real      = countKeywords(logs, ["일", "직장", "현실", "사회", "업무", "회사"]);
  var kw_free      = countKeywords(logs, ["자유", "여행", "즐겼", "흘러", "도전했", "떠났"]);
  var kw_fierce    = countKeywords(logs, ["도전", "승부", "이겼", "패기", "돌파", "강하게"]);
  var kw_self      = countKeywords(logs, ["나만의", "스스로", "내기준", "내방식", "자존", "독립"]);
  var kw_restraint = countKeywords(logs, ["절제", "참았", "조용히", "냉정", "억제", "자제"]);
  var kw_info      = countKeywords(logs, ["만남", "들었", "알게됐", "배웠다", "깨달았다", "정보"]);
  var kw_dark      = countKeywords(logs, ["분노", "어둠", "혼자", "화났", "힘들다", "지쳤"]);
  var kw_extreme   = countKeywords(logs, ["극단", "최강", "천하제일", "무조건", "반드시", "압도"]);

  // =============================================
  // 판정 로직 - 각 문파별 점수 계산
  // =============================================
  var scores = {};

  // 소림사: 심마극복 비율 + 극복 키워드
  scores.shaolin = (dr * 3) + (kw_overcome / total * 2);

  // 무당파: 깨달음 비율 + 사색 키워드 + 내용 길이
  scores.wudang = (er * 2) + (kw_thought / total * 2) + (avgLen > 80 ? 0.5 : 0);

  // 화산파: 수련 비율 + 꾸준함
  scores.hwasan = (gr * 2) + (consistency * 1.5) + (kw_fierce / total * 0.5);

  // 아미파: 깨달음 비율 + 내면 키워드 + 기연 적음
  scores.ami = (er * 1.5) + (kw_inner / total * 2.5) + (enr < 0.2 ? 0.3 : 0);

  // 곤륜파: 수련+깨달음 균형 + 혼자 키워드 + 기연 거의 없음
  var gongryon_balance = 1 - Math.abs(er - gr);
  scores.gongryon = (gongryon_balance * 1.5) + (kw_alone / total * 1.5) + (enr < 0.15 ? 0.5 : 0);

  // 종남파: 수련 비율 + 현실 키워드 + 기연 약간 있음
  scores.jongnam = (gr * 1.5) + (kw_real / total * 2.5) + (enr > 0.1 && enr < 0.35 ? 0.3 : 0);

  // 해남파: 기연 비율 + 자유 키워드 + 심마 적음
  scores.haenam = (enr * 2) + (kw_free / total * 2) + (demonR < 0.15 ? 0.3 : 0);

  // 남궁세가: 깨달음+기연+수련 고르게 분포
  var balance3 = 1 - (Math.abs(er - gr) + Math.abs(er - enr) + Math.abs(gr - enr)) / 3;
  scores.namgung = balance3 * 3;

  // 사천당가: 깨달음 + 계획/분석 키워드
  scores.dangga = (er * 1.5) + (kw_plan / total * 3);

  // 제갈세가: 깨달음 + 내용 매우 길음 + 수련 적음
  scores.jegal = (er * 1.5) + (avgLen > 120 ? 1 : avgLen > 80 ? 0.5 : 0) + (gr < 0.2 ? 0.5 : 0) + (kw_plan / total);

  // 하북팽가: 수련 + 패기 키워드 + 심마 적음
  scores.paengga = (gr * 1.5) + (kw_fierce / total * 2.5) + (demonR < 0.2 ? 0.3 : 0);

  // 모용세가: 자존 키워드 + 기연 적음 + 깨달음+수련 균형
  var moyong_balance = 1 - Math.abs(er - gr);
  scores.moyong = (kw_self / total * 3) + (enr < 0.2 ? 0.5 : 0) + (moyong_balance * 0.5);

  // 소요파: 기연 + 자유 키워드 + 심마도 있음
  scores.soyopa = (enr * 1.5) + (kw_free / total * 1.5) + (demonR > 0.1 ? 0.5 : 0);

  // 독고세가: 극단적 패턴 + 혼자 키워드 + 극단 키워드
  var maxRatio = Math.max(er, gr, enr, demonR);
  scores.dokgo = (maxRatio > 0.6 ? 1.5 : 0) + (kw_alone / total * 1.5) + (kw_extreme / total * 2);

  // 하오문: 기연+심마 균형 + 정보/만남 키워드
  var haomun_balance = 1 - Math.abs(enr - demonR);
  scores.haomun = (haomun_balance * 1) + (kw_info / total * 3);

  // 검각: 수련 + 절제 키워드 + 기연 거의 없음
  scores.gumgak = (gr * 1.5) + (kw_restraint / total * 3) + (enr < 0.1 ? 0.5 : 0);

  // 마교: 심마 많음 + 극복 안 함 + 어둠 키워드
  scores.magio = (demonR * 2) + (dr < 0.05 ? 0.5 : 0) + (kw_dark / total * 2);

  // 북해빙궁: 기록 적음 + 기연 없음 + 심마 있음
  scores.bukhaebinggung = (total < 15 ? 1 : 0) + (enr < 0.1 ? 0.5 : 0) + (demonR > 0.1 ? 0.5 : 0) + (kw_alone / total);

  // 가장 높은 점수 문파 선택
  var bestKey = "unknown";
  var bestScore = 0;
  var keys = Object.keys(scores);
  for (var i = 0; i < keys.length; i++) {
    if (scores[keys[i]] > bestScore) {
      bestScore = scores[keys[i]];
      bestKey = keys[i];
    }
  }

  // 최소 점수 기준 (0.3 미만이면 무채색문파)
  if (bestScore < 0.3) return SECT_DATA.unknown;
  return SECT_DATA[bestKey] || SECT_DATA.unknown;
}

// =============================================
// 무공 이름 생성 (문파+상황+순서 연동)
// =============================================
var SECT_SKILL_SYSTEM = {
  shaolin:    { prefix: ["금강(金剛)", "나한(羅漢)", "달마(達磨)", "반야(般若)"],     suffix: ["불괴공(不壞功)", "신공(神功)", "심법(心法)", "권법(拳法)"],     kw: { 극복: "금강불굴공(金剛不屈功)", 인내: "나한인내결(羅漢忍耐訣)", 감정: "금강심법(金剛心法)", 반성: "달마참회결(達磨懺悔訣)", 성장: "금강정진공(金剛精進功)", 운동: "나한외공(羅漢外功)", 분노: "나한항마공(羅漢降魔功)", 목표: "입지금강결(立志金剛訣)" } },
  wudang:     { prefix: ["태극(太極)", "현묘(玄妙)", "무위(無爲)", "자연(自然)"],     suffix: ["검법(劍法)", "심법(心法)", "기공(氣功)", "도법(道法)"],         kw: { 이치: "태극오도심법(太極悟道心法)", 깨달음: "현묘각오결(玄妙覺悟訣)", 감정: "태극화심법(太極化心法)", 사색: "무위관심법(無爲觀心法)", 성장: "태극정진법(太極精進法)", 분노: "현묘진기결(玄妙鎭氣訣)", 절제: "무위절제법(無爲節制法)", 목표: "현묘입지결(玄妙立志訣)" } },
  hwasan:     { prefix: ["매화(梅花)", "화산(華山)", "일화(一花)", "검(劍)"],         suffix: ["검법(劍法)", "검식(劍式)", "검결(劍訣)", "심법(心法)"],         kw: { 운동: "매화단련공(梅花鍛鍊功)", 성장: "화산정진검(華山精進劍)", 인내: "매화한설공(梅花寒雪功)", 목표: "화산절정검(華山絕頂劍)", 반성: "매화각오결(梅花覺悟訣)", 도전: "화산돌파검(華山突破劍)", 절제: "매화절제심법(梅花節制心法)", 감정: "매화심법(梅花心法)" } },
  ami:        { prefix: ["아미(峨嵋)", "청정(淸淨)", "연화(蓮花)", "백옥(白玉)"],     suffix: ["심법(心法)", "공(功)", "결(訣)", "법(法)"],                     kw: { 감정: "청정화심법(淸淨化心法)", 내면: "아미관심법(峨嵋觀心法)", 깨달음: "청정각오결(淸淨覺悟訣)", 반성: "연화참회공(蓮花懺悔功)", 성장: "청정정진법(淸淨精進法)", 절제: "아미절제심법(峨嵋節制心法)", 분노: "연화진심결(蓮花鎭心訣)", 인내: "청정인내결(淸淨忍耐訣)" } },
  gongryon:   { prefix: ["곤륜(崑崙)", "현(玄)", "운룡(雲龍)", "신비(神祕)"],         suffix: ["심법(心法)", "공(功)", "결(訣)", "대팔식(大八式)"],             kw: { 고독: "곤륜독공(崑崙獨功)", 이치: "현오도결(玄悟道訣)", 사색: "곤륜관심법(崑崙觀心法)", 성장: "운룡정진결(雲龍精進訣)", 감정: "곤륜심법(崑崙心法)", 인내: "현인내공(玄忍耐功)", 절제: "곤륜절제결(崑崙節制訣)", 목표: "운룡입지결(雲龍立志訣)" } },
  jongnam:    { prefix: ["종남(終南)", "실전(實戰)", "현실(現實)", "입세(入世)"],       suffix: ["검법(劍法)", "심법(心法)", "보법(步法)", "결(訣)"],             kw: { 현실: "입세단련법(入世鍛鍊法)", 일: "종남실전결(終南實戰訣)", 성장: "현실정진심법(現實精進心法)", 도전: "종남돌파결(終南突破訣)", 감정: "입세화심법(入世化心法)", 반성: "종남각오결(終南覺悟訣)", 운동: "종남단련법(終南鍛鍊法)", 목표: "입세입지결(入世立志訣)" } },
  haenam:     { prefix: ["해남(海南)", "파도(波濤)", "호해(豪海)", "자유(自由)"],       suffix: ["검법(劍法)", "심법(心法)", "도법(刀法)", "결(訣)"],             kw: { 자유: "호해자유결(豪海自由訣)", 도전: "해남돌파검(海南突破劍)", 기연: "파도인연법(波濤因緣法)", 성장: "해남정진결(海南精進訣)", 감정: "파도화심법(波濤化心法)", 인내: "호해불굴결(豪海不屈訣)", 반성: "해남각오결(海南覺悟訣)", 운동: "해남단련법(海南鍛鍊法)" } },
  namgung:    { prefix: ["창궁(蒼穹)", "남궁(南宮)", "제왕(帝王)", "섬전(閃電)"],       suffix: ["검법(劍法)", "심법(心法)", "결(訣)", "검형(劍形)"],             kw: { 균형: "창궁균형심법(蒼穹均衡心法)", 성장: "창궁정진검(蒼穹精進劍)", 목표: "제왕입지결(帝王立志訣)", 인내: "남궁불굴검(南宮不屈劍)", 반성: "창궁각오결(蒼穹覺悟訣)", 운동: "남궁단련법(南宮鍛鍊法)", 이치: "창궁오도결(蒼穹悟道訣)", 감정: "창궁심법(蒼穹心法)" } },
  dangga:     { prefix: ["당(唐)", "암(暗)", "만천(萬天)", "독(毒)"],                   suffix: ["공(功)", "심법(心法)", "결(訣)", "술(術)"],                     kw: { 계획: "당가입지결(唐家立志訣)", 분석: "암독분석술(暗毒分析術)", 전략: "만천화우결(萬天花雨訣)", 성장: "당가정진술(唐家精進術)", 감정: "독심제어공(毒心制御功)", 반성: "당가각오결(唐家覺悟訣)", 운동: "당가단련술(唐家鍛鍊術)", 목표: "암독입지결(暗毒立志訣)" } },
  jegal:      { prefix: ["팔진(八陣)", "제갈(諸葛)", "천기(天機)", "군사(軍師)"],       suffix: ["진법(陣法)", "심법(心法)", "결(訣)", "지략(智略)"],             kw: { 전략: "팔진진법(八陣陣法)", 분석: "제갈분석결(諸葛分析訣)", 이치: "천기오도결(天機悟道訣)", 성장: "제갈정진결(諸葛精進訣)", 목표: "군사입지결(軍師立志訣)", 반성: "천기각오법(天機覺悟法)", 계획: "팔진설계결(八陣設計訣)", 감정: "팔진심법(八陣心法)" } },
  paengga:    { prefix: ["팽(彭)", "패도(覇道)", "오호(五虎)", "하북(河北)"],           suffix: ["도법(刀法)", "심법(心法)", "결(訣)", "단문도(斷門刀)"],         kw: { 도전: "오호돌파결(五虎突破訣)", 성장: "패도정진공(覇道精進功)", 분노: "팽가폭발결(彭家暴發訣)", 인내: "하북불굴공(河北不屈功)", 운동: "오호단련도(五虎鍛鍊刀)", 목표: "패도입지결(覇道立志訣)", 반성: "팽가각오결(彭家覺悟訣)", 감정: "패도심법(覇道心法)" } },
  moyong:     { prefix: ["모용(慕容)", "독(獨)", "자존(自尊)", "아(我)"],               suffix: ["검법(劍法)", "심법(心法)", "결(訣)", "의형(移形)"],             kw: { 자존: "모용자존결(慕容自尊訣)", 독립: "독아심법(獨我心法)", 성장: "모용정진검(慕容精進劍)", 목표: "자존입지결(自尊立志訣)", 감정: "모용심법(慕容心法)", 반성: "모용각오결(慕容覺悟訣)", 이치: "아오도결(我悟道訣)", 인내: "모용불굴결(慕容不屈訣)" } },
  soyopa:     { prefix: ["소요(逍遙)", "유(遊)", "자재(自在)", "천하(天下)"],           suffix: ["유법(遊法)", "심법(心法)", "결(訣)", "보법(步法)"],             kw: { 자유: "소요자재결(逍遙自在訣)", 기연: "천하인연법(天下因緣法)", 성장: "소요정진법(逍遙精進法)", 도전: "유림돌파결(遊林突破訣)", 감정: "소요화심법(逍遙化心法)", 반성: "천하각오결(天下覺悟訣)", 이치: "소요오도결(逍遙悟道訣)", 목표: "자재입지결(自在立志訣)" } },
  dokgo:      { prefix: ["독고(獨孤)", "천하(天下)", "구검(九劍)", "절(絕)"],           suffix: ["검법(劍法)", "신공(神功)", "결(訣)", "절기(絕技)"],             kw: { 고독: "독고독검(獨孤獨劍)", 극단: "천하제일결(天下第一訣)", 성장: "독고정진검(獨孤精進劍)", 목표: "구검입지결(九劍立志訣)", 이치: "독고오도결(獨孤悟道訣)", 반성: "절세각오결(絕世覺悟訣)", 인내: "독고불굴검(獨孤不屈劍)", 감정: "독고심법(獨孤心法)" } },
  haomun:     { prefix: ["강호(江湖)", "야(野)", "흑(黑)", "하오(下汚)"],               suffix: ["심법(心法)", "술(術)", "결(訣)", "법(法)"],                     kw: { 만남: "강호인연술(江湖因緣術)", 정보: "야생정보결(野生情報訣)", 성장: "강호정진술(江湖精進術)", 도전: "흑도돌파결(黑道突破訣)", 감정: "강호심법(江湖心法)", 반성: "강호각오결(江湖覺悟訣)", 이치: "강호오도술(江湖悟道術)", 목표: "야생입지결(野生立志訣)" } },
  gumgak:     { prefix: ["검각(劍閣)", "냉(冷)", "절(節)", "한검(寒劍)"],               suffix: ["검법(劍法)", "심법(心法)", "결(訣)", "검기(劍氣)"],             kw: { 절제: "검각절제결(劍閣節制訣)", 냉정: "냉검심법(冷劍心法)", 성장: "검각정진검(劍閣精進劍)", 인내: "한검불굴결(寒劍不屈訣)", 목표: "검각입지결(劍閣立志訣)", 반성: "냉검각오결(冷劍覺悟訣)", 감정: "한검화심법(寒劍化心法)", 운동: "검각단련결(劍閣鍛鍊訣)" } },
  magio:      { prefix: ["천마(天魔)", "마(魔)", "혈(血)", "강자(强者)"],               suffix: ["신공(神功)", "심법(心法)", "강림결(降臨訣)", "절기(絕技)"],     kw: { 분노: "마기폭발공(魔氣暴發功)", 어둠: "천마심법(天魔心法)", 성장: "천마정진신공(天魔精進神功)", 인내: "마기불굴결(魔氣不屈訣)", 목표: "강자입지결(强者立志訣)", 반성: "천마각오심법(天魔覺悟心法)", 극단: "천마강림결(天魔降臨訣)", 운동: "마기단련공(魔氣鍛鍊功)" } },
  bukhaebinggung: { prefix: ["빙(氷)", "설(雪)", "북해(北海)", "한(寒)"],               suffix: ["심법(心法)", "공(功)", "결(訣)", "기(氣)"],                     kw: { 고독: "북해독공(北海獨功)", 인내: "한설불굴공(寒雪不屈功)", 성장: "빙설정진결(氷雪精進訣)", 반성: "북해각오심법(北海覺悟心法)", 목표: "한설입지결(寒雪立志訣)", 냉정: "빙심법(氷心法)", 운동: "한설단련공(寒雪鍛鍊功)", 감정: "빙설화심법(氷雪化心法)" } },
  unknown:    { prefix: ["무(無)", "자(自)", "독(獨)", "무채색(無彩色)"],               suffix: ["심법(心法)", "공(功)", "결(訣)", "도(道)"],                     kw: { 성장: "자득정진공(自得精進功)", 반성: "독각오결(獨覺悟訣)", 목표: "자립입지결(自立立志訣)", 감정: "무채색심법(無彩色心法)", 인내: "무채색불굴공(無彩色不屈功)", 이치: "독오도결(獨悟道訣)", 운동: "자득단련공(自得鍛鍊功)", 절제: "무채색절제법(無彩色節制法)" } },
};

var SITUATION_MAP = [
  { keys: ["극복", "이겼", "버텼", "견뎠", "이겨냈", "해냈"], cat: "극복" },
  { keys: ["분노", "화", "짜증", "열받", "화났"], cat: "분노" },
  { keys: ["감정", "감정조절", "감정 조절", "마음속", "느꼈"], cat: "감정" },
  { keys: ["내면", "내 안", "마음", "내면적"], cat: "내면" },
  { keys: ["이치", "깨달", "깨닫", "알았다", "사색"], cat: "이치" },
  { keys: ["고독", "외로움", "혼자", "쓸쓸", "홀로"], cat: "고독" },
  { keys: ["계획", "분석", "전략", "설계", "정리했"], cat: "계획" },
  { keys: ["일", "직장", "현실", "사회", "업무", "회사"], cat: "현실" },
  { keys: ["자유", "여행", "즐겼", "흘러", "떠났"], cat: "자유" },
  { keys: ["도전", "승부", "돌파", "패기"], cat: "도전" },
  { keys: ["나만의", "스스로", "내기준", "자존"], cat: "자존" },
  { keys: ["절제", "참았", "조용히", "냉정", "억제"], cat: "절제" },
  { keys: ["만남", "들었", "알게됐", "배웠다", "정보"], cat: "만남" },
  { keys: ["운동", "헬스", "근력", "달리기", "체력"], cat: "운동" },
  { keys: ["성장", "발전", "나아", "더 나은"], cat: "성장" },
  { keys: ["반성", "후회", "실수", "잘못"], cat: "반성" },
  { keys: ["인내", "참았", "견뎠", "버텼"], cat: "인내" },
  { keys: ["목표", "계획", "결심", "다짐"], cat: "목표" },
];

function generateSkillName(title, content, sectId, skillCount) {
  var combined = (title + " " + content).toLowerCase();
  var key = sectId || "unknown";
  var system = SECT_SKILL_SYSTEM[key] || SECT_SKILL_SYSTEM.unknown;

  // 상황 카테고리 감지
  var cat = null;
  for (var i = 0; i < SITUATION_MAP.length; i++) {
    for (var j = 0; j < SITUATION_MAP[i].keys.length; j++) {
      if (combined.includes(SITUATION_MAP[i].keys[j])) {
        cat = SITUATION_MAP[i].cat;
        break;
      }
    }
    if (cat) break;
  }

  var num = skillCount > 1 ? " 제" + skillCount + "식" : "";

  if (cat && system.kw && system.kw[cat]) {
    return {
      name: system.kw[cat] + num,
      desc: title + "의 경험으로 깨달은 " + system.prefix[0] + "의 심법이다."
    };
  }

  var prefix = system.prefix[title.length % system.prefix.length];
  var suffix = system.suffix[(title.length + (skillCount || 0)) % system.suffix.length];
  return {
    name: prefix + title.slice(0, 3) + suffix + num,
    desc: title + "을 통해 " + prefix + "의 이치를 깨달은 심법이다."
  };
}

function loadFromStorage(key, fallback) {
  try {
    var saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch(e) { return fallback; }
}

// =============================================
// 메인 컴포넌트
// =============================================
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

  var unresolvedDemons = demons.filter(function(d) { return !d.resolved; });

  function startJourney() {
    if (!nameInput.trim()) return;
    localStorage.setItem("ml_name", nameInput.trim());
    setName(nameInput.trim());
    setScreen("main");
  }

  function resolveDemon(id) {
    setDemons(function(prev) {
      return prev.map(function(d) { return d.id === id ? Object.assign({}, d, { resolved: true }) : d; });
    });
  }

  function submitLog() {
    if (!form.title.trim() || !form.content.trim()) return;
    var gain = (form.type === "enlightenment" && form.isDemonResolution) ? 30 : gainMap[form.type];
    var newLog = {
      id: Date.now(), type: form.type,
      date: new Date().toLocaleDateString("ko-KR"),
      title: form.title, content: form.content,
      innerPowerGain: gain, isDemonResolution: form.isDemonResolution
    };
    var updatedLogs = [newLog].concat(logs);
    setLogs(updatedLogs);

    if (form.type === "enlightenment") {
      var currentSect = analyzeSect(updatedLogs);
      var sectId = "unknown";
      if (currentSect) {
        var sectKeys = Object.keys(SECT_DATA);
        for (var i = 0; i < sectKeys.length; i++) {
          if (SECT_DATA[sectKeys[i]] === currentSect) { sectId = sectKeys[i]; break; }
        }
      }
      var skillCount = updatedLogs.filter(function(l) { return l.type === "enlightenment"; }).length;
      var skill = generateSkillName(form.title, form.content, sectId, skillCount);
      setSkills(function(prev) {
        return [{ name: skill.name, desc: skill.desc, level: 1, isNew: true }]
          .concat(prev.map(function(s) { return Object.assign({}, s, { isNew: false }); }));
      });
    }
    if (form.type === "demon") {
      setDemons(function(prev) {
        return prev.concat([{ id: Date.now() + 1, name: form.title, desc: form.content, resolved: false }]);
      });
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
        <button onClick={startJourney} style={{ width: "100%", maxWidth: 300, padding: "14px", background: "#c8a96e", color: "#0d0d0d", border: "none", fontSize: 13, letterSpacing: 4, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
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
            <button key={t.key} onClick={function() { setView(t.key); }} style={{ flex: 1, padding: "13px 4px", background: "none", border: "none", borderBottom: view === t.key ? "2px solid #c8a96e" : "2px solid transparent", color: view === t.key ? "#c8a96e" : "#555", fontSize: 11, letterSpacing: 2, cursor: "pointer" }}>
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
            <button onClick={function() { setShowForm(function(v) { return !v; }); }} style={{ width: "100%", padding: "13px", background: showForm ? "transparent" : "#c8a96e", color: showForm ? "#c8a96e" : "#0d0d0d", border: "1px solid #c8a96e", fontSize: 11, letterSpacing: 3, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>
              {showForm ? "✕  닫기" : "+ 오늘의 수련 기록"}
            </button>

            {showForm && (
              <div style={{ border: "1px solid #222", padding: "18px", marginBottom: 16, background: "#111" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {Object.entries(typeConfig).map(function(entry) {
                    var k = entry[0]; var cfg = entry[1];
                    return (
                      <button key={k} onClick={function() { setForm(function(f) { return Object.assign({}, f, { type: k, isDemonResolution: false }); }); }} style={{ padding: "9px", border: "1px solid " + (form.type === k ? cfg.color : "#222"), background: form.type === k ? "rgba(0,0,0,0.3)" : "#0d0d0d", color: form.type === k ? cfg.color : "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                        {cfg.icon} {cfg.label}
                      </button>
                    );
                  })}
                </div>
                {form.type === "enlightenment" && unresolvedDemons.length > 0 && (
                  <div onClick={function() { setForm(function(f) { return Object.assign({}, f, { isDemonResolution: !f.isDemonResolution }); }); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", background: form.isDemonResolution ? "rgba(200,110,110,0.08)" : "#0d0d0d", border: "1px solid " + (form.isDemonResolution ? "#c86e6e" : "#222"), marginBottom: 14, cursor: "pointer" }}>
                    <div style={{ width: 14, height: 14, border: "1px solid " + (form.isDemonResolution ? "#c86e6e" : "#555"), background: form.isDemonResolution ? "#c86e6e" : "transparent", flexShrink: 0 }}></div>
                    <div style={{ fontSize: 11, color: form.isDemonResolution ? "#c86e6e" : "#666" }}>
                      💀 심마 극복 관련 깨달음 <span style={{ color: "#c8a96e" }}>(내공 2배 +30)</span>
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>제목</div>
                <input value={form.title} onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { title: e.target.value }); }); }} placeholder={form.type === "enlightenment" ? "오늘 깨달은 것의 이름" : form.type === "encounter" ? "누구와 어떤 만남" : form.type === "demon" ? "심마의 이름" : "수련의 이름"} style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 13, marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit", outline: "none" }} />
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>내용</div>
                <textarea value={form.content} onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { content: e.target.value }); }); }} placeholder="오늘 있었던 일, 느낀 것, 깨달은 것" rows={4} style={{ width: "100%", padding: "9px 11px", background: "#0d0d0d", border: "1px solid #222", color: "#e8e0d0", fontSize: 12, marginBottom: 14, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", lineHeight: 1.8, outline: "none" }}></textarea>
                <button onClick={submitLog} style={{ width: "100%", padding: "11px", background: typeConfig[form.type].color, color: "#0d0d0d", border: "none", fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
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
                      <button onClick={function() { resolveDemon(d.id); }} style={{ fontSize: 9, color: "#8cc86e", border: "1px solid rgba(140,200,110,0.3)", background: "transparent", padding: "2px 8px", cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>
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
