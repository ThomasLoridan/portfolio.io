// SkillBubbles — floating skill orbs with gentle physics
// Each bubble has a velocity and bounces softly off container edges.

const SKILLS = [
  // ---- Technical (with iconic logos) ----
  { id: "python", group: "tech", label: "Python", size: "lg",
    svg: (
      <svg className="logo" viewBox="0 0 128 128" aria-hidden="true">
        <linearGradient id="pyA" x1="12.96" y1="11.13" x2="76.6" y2="71.32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#387eb8"/><stop offset="1" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="pyB" x1="51.42" y1="51.61" x2="119.7" y2="116.3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe052"/><stop offset="1" stopColor="#ffc331"/>
        </linearGradient>
        <path fill="url(#pyA)" d="M63.39,1.43c-32.05,0-30.05,13.9-30.05,13.9l.04,14.4h30.59v4.33H21.27S.76,31.73.76,64.06s17.9,31.18,17.9,31.18h10.69V80.27s-.58-17.9,17.6-17.9h30.36s17.03.27,17.03-16.46v-27.66S97.93,1.43,63.39,1.43Zm-16.87,9.68a5.5,5.5,0,1,1-5.5,5.5A5.5,5.5,0,0,1,46.52,11.11Z"/>
        <path fill="url(#pyB)" d="M64.29,126.65c32.05,0,30.05-13.9,30.05-13.9l-.04-14.4H63.71V94H106.7s20.5,2.32,20.5-30S109.31,32.83,109.31,32.83H98.62V47.81s.58,17.9-17.6,17.9H50.66s-17.03-.27-17.03,16.46v27.66S30.59,126.65,64.29,126.65ZM81.16,116.97a5.5,5.5,0,1,1,5.5-5.5A5.5,5.5,0,0,1,81.16,116.97Z"/>
      </svg>
    )
  },
  { id: "aws", group: "tech", label: "AWS", size: "lg",
    svg: (
      <svg className="logo" viewBox="0 0 304 182" aria-hidden="true">
        <path fill="#252F3E" d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41.1.7 46.3.1 51.8.1c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4l.1 1.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2L146.5 8.6c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l16.3 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-16 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"/>
        <path fill="#F90" d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"/>
        <path fill="#F90" d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"/>
      </svg>
    )
  },
  { id: "gcp", group: "tech", label: "GCP", size: "md",
    svg: (
      <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
        <path fill="#EA4335" d="M20.6 10.4l2.6-2.6.2-1.1A11.9 11.9 0 0 0 4.2 11.8c.3-.2.9-.1.9-.1l5.3-.9s.3-.4.4-.4a6.6 6.6 0 0 1 9.8-.1z"/>
        <path fill="#4285F4" d="M27.4 11.8a11.9 11.9 0 0 0-3.6-5.8l-3.7 3.7a6.6 6.6 0 0 1 2.4 5.2v.7a3.3 3.3 0 0 1 0 6.6h-6.6l-.6.7v3.9l.6.6h6.6a8.6 8.6 0 0 0 4.9-15.6z"/>
        <path fill="#34A853" d="M9.9 27.4h6.6v-5.3H9.9a3.3 3.3 0 0 1-1.4-.3l-.9.3-2.6 2.6-.3.9a8.6 8.6 0 0 0 5.2 1.8z"/>
        <path fill="#FBBC05" d="M9.9 10.2a8.6 8.6 0 0 0-5.2 15.4l3.8-3.8a3.3 3.3 0 0 1 4.4-4.4l3.8-3.8a8.6 8.6 0 0 0-6.8-3.4z"/>
      </svg>
    )
  },
  { id: "sql", group: "tech", label: "SQL", size: "md", text: "SQL" },
  { id: "fastapi", group: "tech", label: "FastAPI", size: "md",
    svg: (
      <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#009688"/>
        <path fill="#fff" d="M17.6 4.9l-8.8 14.8h6.3L13.3 27l8.8-14.8h-6.3z"/>
      </svg>
    )
  },
  { id: "rest", group: "tech", label: "REST API", size: "sm", text: "REST" },
  { id: "etl", group: "tech", label: "ETL Pipelines", size: "md", text: "ETL" },
  { id: "r", group: "tech", label: "R", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/r.png")} alt="R" />
  },
  { id: "powerbi", group: "tech", label: "Power BI", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/powerbi.png")} alt="Power BI" />
  },
  { id: "quicksight", group: "tech", label: "QuickSight", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/quicksight.png")} alt="QuickSight" />
  },
  { id: "excel", group: "tech", label: "Excel", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/excel.png")} alt="Excel" />
  },

  // ---- Product thinking ----
  { id: "prd", group: "product", label: "PRD / FAQ", size: "md", text: "PRD" },
  { id: "roadmap", group: "product", label: "Roadmaps", size: "md", text: "ROADMAP" },
  { id: "okrs", group: "product", label: "OKRs", size: "sm", text: "OKRs" },
  { id: "abtest", group: "product", label: "A/B testing", size: "md", text: "A/B" },
  { id: "research", group: "product", label: "User research", size: "md", text: "RESEARCH" },
  { id: "specs", group: "product", label: "Specs", size: "sm", text: "SPECS" },
  { id: "data", group: "product", label: "Data", size: "sm", text: "DATA" },
  { id: "gtm", group: "product", label: "Go-to-market", size: "md", text: "GTM" },
  { id: "planning", group: "product", label: "Planning", size: "sm", text: "PLAN" },
  { id: "discovery", group: "product", label: "Discovery", size: "sm", text: "DISC." },
  { id: "asana", group: "product", label: "Asana", size: "md",
    svg: (
      <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="9" r="5" fill="#F06A6A"/>
        <circle cx="9" cy="22" r="5" fill="#F06A6A"/>
        <circle cx="23" cy="22" r="5" fill="#F06A6A"/>
      </svg>
    )
  },
  { id: "jira", group: "product", label: "Jira", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/jira.png")} alt="Jira" />
  },
  { id: "confluence", group: "product", label: "Confluence", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/confluence.png")} alt="Confluence" />
  },
  { id: "salesforce", group: "product", label: "Salesforce", size: "lg",
    svg: <img className="logo wide" src={window.R("assets/logos/salesforce.png")} alt="Salesforce" />
  },
  { id: "figma", group: "product", label: "Figma", size: "md",
    svg: (
      <svg className="logo" viewBox="0 0 38 57" aria-hidden="true">
        <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path fill="#0ACF83" d="M0 47.5C0 42.25 4.25 38 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
        <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
        <path fill="#F24E1E" d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path fill="#A259FF" d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    )
  },
  { id: "scrum", group: "product", label: "Agile / Scrum", size: "md", text: "SCRUM" },
  { id: "ppt", group: "product", label: "PowerPoint", size: "md",
    svg: <img className="logo" src={window.R("assets/logos/ppt.png")} alt="PowerPoint" />
  },
];

function SkillBubbles({ filter = "all", interactive = true, centerRepel = 100 }) {
  const containerRef = React.useRef(null);
  const bubbleRefs = React.useRef([]);
  const stateRef = React.useRef([]);
  const rafRef = React.useRef(0);
  const pointerRef = React.useRef({ x: -9999, y: -9999, active: false });

  const visible = React.useMemo(
    () => SKILLS.filter(s => filter === "all" || s.group === filter),
    [filter]
  );

  // Init positions whenever filter or mount changes
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    const cx = W / 2, cy = H / 2;

    stateRef.current = visible.map((s, i) => {
      const sizeMap = { lg: 96, md: 76, sm: 60, xs: 48 };
      const size = sizeMap[s.size] || 76;
      // Place in a ring around center, but jittered
      const angle = (i / visible.length) * Math.PI * 2 + Math.random() * 0.4;
      const ring = Math.min(W, H) * (0.28 + Math.random() * 0.16);
      const x = cx + Math.cos(angle) * ring - size / 2;
      const y = cy + Math.sin(angle) * ring - size / 2;
      const speed = 0.18 + Math.random() * 0.18;
      const dir = Math.random() * Math.PI * 2;
      return {
        x, y, size,
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
      };
    });
  }, [visible]);

  // Animation loop
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastT = performance.now();
    let visibleFlag = true;

    const onVisibility = () => { visibleFlag = !document.hidden; lastT = performance.now(); };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e) => {
      const r = container.getBoundingClientRect();
      pointerRef.current.x = e.clientX - r.left;
      pointerRef.current.y = e.clientY - r.top;
      pointerRef.current.active = true;
    };
    const onLeave = () => { pointerRef.current.active = false; };
    container.addEventListener("pointermove", onPointer);
    container.addEventListener("pointerleave", onLeave);

    const step = (t) => {
      const dt = Math.min(48, t - lastT);
      lastT = t;
      if (!visibleFlag) { rafRef.current = requestAnimationFrame(step); return; }

      const rect = container.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      const cx = W / 2, cy = H / 2;
      const centerR = centerRepel; // forbidden zone around center pill / hero text

      const items = stateRef.current;
      const ptr = pointerRef.current;

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        // pointer repel
        if (ptr.active) {
          const dx = (it.x + it.size / 2) - ptr.x;
          const dy = (it.y + it.size / 2) - ptr.y;
          const d2 = dx * dx + dy * dy;
          const range = 140;
          if (d2 < range * range && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / range) * 0.6;
            it.vx += (dx / d) * f * (dt / 16);
            it.vy += (dy / d) * f * (dt / 16);
          }
        }

        // center repel (don't overlap label)
        const cdx = (it.x + it.size / 2) - cx;
        const cdy = (it.y + it.size / 2) - cy;
        const cd2 = cdx * cdx + cdy * cdy;
        const safe = centerR + it.size / 2;
        if (cd2 < safe * safe && cd2 > 0.01) {
          const d = Math.sqrt(cd2);
          const f = (1 - d / safe) * 0.4;
          it.vx += (cdx / d) * f * (dt / 16);
          it.vy += (cdy / d) * f * (dt / 16);
        }

        // velocity damping & soft drift
        it.vx *= 0.985;
        it.vy *= 0.985;
        // tiny baseline current so they never fully stop
        const drift = 0.004 * (dt / 16);
        it.vx += (Math.random() - 0.5) * drift;
        it.vy += (Math.random() - 0.5) * drift;

        // clamp max speed
        const sp = Math.hypot(it.vx, it.vy);
        const maxSp = 0.9;
        if (sp > maxSp) { it.vx = (it.vx / sp) * maxSp; it.vy = (it.vy / sp) * maxSp; }

        it.x += it.vx * (dt / 16);
        it.y += it.vy * (dt / 16);

        // bounds (soft bounce)
        if (it.x < 8) { it.x = 8; it.vx = Math.abs(it.vx); }
        if (it.x > W - it.size - 8) { it.x = W - it.size - 8; it.vx = -Math.abs(it.vx); }
        if (it.y < 8) { it.y = 8; it.vy = Math.abs(it.vy); }
        if (it.y > H - it.size - 8) { it.y = H - it.size - 8; it.vy = -Math.abs(it.vy); }

        const el = bubbleRefs.current[i];
        if (el) {
          el.style.transform = `translate(${it.x.toFixed(2)}px, ${it.y.toFixed(2)}px)`;
        }
      }

      // bubble vs bubble (soft repel)
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i], b = items[j];
          const dx = (b.x + b.size/2) - (a.x + a.size/2);
          const dy = (b.y + b.size/2) - (a.y + a.size/2);
          const min = a.size/2 + b.size/2 + 4;
          const d2 = dx*dx + dy*dy;
          if (d2 < min*min && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const overlap = (min - d) / 2;
            const nx = dx / d, ny = dy / d;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            // exchange a bit of velocity
            const av = a.vx * nx + a.vy * ny;
            const bv = b.vx * nx + b.vy * ny;
            a.vx += (bv - av) * 0.5 * nx;
            a.vy += (bv - av) * 0.5 * ny;
            b.vx += (av - bv) * 0.5 * nx;
            b.vy += (av - bv) * 0.5 * ny;
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [visible]);

  return (
    <div ref={containerRef} className="bubble-field" style={{ position: "absolute", inset: 0 }}>
      {visible.map((s, i) => (
        <div
          key={s.id}
          ref={el => bubbleRefs.current[i] = el}
          className={`bubble size-${s.size} ${interactive ? "" : "passive"}`}
          title={interactive ? s.label : undefined}
        >
          {s.svg ? s.svg : <span className="label">{s.text || s.label}</span>}
        </div>
      ))}
    </div>
  );
}

window.SkillBubbles = SkillBubbles;
