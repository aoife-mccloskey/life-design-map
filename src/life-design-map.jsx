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
    tool: "10 Guideposts: Authenticity, Self-Compassion, Resilience, Gratitude, Creativity, Play, Meaningful Work...",
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

const defaultState = {
  intentions: {},
  mentor: "robbins",
  area: "income",
  reflections: {},
  milestones: {},
  activeMentor: null,
};

export default function LifeDesignMap() {
  const [state, setState] = useState(() => loadFromStorage() || defaultState);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);
  const [tab, setTab] = useState("overview"); // overview | map | mentor | reflect
  const [activeArea, setActiveArea] = useState("income");
  const [activeMentor, setActiveMentor] = useState(null);

  const setIntention = (area, month, value) => {
    setState((s) => ({
      ...s,
      intentions: {
        ...s.intentions,
        [`${area}-${month}`]: value,
      },
    }));
  };

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0d15 100%)",
      minHeight: "100vh",
      color: "#e8e0f0",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Cosmic background particles */}
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
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === t.id
                ? "linear-gradient(135deg, rgba(156,39,176,0.5), rgba(33,150,243,0.3))"
                : "transparent",
              color: tab === t.id ? "#e8e0f0" : "#6a6080",
              fontSize: "clamp(10px, 1.5vw, 13px)", fontFamily: "inherit", fontWeight: tab === t.id ? 600 : 400,
              transition: "all 0.2s", letterSpacing: 0.3,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {tab === "overview" && (
          <div>
            {/* Mentor Philosophy Cards */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#9C27B0", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Your Four Guides
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {MENTORS.map(m => (
                  <div key={m.id} onClick={() => { setActiveMentor(activeMentor === m.id ? null : m.id); }} style={{
                    background: `linear-gradient(135deg, ${m.color}18, ${m.accent}0a)`,
                    border: `1px solid ${m.color}40`,
                    borderRadius: 14, padding: "18px 16px", cursor: "pointer",
                    transition: "all 0.2s",
                    transform: activeMentor === m.id ? "scale(1.02)" : "scale(1)",
                    boxShadow: activeMentor === m.id ? `0 8px 32px ${m.color}30` : "none",
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: m.color, marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{m.philosophy}</div>
                    <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", lineHeight: 1.5 }}>"{m.principle}"</div>
                    
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
                  </div>
                ))}
              </div>
            </div>

            {/* Synthesised Framework */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "24px 20px", marginBottom: 24,
            }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#FF9800", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Your Integrated Framework
              </h2>
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

            {/* Life Areas Wheel */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "24px 20px",
            }}>
              <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#9C27B0", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Life Areas Overview
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                {LIFE_AREAS.map(area => (
                  <div key={area.id}
                    onClick={() => { setActiveArea(area.id); setTab("map"); }}
                    style={{
                      padding: "14px 16px", background: "rgba(255,255,255,0.04)",
                      borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 10,
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== 6-MONTH GRID TAB ===== */}
        {tab === "map" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#2196F3", textTransform: "uppercase", marginBottom: 8 }}>
              ✦ 6-Month Intention Grid
            </h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>
              For each life area and month, capture your intention or milestone. Click any area header to expand.
            </p>

            {/* Area selector */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {LIFE_AREAS.map(a => (
                <button key={a.id} onClick={() => setActiveArea(a.id)} style={{
                  padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)",
                  background: activeArea === a.id ? "rgba(33,150,243,0.25)" : "rgba(255,255,255,0.04)",
                  color: activeArea === a.id ? "#90CAF9" : "#6a6080",
                  cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                  transition: "all 0.15s",
                }}>
                  {a.emoji} {a.label}
                </button>
              ))}
            </div>

            {/* Grid for selected area */}
            {(() => {
              const area = LIFE_AREAS.find(a => a.id === activeArea);
              return (
                <div style={{
                  background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.2)",
                  borderRadius: 16, padding: 20, marginBottom: 24,
                }}>
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
                            resize: "vertical", lineHeight: 1.6, boxSizing: "border-box",
                            outline: "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mentor prompt for this area */}
                  <div style={{
                    marginTop: 16, padding: 14,
                    background: "rgba(255,255,255,0.03)", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ fontSize: 11, color: "#5a5070", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Mentor prompts for this area</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                      {MENTORS.map(m => (
                        <div key={m.id} style={{ fontSize: 11, color: "#8a80a0", padding: "8px 10px", background: `${m.color}0a`, borderRadius: 8, borderLeft: `2px solid ${m.color}50` }}>
                          <span style={{ color: m.color, fontWeight: 600 }}>{m.icon} {m.name}: </span>
                          {m.lens}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* All areas summary */}
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
                        <span
                          onClick={() => setActiveArea(area.id)}
                          style={{ cursor: "pointer", color: "#c0b8d8", fontSize: 12 }}
                        >{area.emoji} {area.label}</span>
                      </td>
                      {MONTHS.map(month => (
                        <td key={month} style={{ padding: "10px", borderBottom: "1px solid rgba(255,255,255,0.04)", verticalAlign: "top" }}>
                          <div style={{
                            fontSize: 11, color: "#7a7090", lineHeight: 1.4,
                            maxWidth: 100, overflow: "hidden", display: "-webkit-box",
                            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                          }}>
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

        {/* ===== MENTOR LENSES TAB ===== */}
        {tab === "mentor" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#FF9800", textTransform: "uppercase", marginBottom: 8 }}>
              ✦ Mentor Lens Deep-Dives
            </h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>
              Apply each mentor's framework to your specific situation. Click a mentor to explore their lens.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {MENTORS.map(m => (
                <div key={m.id} style={{
                  background: `linear-gradient(160deg, ${m.color}12, ${m.accent}06)`,
                  border: `1px solid ${m.color}35`,
                  borderRadius: 16, padding: "22px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 32 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: m.color }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "#5a5070", letterSpacing: 1, textTransform: "uppercase" }}>{m.philosophy}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", marginBottom: 14, padding: "10px 12px", background: `${m.color}10`, borderRadius: 8, lineHeight: 1.6 }}>
                    "{m.principle}"
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Core Tool</div>
                    <div style={{ fontSize: 13, color: "#d0c8e0", fontWeight: 500, marginBottom: 10 }}>{m.tool}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: m.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Power Questions for You</div>
                    {m.questions.map((q, i) => (
                      <div key={i} style={{
                        marginBottom: 8, padding: "8px 10px",
                        background: "rgba(0,0,0,0.2)", borderRadius: 6,
                        borderLeft: `2px solid ${m.color}60`,
                        fontSize: 12, color: "#a098b8", lineHeight: 1.5,
                      }}>
                        {q}
                      </div>
                    ))}
                  </div>

                  {/* Applied to Aoife's actual context */}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${m.color}20` }}>
                    <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Applied to Your World</div>
                    <div style={{ fontSize: 12, color: "#8a80a0", lineHeight: 1.6 }}>
                      {m.id === "robbins" && "Your RPM for the next 3 months: Result = sustainable solo-trader income at €30+/hr. Purpose = freedom, creative sovereignty, community impact. Massive Action = launch Coding Course, land 2 retreat bookings, pitch AI workshops to 5 organisations."}
                      {m.id === "ferriss" && "Apply DEAL: Define your 'Dreamline' (DJing retreats, Ireland community home base). Eliminate admin drag. Automate course delivery. Liberate your calendar so 12–3pm and 4–8pm flow states are protected. What 20% of your work drives 80% of your income?"}
                      {m.id === "brown" && "Where is perfectionism stalling your Ireland AM prep or course launch? Your most powerful offer is your authentic story — the PhD astrophysicist who DJs ecstatic dances. Let that be seen. Wholehearted guidepost: cultivate meaningful work + play + creativity as equals."}
                      {m.id === "bashar" && "Ask: of Ireland AM, the Coding Course, the Cosmic Connection retreat, and Micheál Moleverse — which genuinely excites you most right now? Follow that thread. Release attachment to which income stream 'should' be the main one. Trust synchronicity."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== DEEP REFLECTION TAB ===== */}
        {tab === "reflect" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#E84545", textTransform: "uppercase", marginBottom: 8 }}>
              ✦ Deep Reflection Prompts
            </h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>
              Work through these foundational questions before filling in the grid. Your answers will shape everything else.
            </p>

            {[
              {
                section: "Vision (Robbins)",
                color: "#E84545",
                emoji: "🔥",
                prompts: [
                  { q: "Who is the version of me that has everything I want in 6 months? Describe her in present tense.", key: "identity" },
                  { q: "What standard must I raise immediately? Where am I settling?", key: "standards" },
                  { q: "Which of my 6 core needs (Certainty, Variety, Significance, Love, Growth, Contribution) is most unmet right now?", key: "needs" },
                ],
              },
              {
                section: "Freedom Design (Ferriss)",
                color: "#2196F3",
                emoji: "⚡",
                prompts: [
                  { q: "If I imagine my ideal week 6 months from now — how many hours am I working, on what, and from where?", key: "idealweek" },
                  { q: "Fear-Setting: What's the worst case if I fully commit to my business? How likely is it? How would I recover?", key: "fearset" },
                  { q: "What tasks/projects am I doing that I could eliminate, delegate or automate?", key: "eliminate" },
                ],
              },
              {
                section: "Courage & Wholehearted (Brown)",
                color: "#9C27B0",
                emoji: "💜",
                prompts: [
                  { q: "Where am I numbing or avoiding right now? (Overscheduling, scrolling, perfectionism...)", key: "numbing" },
                  { q: "What would I do if I truly believed I was enough — exactly as I am — right now?", key: "enough" },
                  { q: "What is the brave thing I'm being called to do in the next 90 days that scares me?", key: "brave" },
                ],
              },
              {
                section: "Highest Excitement (Bashar)",
                color: "#FF9800",
                emoji: "✨",
                prompts: [
                  { q: "Right now, in this moment — what excites me most? (Not what 'should', but what genuinely does.)", key: "excites" },
                  { q: "What limiting belief keeps showing up as resistance? Write it down, then write the opposite.", key: "belief" },
                  { q: "What small action — available to me today — would feel most aligned with my highest self?", key: "action" },
                ],
              },
            ].map(section => (
              <div key={section.section} style={{
                marginBottom: 24, background: `${section.color}08`,
                border: `1px solid ${section.color}25`, borderRadius: 16, padding: "20px 18px",
              }}>
                <h3 style={{ color: section.color, fontSize: 15, margin: "0 0 16px", fontWeight: 500 }}>
                  {section.emoji} {section.section}
                </h3>
                {section.prompts.map(p => (
                  <div key={p.key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "#c0b8d8", display: "block", marginBottom: 8, lineHeight: 1.5 }}>
                      {p.q}
                    </label>
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

            {/* Synthesis */}
            <div style={{
              background: "linear-gradient(135deg, rgba(156,39,176,0.1), rgba(255,152,0,0.08))",
              border: "1px solid rgba(156,39,176,0.3)",
              borderRadius: 16, padding: "20px 18px",
            }}>
              <h3 style={{ color: "#d4a8ff", fontSize: 15, margin: "0 0 12px", fontWeight: 500 }}>
                🌟 My 6-Month North Star (Synthesis)
              </h3>
              <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 12, fontStyle: "italic" }}>
                Distil everything above into your core commitment for the next 6 months in 3–5 sentences.
              </p>
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
            ✦ Scorpio Sun · Pisces Moon · Taurus Rising · March 2026 ✦
          </div>
          <div style={{ fontSize: 11, color: "#3a3050", marginBottom: 8 }}>✓ Your entries auto-save to this browser</div>
          <button
            onClick={() => {
              if (window.confirm("Clear all your saved entries? This cannot be undone.")) {
                localStorage.removeItem(STORAGE_KEY);
                setState(defaultState);
              }
            }}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
              color: "#4a4060", borderRadius: 6, padding: "5px 14px",
              fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1,
            }}
          >
            Reset all data
          </button>
        </div>
      </div>
    </div>
  );
}