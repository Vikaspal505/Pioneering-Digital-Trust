import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, Activity, Cpu, Lock, Users, ArrowRight, AlertTriangle,
  Github, Mail, ChevronRight, Waves, Fingerprint, Radio,
  Zap, Database, Terminal, Server, TrendingUp,
  CheckCircle, XCircle, Menu, X, Hash, ChevronDown,
  Wifi, Globe, Eye, BarChart2, AlertCircle, RefreshCw,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  LineChart, Line, ReferenceLine, Legend, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
} from "recharts";
import federatedImg from "@/assets/federated_network_graphic.jpg";
import cryptoImg from "@/assets/crypto_blockchain_graphic.jpg";

export const Route = createFileRoute("/")(  {
  component: CFFApp,
});


/* ─── Warm Skin Palette ─────────────────────────────────────────────── */
const C = {
  bg:         "#0D0A07",
  surface:    "#1C140D",
  surface2:   "#2A1E14",
  surface3:   "#3A2A1C",
  gold:       "#D4943A",
  goldLight:  "#E8B860",
  copper:     "#B5651D",
  amber:      "#E8A030",
  cream:      "#F2E4D0",
  creamDim:   "rgba(242,228,208,0.55)",
  creamFaint: "rgba(242,228,208,0.25)",
  red:        "#CC3700",
  green:      "#7CB84A",
  greenDim:   "#5C8A2A",
  lightPanel: "#F5E2C0",
  border:     "rgba(212,148,58,0.18)",
  borderBright:"rgba(212,148,58,0.4)",
};

/* ─── Types & Constants ─────────────────────────────────────────────── */
type TabId = "home" | "ingest" | "fusion" | "crypto" | "devops";
const TABS: { id: TabId; label: string; num: string; icon: React.ElementType }[] = [
  { id: "home",   label: "Command Center",   num: "01", icon: Shield },
  { id: "ingest", label: "Ingestion Pipe",   num: "02", icon: Database },
  { id: "fusion", label: "Fusion Engine",    num: "03", icon: Zap },
  { id: "crypto", label: "Privacy & Crypto", num: "04", icon: Lock },
  { id: "devops", label: "DevOps & Intel",   num: "05", icon: Server },
];

const THREAT_LABELS: Record<number, string> = {
  1:"MINIMAL", 2:"GUARDED", 3:"ELEVATED", 4:"HIGH", 5:"SEVERE"
};

const TICKER_ITEMS = [
  "⚠ ALERT: Tor exit node 185.220.101.34 — 4× auth-failure burst — ATO_SUSPECT",
  "● INFO: OCSF class_uid=3002 normalized — 184k events/s throughput nominal",
  "⚠ ALERT: Synthetic identity cluster — creditor DE89370400440532013000 — pacs.002",
  "● INFO: Federated round 15/20 — ε=0.981 — within budget — accuracy 78.5%",
  "⚠ ALERT: JA3 fingerprint drift on ssl — severity HIGH — NGFW triggered",
  "● INFO: Checkpoint Chk-000441 committed — 4.1MB delta — RocksDB incremental",
  "⚠ ALERT: Social engineering probe — PERSU-R score 0.79 — urgency cue detected",
  "● INFO: CKKS HE aggregation complete — gradients merged without decryption",
  "⚠ ALERT: PACS008-20261002-000441 — EUR 18,420 — CSE-ARS score 0.83 — HALTED",
  "● INFO: AWS Nitro Enclave training epoch 47 — silo convergence +2.1%",
];

/* ─── Main App ──────────────────────────────────────────────────────── */
function CFFApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [threatLevel, setThreatLevel] = useState(3);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < TABS.length) { setTab(TABS[idx].id); setMobileMenuOpen(false); }
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setThreatLevel(p => Math.max(1, Math.min(5, p + (Math.random() < 0.3 ? (Math.random() < 0.5 ? 1 : -1) : 0))));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false); }, [tab]);

  const threatColor = threatLevel <= 2 ? C.green : threatLevel === 3 ? C.amber : C.red;

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: C.bg, color: C.cream }}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,148,58,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(212,148,58,0.03) 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle,#D4943A,transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.03] blur-3xl"
          style={{ background: "radial-gradient(circle,#B5651D,transparent)" }} />
      </div>

      <Header tab={tab} setTab={setTab} mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen} threatLevel={threatLevel} threatColor={threatColor} />

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 pb-8 px-6 md:hidden"
          style={{ background: "rgba(13,10,7,0.97)", backdropFilter: "blur(20px)" }}>
          <nav className="flex flex-col gap-2 mt-4">
            {TABS.map(t => {
              const Icon = t.icon; const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => { setTab(t.id); setMobileMenuOpen(false); }}
                  className="flex items-center gap-4 px-5 py-4 text-left transition-all"
                  style={{ background: active ? `${C.gold}12` : "transparent", borderLeft: `2px solid ${active ? C.gold : "transparent"}`, color: active ? C.gold : C.creamDim }}>
                  <Icon size={16} />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase">{t.num} · {t.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto text-center font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: C.creamFaint }}>
            Press 1–5 to switch tabs · ESC to close
          </div>
        </div>
      )}

      <ThreatTicker />
      <LiveMetricsBar />

      <main className="relative z-10 pt-36">
        {tab === "home"   && <HomeTab go={setTab} threatLevel={threatLevel} />}
        {tab === "ingest" && <IngestTab />}
        {tab === "fusion" && <FusionTab />}
        {tab === "crypto" && <CryptoTab />}
        {tab === "devops" && <DevOpsTab />}
      </main>

      <Footer />
    </div>
  );
}

/* ─── Header (no logo icon) ─────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <span className="font-mono text-[11px] tracking-widest tabular-nums" style={{ color: C.goldLight }}>
      {time.toISOString().slice(11, 19)} UTC
    </span>
  );
}

function Header({ tab, setTab, mobileMenuOpen, setMobileMenuOpen, threatLevel, threatColor }:{
  tab:TabId; setTab:(t:TabId)=>void; mobileMenuOpen:boolean; setMobileMenuOpen:(v:boolean)=>void; threatLevel:number; threatColor:string;
}) {
  return (
    <header className="fixed inset-x-0 z-50" style={{ top: "28px" }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-14 px-5 rounded-sm" style={{
          background: "rgba(13,10,7,0.9)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${C.border}`,
          boxShadow: `0 0 30px rgba(212,148,58,0.06), inset 0 1px 0 rgba(212,148,58,0.08)`,
        }}>
          {/* Brand text only — no logo icon */}
          <div className="leading-none flex-shrink-0">
            <div className="font-mono text-[13px] tracking-[0.25em] uppercase font-bold" style={{ color: C.gold }}>
              CyberGuard Fusion
            </div>
            <div className="text-[9px] tracking-[0.3em] mt-0.5 uppercase" style={{ color: C.creamFaint }}>
              Elite Precision · MMXXVI
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {TABS.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="relative px-3.5 py-2 text-[10px] tracking-[0.18em] uppercase font-mono transition-all duration-200"
                  style={{ color: active ? C.gold : C.creamDim, background: active ? `${C.gold}10` : "transparent" }}
                  title={`Press ${TABS.indexOf(t)+1}`}>
                  <span className="opacity-40 mr-1.5">{t.num}</span>{t.label}
                  {active && <span className="absolute inset-x-2 bottom-0 h-px" style={{ background: C.gold, boxShadow: `0 0 6px ${C.gold}` }} />}
                </button>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <LiveClock />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ background: `${threatColor}12`, border: `1px solid ${threatColor}40`, color: threatColor }}>
              <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background: threatColor }} />
              DEF {threatLevel} · {THREAT_LABELS[threatLevel]}
            </div>
            <button className="md:hidden p-2 rounded-sm transition-colors" style={{ border: `1px solid ${C.border}`, color: C.gold }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Threat Ticker ─────────────────────────────────────────────────── */
function ThreatTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-7 flex items-center overflow-hidden"
      style={{ background: "rgba(13,10,7,0.97)", borderBottom: `1px solid ${C.border}` }}>
      <div className="flex-shrink-0 px-3 font-mono text-[9px] tracking-[0.3em] uppercase h-full flex items-center gap-2"
        style={{ color: C.gold, borderRight: `1px solid ${C.border}` }}>
        <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background: C.red }} />
        LIVE THREAT FEED
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="font-mono text-[10px] px-8"
              style={{ color: item.startsWith("⚠") ? C.amber : C.creamDim }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Live Metrics Bar ──────────────────────────────────────────────── */
function LiveMetricsBar() {
  const [m, setM] = useState({
    packets: 184320, threats: 7, sessions: 2847, alerts: 23,
    epsilon: 0.981, txVelocity: 3.2, latency: 8.4, accuracy: 79.9,
    rocksdbOps: 12400, checkpointSz: 4.1,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setM(p => ({
        packets:      Math.max(160000, p.packets + Math.floor(Math.random()*800-400)),
        threats:      Math.max(0, p.threats + (Math.random()<0.12 ? (Math.random()<0.5?1:-1) : 0)),
        sessions:     Math.max(2000, p.sessions + Math.floor(Math.random()*30-15)),
        alerts:       Math.max(0, p.alerts + (Math.random()<0.15 ? (Math.random()<0.6?1:-1) : 0)),
        epsilon:      Math.min(1.0, +(p.epsilon + 0.0002).toFixed(4)),
        txVelocity:   Math.max(0.5, +(p.txVelocity + (Math.random()-0.5)*0.3).toFixed(1)),
        latency:      Math.max(5, +(p.latency + (Math.random()-0.5)*0.8).toFixed(1)),
        accuracy:     Math.max(75, Math.min(82, +(p.accuracy + (Math.random()-0.5)*0.1).toFixed(1))),
        rocksdbOps:   Math.max(10000, p.rocksdbOps + Math.floor(Math.random()*600-300)),
        checkpointSz: Math.max(3.8, +(p.checkpointSz + (Math.random()-0.5)*0.05).toFixed(2)),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { label: "Events/sec",      val: m.packets.toLocaleString(), color: C.gold,    icon: Activity },
    { label: "Active Threats",  val: m.threats.toString(),       color: m.threats>10?C.red:m.threats>5?C.amber:C.green, icon: AlertTriangle },
    { label: "Live Sessions",   val: m.sessions.toLocaleString(),color: C.goldLight,icon: Wifi },
    { label: "Alerts / 5min",   val: m.alerts.toString(),        color: m.alerts>30?C.red:C.amber, icon: AlertCircle },
    { label: "DP Epsilon ε",    val: m.epsilon.toFixed(3),       color: m.epsilon>0.95?C.red:C.amber, icon: Lock },
    { label: "Tx Velocity",     val: `${m.txVelocity} tx/s`,     color: C.copper,  icon: TrendingUp },
    { label: "Fusion Latency",  val: `${m.latency}ms`,           color: m.latency>12?C.amber:C.green, icon: Zap },
    { label: "Fusion Accuracy", val: `${m.accuracy}%`,           color: C.green,   icon: BarChart2 },
    { label: "RocksDB ops/s",   val: m.rocksdbOps.toLocaleString(), color: C.creamDim, icon: Database },
    { label: "Chk Size",        val: `${m.checkpointSz}MB`,      color: C.creamDim, icon: Server },
  ];

  return (
    <div className="fixed z-40 inset-x-0 overflow-x-auto" style={{ top: "28px", marginTop: "56px" }}>
      <div className="flex min-w-max" style={{ background: "rgba(26,18,11,0.95)", borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(12px)" }}>
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-2 px-4 py-1.5 border-r" style={{ borderColor: C.border }}>
              <Icon size={10} style={{ color: item.color, flexShrink: 0 }} />
              <span className="font-mono text-[9px] tracking-wider whitespace-nowrap" style={{ color: C.creamFaint }}>{item.label}</span>
              <span className="font-mono text-[11px] font-bold tabular-nums whitespace-nowrap" style={{ color: item.color }}>{item.val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Animated Counter ──────────────────────────────────────────────── */
function AnimatedCounter({ target, prefix="", suffix="", decimals=0 }:{target:number;prefix?:string;suffix?:string;decimals?:number}) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return; done.current = true;
    const dur = 2200; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now-start)/dur,1); const e = 1-Math.pow(1-p,3);
      setVal(e*target); if (p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <span>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ─── Section Header ────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, caption, accent=C.gold }:{eyebrow:string;title:string;caption:string;accent?:string}) {
  return (
    <div className="pt-10 pb-6 mb-10" style={{ borderBottom: `1px solid ${C.border}` }}>
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: accent }}>
        <span className="w-4 h-px" style={{ background: accent }} />{eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-4xl" style={{ fontFamily:"Orbitron,sans-serif", color: C.cream }}>
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: C.creamDim }}>{caption}</p>
    </div>
  );
}

/* ─── Panel wrapper ─────────────────────────────────────────────────── */
function Panel({ children, accent, className="", style={} }:{children:React.ReactNode;accent?:string;className?:string;style?:React.CSSProperties}) {
  return (
    <div className={`rounded-sm ${className}`} style={{ background: C.surface, border: `1px solid ${accent ? `${accent}25` : C.border}`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Architecture Diagram ──────────────────────────────────────────── */
function ArchDiagram() {
  const sources = ["CrowdStrike\nFalcon", "Palo Alto\nNGFW", "ISO 20022\nPayments"];
  const pipe = [
    { label:"Apache\nKafka", sub:"6× m7g.large", color:C.copper },
    { label:"Apache\nFlink", sub:"Parallelism 32", color:C.amber },
    { label:"CSE-ARS\nFusion", sub:"R≥0.70 HALT", color:C.green },
    { label:"Hyperledger\nFabric", sub:"Audit ledger", color:C.gold },
  ];
  return (
    <Panel style={{ padding:"24px" }}>
      <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
        {sources.map((s,i) => (
          <div key={i} className="text-center">
            <div className="px-4 py-2.5 font-mono text-[10px] leading-snug rounded-sm" style={{ background:`${C.gold}0A`, border:`1px solid ${C.gold}25`, color:C.gold, whiteSpace:"pre" }}>{s}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4"><ChevronDown size={14} style={{ color:C.border }} /></div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {pipe.map((p,i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="text-center px-5 py-2.5 font-mono text-[10px] leading-snug rounded-sm min-w-[100px]"
              style={{ background:`${p.color}0A`, border:`1px solid ${p.color}30`, color:p.color, whiteSpace:"pre" }}>
              {p.label}
              <div className="text-[8px] mt-1 opacity-60">{p.sub}</div>
            </div>
            {i<pipe.length-1 && <ChevronRight size={13} style={{ color:C.creamFaint, flexShrink:0 }} />}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-5 flex-wrap">
        {["Differential Privacy","Homomorphic Encryption","Secure MPC"].map(b => (
          <div key={b} className="px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase rounded-sm"
            style={{ background:`${C.copper}0A`, border:`1px solid ${C.copper}25`, color:C.copper }}>{b}</div>
        ))}
      </div>
    </Panel>
  );
}

/* ─── Real-Time Intelligence Panel ─────────────────────────────────── */
function RealTimeIntelPanel() {
  const [history, setHistory] = useState<{t:number; evts:number; threats:number; lat:number}[]>([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const [geoThreats, setGeoThreats] = useState([
    { region:"US-East",    count:14, pct:42 },
    { region:"EMEA-West",  count:9,  pct:27 },
    { region:"APAC",       count:7,  pct:21 },
    { region:"Other",      count:3,  pct:10 },
  ]);

  useEffect(() => {
    let total = 2847391;
    const id = setInterval(() => {
      const newEvts = Math.floor(Math.random()*1200+600);
      total += newEvts;
      setEventsTotal(total);
      setHistory(h => {
        const next = [...h, { t: Date.now(), evts: newEvts, threats: Math.floor(Math.random()*8), lat: +(7+Math.random()*5).toFixed(1) }];
        return next.slice(-20);
      });
      setGeoThreats(prev => prev.map(g => ({ ...g, count: Math.max(0, g.count + (Math.random()<0.3?Math.floor(Math.random()*3-1):0)) })));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const sparkData = history.map((h,i) => ({ i, evts: h.evts, threats: h.threats, lat: h.lat }));

  return (
    <div className="mt-16 space-y-5">
      <div className="font-mono text-[10px] tracking-[0.4em] uppercase flex items-center gap-2" style={{ color:C.gold }}>
        <span className="w-4 h-px" style={{ background:C.gold }} />
        Real-Time Intelligence Feed
        <span className="w-2 h-2 rounded-full status-blink" style={{ background:C.green }} />
        <span style={{ color:C.green }}>LIVE</span>
      </div>

      {/* Live charts row */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Event rate sparkline */}
        <Panel style={{ padding:"16px" }}>
          <div className="font-mono text-[9px] tracking-wider mb-1" style={{ color:C.creamFaint }}>EVENT INGESTION RATE</div>
          <div className="font-mono text-2xl font-bold tabular-nums" style={{ color:C.gold }}>{history[history.length-1]?.evts.toLocaleString() ?? "—"}<span className="text-xs ml-1" style={{ color:C.creamFaint }}>/1.2s</span></div>
          <div className="mt-1 font-mono text-[9px]" style={{ color:C.creamFaint }}>Total processed: <span style={{ color:C.cream }}>{eventsTotal.toLocaleString()}</span></div>
          {sparkData.length>2 && (
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="evt-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.gold} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="evts" stroke={C.gold} strokeWidth={1.5} fill="url(#evt-grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        {/* Live threat count */}
        <Panel style={{ padding:"16px" }}>
          <div className="font-mono text-[9px] tracking-wider mb-1" style={{ color:C.creamFaint }}>ACTIVE THREAT DETECTIONS</div>
          <div className="font-mono text-2xl font-bold tabular-nums" style={{ color: (history[history.length-1]?.threats??0)>5?C.red:C.amber }}>{history[history.length-1]?.threats ?? "—"}<span className="text-xs ml-1" style={{ color:C.creamFaint }}>threats</span></div>
          {sparkData.length>2 && (
            <div className="h-20 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="thr-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.red} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={C.red} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="threats" stroke={C.red} strokeWidth={1.5} fill="url(#thr-grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          {/* Geo distribution */}
          <div className="mt-2 space-y-1.5">
            {geoThreats.map(g => (
              <div key={g.region} className="flex items-center gap-2">
                <span className="font-mono text-[9px] w-20 truncate" style={{ color:C.creamFaint }}>{g.region}</span>
                <div className="flex-1 h-1 rounded-full" style={{ background:`${C.border}` }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:`${g.pct}%`, background:C.amber }} />
                </div>
                <span className="font-mono text-[9px] tabular-nums" style={{ color:C.amber }}>{g.count}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Fusion latency */}
        <Panel style={{ padding:"16px" }}>
          <div className="font-mono text-[9px] tracking-wider mb-1" style={{ color:C.creamFaint }}>FUSION ENGINE LATENCY</div>
          <div className="font-mono text-2xl font-bold tabular-nums" style={{ color: (history[history.length-1]?.lat??8)>12?C.red:C.green }}>
            {history[history.length-1]?.lat ?? "—"}
            <span className="text-xs ml-1" style={{ color:C.creamFaint }}>ms</span>
          </div>
          <div className="mt-1 font-mono text-[9px]" style={{ color:C.creamFaint }}>SLA target: <span style={{ color:C.green }}>&lt;10ms</span></div>
          {sparkData.length>2 && (
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="lat-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.green} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={C.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="lat" stroke={C.green} strokeWidth={1.5} fill="url(#lat-grad)" dot={false} />
                  <ReferenceLine y={10} stroke={`${C.red}60`} strokeDasharray="3 3" strokeWidth={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>
      </div>

      {/* Extended live parameter grid — warm light panels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label:"Kafka Consumer Lag", val:"0 msgs", sub:"All 6 partitions clear", color:C.green, live:true },
          { label:"RocksDB State Size", val:"4.1 GB", sub:"Incremental delta ready", color:C.gold, live:false },
          { label:"Flink Backpressure", val:"0.02%", sub:"Nominal — P-07 clear", color:C.green, live:true },
          { label:"Federated Round", val:"15 / 20", sub:"Optimal stop criteria", color:C.amber, live:true },
          { label:"HE Encryption", val:"ACTIVE", sub:"CKKS poly=16384", color:C.copper, live:true },
          { label:"Gradient Hashes", val:"15,426", sub:"Fabric blocks committed", color:C.goldLight, live:false },
          { label:"MPC Silos Online", val:"3 / 3", sub:"AWS · Azure · GCP", color:C.green, live:true },
          { label:"DP Budget Left", val:`${(100*(1-0.981)).toFixed(1)}%`, sub:"ε consumed: 0.981", color:C.amber, live:true },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-sm" style={{ background:C.surface2, border:`1px solid ${item.color}18` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color:C.creamFaint }}>{item.label}</span>
              {item.live && <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background:item.color }} />}
            </div>
            <div className="font-mono text-xl font-bold" style={{ color:item.color, fontFamily:"Orbitron,sans-serif" }}>{item.val}</div>
            <div className="font-mono text-[9px] mt-1" style={{ color:C.creamFaint }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Home Tab ──────────────────────────────────────────────────────── */
function HomeTab({ go, threatLevel }:{ go:(t:TabId)=>void; threatLevel:number }) {
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-20">
        {/* Hero bg image */}
        <div className="absolute inset-0 opacity-8 pointer-events-none" style={{
          backgroundImage:`url(${federatedImg})`, backgroundSize:"cover", backgroundPosition:"center right",
          maskImage:"linear-gradient(to left, black, transparent 60%)",
          WebkitMaskImage:"linear-gradient(to left, black, transparent 60%)",
          filter:"sepia(0.8) saturate(0.6)", opacity:0.07,
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color:C.green }}>
            <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background:C.green }} />
            Pre-Transaction Defense · All Systems Operational
          </div>

          <h1 className="text-[40px] md:text-[68px] lg:text-[80px] leading-[1.0] font-black tracking-tight max-w-5xl"
            style={{ fontFamily:"Orbitron,sans-serif" }}>
            <span style={{ color:C.gold }}>CyberGuard</span>
            <br />
            <span style={{ color:C.cream }}>Fusion</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed" style={{ color:C.creamDim }}>
            An adaptive, cryptographically secure framework for{" "}
            <span className="font-semibold" style={{ color:C.gold }}>pre-transaction threat containment</span>{" "}
            using Private Federated Learning. Real-time SOC + Fraud fusion in{" "}
            <span className="font-semibold" style={{ color:C.green }}>&lt;10ms</span>.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button id="btn-launch-monitor" onClick={() => go("ingest")}
              className="group inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] tracking-[0.25em] uppercase transition-all rounded-sm"
              style={{ background:`${C.gold}15`, border:`1px solid ${C.gold}`, color:C.gold }}
              onMouseEnter={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.color=C.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${C.gold}15`; e.currentTarget.style.color=C.gold; }}>
              <Terminal size={14} />Launch Ingestion Monitor
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button id="btn-fusion-engine" onClick={() => go("fusion")}
              className="inline-flex items-center gap-3 px-7 py-4 font-mono text-[11px] tracking-[0.25em] uppercase transition-colors rounded-sm"
              style={{ border:`1px solid ${C.border}`, color:C.creamDim }}
              onMouseEnter={e => e.currentTarget.style.color=C.cream}
              onMouseLeave={e => e.currentTarget.style.color=C.creamDim}>
              View Fusion Engine <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-20 grid md:grid-cols-3 gap-px" style={{ background:C.border }}>
          {[
            { key:13, suf:"B+", pre:"$", dec:0, label:"Annual ATO Fraud Losses", accent:C.red, icon:AlertTriangle },
            { key:10, suf:"ms", pre:"<", dec:0, label:"Core Classification Latency", accent:C.gold, icon:Zap },
            { key:79.9, suf:"%", pre:"",dec:1, label:"Late Fusion Accuracy (CSE-ARS)", accent:C.green, icon:TrendingUp },
          ].map((m,i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="p-8 relative overflow-hidden group" style={{ background:C.surface }}>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background:`radial-gradient(circle at 30% 30%,${m.accent}0A,transparent 60%)` }} />
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={13} style={{ color:m.accent }} />
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color:C.creamFaint }}>Metric · 0{i+1}</span>
                </div>
                <div className="font-black text-5xl md:text-6xl leading-none tabular-nums" style={{ fontFamily:"Orbitron,sans-serif", color:m.accent }}>
                  <AnimatedCounter target={m.key} prefix={m.pre} suffix={m.suf} decimals={m.dec} />
                </div>
                <div className="mt-4 text-sm leading-relaxed" style={{ color:C.creamDim }}>{m.label}</div>
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:`linear-gradient(to right,transparent,${m.accent}40,transparent)` }} />
              </div>
            );
          })}
        </div>

        {/* Problem Space */}
        <div className="mt-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color:C.gold }}>§ 01 · Problem Space</div>
            <h2 className="text-3xl font-bold leading-tight" style={{ fontFamily:"Orbitron,sans-serif", color:C.cream }}>The Convergence Threat.</h2>
          </div>
          <div className="md:col-span-8 space-y-5 text-[14px] leading-relaxed pl-8" style={{ color:C.creamDim, borderLeft:`1px solid ${C.border}` }}>
            <p>Traditional separation between <span className="font-semibold" style={{ color:C.gold }}>Security Operations Centers (SOC)</span> and <span className="font-semibold" style={{ color:C.copper }}>Fraud Detection units</span> creates exploitable blind spots.</p>
            <p>Credential compromises initiate <span className="font-bold text-lg" style={{ color:C.red }}>22%</span> of all breaches, and <span className="font-bold text-lg" style={{ color:C.red }}>88%</span> of application attacks involve stolen credentials.</p>
            <p>Modern threat actors deploy blended campaigns — RAT overlays, synthetic identity clusters — where <span className="font-semibold" style={{ color:C.amber }}>the device appears trusted but the transaction is malicious</span>.</p>
          </div>
        </div>

        {/* Architecture */}
        <div className="mt-20">
          <div className="font-mono text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color:C.gold }}>§ 02 · Architecture Pipeline</div>
          <ArchDiagram />
        </div>

        {/* Real-Time Intelligence Feed */}
        <RealTimeIntelPanel />

        {/* Secondary stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val:"184k", label:"Events/sec", icon:Activity, color:C.gold },
            { val:"ε≤1.0", label:"DP Guarantee", icon:Lock, color:C.copper },
            { val:"6×", label:"Kafka Brokers", icon:Database, color:C.green },
            { val:"85%", label:"State Savings", icon:Cpu, color:C.amber },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-5 flex flex-col gap-2 rounded-sm hover:scale-[1.02] transition-transform"
                style={{ background:C.surface2, border:`1px solid ${s.color}15` }}>
                <Icon size={14} style={{ color:s.color }} />
                <div className="font-mono text-2xl font-bold" style={{ color:s.color, fontFamily:"Orbitron,sans-serif" }}>{s.val}</div>
                <div className="text-[11px] uppercase tracking-wide" style={{ color:C.creamFaint }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Ingest Tab ────────────────────────────────────────────────────── */
const SCHEMAS: Record<string,{raw:string;ocsf:string}> = {
  "CrowdStrike Falcon": {
    raw:`{\n  "event_simpleName": "UserLogonFailed2",\n  "aid": "a34fdea82b1d4f83",\n  "UserSid": "S-1-5-21-3623811015-3361044348-30300820-1013",\n  "UserName": "j.doe",\n  "RemoteAddressIP4": "185.220.101.34",\n  "ContextTimeStamp": "1727823041.221",\n  "LogonType": "Interactive",\n  "AuthenticationPackage": "Kerberos"\n}`,
    ocsf:`{\n  "class_uid": 3002,          // Authentication\n  "category_uid": 3,           // Identity & Access\n  "activity_id": 2,            // Logon\n  "status_id": 2,              // Failure\n  "time": 1727823041221,\n  "src_endpoint": { "ip": "185.220.101.34" },\n  "actor": { "user": { "uuid": "S-1-5-21-...1013", "name": "j.doe" } },\n  "auth_protocol": "Kerberos",\n  "metadata": { "product": { "vendor_name": "CrowdStrike" } }\n}`,
  },
  "Palo Alto NGFW": {
    raw:`<14>Oct 02 14:31:02 fw-edge-04 1,2026/10/02,\n  0114D2Q,THREAT,vulnerability,2049,src=10.4.22.18,\n  source-user=CORP\\a.rivera,dst=52.94.236.248,\n  application=ssl,threat=Suspicious TLS JA3,severity=high`,
    ocsf:`{\n  "class_uid": 4001,          // Network Activity\n  "severity_id": 4,            // High\n  "src_endpoint": { "ip": "10.4.22.18" },\n  "dst_endpoint": { "ip": "52.94.236.248" },\n  "actor": { "user": { "uuid": "CORP\\\\a.rivera" } },\n  "app_name": "ssl",\n  "malware": [{ "name": "Suspicious TLS JA3 Fingerprint" }]\n}`,
  },
  "ISO 20022 Payment": {
    raw:`<Document xmlns="urn:iso:std:iso:20022:pacs.008.001.10">\n  <GrpHdr>\n    <MsgId>PACS008-20261002-000441</MsgId>\n    <CreDtTm>2026-10-02T14:31:02.554Z</CreDtTm>\n  </GrpHdr>\n  <CdtTrfTxInf>\n    <IntrBkSttlmAmt Ccy="EUR">18420.00</IntrBkSttlmAmt>\n    <Dbtr><Nm>Aurora Textiles S.p.A.</Nm></Dbtr>\n    <Cdtr><Nm>Nova Freight LLC</Nm></Cdtr>\n  </CdtTrfTxInf>\n</Document>`,
    ocsf:`{\n  "class_uid": 6003,          // Financial Activity\n  "time": 1727879462554,\n  "message_uid": "PACS008-20261002-000441",\n  "amount": { "value": 18420.00, "currency": "EUR" },\n  "debtor":   { "name": "Aurora Textiles S.p.A.", "account": "IT60X..." },\n  "creditor": { "name": "Nova Freight LLC",       "account": "DE89..." }\n}`,
  },
};

const FLINK_LOGS = [
  { level:"INFO",  msg:"[Flink-Slot-1] ISO 20022 pacs.008 ingested — rolling tx velocity: 3 tx/sec in RocksDB" },
  { level:"INFO",  msg:"[Flink-Slot-2] OCSF class_uid=3002 normalized. Watermark +240ms." },
  { level:"WARN",  msg:"[Flink-Slot-4] Session S-1-5-21-...1013 — 4× logon-failure burst → ATO_SUSPECT" },
  { level:"INFO",  msg:"[Flink-Slot-3] CoProcessFunction joined SOC.auth ↔ PAY.pacs008 → vector[128]" },
  { level:"INFO",  msg:"[Checkpoint] Chk-000441 committed s3://cff-flink-chk in 812ms (4.1MB delta)" },
  { level:"WARN",  msg:"[Flink-Slot-2] JA3 fingerprint drift 185.220.101.34 (Tor exit). alpha+=0.12" },
  { level:"INFO",  msg:"[Kafka-Sink] pacs.002 NACK for PACS008-20261002-000441 (8ms latency)" },
  { level:"ERROR", msg:"[Flink-Slot-3] Backpressure partition P-07 — reducing upstream rate" },
  { level:"INFO",  msg:"[Kafka] Partition lag: 0 across all 6 brokers — 184k/s nominal" },
];
type LogLevel = "INFO"|"WARN"|"ERROR";
const LOG_COLORS: Record<LogLevel,string> = { INFO:C.goldLight, WARN:C.amber, ERROR:C.red };

function FlinkMonitor() {
  const [lines, setLines] = useState(FLINK_LOGS.slice(0,6));
  const [filter, setFilter] = useState<LogLevel|"ALL">("ALL");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = setInterval(() => {
      setLines(p => [...p, FLINK_LOGS[Math.floor(Math.random()*FLINK_LOGS.length)]].slice(-60));
    }, 1200);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if(ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [lines]);
  const filtered = filter==="ALL" ? lines : lines.filter(l=>l.level===filter);
  return (
    <Panel>
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom:`1px solid ${C.border}`, background:C.surface2 }}>
        <div className="flex items-center gap-3">
          <Waves size={13} style={{ color:C.gold }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:C.creamFaint }}>Flink State Monitor</span>
          <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background:C.green }} />
          <span className="font-mono text-[9px]" style={{ color:C.green }}>LIVE</span>
        </div>
        <div className="flex items-center gap-1">
          {(["ALL","INFO","WARN","ERROR"] as const).map(lvl => (
            <button key={lvl} onClick={()=>setFilter(lvl)}
              className="px-2.5 py-1 font-mono text-[9px] tracking-wider rounded-sm transition-all"
              style={{
                background: filter===lvl ? (lvl==="ALL"?`${C.gold}20`:`${LOG_COLORS[lvl as LogLevel]}20`) : "transparent",
                color: filter===lvl ? (lvl==="ALL"?C.gold:LOG_COLORS[lvl as LogLevel]) : C.creamFaint,
                border: `1px solid ${filter===lvl ? (lvl==="ALL"?`${C.gold}40`:`${LOG_COLORS[lvl as LogLevel]}40`) : "transparent"}`,
              }}>{lvl}</button>
          ))}
        </div>
      </div>
      <div ref={ref} className="h-56 overflow-auto p-4 font-mono text-[11px] leading-relaxed" style={{ background:C.bg }}>
        {filtered.map((l,i) => {
          const col = LOG_COLORS[l.level as LogLevel] ?? C.cream;
          return (
            <div key={i} className="flex gap-3 py-0.5 hover:bg-white/5 px-1 rounded">
              <span className="tabular-nums shrink-0" style={{ color:C.creamFaint }}>{new Date().toISOString().slice(11,23)}</span>
              <span className="font-bold shrink-0 w-12 text-center rounded-sm px-1 text-[9px] leading-5" style={{ background:`${col}18`, color:col }}>{l.level}</span>
              <span style={{ color: l.level==="WARN"?C.amber:l.level==="ERROR"?C.red:C.creamDim }}>{l.msg}</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function IngestTab() {
  const [source, setSource] = useState<keyof typeof SCHEMAS>("CrowdStrike Falcon");
  const [packetCount, setPacketCount] = useState(2847391);
  useEffect(() => {
    const id = setInterval(() => setPacketCount(p=>p+Math.floor(Math.random()*847+100)), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <SectionHeader eyebrow="§ 02 · Real-Time Ingestion Pipe" title="Streaming Telemetry Parser"
        caption="Disparate raw streams normalized into OCSF unified schema — line-rate, stateful, cryptographically ordered." />

      {/* Source health */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { name:"CrowdStrike Falcon", evts:"47.2k/s", color:C.green },
          { name:"Palo Alto NGFW",     evts:"31.8k/s", color:C.green },
          { name:"ISO 20022 MSK",      evts:"105.0k/s", color:C.green },
        ].map(s => (
          <Panel key={s.name} style={{ padding:"16px" }} className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color:C.creamFaint }}>{s.name}</div>
              <div className="font-mono text-sm mt-1 font-bold" style={{ color:s.color }}>{s.evts}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full status-blink" style={{ background:s.color }} />
              <span className="font-mono text-[9px] tracking-wider" style={{ color:s.color }}>ONLINE</span>
            </div>
          </Panel>
        ))}
      </div>

      {/* Packet counter */}
      <Panel className="mb-5 px-6 py-4 flex items-center justify-between" style={{ background:`${C.gold}06`, border:`1px solid ${C.gold}20` }}>
        <div className="flex items-center gap-3">
          <Activity size={14} style={{ color:C.gold }} className="status-blink" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color:C.creamFaint }}>Total Events Processed</span>
        </div>
        <span className="font-mono text-xl font-bold tabular-nums" style={{ color:C.gold }}>{packetCount.toLocaleString()}</span>
      </Panel>

      {/* Parser panels — light parchment right panel */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Panel style={{ overflow:"hidden" }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom:`1px solid ${C.border}`, background:C.surface2 }}>
            <div className="flex items-center gap-2">
              <Radio size={11} style={{ color:C.amber }} className="status-blink" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:C.creamFaint }}>Incoming Raw Source</span>
            </div>
            <select value={source} onChange={e=>setSource(e.target.value as keyof typeof SCHEMAS)}
              className="bg-transparent font-mono text-[10px] tracking-wider border-none outline-none cursor-pointer"
              style={{ color:C.gold }}>
              {Object.keys(SCHEMAS).map(s=><option key={s} value={s} style={{ background:C.surface }}>{s}</option>)}
            </select>
          </div>
          <pre className="p-5 text-[11px] leading-relaxed font-mono overflow-auto" style={{ maxHeight:"400px", color:C.creamDim, background:C.bg }}>
            {SCHEMAS[source].raw}
          </pre>
        </Panel>

        {/* Light parchment output panel for contrast */}
        <div className="rounded-sm overflow-hidden" style={{ background:"#F5E2C0", border:`1px solid ${C.copper}30` }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom:`1px solid ${C.copper}20`, background:"#EDD5A8" }}>
            <div className="flex items-center gap-2">
              <CheckCircle size={11} style={{ color:C.greenDim }} />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:C.surface3 }}>OCSF Normalized Output</span>
            </div>
            <span className="font-mono text-[9px]" style={{ color:C.greenDim }}>v1.2.0 · normalized</span>
          </div>
          <pre className="p-5 text-[11px] leading-relaxed font-mono overflow-auto" style={{ maxHeight:"400px", color:"#3A2A1C", background:"#F5E2C0" }}>
            {SCHEMAS[source].ocsf}
          </pre>
        </div>
      </div>

      {/* Mapping table */}
      <Panel className="mb-6 overflow-hidden">
        <div className="px-6 py-3 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ borderBottom:`1px solid ${C.border}`, color:C.creamFaint }}>
          Field Mapping Dictionary
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background:C.surface2, borderBottom:`1px solid ${C.border}` }}>
              {["Domain","Incoming Identifier(s)","OCSF Field"].map(h=>(
                <th key={h} className="text-left p-4 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color:C.creamFaint }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {[
              ["Endpoint IP","ip · RemoteAddressIP4 · src","src_endpoint.ip"],
              ["Identity","UserSid · source-user","user.uuid · actor.id"],
              ["Payment Msg ID","MsgId","message_uid"],
              ["Payment Parties","Dbtr · Cdtr","debtor.name · creditor.name"],
              ["Timestamp","CreDtTm · ContextTimeStamp","time (epoch ms)"],
            ].map((row,i)=>(
              <tr key={i} className="hover:bg-white/5 transition-colors" style={{ borderTop:`1px solid ${C.border}` }}>
                <td className="p-4" style={{ color:C.creamFaint }}>{row[0]}</td>
                <td className="p-4" style={{ color:C.amber }}>{row[1]}</td>
                <td className="p-4" style={{ color:C.gold }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <FlinkMonitor />
    </section>
  );
}

/* ─── Fusion Tab ────────────────────────────────────────────────────── */
const RECOGNIZERS = [
  { id:"CRINL-R", w:0.24, desc:"Critical Info Leakage · bi-LSTM NER" },
  { id:"PERST-R", w:0.16, desc:"Personality · BERT Big-5 profiling" },
  { id:"DIACT-R", w:0.22, desc:"Dialogue-Act · Schema-guided BERT" },
  { id:"PERSU-R", w:0.20, desc:"Persuasion · CNN Cialdini cues" },
  { id:"PERSI-R", w:0.18, desc:"Persistence · BERT Paraphrase" },
];
const SCENARIOS: Record<string,number[]> = {
  "Baseline":                              [0.10,0.12,0.08,0.10,0.05],
  "Scenario A: Social Engineering":        [0.72,0.81,0.88,0.79,0.66],
  "Scenario B: RAT Account Takeover":      [0.65,0.42,0.55,0.48,0.91],
};

function RiskGauge({ value, color }:{ value:number; color:string }) {
  const v = Math.max(0,Math.min(1,value));
  const sz=200, sw=16, r=(sz-sw)/2, circ=2*Math.PI*r;
  return (
    <div className="relative" style={{ width:sz, height:sz }}>
      <svg width={sz} height={sz} className="-rotate-90">
        <circle cx={sz/2} cy={sz/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={sw} fill="none" />
        <circle cx={sz/2} cy={sz/2} r={r} stroke={color} strokeWidth={sw} fill="none"
          strokeDasharray={circ} strokeDashoffset={circ*(1-v)} strokeLinecap="butt"
          style={{ transition:"stroke-dashoffset 600ms cubic-bezier(.4,0,.2,1),stroke 400ms ease", filter:`drop-shadow(0 0 8px ${color}80)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-bold text-5xl tabular-nums leading-none" style={{ fontFamily:"Orbitron,sans-serif", color }}>{v.toFixed(2)}</div>
        <div className="font-mono text-[10px] tracking-[0.3em] mt-2" style={{ color }}>{v>=0.7?"HALT":v>0.4?"ELEVATED":"NOMINAL"}</div>
      </div>
    </div>
  );
}

function FusionTab() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>("Baseline");
  const [vals, setVals] = useState<number[]>(SCENARIOS["Baseline"]);
  const [history, setHistory] = useState<number[]>([]);
  const [auditLog, setAuditLog] = useState<{time:string;score:number;decision:string}[]>([]);
  useEffect(()=>setVals(SCENARIOS[scenario]),[scenario]);
  const score = useMemo(()=>vals.reduce((s,v,i)=>s+v*RECOGNIZERS[i].w,0),[vals]);
  const halt = score>=0.7;
  const scoreColor = score<0.4?C.green:score<0.7?C.amber:C.red;
  useEffect(()=>setHistory(h=>[...h.slice(-12),score]),[score]);
  const logDecision = useCallback(()=>{
    setAuditLog(p=>[{ time:new Date().toISOString().slice(11,19), score:parseFloat(score.toFixed(4)), decision:halt?"HALT — pacs.002 Injected":"CLEAR — Downstream Settled" },...p.slice(0,7)]);
  },[halt,score]);

  const benchmarks = [
    {name:"PERST-R",f1:0.56},{name:"CRINL-R",f1:0.60},{name:"PERSI-R",f1:0.63},
    {name:"PERSU-R",f1:0.65},{name:"Majority Vote",f1:0.70},{name:"CSE-ARS (Ours)",f1:0.799},
  ];
  const radarData = RECOGNIZERS.map((r,i)=>({ subject:r.id, value:parseFloat(vals[i].toFixed(2)) }));
  const sparkData = history.map((v,i)=>({i,v}));

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <SectionHeader eyebrow="§ 03 · Multi-Modal Late Fusion" title="Real-Time Fraud-Scoring Engine"
        caption="R_final = Σ wₘ·fₘ(Xₘ) — Simulated Annealing. Threshold ≥ 0.70 → ISO 20022 pacs.002 HALT." accent={C.amber} />
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        {/* Sliders */}
        <Panel className="lg:col-span-3 p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:C.creamFaint }}>Attack Preset</span>
            <Fingerprint size={14} style={{ color:C.gold }} />
          </div>
          <select value={scenario} onChange={e=>setScenario(e.target.value as keyof typeof SCENARIOS)}
            className="w-full bg-transparent font-mono text-sm px-4 py-3 mb-6 focus:outline-none rounded-sm"
            style={{ border:`1px solid ${C.border}`, color:C.gold, background:C.surface2 }}>
            {Object.keys(SCENARIOS).map(s=><option key={s} value={s} style={{ background:C.surface }}>{s}</option>)}
          </select>
          <div className="space-y-5">
            {RECOGNIZERS.map((r,i)=>{
              const bCol=vals[i]<0.4?C.green:vals[i]<0.7?C.amber:C.red;
              return (
                <div key={r.id}>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] font-bold" style={{ color:C.gold }}>{r.id}</span>
                      <span className="text-[10px] tracking-wider uppercase" style={{ color:C.creamFaint }}>w={r.w.toFixed(2)}</span>
                    </div>
                    <span className="font-mono text-sm font-bold tabular-nums" style={{ color:bCol }}>{vals[i].toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] mb-2" style={{ color:C.creamFaint }}>{r.desc}</p>
                  <input type="range" min={0} max={1} step={0.01} value={vals[i]}
                    id={`slider-${r.id.toLowerCase()}`}
                    onChange={e=>{ const n=[...vals]; n[i]=parseFloat(e.target.value); setVals(n); }}
                    className="w-full" />
                </div>
              );
            })}
          </div>
        </Panel>
        {/* Gauge + sparkline */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Panel className="p-6 flex flex-col items-center" style={{ border:`1px solid ${scoreColor}30` }}>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color:C.creamFaint }}>Unified Risk Score</span>
            <RiskGauge value={score} color={scoreColor} />
            <div className="w-full grid grid-cols-3 gap-px mt-4" style={{ background:C.border }}>
              {[["Threshold","0.70"],["Latency","8ms"],["Round","15/20"]].map(([k,v])=>(
                <div key={k} className="p-3 text-center" style={{ background:C.surface }}>
                  <div className="font-mono text-[8px] tracking-wider uppercase" style={{ color:C.creamFaint }}>{k}</div>
                  <div className="font-mono text-sm mt-1" style={{ color:C.gold }}>{v}</div>
                </div>
              ))}
            </div>
          </Panel>
          {sparkData.length>1&&(
            <Panel className="p-4">
              <div className="font-mono text-[9px] tracking-wider uppercase mb-2" style={{ color:C.creamFaint }}>Score History</div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="spark-g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={scoreColor} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={scoreColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={scoreColor} strokeWidth={1.5} fill="url(#spark-g)" dot={false} />
                  <ReferenceLine y={0.7} stroke={`${C.red}50`} strokeDasharray="3 3" strokeWidth={1} />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>
          )}
        </div>
      </div>

      {/* State banner */}
      <div className="mb-8 p-5 rounded-sm flex items-start gap-4 transition-all duration-500"
        style={{ background:halt?`${C.red}06`:`${C.green}04`, border:`1px solid ${halt?`${C.red}35`:`${C.green}20`}` }}>
        {halt?<XCircle size={20} style={{ color:C.red }} className="mt-0.5 shrink-0" />
             :<CheckCircle size={20} style={{ color:C.green }} className="mt-0.5 shrink-0" />}
        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color:halt?C.red:C.green }}>Pipeline State</div>
          <div className="font-mono text-[12px] leading-relaxed" style={{ color:halt?C.red:C.green }}>
            {halt?"🚨 PRE-TRANSACTION HALT · ISO 20022 pacs.002 REJECTION INJECTED INTO KAFKA"
                 :`✓ NOMINAL · R=${score.toFixed(3)} below 0.70 threshold. Transaction cleared.`}
          </div>
        </div>
        <button id="btn-log-decision" onClick={logDecision}
          className="ml-auto shrink-0 px-4 py-2 font-mono text-[9px] tracking-wider uppercase rounded-sm transition-all"
          style={{ border:`1px solid ${halt?`${C.red}40`:`${C.green}30`}`, color:halt?C.red:C.green, background:halt?`${C.red}08`:`${C.green}06` }}>
          Log Decision
        </button>
      </div>

      {/* Audit log */}
      {auditLog.length>0&&(
        <Panel className="mb-8 overflow-hidden">
          <div className="px-5 py-3 font-mono text-[10px] tracking-wider uppercase" style={{ borderBottom:`1px solid ${C.border}`, color:C.creamFaint }}>Decision Audit Log</div>
          <table className="w-full font-mono text-[11px]">
            <thead><tr style={{ borderBottom:`1px solid ${C.border}` }}>
              {["Timestamp","Score","Decision"].map(h=><th key={h} className="text-left px-4 py-2 text-[9px] tracking-wider uppercase" style={{ color:C.creamFaint }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {auditLog.map((e,i)=>(
                <tr key={i} className="hover:bg-white/5 transition-colors" style={{ borderTop:`1px solid ${C.border}` }}>
                  <td className="px-4 py-2" style={{ color:C.creamFaint }}>{e.time}</td>
                  <td className="px-4 py-2" style={{ color:e.score>=0.7?C.red:C.green }}>{e.score.toFixed(4)}</td>
                  <td className="px-4 py-2" style={{ color:e.decision.startsWith("HALT")?C.red:C.green }}>{e.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {/* Bar + Radar */}
      <div className="grid md:grid-cols-2 gap-5">
        <Panel className="p-5">
          <div className="font-mono text-[10px] tracking-wider uppercase mb-1" style={{ color:C.creamFaint }}>F1 Benchmark</div>
          <p className="text-xs mb-4" style={{ color:C.creamDim }}>CSE-ARS delivers <span className="font-bold" style={{ color:C.green }}>+8.7% lift</span></p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarks} layout="vertical" margin={{ left:10,right:40,top:5,bottom:5 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={`${C.border}`} horizontal={false} />
                <XAxis type="number" domain={[0,1]} tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} stroke={C.border} />
                <YAxis type="category" dataKey="name" tick={{ fontSize:10,fill:C.cream,fontFamily:"Space Mono" }} stroke={C.border} width={110} />
                <Tooltip contentStyle={{ background:C.surface,border:`1px solid ${C.border}`,fontSize:11,fontFamily:"Space Mono",color:C.cream }} formatter={(v:number)=>[v.toFixed(3),"F1"]} />
                <Bar dataKey="f1" fill={C.gold} radius={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="font-mono text-[10px] tracking-wider uppercase mb-1" style={{ color:C.creamFaint }}>Recognizer Radar</div>
          <p className="text-xs mb-4" style={{ color:C.creamDim }}>Live activation across all 5 recognizers</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top:5,right:20,bottom:5,left:20 }}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} />
                <PolarRadiusAxis domain={[0,1]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke={scoreColor} fill={scoreColor} fillOpacity={0.15} strokeWidth={2} dot={{ fill:scoreColor,r:3 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </section>
  );
}

/* ─── Crypto Tab ────────────────────────────────────────────────────── */
function CryptoTab() {
  const dpData = Array.from({length:20},(_,i)=>{
    const round=i+1;
    return { round, epsilon:+(0.09*round-0.002*round*round).toFixed(3), accuracy:+(0.42+0.28*(1-Math.exp(-round/6))).toFixed(3) };
  });
  const [siloProgress, setSiloProgress] = useState([62,89,74]);
  useEffect(()=>{
    const id=setInterval(()=>{
      setSiloProgress(p=>p.map(v=>Math.min(99,Math.max(55,v+(Math.random()-0.5)*3))));
    },2500);
    return ()=>clearInterval(id);
  },[]);
  const silos=[
    { silo:"AWS · Nitro",    region:"US-East · Virginia",  status:"TEE Secure Enclave Training", color:C.amber },
    { silo:"Azure · Conf VM",region:"EMEA · Amsterdam",    status:"Fisher Pruning −87% BW",      color:C.copper },
    { silo:"GCP · Conf GKE", region:"APAC · Tokyo",        status:"HE FedAvg Aggregation",       color:C.gold },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <SectionHeader eyebrow="§ 04 · Privacy & Cryptography" title="Zero-Trust Compliance Room"
        caption="Differential Privacy, Homomorphic Encryption (CKKS), Secure MPC, and Hyperledger Fabric audit ledger." accent={C.copper} />
      <div className="grid lg:grid-cols-5 gap-5 mb-8">
        <Panel className="lg:col-span-3 p-6" style={{ border:`1px solid ${C.copper}20` }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color:C.creamFaint }}>Differential Privacy Budget</div>
              <h3 className="text-xl font-bold" style={{ fontFamily:"Orbitron,sans-serif", color:C.cream }}>Cumulative ε · 20 Rounds</h3>
            </div>
            <Lock size={16} style={{ color:C.copper }} />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dpData} margin={{ left:5,right:20,top:10,bottom:5 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                <XAxis dataKey="round" tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} stroke={C.border} />
                <YAxis tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} stroke={C.border} domain={[0,1.2]} />
                <Tooltip contentStyle={{ background:C.surface,border:`1px solid ${C.border}`,fontSize:11,fontFamily:"Space Mono",color:C.cream }} />
                <Legend wrapperStyle={{ fontSize:10,fontFamily:"Space Mono" }} />
                <ReferenceLine y={1.0} stroke={`${C.red}70`} strokeWidth={1.5} label={{ value:"ε ≤ 1.0 budget",fill:C.red,fontSize:9,position:"insideTopRight",fontFamily:"Space Mono" }} />
                <ReferenceLine x={15} stroke={`${C.green}50`} strokeDasharray="4 4" label={{ value:"Optimal Stop",fill:C.green,fontSize:9,position:"top",fontFamily:"Space Mono" }} />
                <Line type="monotone" dataKey="epsilon" stroke={C.copper} strokeWidth={2.5} dot={{ r:3,fill:C.copper }} name="ε (epsilon)" />
                <Line type="monotone" dataKey="accuracy" stroke={`${C.gold}90`} strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Global Accuracy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-[11px] leading-relaxed pt-4" style={{ borderTop:`1px solid ${C.border}`, color:C.creamDim }}>
            <span className="font-mono" style={{ color:C.green }}>■ Round 15 · Optimal Stop</span> — accuracy <span className="font-mono" style={{ color:C.green }}>78.5%</span> while ε within <span className="font-mono" style={{ color:C.copper }}>ε ≤ 1.0</span>. Raw data never leaves any silo.
          </div>
        </Panel>
        <div className="lg:col-span-2 p-6 rounded-sm flex flex-col" style={{ background:C.surface, border:`1px solid ${C.copper}15` }}>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color:C.creamFaint }}>Privacy Guarantees</div>
          <div className="flex-1 space-y-3">
            {[
              ["ε (Epsilon Budget)","1.0",C.copper],
              ["δ (Failure Prob.)","1e-6",C.copper],
              ["Noise Mechanism","Gaussian σ=0.42",C.gold],
              ["Clipping Norm C","1.5",C.gold],
              ["HE Scheme","CKKS poly=16384",C.green],
              ["Sampling Rate q","0.02",C.amber],
              ["Federated Rounds","20 (optimal:15)",C.amber],
            ].map(([k,v,col])=>(
              <div key={k} className="flex items-center justify-between py-2" style={{ borderBottom:`1px solid ${C.border}` }}>
                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color:C.creamFaint }}>{k}</span>
                <span className="font-mono text-sm font-bold" style={{ color:col }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-24 rounded-sm overflow-hidden"
            style={{ backgroundImage:`url(${cryptoImg})`, backgroundSize:"cover", backgroundPosition:"center", filter:"sepia(0.6) saturate(0.8) brightness(0.4)" }} />
        </div>
      </div>

      {/* Silo status */}
      <div className="mb-8">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color:C.creamFaint }}>Secure MPC · Federated Silo Status</div>
        <div className="grid md:grid-cols-3 gap-4">
          {silos.map((s,i)=>(
            <Panel key={s.silo} className="p-5" style={{ border:`1px solid ${s.color}20` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-sm" style={{ fontFamily:"Space Mono", color:C.cream }}>{s.silo}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider mt-0.5" style={{ color:C.creamFaint }}>{s.region}</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background:`${s.color}12`, border:`1px solid ${s.color}30` }}>
                  <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background:s.color }} />
                  <span className="font-mono text-[8px] tracking-wider" style={{ color:s.color }}>ONLINE</span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed mb-4" style={{ color:C.creamDim }}>{s.status}</p>
              <div>
                <div className="flex justify-between font-mono text-[9px] tracking-wider mb-1">
                  <span style={{ color:C.creamFaint }}>ROUND 15 / 20</span>
                  <span style={{ color:s.color }}>{siloProgress[i].toFixed(0)}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:`${siloProgress[i]}%`, background:s.color, boxShadow:`0 0 6px ${s.color}60` }} />
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* Hyperledger */}
      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom:`1px solid ${C.border}`, background:C.surface2 }}>
          <div className="flex items-center gap-2">
            <Hash size={12} style={{ color:C.gold }} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color:C.creamFaint }}>Hyperledger Fabric · Gradient Audit Ledger</span>
          </div>
          <span className="font-mono text-[9px]" style={{ color:C.green }}>Anti-poisoning · Merkle-attested</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ background:`${C.gold}05`, borderBottom:`1px solid ${C.border}` }}>
                {["Block","Timestamp UTC","Silo","Gradient Hash (SHA-256)","ECDSA Sig"].map(h=>(
                  <th key={h} className="text-left px-4 py-3 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color:C.creamFaint }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-[11px]">
              {[
                [15422,"2026-10-02 14:31:02","AWS-USE1",  "0x9f2a…c41b","MEUCIQDp…q0="],
                [15423,"2026-10-02 14:31:04","AZ-EMEA-W","0x71ea…f0d2","MEQCIB7z…U4="],
                [15424,"2026-10-02 14:31:06","GCP-APAC", "0xa38c…9e17","MEUCIQCw…kA="],
                [15425,"2026-10-02 14:31:08","AGGREGATOR","0x1c99…7bd3","MEQCIBqL…9E="],
                [15426,"2026-10-02 14:31:10","AWS-USE1", "0x4de1…83aa","MEUCIQDx…tI="],
              ].map((row,idx)=>{
                const siloStr = String(row[2]);
                const sCol = siloStr.includes("AWS")?C.amber:siloStr.includes("AZ")?C.copper:siloStr.includes("GCP")?C.gold:C.green;
                return (
                  <tr key={idx} className="hover:bg-white/5 transition-colors cursor-pointer" style={{ borderTop:`1px solid ${C.border}` }}>
                    <td className="px-4 py-3" style={{ color:C.gold }}>{row[0]}</td>
                    <td className="px-4 py-3" style={{ color:C.creamDim }}>{row[1]}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-sm text-[9px] tracking-wider" style={{ background:`${sCol}12`, color:sCol }}>{row[2]}</span>
                    </td>
                    <td className="px-4 py-3" style={{ color:C.creamDim }}>{row[3]}</td>
                    <td className="px-4 py-3" style={{ color:C.creamFaint }}>{row[4]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}

/* ─── DevOps Tab ────────────────────────────────────────────────────── */
function CyberCodeBlock({ title, code }:{ title:string; code:string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom:`1px solid ${C.border}`, background:C.surface2 }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:C.red }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:C.amber }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background:C.green }} />
          </div>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color:C.creamFaint }}>{title}</span>
        </div>
        <button onClick={()=>{ navigator.clipboard.writeText(code).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); }); }}
          className="font-mono text-[9px] tracking-wider px-2.5 py-1 rounded-sm transition-all"
          style={{ color:copied?C.green:C.creamFaint, border:`1px solid ${copied?`${C.green}30`:`${C.border}`}` }}>
          {copied?"✓ COPIED":"COPY"}
        </button>
      </div>
      <pre className="p-5 text-[11px] leading-relaxed font-mono overflow-auto max-h-72" style={{ color:`${C.gold}CC` }}>
        {code}
      </pre>
    </Panel>
  );
}

function DevOpsTab() {
  const cpuData = [
    {t:"14:31",cpu:68,mem:71,net:45},{t:"14:32",cpu:72,mem:73,net:52},
    {t:"14:33",cpu:65,mem:72,net:48},{t:"14:34",cpu:78,mem:75,net:61},
    {t:"14:35",cpu:82,mem:77,net:70},{t:"14:36",cpu:75,mem:76,net:58},
    {t:"14:37",cpu:71,mem:74,net:52},
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <SectionHeader eyebrow="§ 05 · DevOps · Benchmarks · Team" title="Deployment Intel & System Health"
        caption="Line-rate observability, reproducible orchestration, open-source delivery. All infrastructure as code." accent={C.amber} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {label:"Throughput",val:"184k",sub:"events/sec",color:C.gold,icon:Activity},
          {label:"P99 Latency",val:"150ms",sub:"under stress",color:C.amber,icon:Zap},
          {label:"Chk Interval",val:"812ms",sub:"incremental delta",color:C.copper,icon:Database},
          {label:"POJO Savings",val:"85%",sub:"vs Kryo",color:C.green,icon:Cpu},
        ].map(({label,val,sub,color,icon:Icon})=>(
          <Panel key={label} className="p-5 hover:scale-[1.02] transition-transform" style={{ border:`1px solid ${color}18` }}>
            <div className="flex items-center gap-2 mb-3"><Icon size={13} style={{ color }} /><span className="font-mono text-[9px] tracking-wider uppercase" style={{ color:C.creamFaint }}>{label}</span></div>
            <div className="font-black text-3xl leading-none tabular-nums" style={{ fontFamily:"Orbitron,sans-serif", color }}>{val}</div>
            <div className="font-mono text-[10px] mt-2 uppercase tracking-wide" style={{ color:C.creamFaint }}>{sub}</div>
          </Panel>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* Latency bars */}
        <Panel className="p-6" style={{ border:`1px solid ${C.amber}15` }}>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color:C.creamFaint }}>Stream Latency Percentiles</div>
          <div className="space-y-6">
            {[{k:"P50",v:"25ms",pct:0.16,color:C.green},{k:"P95",v:"75ms",pct:0.5,color:C.amber},{k:"P99",v:"150ms",pct:1.0,color:C.red}].map(({k,v,pct,color})=>(
              <div key={k}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-mono text-sm" style={{ color }}>{k}</span>
                  <span className="font-black text-2xl tabular-nums" style={{ fontFamily:"Orbitron,sans-serif", color }}>{v}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width:`${pct*100}%`, background:color, boxShadow:`0 0 8px ${color}60`, transition:"width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[["Task Mgrs","8"],["Parallelism","32"],["Brokers","6×"]].map(([k,v])=>(
              <div key={k} className="text-center p-3 rounded-sm" style={{ background:`${C.amber}06`, border:`1px solid ${C.amber}12` }}>
                <div className="font-mono text-[8px] tracking-wider uppercase" style={{ color:C.creamFaint }}>{k}</div>
                <div className="font-mono text-xl font-bold mt-1" style={{ color:C.amber }}>{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Health chart */}
        <Panel className="p-6">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color:C.creamFaint }}>Cluster Health (Last 7 Min)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData} margin={{ left:0,right:10,top:5,bottom:5 }}>
                <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                <XAxis dataKey="t" tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} stroke={C.border} />
                <YAxis domain={[0,100]} tick={{ fontSize:10,fill:C.creamFaint,fontFamily:"Space Mono" }} stroke={C.border} />
                <Tooltip contentStyle={{ background:C.surface,border:`1px solid ${C.border}`,fontSize:10,fontFamily:"Space Mono",color:C.cream }} />
                <Legend wrapperStyle={{ fontSize:10,fontFamily:"Space Mono" }} />
                <Line type="monotone" dataKey="cpu" stroke={C.gold} strokeWidth={2} dot={false} name="CPU %" />
                <Line type="monotone" dataKey="mem" stroke={C.copper} strokeWidth={2} dot={false} name="Memory %" />
                <Line type="monotone" dataKey="net" stroke={C.green} strokeWidth={1.5} strokeDasharray="5 3" dot={false} name="Network %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <CyberCodeBlock title="terraform · MSK + Flink cluster" code={`# infra/flink_cluster.tf\nresource "aws_msk_cluster" "cff_stream" {\n  cluster_name           = "cff-fusion-kafka"\n  kafka_version          = "3.7.0"\n  number_of_broker_nodes = 6\n  broker_node_group_info {\n    instance_type = "kafka.m7g.large"\n  }\n}\nmodule "flink_cluster" {\n  source         = "./modules/flink"\n  parallelism    = 32\n  slots_per_tm   = 4\n  state_backend  = "rocksdb"\n  checkpoint_uri = "s3://cff-flink-chk/"\n  taskmanagers   = 8\n}`} />
        <CyberCodeBlock title="helm · federated aggregator" code={`# charts/fed-aggregator/values.yaml\naggregator:\n  image: ghcr.io/the-elite-precision/fed-aggregator:1.4.0\n  replicas: 3\n  privacy:\n    epsilon: 1.0\n    delta: 1e-6\n    clipping_norm: 1.5\n    noise_mechanism: gaussian\n  he:\n    scheme: ckks\n    poly_modulus_degree: 16384\nsilos:\n  - { name: aws-use1,  endpoint: fed.us-east.aws.internal }\n  - { name: az-emea-w, endpoint: fed.emea.azure.internal  }\n  - { name: gcp-apac,  endpoint: fed.apac.gcp.internal    }`} />
      </div>

      {/* OSS CTA */}
      <Panel className="mb-10 p-6 flex flex-wrap items-center justify-between gap-5">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color:C.creamFaint }}>Open-Source Delivery</div>
          <div className="text-xl font-bold" style={{ fontFamily:"Orbitron,sans-serif", color:C.cream }}>Full reference implementation · Permissively licensed.</div>
        </div>
        <a id="link-github-repo" href="https://github.com/the-elite-precision/finspark-cff-federated" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 font-mono text-[10px] tracking-[0.25em] uppercase transition-all rounded-sm"
          style={{ border:`1px solid ${C.border}`, color:C.gold }}
          onMouseEnter={e=>{ e.currentTarget.style.background=C.gold; e.currentTarget.style.color=C.bg; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.gold; }}>
          <Github size={13} /> the-elite-precision / finspark-cff-federated
        </a>
      </Panel>

      {/* Team */}
      <div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color:C.creamFaint }}>The Elite Precision · Contributors</div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {role:"Lead Security Architect",desc:"Cryptographic threat modeling, OCSF schemas, zero-trust architecture.",icon:Shield,color:C.gold},
            {role:"Lead PyFlink Engineer",desc:"Real-time stream state management, PyFlink pipelines, RocksDB.",icon:Cpu,color:C.amber},
            {role:"Lead Compliance Analyst",desc:"Homomorphic Encryption, GDPR, Model Risk Management, audit trails.",icon:Users,color:C.copper},
          ].map(m=>{
            const Icon=m.icon;
            return (
              <Panel key={m.role} className="p-6 hover:scale-[1.02] transition-transform" style={{ border:`1px solid ${m.color}15` }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-5" style={{ background:`${m.color}10`, border:`1px solid ${m.color}25` }}>
                  <Icon size={18} style={{ color:m.color }} />
                </div>
                <div className="font-bold text-sm mb-2" style={{ fontFamily:"Orbitron,sans-serif", color:C.cream }}>{m.role}</div>
                <p className="text-[12px] leading-relaxed" style={{ color:C.creamDim }}>{m.desc}</p>
              </Panel>
            );
          })}
        </div>
        <div className="mt-6 flex items-center gap-3" style={{ color:C.creamDim }}>
          <Mail size={13} style={{ color:C.gold }} />
          <a href="mailto:elite.precision@finspark-hackathon.org" className="font-mono text-sm transition-colors"
            style={{ color:C.creamDim }}
            onMouseEnter={e=>e.currentTarget.style.color=C.gold}
            onMouseLeave={e=>e.currentTarget.style.color=C.creamDim}>
            elite.precision@finspark-hackathon.org
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, background:`rgba(13,10,7,0.97)` }}>
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color:C.creamFaint }}>
        <div>© MMXXVI · The Elite Precision</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full status-blink" style={{ background:C.green }} />
          All Systems Nominal
        </div>
        <div>Real-Time Cyber-Fraud Fusion · Private Federated Learning</div>
      </div>
    </footer>
  );
}
