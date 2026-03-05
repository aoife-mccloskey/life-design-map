import { useState, useEffect } from "react";

const STORAGE_KEY = "aoife-life-design-v1";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const AVATARS = {
  robbins: (color, accent) => (
    <svg viewBox="0 0 120 120" width="80" height="80">
      <defs>
        <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="60" cy="60" r="48" fill="url(#rg1)"/>
      <polygon points="60,18 80,70 40,70" fill={accent} opacity="0.9"/>
      <polygon points="60,28 75,65 45,65" fill={color} opacity="0.85"/>
      <polygon points="60,38 70,62 50,62" fill="#FFD580" opacity="0.9"/>
      <rect x="35" y="70" width="50" height="4" rx="2" fill={color} opacity="0.7"/>
      <line x1="60" y1="18" x2="60" y2="8" stroke={accent} strokeWidth="1.5" opacity="0.6"/>
      <line x1="60" y1="18" x2="50" y2="10" stroke={accent} strokeWidth="1" opacity="0.4"/>
      <line x1="60" y1="18" x2="70" y2="10" stroke={accent} strokeWidth="1" opacity="0.4"/>
      <circle cx="30" cy="40" r="2" fill={accent} opacity="0.6"/>
      <circle cx="90" cy="35" r="1.5" fill="#FFD580" opacity="0.7"/>
      <circle cx="85" cy="55" r="1" fill={accent} opacity="0.5"/>
      <circle cx="25" cy="60" r="1.5" fill={color} opacity="0.5"/>
    </svg>
  ),
  ferriss: (color, accent) => (
    <svg viewBox="0 0 120 120" width="80" height="80">
      <defs>
        <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="60" cy="60" r="48" fill="url(#rg2)"/>
      <line x1="20" y1="60" x2="100" y2="60" stroke={color} strokeWidth="0.5" opacity="0.3"/>
      <line x1="60" y1="20" x2="60" y2="100" stroke={color} strokeWidth="0.5" opacity="0.3"/>
      <polygon points="68,20 48,58 62,58 52,100 80,52 64,52 76,20" fill={accent} opacity="0.9"/>
      <polygon points="68,20 50,56 63,56 53,96 78,52 63,52 74,22" fill={color} opacity="0.7"/>
      <circle cx="25" cy="25" r="2" fill={accent} opacity="0.5"/>
      <circle cx="95" cy="25" r="2" fill={accent} opacity="0.5"/>
      <circle cx="25" cy="95" r="2" fill={color} opacity="0.4"/>
      <circle cx="95" cy="95" r="2" fill={color} opacity="0.4"/>
      <ellipse cx="60" cy="60" rx="42" ry="18" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 3"/>
    </svg>
  ),
  brown: (color, accent) => (
    <svg viewBox="0 0 120 120" width="80" height="80">
      <defs>
        <radialGradient id="rg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="60" cy="60" r="48" fill="url(#rg3)"/>
      <path d="M60,85 C60,85 25,62 25,42 C25,30 35,22 47,27 C53,29 58,34 60,38 C62,34 67,29 73,27 C85,22 95,30 95,42 C95,62 60,85 60,85 Z" fill={accent} opacity="0.85"/>
      <path d="M60,80 C60,80 30,60 30,43 C30,33 38,27 48,31 C54,33 58,37 60,41 C62,37 66,33 72,31 C82,27 90,33 90,43 C90,60 60,80 60,80 Z" fill={color} opacity="0.7"/>
      <line x1="60" y1="22" x2="60" y2="14" stroke={accent} strokeWidth="1.5" opacity="0.4"/>
      <line x1="38" y1="30" x2="32" y2="24" stroke={accent} strokeWidth="1" opacity="0.3"/>
      <line x1="82" y1="30" x2="88" y2="24" stroke={accent} strokeWidth="1" opacity="0.3"/>
      <line x1="22" y1="55" x2="14" y2="55" stroke={color} strokeWidth="1" opacity="0.3"/>
      <line x1="98" y1="55" x2="106" y2="55" stroke={color} strokeWidth="1" opacity="0.3"/>
      <circle cx="60" cy="14" r="2" fill={accent} opacity="0.5"/>
      <circle cx="32" cy="24" r="1.5" fill={accent} opacity="0.4"/>
      <circle cx="88" cy="24" r="1.5" fill={accent} opacity="0.4"/>
      <circle cx="60" cy="60" r="52" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4"/>
    </svg>
  ),
  bashar: (color, accent) => (
    <svg viewBox="0 0 120 120" width="80" height="80">
      <defs>
        <radialGradient id="rg4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="60" cy="60" r="48" fill="url(#rg4)"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const outerR = i % 2 === 0 ? 38 : 18;
        const x = 60 + outerR * Math.sin(rad);
        const y = 60 - outerR * Math.cos(rad);
        return <line key={i} x1="60" y1="60" x2={x} y2={y} stroke={i % 2 === 0 ? accent : color} strokeWidth={i % 2 === 0 ? "2" : "1"} opacity={i % 2 === 0 ? "0.9" : "0.5"}/>;
      })}
      <circle cx="60" cy="60" r="12" fill={accent} opacity="0.9"/>
      <circle cx="60" cy="60" r="8" fill={color} opacity="0.95"/>
      <circle cx="60" cy="60" r="4" fill={accent} opacity="1"/>
      <circle cx="60" cy="22" r="3" fill={accent} opacity="0.7"/>
      <circle cx="93" cy="42" r="2" fill={color} opacity="0.6"/>
      <circle cx="93" cy="78" r="2.5" fill={accent} opacity="0.5"/>
      <circle cx="60" cy="98" r="2" fill={color} opacity="0.5"/>
      <circle cx="27" cy="78" r="2" fill={accent} opacity="0.6"/>
      <circle cx="27" cy="42" r="3" fill={color} opacity="0.6"/>
      <circle cx="60" cy="60" r="44" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 5"/>
    </svg>
  ),
};

const MENTORS = [
  {
    id: "robbins",
    name: "Tony Robbins",
    icon: "🔥",
    color: "#E84545",
    accent: "#FF8C00",
    philosophy: "Needs, Standards & Identity",
    lens: "What identity must I become? Are my 6 core needs being met resourcefully?",
    questions: [
      "What standard am I truly holding myself to in this area?",
      "Which of my 6 needs (Certainty, Variety, Significance, Love, Growth, Contribution) is this serving?",
      "What beliefs do I need to upgrade to live into this?",
      "What is my RPM? Result → Purpose → Massive Action Plan",
    ],
    principle: "Design your own life plan or fall into someone else's.",
    tool: "RPM: Result → Purpose → Massive Action",
  },
  {
    id: "ferriss",
    name: "Tim Ferriss",
    icon: "⚡",
    color: "#2196F3",
    accent: "#00BCD4",
    philosophy: "Lifestyle Design & Fear-Setting",
    lens: "What does freedom actually look like? What am I afraid of that I should do anyway?",
    questions: [
      "What would the worst case scenario actually be? (Fear-Setting)",
      "What 20% of actions produce 80% of my desired results?",
      "What can I eliminate, automate or delegate?",
      "What would this look like as a mini-retirement prototype?",
    ],
    principle: "People don't want to be millionaires — they want freedom. Design for freedom now, not later.",
    tool: "DEAL: Define → Eliminate → Automate → Liberate",
  },
  {
    id: "brown",
    name: "Brené Brown",
    icon: "💜",
    color: "#9C27B0",
    accent: "#E91E63",
    philosophy: "Wholehearted Living & Courage",
    lens: "Am I showing up vulnerably enough? Where is shame or perfectionism blocking me?",
    questions: [
      "Am I letting perfectionism stop me from showing up?",
      "Where am I numbing, avoiding, or playing small?",
      "What would I do if I knew I was 'enough' already?",
      "Am I cultivating meaningful work, rest, play, and creativity?",
    ],
    principle: "Vulnerability is the birthplace of creativity, belonging, and joy.",
    tool: "10 Guideposts: Authenticity · Self-Compassion · Resilient Spirit · Gratitude & Joy · Intuition & Faith · Creativity & Play · Meaningful Work · Laughter, Song & Dance · Calm & Stillness · Lasting Friendships",
  },
  {
    id: "bashar",
    name: "Bashar",
    icon: "✨",
    color: "#FF9800",
    accent: "#FFEB3B",
    philosophy: "Follow Your Highest Excitement",
    lens: "What genuinely excites me most right now? What beliefs am I holding that limit flow?",
    questions: [
      "Of all available options, which carries the highest excitement with integrity?",
      "What limiting belief is creating resistance in this area?",
      "Am I attached to a specific outcome, or can I trust the process?",
      "What small, excited action can I take TODAY in this direction?",
    ],
    principle: "Your excitement is your soul's compass — it is the language of your higher self.",
    tool: "Formula: Act on highest excitement → no attachment to form → trust synchronicity",
  },
];

const LIFE_AREAS = [
  { id: "income", label: "Income & Business", emoji: "💰" },
  { id: "creative", label: "Creative & DJ Work", emoji: "🎧" },
  { id: "retreats", label: "Retreats & Facilitation", emoji: "🌙" },
  { id: "learning", label: "Learning & Teaching", emoji: "📚" },
  { id: "body", label: "Body & Energy", emoji: "🌿" },
  { id: "relationships", label: "Relationships & Community", emoji: "🤝" },
  { id: "adventure", label: "Travel & Freedom", emoji: "🌍" },
  { id: "inner", label: "Inner Life & Spirituality", emoji: "🔮" },
];

const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function createDefaultState() {
  return {
    intentions: {},
    mentor: "robbins",
    area: "income",
    reflections: {},
    milestones: {},
    activeMentor: null,
  };
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getInitialState() {
  const saved = loadFromStorage();
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
    return createDefaultState();
  }
  const defaults = createDefaultState();
  return {
    ...defaults,
    ...saved,
    intentions: asObject(saved.intentions),
    reflections: asObject(saved.reflections),
    milestones: asObject(saved.milestones),
  };
}

export default function LifeDesignMap() {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const [tab, setTab] = useState("overview");
  const [activeArea, setActiveArea] = useState("income");
  const [activeMentor, setActiveMentor] = useState(null);

  const setIntention = (area, month, value) => {
    setState((s) => ({
      ...s,
      intentions: { ...s.intentions, [`${area}-${month}`]: value },
    }));
  };

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0d15 100%)",
      minHeight: "100vh", color: "#e8e0f0", padding: "0",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 20% 20%, rgba(156,39,176,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(33,150,243,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,152,0,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#9C27B0", marginBottom: 8, textTransform: "uppercase" }}>
            ✦ Life Architecture ✦
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 400,
            background: "linear-gradient(135deg, #e8d5ff 0%, #ffd4a8 50%, #b3e5fc 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.5px",
          }}>
            Aoife's Next 6 Months
          </h1>
          <p style={{ color: "#8a80a0", fontSize: 14, margin: 0, fontStyle: "italic", letterSpacing: 1 }}>
            March — August 2026 · Designed with purpose, guided by joy
          </p>
        </div>

        {/* Nav */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 32,
          background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4,
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {[
            { id: "overview", label: "🗺 Vision Map" },
            { id: "map", label: "📅 6-Month Grid" },
            { id: "mentor", label: "🧭 Mentor Lenses" },
            { id: "reflect", label: "✍️ Deep Reflection" },
          ].map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === t.id ? "linear-gradient(135deg, rgba(156,39,176,0.5), rgba(33,150,243,0.3))" : "transparent",
              color: tab === t.id ? "#e8e0f0" : "#6a6080",
              fontSize: "clamp(10px, 1.5vw, 13px)", fontFamily: "inherit", fontWeight: tab === t.id ? 600 : 400,
              transition: "all 0.2s", letterSpacing: 0.3,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        {tab === "overview" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#9C27B0", textTransform: "uppercase", marginBottom: 16 }}>✦ Your Four Guides</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {MENTORS.map(m => (
                  <button key={m.id} type="button" onClick={() => setActiveMentor(activeMentor === m.id ? null : m.id)} style={{
                    background: `linear-gradient(135deg, ${m.color}18, ${m.accent}0a)`,
                    border: `1px solid ${m.color}40`, borderRadius: 14, padding: "18px 16px", cursor: "pointer",
                    transition: "all 0.2s", transform: activeMentor === m.id ? "scale(1.02)" : "scale(1)",
                    boxShadow: activeMentor === m.id ? `0 8px 32px ${m.color}30` : "none",
                    width: "100%", textAlign: "left", fontFamily: "inherit", color: "inherit",
                  }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{AVATARS[m.id](m.color, m.accent)}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: m.color, marginBottom: 4, textAlign: "center" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>{m.philosophy}</div>
                    <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", lineHeight: 1.5, textAlign: "center" }}>"{m.principle}"</div>
                    {activeMentor === m.id && (
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${m.color}30` }}>
                        <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Core Tool</div>
                        <div style={{ fontSize: 12, color: "#c8c0e0", marginBottom: 12 }}>{m.tool}</div>
                        <div style={{ fontSize: 11, color: "#8a7a9a", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Power Questions</div>
                        {m.questions.map((q, i) => (
                          <div key={i} style={{ fontSize: 11, color: "#a098b8", marginBottom: 5, paddingLeft: 8, borderLeft: `2px solid ${m.color}50`, lineHeight: 1.5 }}>{q}</div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 20px", marginBottom: 24 }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#FF9800", textTransform: "uppercase", marginBottom: 16 }}>✦ Your Integrated Framework</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                {[
                  { step: "01", label: "Vision & Identity", desc: "Who must I become? (Robbins: identity & standards)", color: "#E84545" },
                  { step: "02", label: "Excite & Select", desc: "What genuinely lights me up? (Bashar: highest excitement)", color: "#FF9800" },
                  { step: "03", label: "Design & Liberate", desc: "How do I build freedom into the structure? (Ferriss: DEAL)", color: "#2196F3" },
                  { step: "04", label: "Show Up Whole", desc: "Am I being authentic & courageous? (Brown: wholehearted)", color: "#9C27B0" },
                ].map(s => (
                  <div key={s.step} style={{ padding: "14px", background: `${s.color}0f`, borderRadius: 10, border: `1px solid ${s.color}25` }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color, opacity: 0.5, marginBottom: 4 }}>{s.step}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e0d8f0", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 20px" }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#9C27B0", textTransform: "uppercase", marginBottom: 16 }}>✦ Life Areas Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                {LIFE_AREAS.map(area => (
                  <button key={area.id} type="button" onClick={() => { setActiveArea(area.id); setTab("map"); }} style={{
                    padding: "14px 16px", background: "rgba(255,255,255,0.04)",
                    borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 10,
                    width: "100%", textAlign: "left", fontFamily: "inherit", color: "inherit",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(156,39,176,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  >
                    <span style={{ fontSize: 22 }}>{area.emoji}</span>
                    <div>
                      <div style={{ fontSize: 12, color: "#c8c0e0", fontWeight: 600 }}>{area.label}</div>
                      <div style={{ fontSize: 10, color: "#6a6080", marginTop: 2 }}>
                        {state.intentions[`${area.id}-Mar`] ? "✓ has entries" : "tap to plan →"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== 6-MONTH GRID ===== */}
        {tab === "map" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#2196F3", textTransform: "uppercase", marginBottom: 8 }}>✦ 6-Month Intention Grid</h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>For each life area and month, capture your intention or milestone.</p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {LIFE_AREAS.map(a => (
                <button key={a.id} type="button" onClick={() => setActiveArea(a.id)} style={{
                  padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)",
                  background: activeArea === a.id ? "rgba(33,150,243,0.25)" : "rgba(255,255,255,0.04)",
                  color: activeArea === a.id ? "#90CAF9" : "#6a6080",
                  cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all 0.15s",
                }}>{a.emoji} {a.label}</button>
              ))}
            </div>

            {(() => {
              const area = LIFE_AREAS.find(a => a.id === activeArea);
              return (
                <div style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.2)", borderRadius: 16, padding: 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{area.emoji}</div>
                  <h3 style={{ color: "#90CAF9", fontSize: 18, margin: "0 0 16px", fontWeight: 400 }}>{area.label}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {MONTHS.map(month => (
                      <div key={month}>
                        <div style={{ fontSize: 11, color: "#5a90c0", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{month} 2026</div>
                        <textarea
                          placeholder={`Intention for ${month}…`}
                          value={state.intentions[`${activeArea}-${month}`] || ""}
                          onChange={e => setIntention(activeArea, month, e.target.value)}
                          style={{
                            width: "100%", minHeight: 90, padding: 10,
                            background: "rgba(0,0,0,0.3)", border: "1px solid rgba(33,150,243,0.25)",
                            borderRadius: 8, color: "#c8d8e8", fontSize: 12, fontFamily: "inherit",
                            resize: "vertical", lineHeight: 1.6, boxSizing: "border-box", outline: "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 11, color: "#5a5070", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Mentor prompts for this area</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                      {MENTORS.map(m => (
                        <div key={m.id} style={{ fontSize: 11, color: "#8a80a0", padding: "8px 10px", background: `${m.color}0a`, borderRadius: 8, borderLeft: `2px solid ${m.color}50` }}>
                          <span style={{ color: m.color, fontWeight: 600 }}>{m.icon} {m.name}: </span>{m.lens}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#5a5070", fontWeight: 400, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Area</th>
                    {MONTHS.map(m => (
                      <th key={m} style={{ padding: "8px 10px", color: "#5a5070", fontWeight: 400, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)", minWidth: 80 }}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LIFE_AREAS.map((area, i) => (
                    <tr key={area.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <button type="button" onClick={() => setActiveArea(area.id)} style={{
                          cursor: "pointer", color: "#c0b8d8", fontSize: 12,
                          background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "inherit",
                        }}>{area.emoji} {area.label}</button>
                      </td>
                      {MONTHS.map(month => (
                        <td key={month} style={{ padding: "10px", borderBottom: "1px solid rgba(255,255,255,0.04)", verticalAlign: "top" }}>
                          <div style={{ fontSize: 11, color: "#7a7090", lineHeight: 1.4, maxWidth: 100, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {state.intentions[`${area.id}-${month}`] || <span style={{ color: "#3a3050" }}>—</span>}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== MENTOR LENSES ===== */}
        {tab === "mentor" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#FF9800", textTransform: "uppercase", marginBottom: 8 }}>✦ Mentor Lens Deep-Dives</h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>Apply each mentor's framework to your specific situation.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {MENTORS.map(m => (
                <div key={m.id} style={{ background: `linear-gradient(160deg, ${m.color}12, ${m.accent}06)`, border: `1px solid ${m.color}35`, borderRadius: 16, padding: "22px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ flexShrink: 0 }}>{AVATARS[m.id](m.color, m.accent)}</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: m.color }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "#5a5070", letterSpacing: 1, textTransform: "uppercase" }}>{m.philosophy}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", marginBottom: 14, padding: "10px 12px", background: `${m.color}10`, borderRadius: 8, lineHeight: 1.6 }}>"{m.principle}"</div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Core Tool</div>
                    <div style={{ fontSize: 13, color: "#d0c8e0", fontWeight: 500, marginBottom: 10 }}>{m.tool}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: m.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Power Questions for You</div>
                    {m.questions.map((q, i) => (
                      <div key={i} style={{ marginBottom: 8, padding: "8px 10px", background: "rgba(0,0,0,0.2)", borderRadius: 6, borderLeft: `2px solid ${m.color}60`, fontSize: 12, color: "#a098b8", lineHeight: 1.5 }}>{q}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${m.color}20` }}>
                    <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Applied to Your World</div>
                    <div style={{ fontSize: 12, color: "#8a80a0", lineHeight: 1.6 }}>
                      {m.id === "robbins" && "Your RPM for the next 6 months: Result = sustainable sole-trader income at €30+/hr, moving off job seekers allowance. Purpose = creative sovereignty, freedom, community impact. Massive Action = launch Coding Course, land Cosmic Connection retreat bookings, pitch AI workshops to educators and wellness entrepreneurs."}
                      {m.id === "ferriss" && "Apply DEAL: Define your Dreamline (DJing retreats globally, Ireland community home base). Eliminate admin drag and low-value work. Automate course delivery. Liberate your calendar so your 12–3pm and 4–8pm flow states are fiercely protected. What 20% of your work drives 80% of income?"}
                      {m.id === "brown" && "Where is perfectionism stalling your course launch or retreat offering? Your most powerful asset is your authentic story — the PhD astrophysicist who DJs ecstatic dances and bridges science with spirituality. That combination is rare. Let it be seen. Wholehearted guidepost: cultivate meaningful work + play + creativity as equals, not in competition."}
                      {m.id === "bashar" && "Of all your current threads — Coding Course, Cosmic Connection retreat, AI for educators, Micheál Moleverse, DJing — which genuinely excites you most right now? Follow that thread with zero attachment to which income stream 'should' be primary. Release the plan, trust the process, act on joy."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== DEEP REFLECTION ===== */}
        {tab === "reflect" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#E84545", textTransform: "uppercase", marginBottom: 8 }}>✦ Deep Reflection Prompts</h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>Work through these foundational questions before filling in the grid. Your answers will shape everything else.</p>

            {[
              { section: "Vision (Robbins)", color: "#E84545", emoji: "🔥", prompts: [
                { q: "Who is the version of me that has everything I want in 6 months? Describe her in present tense.", key: "identity" },
                { q: "What standard must I raise immediately? Where am I settling?", key: "standards" },
                { q: "Which of my 6 core needs (Certainty, Variety, Significance, Love, Growth, Contribution) is most unmet right now?", key: "needs" },
              ]},
              { section: "Freedom Design (Ferriss)", color: "#2196F3", emoji: "⚡", prompts: [
                { q: "If I imagine my ideal week 6 months from now — how many hours am I working, on what, and from where?", key: "idealweek" },
                { q: "Fear-Setting: What's the worst case if I fully commit to my business? How likely is it? How would I recover?", key: "fearset" },
                { q: "What tasks/projects am I doing that I could eliminate, delegate or automate?", key: "eliminate" },
              ]},
              { section: "Courage & Wholehearted (Brown)", color: "#9C27B0", emoji: "💜", prompts: [
                { q: "Where am I numbing or avoiding right now? (Overscheduling, scrolling, perfectionism...)", key: "numbing" },
                { q: "What would I do if I truly believed I was enough — exactly as I am — right now?", key: "enough" },
                { q: "What is the brave thing I'm being called to do in the next 90 days that scares me?", key: "brave" },
              ]},
              { section: "Highest Excitement (Bashar)", color: "#FF9800", emoji: "✨", prompts: [
                { q: "Right now, in this moment — what excites me most? (Not what 'should', but what genuinely does.)", key: "excites" },
                { q: "What limiting belief keeps showing up as resistance? Write it down, then write the opposite.", key: "belief" },
                { q: "What small action — available to me today — would feel most aligned with my highest self?", key: "action" },
              ]},
            ].map(section => (
              <div key={section.section} style={{ marginBottom: 24, background: `${section.color}08`, border: `1px solid ${section.color}25`, borderRadius: 16, padding: "20px 18px" }}>
                <h3 style={{ color: section.color, fontSize: 15, margin: "0 0 16px", fontWeight: 500 }}>{section.emoji} {section.section}</h3>
                {section.prompts.map(p => (
                  <div key={p.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "#c0b8d8", display: "block", marginBottom: 8, lineHeight: 1.5 }}>{p.q}</label>
                    <textarea
                      placeholder="Write freely…"
                      value={state.reflections[`reflect-${p.key}`] || ""}
                      onChange={e => setState(s => ({ ...s, reflections: { ...s.reflections, [`reflect-${p.key}`]: e.target.value } }))}
                      style={{
                        width: "100%", minHeight: 80, padding: 12,
                        background: "rgba(0,0,0,0.3)", border: `1px solid ${section.color}30`,
                        borderRadius: 8, color: "#c8c0e0", fontSize: 13, fontFamily: "Georgia, serif",
                        resize: "vertical", lineHeight: 1.7, boxSizing: "border-box", outline: "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: "linear-gradient(135deg, rgba(156,39,176,0.1), rgba(255,152,0,0.08))", border: "1px solid rgba(156,39,176,0.3)", borderRadius: 16, padding: "20px 18px" }}>
              <h3 style={{ color: "#d4a8ff", fontSize: 15, margin: "0 0 12px", fontWeight: 500 }}>🌟 My 6-Month North Star (Synthesis)</h3>
              <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 12, fontStyle: "italic" }}>Distil everything above into your core commitment for the next 6 months in 3–5 sentences.</p>
              <textarea
                placeholder="In the next 6 months, I am becoming…  I am building…  I commit to…"
                value={state.reflections["northstar"] || ""}
                onChange={e => setState(s => ({ ...s, reflections: { ...s.reflections, northstar: e.target.value } }))}
                style={{
                  width: "100%", minHeight: 120, padding: 14,
                  background: "rgba(0,0,0,0.3)", border: "1px solid rgba(156,39,176,0.4)",
                  borderRadius: 10, color: "#e0d0ff", fontSize: 14, fontFamily: "Georgia, serif",
                  resize: "vertical", lineHeight: 1.8, boxSizing: "border-box", outline: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 36, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 11, color: "#3a3050", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
            ✦ Scorpio Sun · Pisces Moon · Taurus Rising · March–August 2026 ✦
          </div>
          <div style={{ fontSize: 11, color: "#3a3050", marginBottom: 8 }}>✓ Your entries auto-save to this browser</div>
          <button type="button" onClick={() => {
            if (window.confirm("Clear all your saved entries? This cannot be undone.")) {
              localStorage.removeItem(STORAGE_KEY);
              setState(createDefaultState());
            }
          }} style={{
            background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
            color: "#4a4060", borderRadius: 6, padding: "5px 14px",
            fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1,
          }}>Reset all data</button>
        </div>
      </div>
    </div>
  );
}