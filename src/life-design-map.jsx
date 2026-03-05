import { useState, useEffect } from "react";

const STORAGE_KEY = "aoife-life-design-v1";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function saveToStorage(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const MENTORS = [
  {
    id: "robbins", name: "Tony Robbins", icon: "🔥", color: "#E84545", accent: "#FF8C00",
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
    id: "ferriss", name: "Tim Ferriss", icon: "⚡", color: "#2196F3", accent: "#00BCD4",
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
    id: "brown", name: "Brené Brown", icon: "💜", color: "#9C27B0", accent: "#E91E63",
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
    id: "bashar", name: "Bashar", icon: "✨", color: "#FF9800", accent: "#FFEB3B",
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
  return { intentions: {}, mentor: "robbins", area: "income", reflections: {}, milestones: {}, activeMentor: null };
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getInitialState() {
  const saved = loadFromStorage();
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return createDefaultState();
  const defaults = createDefaultState();
  return { ...defaults, ...saved, intentions: asObject(saved.intentions), reflections: asObject(saved.reflections), milestones: asObject(saved.milestones) };
}

const HD_CARDS = [
  {
    title: "Projector — The Guide", color: "#00BCD4", emoji: "🔭",
    body: "You are not here to work like a Generator or initiate like a Manifestor. You're here to see, guide, and direct energy — yours and others'. Projectors have a natural gift for reading systems and people deeply. Your superpower is insight and wisdom, not output. The world is still catching up to the Projector way, which can make it feel like you're doing it wrong. You're not.",
    planning: "In your next 6 months: protect your energy ruthlessly. You can absorb others' energy easily (Split Definition) and mistake it for your own drive. Work in focused bursts, rest without guilt, and don't push when you're not feeling invited or recognised.",
  },
  {
    title: "Strategy — Wait for the Invitation", color: "#4CAF50", emoji: "🌿",
    body: "This doesn't mean sitting passively. It means creating the conditions for invitations to find you — by being visible, magnetic, and deeply yourself. When you initiate without invitation, you tend to meet resistance and exhaustion. When you wait and the right invitation comes, things flow with almost supernatural ease.",
    planning: "For your business and projects: instead of pushing into rooms uninvited, focus on being so compelling and clear that the right people invite you in. Your Coding Course, retreats, and AI workshops all benefit from this — build visibility, let curiosity do the inviting.",
  },
  {
    title: "Self Projected Authority — Trust Your Voice", color: "#FF9800", emoji: "🎙️",
    body: "Your authority lives in your Throat and G Centre. You make your best decisions by talking them out with trusted people — not for their advice, but to hear yourself speak. When you say something out loud and it sounds true and alive, that's your authority confirming it. When it sounds flat or forced, that's a no.",
    planning: "Before committing to anything in the next 6 months — a project, a collaboration, a course launch — talk it through out loud. Voice memos work too. Notice what makes you light up when you say it vs what feels like a performance.",
  },
  {
    title: "Profile 1/3 — Investigator / Martyr", color: "#9C27B0", emoji: "📚",
    body: "Line 1 (Investigator): You need a solid foundation of knowledge before you feel secure enough to act or share. Research, study, and deep investigation aren't procrastination for you — they're essential fuel. Line 3 (Martyr): You learn through trial and error, through what doesn't work. Your 'failures' and experiments are not detours — they are the path. Your lived experience of what works and what doesn't is one of your most valuable assets.",
    planning: "Your PhD, your ecstatic dance events, your tutoring — all of it is Line 3 research in action. In the next 6 months, trust that testing ideas, pivoting, and learning through doing is exactly how you're meant to build. Stop waiting until you have it all figured out.",
  },
  {
    title: "Split Definition — The Bridge Seeker", color: "#2196F3", emoji: "🌉",
    body: "You have two separate defined areas in your chart that aren't directly connected. This means you naturally seek people and environments that bridge your split — and can feel temporarily 'complete' around certain people. This is powerful for connection but means you're vulnerable to conditioning from others who bridge you. You may take on their energy, drives and urgency as if they were your own.",
    planning: "Be discerning about who you spend extended time with in the next 6 months. Notice when your drive or urgency feels genuinely yours vs borrowed from someone around you. Solitude and decompression time is not optional — it's how you return to yourself.",
  },
  {
    title: "Not-Self Theme — Bitterness", color: "#E84545", emoji: "⚠️",
    body: "Bitterness arises when you're not being recognised for who you are, when you're initiating without invitation, or when you're working in a way that exhausts rather than energises. It's a signal, not a flaw.",
    planning: "Use bitterness as a compass in your planning. If you're feeling bitter about a project, relationship or direction — pause. Ask: am I being seen here? Was I truly invited? Am I pushing? The answer will tell you what to adjust.",
  },
];

const ASTRO_CARDS = [
  {
    title: "Scorpio Sun in the 7th House", color: "#E84545", emoji: "🦂",
    body: "You are intense, strategic, and deeply purposeful. Scorpio suns don't do anything halfway — when you commit, you go all in. You have real psychological depth, the ability to read between the lines in any situation, and a hunger for transformation over superficiality. Your Sun in the 7th house means your identity is deeply bound up with relationship, collaboration, and being seen by others. You shine through partnership, not isolation.",
    planning: "In the next 6 months: your work lands best when it's relational — teaching, facilitating, coaching, connecting. Your Coding Course and retreats are perfectly placed for this. One-to-one recognition matters to you more than mass approval. Seek depth over breadth in your collaborations.",
  },
  {
    title: "Pisces Moon in the 12th House", color: "#9C27B0", emoji: "🐟",
    body: "Your emotional world is vast, dreamy, and deeply intuitive. Moon in Pisces gives you extraordinary empathy — you absorb others' emotions like water. Moon in the 12th house amplifies this, making solitude not just preferable but essential. You process the world in a hidden, interior way. Your insights often arrive in quiet moments, dreams, or creative flow states rather than in busy, social environments.",
    planning: "Your 12-3pm and 4-8pm flow windows are sacred — protect them. The world sees your Taurus rising (steady, grounded) but your interior life is oceanic and needs regular emptying. Without solitude and decompression, your sensitivity becomes overwhelm. Build retreat time into every week, not just occasionally.",
  },
  {
    title: "Taurus Rising", color: "#4CAF50", emoji: "🌿",
    body: "This is the face you show the world — steady, reliable, sensual, unhurried. Taurus rising people radiate calm and competence even when their interior (Scorpio Sun, Pisces Moon) is swirling. You are more resilient and grounded in presentation than you may feel on the inside. You value quality over quantity, comfort, beauty, and security. You move at your own pace and can't be rushed into decisions.",
    planning: "Use this to your advantage in business: your natural presence is reassuring and trustworthy, which makes you excellent in facilitation and teaching. But watch the Taurus tendency to get too comfortable or resist necessary change. The next 6 months call for deliberate movement, not just stability.",
  },
  {
    title: "Mercury in Sagittarius in the 8th House", color: "#FF9800", emoji: "🏹",
    body: "Your mind is philosophical, wide-ranging, and loves the big picture. Mercury in Sagittarius means you think in systems and stories, not just facts. You're drawn to meaning-making, foreign ideas, and teaching what you've discovered. In the 8th house, this gives you a penetrating, investigative quality — you want to understand what lies beneath the surface. You speak with authority and persuasive power.",
    planning: "This is the mind behind your PhD, your ecstatic dance facilitation, your AI teaching. You're not just communicating information — you're transmitting a worldview. Your courses and retreats should lead with the big picture and the 'why' before the 'how'. That's where your genius lives.",
  },
  {
    title: "Venus in Libra in the 6th House", color: "#E91E63", emoji: "⚖️",
    body: "You love through service, harmony, and beauty. Venus in Libra craves balance and fairness in all relationships. In the 6th house, love and work are closely linked — you find deep satisfaction in being genuinely useful and in crafting your daily life with care and aesthetic attention. Watch for the shadow: selling yourself short, accommodating others to avoid conflict, or staying in situations out of politeness rather than alignment.",
    planning: "In your business: price your work fairly (to yourself as well as clients). Your 30+/hr minimum is Venus in Libra insisting on reciprocal value. The 6th house also rules health and routine — your body and energy management are part of your professional edge. Gym Tuesdays and Fridays are non-negotiable architecture.",
  },
  {
    title: "Mars and Pluto Conjunct in Scorpio, 7th House", color: "#c62828", emoji: "🔴",
    body: "This is the most potent placement in your chart. Mars conjunct Pluto in Scorpio is extraordinary will, focus, and strategic power. You don't just want things — you pursue them with a quiet, sustained intensity that most people can't match. Combined with Pluto's transformative force, this means you're here to do deep work that genuinely changes things. In the 7th house, this power is activated and expressed through partnerships and public interaction.",
    planning: "When you're fully invited and aligned, this energy is unstoppable — it's what got you through a PhD, produced award-winning teaching, and drew people to your events. The key is pointed focus: don't scatter this across ten half-pursued projects. Choose the one or two things that truly matter this season and bring this full power to bear.",
  },
  {
    title: "Saturn in Aquarius in the 10th House (MC)", color: "#2196F3", emoji: "🪐",
    body: "Saturn on the Midheaven is one of the most significant career placements in astrology. It shows a life path that demands serious, sustained effort in building something of real worth — but rewards that effort with genuine authority and reputation over time. Aquarius flavours this with innovation, systems-thinking, and a desire to reform how things are done. You are meant to build something that lasts and that serves a broader community.",
    planning: "This is not a 'quick win' placement — it's asking you to build with integrity over time. Your sole trader business, your courses, your retreats are all Saturn in the 10th territory. The next 6 months are laying foundations. Don't be discouraged by slow visible results — structural work is happening beneath the surface.",
  },
  {
    title: "North Node in Capricorn in the 9th House", color: "#00BCD4", emoji: "🌐",
    body: "Your North Node points toward your soul's growth direction. Capricorn asks you to embrace responsibility, self-sufficiency, and building something real in the world. The 9th house flavours this with teaching, philosophy, travel, and expanding your worldview. Your South Node in Cancer suggests you may default to comfort, nostalgia, and emotional safety — these are gifts but can become crutches. Growth calls you toward structure and outward contribution.",
    planning: "The next 6 months are deeply North Node territory: moving toward financial independence (Capricorn self-sufficiency), building a teaching and facilitation business (9th house), and expanding your reach beyond Ireland (9th house travel and global perspective). This is your soul's intended direction. Trust it.",
  },
];

export default function LifeDesignMap() {
  const [state, setState] = useState(getInitialState);
  useEffect(() => { saveToStorage(state); }, [state]);
  const [tab, setTab] = useState("overview");
  const [activeArea, setActiveArea] = useState("income");
  const [activeMentor, setActiveMentor] = useState(null);

  const setIntention = (area, month, value) => {
    setState((s) => ({ ...s, intentions: { ...s.intentions, [`${area}-${month}`]: value } }));
  };

  const card = (c) => (
    <div key={c.title} style={{ marginBottom: 16, background: `${c.color}08`, border: `1px solid ${c.color}25`, borderRadius: 14, padding: "20px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>{c.emoji}</span>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.color }}>{c.title}</div>
      </div>
      <div style={{ fontSize: 13, color: "#b0a8c8", lineHeight: 1.7, marginBottom: 12 }}>{c.body}</div>
      <div style={{ padding: "10px 14px", background: `${c.color}12`, borderRadius: 8, borderLeft: `3px solid ${c.color}60` }}>
        <div style={{ fontSize: 10, color: c.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Applied to Your Next 6 Months</div>
        <div style={{ fontSize: 12, color: "#8a80a0", lineHeight: 1.7 }}>{c.planning}</div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0d15 100%)", minHeight: "100vh", color: "#e8e0f0", padding: "0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at 20% 20%, rgba(156,39,176,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(33,150,243,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,152,0,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#9C27B0", marginBottom: 8, textTransform: "uppercase" }}>✦ Life Architecture ✦</div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 400, background: "linear-gradient(135deg, #e8d5ff 0%, #ffd4a8 50%, #b3e5fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>Aoife's Next 6 Months</h1>
          <p style={{ color: "#8a80a0", fontSize: 14, margin: 0, fontStyle: "italic", letterSpacing: 1 }}>March — August 2026 · Designed with purpose, guided by joy</p>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, border: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          {[
            { id: "overview", label: "🗺 Vision Map" },
            { id: "map", label: "📅 6-Month Grid" },
            { id: "mentor", label: "🧭 Mentors" },
            { id: "reflect", label: "✍️ Reflection" },
            { id: "hd", label: "✦ Human Design" },
            { id: "astro", label: "★ Astrology" },
          ].map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === t.id ? "linear-gradient(135deg, rgba(156,39,176,0.5), rgba(33,150,243,0.3))" : "transparent",
              color: tab === t.id ? "#e8e0f0" : "#6a6080",
              fontSize: "clamp(10px, 1.3vw, 12px)", fontFamily: "inherit", fontWeight: tab === t.id ? 600 : 400,
              transition: "all 0.2s", letterSpacing: 0.3, minWidth: 60,
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
                    background: `linear-gradient(135deg, ${m.color}18, ${m.accent}0a)`, border: `1px solid ${m.color}40`,
                    borderRadius: 14, padding: "18px 16px", cursor: "pointer", transition: "all 0.2s",
                    transform: activeMentor === m.id ? "scale(1.02)" : "scale(1)",
                    boxShadow: activeMentor === m.id ? `0 8px 32px ${m.color}30` : "none",
                    width: "100%", textAlign: "left", fontFamily: "inherit", color: "inherit",
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: m.color, marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{m.philosophy}</div>
                    <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", lineHeight: 1.5 }}>"{m.principle}"</div>
                    {activeMentor === m.id && (
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${m.color}30` }}>
                        <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Core Tool</div>
                        <div style={{ fontSize: 12, color: "#c8c0e0", marginBottom: 12 }}>{m.tool}</div>
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
                    padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", fontFamily: "inherit", color: "inherit",
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
                          placeholder={`Intention for ${month}...`}
                          value={state.intentions[`${activeArea}-${month}`] || ""}
                          onChange={e => setIntention(activeArea, month, e.target.value)}
                          style={{ width: "100%", minHeight: 90, padding: 10, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(33,150,243,0.25)", borderRadius: 8, color: "#c8d8e8", fontSize: 12, fontFamily: "inherit", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box", outline: "none" }}
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
                        <button type="button" onClick={() => setActiveArea(area.id)} style={{ cursor: "pointer", color: "#c0b8d8", fontSize: 12, background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "inherit" }}>
                          {area.emoji} {area.label}
                        </button>
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
                    <span style={{ fontSize: 32 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: m.color }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "#5a5070", letterSpacing: 1, textTransform: "uppercase" }}>{m.philosophy}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#b0a8c8", fontStyle: "italic", marginBottom: 14, padding: "10px 12px", background: `${m.color}10`, borderRadius: 8, lineHeight: 1.6 }}>"{m.principle}"</div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: m.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Core Tool</div>
                    <div style={{ fontSize: 13, color: "#d0c8e0", fontWeight: 500 }}>{m.tool}</div>
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
                      {m.id === "robbins" && "Your RPM for the next 6 months: Result = sustainable sole-trader income at 30+/hr, moving off job seekers allowance. Purpose = creative sovereignty, freedom, community impact. Massive Action = launch Coding Course, land Cosmic Connection retreat bookings, pitch AI workshops."}
                      {m.id === "ferriss" && "Apply DEAL: Define your Dreamline (DJing retreats globally, Ireland community home base). Eliminate admin drag and low-value work. Automate course delivery. Liberate your calendar so your 12-3pm and 4-8pm flow states are fiercely protected."}
                      {m.id === "brown" && "Where is perfectionism stalling your course launch or retreat offering? Your most powerful asset is your authentic story — the PhD astrophysicist who DJs ecstatic dances and bridges science with spirituality. That combination is rare. Let it be seen."}
                      {m.id === "bashar" && "Of all your current threads — Coding Course, Cosmic Connection retreat, AI for educators, Micheal Moleverse, DJing — which genuinely excites you most right now? Follow that thread with zero attachment to which income stream 'should' be primary."}
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
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 20, fontStyle: "italic" }}>Work through these foundational questions before filling in the grid.</p>
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
                      placeholder="Write freely..."
                      value={state.reflections[`reflect-${p.key}`] || ""}
                      onChange={e => setState(s => ({ ...s, reflections: { ...s.reflections, [`reflect-${p.key}`]: e.target.value } }))}
                      style={{ width: "100%", minHeight: 80, padding: 12, background: "rgba(0,0,0,0.3)", border: `1px solid ${section.color}30`, borderRadius: 8, color: "#c8c0e0", fontSize: 13, fontFamily: "Georgia, serif", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                ))}
              </div>
            ))}
            <div style={{ background: "linear-gradient(135deg, rgba(156,39,176,0.1), rgba(255,152,0,0.08))", border: "1px solid rgba(156,39,176,0.3)", borderRadius: 16, padding: "20px 18px" }}>
              <h3 style={{ color: "#d4a8ff", fontSize: 15, margin: "0 0 12px", fontWeight: 500 }}>🌟 My 6-Month North Star (Synthesis)</h3>
              <textarea
                placeholder="In the next 6 months, I am becoming...  I am building...  I commit to..."
                value={state.reflections["northstar"] || ""}
                onChange={e => setState(s => ({ ...s, reflections: { ...s.reflections, northstar: e.target.value } }))}
                style={{ width: "100%", minHeight: 120, padding: 14, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(156,39,176,0.4)", borderRadius: 10, color: "#e0d0ff", fontSize: 14, fontFamily: "Georgia, serif", resize: "vertical", lineHeight: 1.8, boxSizing: "border-box", outline: "none" }}
              />
            </div>
          </div>
        )}

        {/* ===== HUMAN DESIGN ===== */}
        {tab === "hd" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#00BCD4", textTransform: "uppercase", marginBottom: 8 }}>✦ Your Human Design</h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 24, fontStyle: "italic" }}>Your energetic blueprint — how you're designed to move through the world, make decisions, and plan your next 6 months.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 28 }}>
              {[
                { label: "Type", value: "Projector", color: "#00BCD4" },
                { label: "Profile", value: "1 / 3", color: "#9C27B0" },
                { label: "Authority", value: "Self Projected", color: "#FF9800" },
                { label: "Definition", value: "Split", color: "#2196F3" },
                { label: "Strategy", value: "Wait for Invitation", color: "#4CAF50" },
                { label: "Not-Self", value: "Bitterness", color: "#E84545" },
              ].map(s => (
                <div key={s.label} style={{ padding: "14px 12px", background: `${s.color}10`, border: `1px solid ${s.color}30`, borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: s.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "#e0d8f0", fontWeight: 600, lineHeight: 1.3 }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(156,39,176,0.06))", border: "1px solid rgba(0,188,212,0.2)", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#00BCD4", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Incarnation Cross</div>
              <div style={{ fontSize: 16, color: "#e0d8f0", fontWeight: 500, marginBottom: 8 }}>Right Angle Cross of Contagion (14/8 | 29/30)</div>
              <div style={{ fontSize: 12, color: "#8a80a0", lineHeight: 1.7 }}>Your life's purpose is to spread energy, ideas and ways of being that are genuinely contagious — in the best sense. Gate 14 brings power skills and material abundance. Gate 8 brings contribution and making a difference. Gate 29 brings commitment and saying yes to what truly matters. Gate 30 brings the fire of desires and emotional depth. Together: you're here to model a way of living so authentic and alive that others catch it simply by being around you.</div>
            </div>

            {HD_CARDS.map(card)}

            <div style={{ background: "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(255,152,0,0.06))", border: "1px solid rgba(0,188,212,0.2)", borderRadius: 14, padding: "20px 18px" }}>
              <div style={{ fontSize: 11, color: "#00BCD4", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>✦ HD x Mentor Synthesis</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  { mentor: "🔥 Robbins", insight: "Identity upgrade as a Projector: 'I am someone who waits for the right stage, then commands it fully.' Raise your standards around recognition, not output.", color: "#E84545" },
                  { mentor: "⚡ Ferriss", insight: "DEAL is perfect for Projectors. Eliminate especially hard — you cannot afford to work on things that don't light you up. Your energy is precious.", color: "#2196F3" },
                  { mentor: "💜 Brown", insight: "Wholehearted for a 1/3 Projector means embracing the research AND the experiments. Your trial-and-error is not failure — it's data. Show up vulnerably as someone who learns in public.", color: "#9C27B0" },
                  { mentor: "✨ Bashar", insight: "Bashar's excitement formula maps to Self Projected authority — your excitement IS your inner authority speaking. When something makes you light up out loud, that's your G Centre saying yes.", color: "#FF9800" },
                ].map(s => (
                  <div key={s.mentor} style={{ padding: "12px", background: `${s.color}0a`, borderRadius: 10, borderLeft: `2px solid ${s.color}50` }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginBottom: 6 }}>{s.mentor}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", lineHeight: 1.6 }}>{s.insight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ASTROLOGY ===== */}
        {tab === "astro" && (
          <div>
            <h2 style={{ fontSize: 13, letterSpacing: 4, color: "#E91E63", textTransform: "uppercase", marginBottom: 8 }}>★ Your Natal Astrology</h2>
            <p style={{ fontSize: 12, color: "#6a6080", marginBottom: 24, fontStyle: "italic" }}>Your birth chart as a planning tool — how your planetary placements shape your energy, work, relationships, and path.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 28 }}>
              {[
                { label: "Sun", value: "Scorpio", house: "VII", color: "#E84545" },
                { label: "Moon", value: "Pisces", house: "XII", color: "#9C27B0" },
                { label: "Rising", value: "Taurus", house: "I", color: "#4CAF50" },
                { label: "Mercury", value: "Sagittarius", house: "VIII", color: "#FF9800" },
                { label: "Venus", value: "Libra", house: "VI", color: "#E91E63" },
                { label: "Mars", value: "Scorpio", house: "VII", color: "#E84545" },
                { label: "Saturn", value: "Aquarius", house: "X", color: "#2196F3" },
                { label: "N. Node", value: "Capricorn", house: "IX", color: "#00BCD4" },
              ].map(p => (
                <div key={p.label} style={{ padding: "12px 10px", background: `${p.color}10`, border: `1px solid ${p.color}30`, borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: p.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 13, color: "#e0d8f0", fontWeight: 600 }}>{p.value}</div>
                  <div style={{ fontSize: 10, color: "#5a5070", marginTop: 2 }}>H{p.house}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(232,69,69,0.08), rgba(233,30,99,0.06))", border: "1px solid rgba(232,69,69,0.2)", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#E84545", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Your Power Aspects</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                {[
                  { aspect: "Sun conjunct Mars (Scorpio, H7)", meaning: "Fierce drive, natural confidence, unstoppable when committed. You don't just work — you pursue.", color: "#E84545" },
                  { aspect: "Sun conjunct Pluto (Scorpio, H7)", meaning: "Depth, transformation, magnetism. You see through surface appearances and carry regenerative power.", color: "#9C27B0" },
                  { aspect: "Mars conjunct Pluto (Scorpio, H7)", meaning: "The most powerful conjunction in your chart. Laser focus, strategic brilliance, formidable will.", color: "#c62828" },
                  { aspect: "Moon sextile Saturn", meaning: "Emotional discipline. You can feel deeply and still show up. Steady under pressure.", color: "#2196F3" },
                  { aspect: "Sun trine Moon", meaning: "Inner harmony. Your will and emotions fundamentally agree — you're not at war with yourself.", color: "#4CAF50" },
                ].map(a => (
                  <div key={a.aspect} style={{ padding: "10px 12px", background: `${a.color}0a`, borderRadius: 8, borderLeft: `2px solid ${a.color}50` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: a.color, marginBottom: 4 }}>{a.aspect}</div>
                    <div style={{ fontSize: 11, color: "#8a80a0", lineHeight: 1.6 }}>{a.meaning}</div>
                  </div>
                ))}
              </div>
            </div>

            {ASTRO_CARDS.map(card)}

            <div style={{ background: "linear-gradient(135deg, rgba(233,30,99,0.08), rgba(156,39,176,0.06))", border: "1px solid rgba(233,30,99,0.2)", borderRadius: 14, padding: "20px 18px" }}>
              <div style={{ fontSize: 11, color: "#E91E63", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>✦ Astrology x Human Design Synthesis</div>
              <div style={{ fontSize: 13, color: "#b0a8c8", lineHeight: 1.8 }}>
                Your chart and your Human Design tell a remarkably consistent story.{" "}
                <span style={{ color: "#E84545" }}>Mars/Pluto conjunct in Scorpio</span> mirrors your{" "}
                <span style={{ color: "#00BCD4" }}>Projector's deep-seeing gift</span> — you're designed to focus intensely and guide, not scatter and push.{" "}
                <span style={{ color: "#9C27B0" }}>Pisces Moon in the 12th</span> amplifies the Projector's need for solitude and decompression.{" "}
                <span style={{ color: "#4CAF50" }}>Saturn on the MC</span> echoes your{" "}
                <span style={{ color: "#00BCD4" }}>Incarnation Cross of Contagion</span> — you're here to build something of real, lasting worth that spreads by example. And your{" "}
                <span style={{ color: "#FF9800" }}>1/3 Profile</span> is perfectly mirrored in{" "}
                <span style={{ color: "#FF9800" }}>Mercury in Sagittarius in the 8th</span> — a mind that researches deeply, learns through experience, and synthesises it into wisdom worth transmitting.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 36, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 11, color: "#3a3050", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
            ✦ Scorpio Sun · Pisces Moon · Taurus Rising · Projector 1/3 · March-August 2026 ✦
          </div>
          <div style={{ fontSize: 11, color: "#3a3050", marginBottom: 8 }}>✓ Your entries auto-save to this browser</div>
          <button type="button" onClick={() => {
            if (window.confirm("Clear all your saved entries? This cannot be undone.")) {
              localStorage.removeItem(STORAGE_KEY);
              setState(createDefaultState());
            }
          }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#4a4060", borderRadius: 6, padding: "5px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>Reset all data</button>
        </div>
      </div>
    </div>
  );
}