# CyberGuard Fusion — Real-Time Cyber-Fraud Intelligence Platform

> **The Elite Precision · FinSpark Hackathon MMXXVI**
> An adaptive, cryptographically secure framework for **pre-transaction threat containment** using Private Federated Learning — featuring a fully redesigned **warm-skin SOC intelligence interface** with live real-time telemetry.

![Platform](https://img.shields.io/badge/Platform-React%2019%20%2B%20TanStack-D4943A?style=flat-square&logo=react)
![Build](https://img.shields.io/badge/Build-Vite%208-E8A030?style=flat-square&logo=vite)
![Privacy](https://img.shields.io/badge/Privacy-Differential%20Privacy%20%CE%B5%E2%89%A41.0-B5651D?style=flat-square)
![Accuracy](https://img.shields.io/badge/Accuracy-79.9%25%20CSE--ARS-7CB84A?style=flat-square)
![Latency](https://img.shields.io/badge/Latency-%3C10ms-CC3700?style=flat-square)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Design System — Warm Skin Palette](#5-design-system--warm-skin-palette)
6. [Advanced UI Features](#6-advanced-ui-features)
7. [Live Real-Time Parameters](#7-live-real-time-parameters)
8. [Features & Modules](#8-features--modules)
9. [Key Metrics](#9-key-metrics)
10. [Getting Started](#10-getting-started)
11. [Scripts](#11-scripts)
12. [Routing Conventions](#12-routing-conventions)
13. [UI Components](#13-ui-components)
14. [Error Handling](#14-error-handling)
15. [Security & Privacy Guarantees](#15-security--privacy-guarantees)
16. [Federated Learning Infrastructure](#16-federated-learning-infrastructure)
17. [Team & Contact](#17-team--contact)

---

## 1. Project Overview

CyberGuard Fusion (CFF) bridges the traditional separation between **Security Operations Centers (SOC)** and **Fraud Detection** units into a single **real-time intelligence platform**. These two disciplines typically operate in silos — examining the same digital identity from disconnected vantage points — which creates exploitable blind spots.

**Key problem facts:**
- Credential compromises initiate **22%** of all security breaches
- **88%** of application attacks involve stolen credentials
- Modern threat actors deploy blended campaigns (RAT overlays, synthetic identity clusters, social engineering) where the **device appears trusted but the transaction is malicious**

CFF solves this with a **multi-modal Late Fusion engine** (CSE-ARS) that fuses signals from both the SOC (network/auth telemetry) and fraud systems (payment streams) in under **10 ms** — before the transaction settles.

The frontend is a production-grade **SOC intelligence interface** styled in a rich **warm skin/espresso/gold** aesthetic with real-time animated data panels, glassmorphism surfaces, and a fully interactive fraud-scoring simulator.

---

## 2. Architecture

```
+-------------------------------------------------------+
|        Live Threat Ticker (Fixed Top Bar)             |
|  Tor exits · ATO probes · pacs.002 HALT events        |
+-------------------------------------------------------+
|        Live Metrics Bar (10 Real-Time Params)         |
|  Events/s · Threats · Sessions · Latency · ε · ...   |
+-------------------------------------------------------+
                         |
+-------------------------------------------------------+
|               Real-Time Event Sources                 |
|  CrowdStrike Falcon | Palo Alto NGFW | ISO 20022 Pay  |
+-------------------+-----------------+-----------------+
                    |   Apache Kafka (MSK 6×m7g.large)  |
                    v                  v
+-------------------------------------------------------+
|          Apache Flink — Streaming Pipeline            |
|  * OCSF Normalization (line-rate, stateful)           |
|  * Keyed CoProcessFunction: SOC.auth <-> PAY.pacs008  |
|  * RocksDB incremental checkpoints (s3://)            |
|  * Custom POJO serializer (85% state-update savings)  |
+---------------------------+---------------------------+
                            |  FusedEvent[128] vector
                            v
+-------------------------------------------------------+
|        Multi-Modal Late Fusion Engine (CSE-ARS)       |
|  R_final = Σ wm * fm(Xm)  — Simulated Annealing      |
|  +-------------+----------------------+-------------+ |
|  | Recognizer  | Model                | Weight (w)  | |
|  +-------------+----------------------+-------------+ |
|  | CRINL-R     | bi-LSTM NER          | 0.24        | |
|  | PERST-R     | BERT Big-5           | 0.16        | |
|  | DIACT-R     | Schema BERT          | 0.22        | |
|  | PERSU-R     | CNN Cialdini         | 0.20        | |
|  | PERSI-R     | BERT Persistence     | 0.18        | |
|  +-------------+----------------------+-------------+ |
|  Threshold: 0.70 -> ISO 20022 pacs.002 HALT injected  |
+---------------------------+---------------------------+
                            |
              +-------------+--------------+
              v                            v
+---------------------+      +------------------------+
|  Private Federated  |      |  Hyperledger Fabric     |
|  Learning Layer     |      |  Gradient Audit Ledger  |
|  * Differential Priv|      |  (Merkle-attested,      |
|  * Homomorphic Enc. |      |   anti-poisoning)       |
|  * Secure MPC       |      +------------------------+
+---------------------+
```

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TanStack Router (file-based SPA) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 + custom warm-skin design system |
| **Typography** | Space Grotesk + Space Mono + Orbitron (Google Fonts) |
| **UI Primitives** | Radix UI (full component suite) |
| **Charts** | Recharts (LineChart, BarChart, RadarChart, AreaChart) |
| **State / Server Data** | TanStack Query v5 |
| **Forms** | React Hook Form + Zod |
| **Streaming Runtime** | Apache Flink (PyFlink, RocksDB) |
| **Message Bus** | Apache Kafka (MSK, 6 brokers, m7g.large) |
| **State Backend** | RocksDB (incremental S3 checkpoints) |
| **Privacy** | Differential Privacy (Gaussian, sigma=0.42) |
| **Encryption** | Homomorphic Encryption (CKKS, poly_deg=16384) |
| **Federated Aggregation** | FedAvg + Secure MPC |
| **Audit Chain** | Hyperledger Fabric |
| **IaC** | Terraform + Helm |
| **Schema Standard** | OCSF v1.2.0 |
| **Payment Standard** | ISO 20022 (pacs.008 / pacs.002) |
| **Language** | TypeScript 5.8 |

---

## 4. Project Structure

```
cyberguard-fusion/
├── index.html                           # SPA entry point (Vite)
├── public/
│   ├── favicon.svg                      # Gold "CG" SVG favicon (custom)
│   └── favicon.ico                      # Fallback legacy icon
├── src/
│   ├── assets/
│   │   ├── crypto_blockchain_graphic.jpg
│   │   └── federated_network_graphic.jpg
│   ├── components/
│   │   └── ui/                          # 46 Radix UI primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       └── ... (43 more)
│   ├── hooks/
│   │   └── use-mobile.tsx               # Responsive breakpoint hook
│   ├── lib/
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── lovable-error-reporting.ts
│   │   └── utils.ts                     # cn() Tailwind class merge
│   ├── routes/
│   │   ├── __root.tsx                   # App shell — SPA mode (no SSR)
│   │   ├── index.tsx                    # Main SPA (all 5 sections)
│   │   └── README.md
│   ├── main.tsx                         # React SPA bootstrap entry
│   ├── router.tsx                       # TanStack Router instance
│   ├── routeTree.gen.ts                 # Auto-generated — do NOT edit
│   ├── server.ts                        # SSR/Nitro entry (unused in dev)
│   ├── start.ts                         # SSR client hydration (unused in dev)
│   └── styles.css                       # Warm-skin design system + Tailwind
├── AGENTS.md                            # AI-assistant conventions
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Design System — Warm Skin Palette

The entire UI uses a **warm espresso + gold + cream** palette — a deliberate blend of **dark and light skin tones** that feels premium, human, and instantly distinctive from the typical cold-blue SOC aesthetic.

### Color Tokens

| CSS Variable | Hex | Description |
|---|---|---|
| `--skin-bg` | `#0D0A07` | Deep warm espresso base |
| `--skin-surface` | `#1C140D` | Dark leather panel surfaces |
| `--skin-surface-2` | `#2A1E14` | Elevated panel layer |
| `--skin-surface-3` | `#3A2A1C` | Highlight surface |
| `--skin-gold` | `#D4943A` | Primary accent — headings, borders, active |
| `--skin-gold-light` | `#E8B860` | Clock, highlights |
| `--skin-copper` | `#B5651D` | Secondary accent — privacy layer |
| `--skin-amber` | `#E8A030` | Warning / elevated state |
| `--skin-cream` | `#F2E4D0` | Warm body text |
| `--skin-red` | `#CC3700` | Halt / critical / error |
| `--skin-green` | `#7CB84A` | Nominal / online / clear |

### Contrast Sections — Parchment Light
Select areas (e.g., the OCSF output parser panel) use a **parchment light** background (`#F5E2C0`) for dramatic contrast against the dark espresso panels — reinforcing the skin-tone dual aesthetic.

### Typography

```
Orbitron      → Display headings, metric values (H1, H2, stat cards)
Space Grotesk → Body text, UI labels, navigation
Space Mono    → Code, terminal logs, monospace data, timestamps
```

### Key Utility Classes

| Class | Effect |
|---|---|
| `.glass-panel` | Warm glassmorphism (backdrop-blur, semi-transparent espresso) |
| `.neon-border-gold` | Animated gold glow border |
| `.neon-border-red` | Animated red glow (halt state) |
| `.neon-border-green` | Animated green glow (nominal) |
| `.gradient-text-warm` | Gold → copper animated gradient text |
| `.gradient-text-cyber` | Gold → amber → green gradient |
| `.cyber-grid-bg` | Animated warm dot-grid background |
| `.parchment-panel` | Light cream/parchment contrast panel |
| `.skin-shimmer` | Warm shimmer animation on hover |
| `.ticker-track` | Horizontal scrolling marquee |
| `.status-blink` | Opacity blink for live indicators |
| `.data-stream-bg` | Scrolling warm data-stream overlay |

---

## 6. Advanced UI Features

### Global Layout
| Element | Behaviour |
|---|---|
| **Live Threat Ticker** | Fixed 28px top bar — scrolling threat feed, hover to pause |
| **Live Metrics Bar** | Fixed below ticker — 10 real-time parameter counters (auto-update 1.5s) |
| **Glassmorphism Header** | Blur-24 backdrop, warm gold border, espresso background |
| **Live UTC Clock** | Real-time HH:MM:SS in gold Orbitron |
| **DEFCON Threat Level** | Colour-coded 1–5 badge, auto-drifts every 8s |
| **Mobile Hamburger** | Full-screen overlay menu with gold accent nav |
| **Keyboard Shortcuts** | Press `1`–`5` to switch tabs, `Escape` to close |

### Animations & Effects
| Animation | Description |
|---|---|
| `glitch` | Text glitch — warm red/gold shadow burst (8s loop) |
| `neon-pulse-gold/red/green` | Animated glow border pulse |
| `ticker-scroll` | 50s linear marquee |
| `dot-drift` | Warm grid slowly drifts |
| `status-blink` | Live indicator opacity pulse (1.5s) |
| `data-stream` | Vertical faint line scrolling in log panels |
| `warm-breathe` | Ambient background blob opacity pulse |
| `fade-in-up` | Entrance animation on section load |
| `skin-shimmer` | Gold shimmer sweep on interactive cards |

---

## 7. Live Real-Time Parameters

### Fixed Metrics Bar (top of every page)
Updates every **1500ms** via `setInterval`. All 10 parameters animate live:

| # | Parameter | Source | Alert Threshold |
|---|---|---|---|
| 1 | **Events/sec** | Kafka ingestion rate | — |
| 2 | **Active Threats** | CSE-ARS detections | >10 → red |
| 3 | **Live Sessions** | Flink state store | — |
| 4 | **Alerts / 5min** | Rule engine count | >30 → red |
| 5 | **DP Epsilon ε** | Budget consumed | >0.95 → red |
| 6 | **Tx Velocity** | ISO 20022 tx/sec | — |
| 7 | **Fusion Latency** | CSE-ARS end-to-end | >12ms → amber |
| 8 | **Fusion Accuracy** | Live F1 estimate | — |
| 9 | **RocksDB ops/s** | State backend | — |
| 10 | **Checkpoint Size** | Incremental delta MB | — |

### Real-Time Intelligence Feed (Home tab)
Three live sparkline charts updating every **1200ms**:

| Chart | Metric | Viz |
|---|---|---|
| Event Ingestion Rate | Events per interval + running total | AreaChart |
| Active Threat Detections | Count + geo-distribution bars (4 regions) | AreaChart + progress bars |
| Fusion Engine Latency | End-to-end ms vs 10ms SLA line | AreaChart + ReferenceLine |

### Extended Parameter Grid (Home tab)
8-cell live grid (updates every 2500ms):

| Parameter | Value |
|---|---|
| Kafka Consumer Lag | 0 msgs — all 6 partitions |
| RocksDB State Size | ~4.1 GB incremental |
| Flink Backpressure | ~0.02% (nominal) |
| Federated Round | 15 / 20 (optimal stop) |
| HE Encryption | ACTIVE — CKKS poly=16384 |
| Gradient Hashes | 15,426+ Fabric blocks committed |
| MPC Silos Online | 3 / 3 (AWS · Azure · GCP) |
| DP Budget Remaining | ~1.9% headroom |

---

## 8. Features & Modules

The app is a single-page SPA at `/` with five navigable sections:

### 01 · Command Center (Home)
- Warm espresso headline with Orbitron display font
- DEFCON threat level badge (auto-simulation)
- Animated count-up stat cards: $13B losses, <10ms latency, 79.9% accuracy
- Interactive architecture pipeline diagram
- **Real-Time Intelligence Feed** (3 live sparklines + 8-param grid)
- Problem space editorial with gold accent callouts
- Secondary stats row (throughput, DP budget, Kafka nodes, POJO savings)

### 02 · Ingestion Pipe
- 3 source health cards (CrowdStrike, Palo Alto, ISO 20022) — ONLINE status
- Live packet counter (increments every 400ms)
- Raw source selector (dropdown) + **parchment-light OCSF output panel** (contrast)
- Field mapping dictionary table
- Flink log monitor — INFO/WARN/ERROR badges + level filter buttons

### 03 · Fusion Engine
- 5 recognizer sliders with colour-coded scores
- Attack presets dropdown (Baseline / Social Engineering / RAT ATO)
- Colour-coded risk gauge (green/amber/red neon ring)
- Score sparkline (rolling 12-point history)
- Decision audit log (timestamped table, populated on demand)
- F1 benchmark bar chart + Pentagon radar chart

### 04 · Privacy & Crypto
- DP budget LineChart (ε vs accuracy over 20 rounds, optimal stop at 15)
- Privacy guarantee table (ε, δ, σ, C, HE scheme, sampling rate)
- Silo status cards (live-animated progress bars, online badges)
- Hyperledger Fabric block explorer (colour-coded per AWS/Azure/GCP)

### 05 · DevOps & Intel
- System health cards (throughput, P99 latency, checkpoint, POJO savings)
- Latency percentile bars (P50/P95/P99)
- Cluster health chart (CPU/Memory/Network over 7 minutes)
- Terraform + Helm code blocks with copy button
- Team glassmorphism cards

---

## 9. Key Metrics

| Metric | Value |
|---|---|
| Global ATO Fraud Losses | $13,000,000,000 / year |
| Core classification latency | < 10 ms |
| Late Fusion accuracy (CSE-ARS) | 79.9% |
| Lift over best single model | +8.7% F1 |
| Flink state-update savings | 85% (POJO vs Kryo) |
| Throughput | 184k events/sec |
| DP epsilon guarantee | ε ≤ 1.0 |
| Federated rounds | 20 (optimal stop: 15) |
| Global accuracy at optimal stop | 78.5% |
| Kafka broker nodes | 6 × m7g.large |
| Flink task managers | 8 (parallelism 32, 4 slots each) |
| Checkpoint interval | ~812 ms incremental |
| RocksDB state size | ~4.1 GB |
| Gradient hashes on Fabric | 15,426+ blocks |

---

## 10. Getting Started

### Prerequisites

- Node.js >= 20 **or** Bun >= 1.1

### Install Dependencies

```bash
# Using bun (recommended — lockfile is bun.lock)
bun install

# Using npm
npm install
```

### Run Development Server

```bash
bun run dev
# or
npm run dev
# → http://localhost:3000/
```

### Build for Production

```bash
bun run build
# or
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint & Format

```bash
npm run lint
npm run format
```

---

## 11. Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite dev` | Local dev server with HMR — opens browser |
| `build` | `vite build` | Production SPA build |
| `build:dev` | `vite build --mode development` | Dev-mode production build |
| `preview` | `vite preview` | Preview production bundle |
| `lint` | `eslint .` | Run ESLint |
| `format` | `prettier --write .` | Auto-format all files |

---

## 12. Routing Conventions

TanStack Router uses **file-based routing**. All routes live in `src/routes/`.

| File | URL | Notes |
|---|---|---|
| `index.tsx` | `/` | Main SPA (all 5 sections) |
| `__root.tsx` | App shell | `QueryClientProvider` + `<Outlet />` — **SPA mode, no SSR** |
| `users/$id.tsx` | `/users/:id` | Dynamic segment |
| `files/$.tsx` | `/files/*` | Splat |
| `_layout.tsx` | Layout route | Renders children via `<Outlet />` |

> `routeTree.gen.ts` is **auto-generated** by TanStack Router Vite plugin — never edit by hand.
> Do **NOT** create `src/pages/`, Next.js `app/layout.tsx`, or Remix `_app` files.

### SPA Entry Point

The app runs as a **client-side SPA** via:
- `index.html` → `src/main.tsx` (React root, `RouterProvider`)
- No SSR in development — `server.ts` / `start.ts` are preserved for future SSR deployment

---

## 13. UI Components

All 46 UI primitives live in `src/components/ui/`, built on **Radix UI** with Tailwind CSS v4.

Key components: Accordion, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Carousel, Chart (Recharts), Checkbox, Command (cmdk), Context Menu, Dialog, Drawer (vaul), Dropdown Menu, Form, Hover Card, Input OTP, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable Panels, Scroll Area, Select, Sheet, Sidebar, Skeleton, Slider, Sonner (Toast), Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip.

**Utility**: `src/lib/utils.ts` exports `cn()` — combines `clsx` and `tailwind-merge`.

---

## 14. Error Handling

### Client-Side (React)

`src/routes/__root.tsx` registers two warm-themed error components:

- **`ErrorComponent`** — "Pipeline Fault Detected" with Re-Initialize / Return Home buttons
- **`NotFoundComponent`** — "Signal Lost · 0x404" with control room return link

### Error Reporting

`src/lib/lovable-error-reporting.ts` exports `reportError(error, context)`:
1. Calls `window.__errorHandler.captureException()` if registered (plug in Sentry, DataDog, etc.)
2. Falls back to `console.error` in development

---

## 15. Security & Privacy Guarantees

| Guarantee | Implementation |
|---|---|
| **Differential Privacy** | Gaussian mechanism (σ=0.42), ε=1.0, δ=1e-6 |
| **Gradient Clipping** | L2 norm C=1.5 before noise addition |
| **Homomorphic Encryption** | CKKS scheme, poly_modulus_degree=16384 |
| **Secure Multiparty Computation** | FedAvg without central decryption of raw gradients |
| **Trusted Execution Environment** | AWS Nitro Enclaves for local silo training |
| **Immutable Audit Trail** | Hyperledger Fabric (Merkle-attested gradient hashes) |
| **Anti-poisoning** | SHA-256 gradient hashes + per-silo ECDSA signatures |
| **Zero-Trust Data Isolation** | Raw client data never leaves any silo |
| **Bandwidth Reduction** | Fisher-based parameter pruning (−87%) on EMEA silo |

---

## 16. Federated Learning Infrastructure

Three geographically distributed silos:

| Silo | Provider | Region | TEE |
|---|---|---|---|
| `aws-use1` | AWS | US East (Virginia) | Nitro Enclave |
| `az-emea-w` | Azure | EMEA West (Amsterdam) | Confidential VM |
| `gcp-apac` | GCP | APAC East (Tokyo) | Confidential GKE |

**Round lifecycle:**
1. Each silo trains on local data (no data sharing ever)
2. Gradients are clipped (C=1.5), noised (DP-SGD, σ=0.42), and CKKS-encrypted
3. Encrypted gradients sent to the aggregator
4. FedAvg runs **without decrypting** raw gradients (Secure MPC)
5. Updated global model broadcast back to all silos
6. Every gradient hash written to Hyperledger Fabric ledger (SHA-256 + ECDSA)

---

## 17. Team & Contact

| Role | Expertise |
|---|---|
| **Lead Security Architect** | Cryptographic threat modeling, OCSF schemas, zero-trust architecture |
| **Lead PyFlink Engineer** | Real-time stream state management, PyFlink pipelines, RocksDB |
| **Lead Compliance Analyst** | Homomorphic Encryption, GDPR, Model Risk Management |

**Email**: elite.precision@finspark-hackathon.org

**Repository**: [github.com/the-elite-precision/finspark-cff-federated](https://github.com/the-elite-precision/finspark-cff-federated)

---

## License

Permissively licensed. Full reference implementation open-source.

---

*© MMXXVI · The Elite Precision · CyberGuard Fusion · Real-Time Cyber-Fraud Intelligence · Private Federated Learning*
