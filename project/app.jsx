// Main portfolio app
const { useState, useEffect, useRef, useMemo } = React;

const NAV_SECTIONS = ["about", "stack", "experience", "projects", "voice", "beyond", "credentials"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.no-anim)");
    // Apply hidden state ONLY now (so non-JS / failed-JS users still see content)
    els.forEach((el) => {if (!el.classList.contains("in")) el.classList.add("pre");});
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("pre");
          e.target.classList.add("in");
        }
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.01 });
    els.forEach((el) => io.observe(el));
    // Safety net: if anything is still .pre after 2s, force-reveal it
    const safety = setTimeout(() => {
      document.querySelectorAll(".reveal.pre").forEach((el) => {
        el.classList.remove("pre");
        el.classList.add("in");
      });
    }, 2000);
    return () => {io.disconnect();clearTimeout(safety);};
  }, []);
}

function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

// ---------- NAV ----------
function Nav({ lang, setLang, t }) {
  const active = useScrollSpy(NAV_SECTIONS);
  return (
    <nav className="tl-nav" aria-label="Primary" data-comment-anchor="f2574357c8-nav-67-5">
      <a href="#top" className="tl-nav-logo">Thomas <span>Loridan</span></a>
      <div className="tl-nav-links">
        {NAV_SECTIONS.map((id) =>
        <a key={id} href={`#${id}`} className={`tl-nav-link ${active === id ? "active" : ""}`}>
            {t.nav[id]}
          </a>
        )}
      </div>
      <div className="tl-lang" role="group" aria-label="Language">
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
      </div>
    </nav>);

}

// ---------- HERO ----------
function Hero({ t }) {
  return (
    <header id="top" className="hero" data-comment-anchor="8e242c4855-header-87-5">
      <div className="hero-inner reveal no-anim">
        <h1 className="h-display">
          {t.hero.titleA}{" "}
          <span className="accent">{t.hero.titleAccent}</span>
          <br />
          {t.hero.titleB}
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">{t.hero.ctaPrimary}</a>
          <a href="mailto:thomas.loridan@outlook.com" className="btn btn-ghost">{t.hero.ctaGhost}</a>
        </div>
      </div>
      <a href="#about" className="hero-scroll" aria-label="Scroll">
        <span>{t.hero.scroll}</span>
        <span className="line" />
      </a>
    </header>);

}

// ---------- ABOUT ----------
function About({ t }) {
  return (
    <section id="about" className="section">
      <div className="section-head reveal">
        <div className="head-left">
          <div className="overline"><span className="dot">●</span>{t.about.overline}</div>
          <h2 className="h1">{t.about.kicker}</h2>
        </div>
      </div>
      <div className="about-grid reveal" style={{ "--reveal-delay": "80ms" }}>
        <div className="about-photo">
          <img src={window.R("assets/profile.png")} alt="Thomas Loridan portrait" />
          <div className="badge"><span className="pulse" />{t.about.photoBadge}</div>
        </div>
        <div>
          <p className="about-copy" data-comment-anchor="c3d91a2102-p-128-11">
            {t.about.body.split(/(half engineer|mi-ingénieur)/i).map((part, i) => {
              if (/half engineer|mi-ingénieur/i.test(part)) {
                return <span key={i} className="accent">{part}</span>;
              }
              return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
          </p>
          <div className="about-meta">
            {t.about.meta.map((m, i) =>
            <div className="cell" key={i}>
                <span className="key">{m.k}</span>
                <span className="val">{m.v}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- STACK ----------
function Stack({ t }) {
  const [filter, setFilter] = useState("all");
  return (
    <section id="stack" className="section-paper">
      <div className="inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="overline"><span className="dot">●</span>{t.stack.overline}</div>
            <h2 className="h1">{t.stack.title}</h2>
          </div>
          <div className="head-right">
            <p className="body muted" style={{ maxWidth: 460 }}>{t.stack.sub}</p>
          </div>
        </div>
        <div className="stack-wrap reveal" style={{ "--reveal-delay": "120ms", background: "#fff" }} data-comment-anchor="4e43a7872b-div-152-9">
          <div className="stack-tabs">
            <button className={`stack-tab ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>{t.stack.tabs.all}</button>
            <button className={`stack-tab ${filter === "product" ? "on" : ""}`} onClick={() => setFilter("product")}>{t.stack.tabs.product}</button>
            <button className={`stack-tab ${filter === "tech" ? "on" : ""}`} onClick={() => setFilter("tech")}>{t.stack.tabs.tech}</button>
          </div>
          <div className="center-pill">
            <span className="label-mono">{t.stack.centerLabel}</span>
            <span className="name">{t.stack.centerName.split(" · ").map((w, i, arr) =>
              <React.Fragment key={i}>
                {i === 1 ? <em>{w}</em> : w}
                {i < arr.length - 1 ? " · " : ""}
              </React.Fragment>
              )}</span>
          </div>
          <window.SkillBubbles filter={filter} />
        </div>
      </div>
    </section>);

}

// ---------- EXPERIENCE ----------
const COMPANY_MEDIA = {
  "Devoteam": { src: "assets/devoteam.gif", contain: false },
  "Amazon": { src: "assets/amazon.gif", contain: false },
  "Famyliad": { src: null, contain: false, codename: "FAM" },
  "Auchan": { src: "assets/auchan.gif", contain: false },
  "L'Oréal": { src: "assets/loreal.gif", contain: false }
};

function Experience({ t }) {
  return (
    <section id="experience" className="section">
      <div className="section-head reveal">
        <div className="head-left">
          <div className="overline"><span className="dot">●</span>{t.experience.overline}</div>
          <h2 className="h1">{t.experience.title}</h2>
        </div>
        <div className="head-right">
          <p className="body muted" style={{ maxWidth: 460 }}>{t.experience.sub}</p>
        </div>
      </div>
      <div className="timeline">
        {t.experience.roles.map((r, i) => {
          const media = COMPANY_MEDIA[r.company] || {};
          return (
            <div key={i} className="tl-row reveal" style={{ "--reveal-delay": `${i * 60}ms` }}>
              <div className="yr"><span className="span">{r.yr}</span></div>
              <div className="ctx">
                <div className="company">{r.company}</div>
                <div className="role">{r.role}</div>
                {r.desc && <p className="role-desc">{r.desc}</p>}
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span className={`tag ${i === 0 ? "blue" : "navy"}`}>{r.tag}</span>
                </div>
              </div>
              <div className={`tl-media ${media.contain ? "contain" : ""}`}>
                {media.src ?
                <img src={window.R(media.src)} alt={r.company} loading="lazy" /> :
                <div style={{
                  width: "100%", height: "100%", background: "linear-gradient(135deg, var(--navy), #163e75)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 32
                }}>{r.company[0]}</div>
                }
              </div>
            </div>);

        })}
      </div>
    </section>);

}

// ---------- PROJECTS ----------
const PROJ_MEDIA = ["assets/sonar.jpg", "assets/oracle.webp", null];

function Projects({ t }) {
  return (
    <section id="projects" className="section-paper">
      <div className="inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="overline"><span className="dot">●</span>{t.projects.overline}</div>
            <h2 className="h1" data-comment-anchor="9aeebe4fa2-h2-238-13">{t.projects.title}</h2>
          </div>
          <div className="head-right">
            <p className="body muted" style={{ maxWidth: 460 }}>{t.projects.sub}</p>
          </div>
        </div>
        <div className="proj-grid">
          {t.projects.items.map((p, i) =>
          <article key={i} className="proj reveal" style={{ "--reveal-delay": `${i * 80}ms` }}>
              <div className={`media ${!PROJ_MEDIA[i] ? "placeholder" : ""}`}>
                <span className="codename">{p.codename}</span>
                {PROJ_MEDIA[i] ?
              <img src={window.R(PROJ_MEDIA[i])} alt={p.title} loading="lazy" /> :

              <svg viewBox="0 0 320 170" width="82%" height="82%" aria-hidden="true" data-comment-anchor="8c7437ea9b-svg-252-15">
                    {/* Schematic for Infra Optimizer — infra → AI pipeline → dashboard */}
                    <g fill="none" stroke="#fff" strokeWidth="1.1" opacity="0.85">
                      {/* Left: infra stack */}
                      <rect x="20" y="30" width="56" height="26" rx="2.5" />
                      <rect x="20" y="62" width="56" height="26" rx="2.5" />
                      <rect x="20" y="94" width="56" height="26" rx="2.5" />
                      <line x1="28" y1="40" x2="62" y2="40" />
                      <line x1="28" y1="48" x2="48" y2="48" />
                      <line x1="28" y1="72" x2="62" y2="72" />
                      <line x1="28" y1="80" x2="48" y2="80" />
                      <line x1="28" y1="104" x2="62" y2="104" />
                      <line x1="28" y1="112" x2="48" y2="112" />
                      <circle cx="69" cy="40" r="1.6" fill="#6FA7F0" stroke="none" />
                      <circle cx="69" cy="72" r="1.6" fill="#6FA7F0" stroke="none" />
                      <circle cx="69" cy="104" r="1.6" fill="#6FA7F0" stroke="none" />
                      {/* Connectors infra → core */}
                      <path d="M76 43 L108 43 L108 75 L138 75" />
                      <path d="M76 75 L138 75" />
                      <path d="M76 107 L108 107 L108 75" />
                      {/* Middle: AI hexagonal core */}
                      <path d="M170 47 L200 62 L200 92 L170 107 L140 92 L140 62 Z" />
                      <path d="M170 62 L185 71 L185 86 L170 95 L155 86 L155 71 Z" opacity="0.45" />
                      {/* Connector core → dashboard */}
                      <path d="M200 77 L233 77" />
                      <path d="M225 72 L233 77 L225 82" />
                      {/* Right: dashboard frame */}
                      <rect x="233" y="30" width="72" height="90" rx="3" />
                      <line x1="233" y1="44" x2="305" y2="44" />
                      <circle cx="240" cy="37" r="1.2" fill="#fff" stroke="none" />
                      <circle cx="245" cy="37" r="1.2" fill="#fff" stroke="none" />
                      <circle cx="250" cy="37" r="1.2" fill="#fff" stroke="none" />
                      {/* sparkline */}
                      <path d="M240 70 L250 63 L260 67 L270 55 L280 60 L290 50 L300 54" strokeWidth="1.3" />
                      {/* bars */}
                      <g fill="#6FA7F0" stroke="none" opacity="0.85">
                        <rect x="240" y="94" width="6" height="16" />
                        <rect x="250" y="88" width="6" height="22" />
                        <rect x="260" y="96" width="6" height="14" />
                        <rect x="270" y="82" width="6" height="28" />
                        <rect x="280" y="90" width="6" height="20" />
                        <rect x="290" y="85" width="6" height="25" />
                      </g>
                    </g>
                    {/* Animated pulse on AI core */}
                    <circle cx="170" cy="77" r="3" fill="#6FA7F0">
                      <animate attributeName="r" values="3;12;3" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.85;0;0.85" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="170" cy="77" r="2.4" fill="#6FA7F0" />
                    {/* Labels */}
                    <g fill="#fff" opacity="0.5" fontFamily="DM Mono, monospace" fontSize="6.5" letterSpacing="1.4" textAnchor="middle">
                      <text x="48" y="140">INFRA</text>
                      <text x="170" y="140">AI CORE</text>
                      <text x="269" y="140">DASHBOARD</text>
                    </g>
                  </svg>
              }
              </div>
              <div className="body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="stats">
                  {p.stats.map((s, j) =>
                <div key={j} className="s">
                      <span className={`n ${s.brass ? "brass" : ""}`}>{s.n}</span>
                      <span className="k">{s.k}</span>
                    </div>
                )}
                </div>
              </div>
            </article>
          )}
        </div>
        <div className="reveal" style={{ textAlign: "center", marginTop: 48 }}>
          <a href="https://github.com/ThomasLoridan" target="_blank" rel="noopener noreferrer" className="gh-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.7.2 3 .1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
            </svg>
            {t.projects.github}
            <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>);

}

// ---------- VOICE / TESTIMONIALS ----------
function Voice({ t }) {
  return (
    <section id="voice" className="section">
      <div className="section-head reveal">
        <div className="head-left">
          <div className="overline"><span className="dot">●</span>{t.voice.overline}</div>
          <h2 className="h1">{t.voice.title}</h2>
        </div>
        <div className="head-right">
          <p className="body muted" style={{ maxWidth: 460 }}>{t.voice.sub}</p>
        </div>
      </div>
      <div className="testimonials">
        {t.voice.quotes.map((q, i) =>
        <article key={i} className="quote reveal" style={{ "--reveal-delay": `${i * 80}ms` }}>
            <div className="mark">“</div>
            <p className="text">{q.text}</p>
            <div className="who">
              <span className="name">{q.name}</span>
              <span className="role">{q.role}</span>
            </div>
          </article>
        )}
      </div>
    </section>);

}

// ---------- BEYOND ----------
const BEYOND_MEDIA = [
{ src: "assets/tennis.jpg", cls: "col-6" },
{ src: "assets/asimov.jpg", cls: "col-3" },
{ src: "assets/foundation.jpg", cls: "col-3", layout: "alt" },
{ src: "assets/dune.jpg", cls: "col-6" },
{ src: "assets/aktionnaire.png", cls: "col-3", contain: true, dark: true },
{ src: "assets/diary-ceo.jpg", cls: "col-3" },
{ src: "assets/claude.png", cls: "col-6", contain: true, brand: true }];


function Beyond({ t }) {
  // Map items into the same order as BEYOND_MEDIA. The data has 6 items, media has 7
  // because we want to split sports differently. Let's just use 6 items aligned to first 6 media entries
  const mediaMap = [
  { src: "assets/tennis.jpg", cls: "col-6" }, // Sports
  { src: "assets/asimov.jpg", cls: "col-3" }, // Reading - Asimov
  { src: "assets/dune.jpg", cls: "col-3" }, // Reading - Dune
  { src: "assets/aktionnaire.png", cls: "col-4", contain: true, dark: true }, // Finance
  { src: "assets/diary-ceo.jpg", cls: "col-4" }, // Podcasts
  { src: "assets/claude.png", cls: "col-4", contain: true } // Tech
  ];
  return (
    <section id="beyond" className="section-paper">
      <div className="inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="overline"><span className="dot">●</span>{t.beyond.overline}</div>
            <h2 className="h1">{t.beyond.title}</h2>
          </div>
          <div className="head-right">
            <p className="body muted" style={{ maxWidth: 460 }}>{t.beyond.sub}</p>
          </div>
        </div>
        <div className="beyond-grid">
          {t.beyond.items.map((it, i) => {
            const m = mediaMap[i] || { src: null, cls: "col-4" };
            return (
              <article key={i} className={`beyond-card reveal ${m.cls} ${m.contain ? "contain" : ""} ${m.dark ? "dark" : ""}`} style={{ "--reveal-delay": `${i % 3 * 80}ms` }}>
                <div className="media">
                  {m.src && <img src={window.R(m.src)} alt={it.title} loading="lazy" />}
                </div>
                <div className="body">
                  <span className="kicker">{it.kicker}</span>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              </article>);

          })}
        </div>
      </div>
    </section>);

}

// ---------- CREDENTIALS ----------
const CRED_LOGOS = [
"assets/google.png",
"assets/aws.png",
"assets/amazon-icon.png",
"assets/mckinsey.webp",
"assets/forage.png",
"assets/loreal-logo.png"];


function Credentials({ t }) {
  return (
    <section id="credentials" className="section">
      <div className="section-head reveal">
        <div className="head-left">
          <div className="overline"><span className="dot">●</span>{t.credentials.overline}</div>
          <h2 className="h1">{t.credentials.title}</h2>
        </div>
        <div className="head-right">
          <p className="body muted" style={{ maxWidth: 460 }}>{t.credentials.sub}</p>
        </div>
      </div>
      <div className="creds">
        {t.credentials.items.map((c, i) => {
          const inner =
          <>
              <div className={`logo ${c.dark ? "dark" : ""}`}>
                <img src={window.R(CRED_LOGOS[i])} alt={c.org} loading="lazy" />
              </div>
              <div className="meta">
                <span className="org">{c.org}</span>
                <span className="ttl">{c.title}</span>
                <span className="yr">{c.yr}</span>
              </div>
              <div className="arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </>;

          return c.url ?
          <a key={i} className="cred reveal" href={c.url} target="_blank" rel="noopener noreferrer" style={{ "--reveal-delay": `${i % 3 * 80}ms` }}>
              {inner}
            </a> :

          <div key={i} className="cred no-link reveal" style={{ "--reveal-delay": `${i % 3 * 80}ms` }}>
              {inner}
            </div>;

        })}
      </div>
    </section>);

}

// ---------- FOOTER ----------
function Footer({ t }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="overline reveal" style={{ color: "rgba(255,255,255,0.5)" }}><span className="dot" style={{ color: "#6FA7F0" }}>●</span>{t.nav.contact}</div>
        <h2 className="footer-headline reveal" style={{ marginTop: 16 }}>
          {t.footer.headlineA}{" "}
          <span className="accent">{t.footer.headlineAccent}</span>{" "}
          {t.footer.headlineB}
        </h2>
        <p className="footer-sub reveal">{t.footer.sub}</p>
        <div className="footer-cta reveal">
          <a href="mailto:thomas.loridan@outlook.com" className="btn btn-primary">{t.footer.ctaPrimary}</a>
          <a href="https://www.linkedin.com/in/thomas-loridan/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t.footer.ctaGhost}</a>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span className="footer-mark">Thomas <em style={{ color: "#6FA7F0" }}>Loridan</em></span>
          <div className="links">
            <a href="https://www.linkedin.com/in/thomas-loridan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/ThomasLoridan" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:thomas.loridan@outlook.com">Email</a>
          </div>
          <span>© 2026 · Paris</span>
        </div>
      </div>
    </footer>);

}

// ---------- APP ----------
function App() {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem("tl-lang");
    if (stored === "fr" || stored === "en") return stored;
    return (navigator.language || "en").startsWith("fr") ? "fr" : "en";
  });
  useEffect(() => {localStorage.setItem("tl-lang", lang);document.documentElement.lang = lang;}, [lang]);
  const t = window.I18N[lang];
  useReveal();
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Stack t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Voice t={t} />
      <Beyond t={t} />
      <Credentials t={t} />
      <Footer t={t} />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);