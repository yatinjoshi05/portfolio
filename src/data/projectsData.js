export const projectsData = [
  {
    id: 'nexus-gtm',
    number: '01',
    name: 'NEXUS GTM',
    fullName: 'NEXUS GTM — Autonomous Revenue Intelligence & Lead Orchestration Engine',
    navSubtitle: 'Revenue intelligence & lead qualification',
    subtitle: 'AI-Powered Revenue Intelligence & Lead Qualification Engine',
    oneLiner:
      'Autonomous revenue intelligence and lead qualification engine eliminating manual research, defending against duplicate CRM clutter, and orchestrating instantaneous AE outbound.',
    problem:
      'B2B revenue teams waste 48+ hours manually researching startup funding rounds and burn AI budget piping raw, unvalidated signals into LLMs, creating CRM race conditions and duplicate outreach.',
    solution:
      'Event-driven pipeline that ingests funding signals via Python RSS poller, intercepts duplicates with a SHA-256 Postgres idempotency gate, executes tiered qualification (OpenAI gpt-4o-mini with deterministic heuristic fallback), and serves a high-performance operator dashboard.',
    badge: 'Production Architecture',
    badgeColor: '#38BDF8',
    windowLabel: 'NEXUS GTM • Revenue Intelligence Engine',
    repoUrl: 'https://github.com/yatinjoshi05/nexus-gtm',
    liveUrl: 'https://yatinjoshi05.github.io/nexus-gtm/',
    archifyUrl: 'https://yatinjoshi05.github.io/nexus-gtm/',
    tags: ['Python RSS Poller', 'SHA-256 Idempotency', 'OpenAI & Deterministic Fallback', 'Supabase Postgres', 'React 18 / Vite 5'],
    workflowSteps: [
      { label: 'Signal Ingestion', desc: 'Python RSS & Webhook Gateway' },
      { label: 'Idempotency Gate', desc: 'SHA-256 Hash Dedup ($0 LLM Waste)' },
      { label: 'Dual-Path Qualifier', desc: 'gpt-4o-mini + Deterministic Fallback' },
      { label: 'leads_pipeline', desc: 'Supabase Postgres Persistence' },
      { label: 'Operator Action', desc: 'React 18 UI & 1-Click Outbound' }
    ],
    mediaViews: [
      {
        id: 'architecture',
        label: 'System Architecture',
        badge: '11-Node System Topology',
        imgSrc: '/media/projects/nexus-gtm-architecture.webp',
        highResSrc: '/media/projects/nexus-gtm-architecture.png',
        caption: '11-node complete system map from Python RSS poller through idempotency gates to React operator UI.'
      },
      {
        id: 'dashboard',
        label: 'Revenue Dashboard',
        badge: 'Live Intent Signals Radar',
        imgSrc: '/media/projects/nexus-gtm-dashboard.webp',
        highResSrc: '/media/projects/nexus-gtm-dashboard.webp',
        caption: 'AI Revenue Intelligence control center with account scoring, intent surge detection, and rep dispatch.'
      },
      {
        id: 'workflow',
        label: 'Lead Workflow DAG',
        badge: '6-Lane Execution Pipeline',
        imgSrc: '/media/projects/nexus-gtm-workflow.webp',
        highResSrc: '/media/projects/nexus-gtm-workflow.png',
        caption: '6-lane autonomous execution flow detailing intake, prompt sanitization, scoring, and storage.'
      }
    ]
  },
  {
    id: 'content-automation-platform',
    number: '02',
    name: 'Content Automation Platform',
    fullName: 'Content Automation Platform (CAP)',
    navSubtitle: 'Multi-channel AI workflow engine',
    subtitle: 'Autonomous Multi-Channel AI Media Pipeline & Operations Dashboard',
    oneLiner:
      'Enterprise short-form video generation, QA, and distribution platform orchestrating 16 decoupled n8n state machines, CoreUI React operations dashboard, PostgreSQL state engine, and fail-closed model circuit breakers.',
    problem:
      'Monolithic automation scripts fail catastrophically during API rate limits, provider token quotas, or network timeouts during heavy video uploads, lacking human-in-the-loop review controls.',
    solution:
      '16 decoupled idempotent state machines with database-backed skip-locked job leasing, multi-provider AI failover (Groq primary with instant Gemini fallback), automated FFmpeg visual QA, and idempotent social publishing.',
    badge: 'Production Engine',
    badgeColor: '#8B5CF6',
    windowLabel: 'CAP Control Center • 16-Workflow Engine',
    repoUrl: 'https://github.com/yatinjoshi05/Content-Automation-Platform',
    archifyUrl: 'https://yatinjoshi05.github.io/content-automation-platform/',
    tags: ['16 n8n Workflows', 'PostgreSQL 16 Engine', 'CoreUI Dashboard', 'Groq & Gemini Failover', 'FFmpeg 9:16 QA'],
    workflowSteps: [
      { label: 'Trend Ingestion', desc: 'Topic Velocity & Rights Scrape' },
      { label: 'State Machine', desc: '16 Decoupled n8n Leased Jobs' },
      { label: 'AI Router', desc: 'Groq Primary ⇄ Gemini Failover' },
      { label: 'FFmpeg QA', desc: 'Automated 9:16 & Freeze Detection' },
      { label: 'Idempotent Publish', desc: 'YouTube & Meta Graph Adapters' }
    ],
    mediaViews: [
      {
        id: 'dashboard',
        label: 'Operations Command Center',
        badge: 'CoreUI React Operations Dashboard',
        imgSrc: '/media/projects/content-automation-dashboard.png',
        highResSrc: '/media/projects/content-automation-dashboard.png',
        caption: 'Central operations console monitoring pipeline throughput, model failover health, and publication queues.'
      },
      {
        id: 'models',
        label: 'AI Router & Quota Policy',
        badge: 'Circuit-Breaker Model Failover',
        imgSrc: '/media/projects/content-automation-models.png',
        highResSrc: '/media/projects/content-automation-models.png',
        caption: 'Zero-overhead failover policy routing between Groq LLaMA 3.3 and Google Gemini on HTTP 429/503.'
      },
      {
        id: 'architecture',
        label: 'System Architecture',
        badge: 'Master Archify System Map',
        imgSrc: '/media/projects/content-automation-archify-online.png',
        highResSrc: '/media/projects/content-automation-archify-online.png',
        caption: 'Verified architecture suite detailing the 16 decoupled state machines and PostgreSQL skip-locked queue.'
      }
    ]
  },
  {
    id: 'rloe',
    number: '03',
    name: 'Revenue Lifecycle Orchestration (RLOE)',
    fullName: 'Revenue Lifecycle Orchestration Engine (RLOE)',
    navSubtitle: 'Inbound triage & gated LLM routing',
    subtitle: 'Event-Driven GTM Automation & Cost-Gated Lead Routing',
    oneLiner:
      'End-to-end revenue lifecycle architecture orchestrating inbound signal validation, cache-first deduplication, Clay waterfall enrichment, deterministic scoring gates, and Claude LLM routing.',
    problem:
      'Raw website and product usage signals trigger duplicate third-party enrichment calls and burn expensive LLM tokens on non-ICP visitors, inflating SaaS costs while cluttering CRM pipelines.',
    solution:
      'Dual-gated architecture: sub-100ms Supabase cache triage eliminates duplicate runs, deterministic scoring (≥35) screens accounts before AI reasoning, and structured LLM analysis routes qualified deals directly to HubSpot.',
    badge: 'Production Architecture',
    badgeColor: '#10B981',
    windowLabel: 'RLOE Control Plane • 8-Stage Architecture',
    repoUrl: 'https://github.com/yatinjoshi05/revenue-lifecycle-orchestration-engine',
    liveUrl: 'https://yatinjoshi05.github.io/revenue-lifecycle-orchestration-engine/',
    archifyUrl: 'https://yatinjoshi05.github.io/revenue-lifecycle-orchestration-engine/archify/',
    tags: ['n8n Event Stream', 'Supabase Cache Triage', 'Clay Waterfall', 'Deterministic Gate (≥35)', 'HubSpot Sync'],
    workflowSteps: [
      { label: 'Inbound Ingress', desc: 'Webhook & PLG Usage Poller' },
      { label: 'Cache Guard', desc: 'Sub-100ms Supabase Deduplication' },
      { label: 'Clay Waterfall', desc: 'Firmographic & Tech Enrichment' },
      { label: 'Deterministic Gate', desc: 'Pre-Filter Score (≥35 Threshold)' },
      { label: 'Claude Routing', desc: 'Structured JSON & HubSpot Deal Sync' }
    ],
    mediaViews: [
      {
        id: 'architecture',
        label: 'System Architecture',
        badge: '8-Stage Revenue Pipeline',
        imgSrc: '/media/projects/rloe-architecture.webp',
        highResSrc: '/media/projects/rloe-architecture.svg',
        caption: '8-stage revenue pipeline tracing signals from webhook intake through cache triage to CRM dispatch.'
      },
      {
        id: 'workflow',
        label: 'n8n Workflow Canvas',
        badge: '39-Node Orchestrator Canvas',
        imgSrc: '/media/projects/rloe-workflow.webp',
        highResSrc: '/media/projects/rloe-workflow.webp',
        caption: 'Canonical 39-node n8n workflow canvas showing 4 operational lanes and fail-safe error logging.'
      },
      {
        id: 'dashboard',
        label: 'CRM Operations Demo',
        badge: 'Account Coverage & Health',
        imgSrc: '/media/projects/gtm-crm-dashboard.webp',
        highResSrc: '/media/projects/gtm-crm-dashboard.webp',
        caption: 'GTM Account Intelligence Dashboard demo monitoring account health, deal velocity, and pipeline gaps.'
      }
    ]
  },
  {
    id: 'jarvis-os',
    number: '04',
    name: 'JARVIS OS',
    fullName: 'JARVIS OS — Personal AI Operating System',
    navSubtitle: 'Personal AI desktop assistant',
    subtitle: 'Desktop Assistant, HUD Interface & Vector Memory Engine',
    oneLiner:
      'Personal AI desktop assistant and operating workspace combining a 3D Quantum Globe interface, multi-provider AI cascade, associative memory engine, and system monitoring.',
    problem:
      'Disparate AI assistants operate in isolated browser tabs without local system context, persistent associative memory across work sessions, or unified desktop tool orchestration.',
    solution:
      'Tauri desktop architecture combining a Three.js HUD frontend, Express local proxy (:3001), dual memory store (768-dim vector embeddings + knowledge graph), and cascading AI routing (NVIDIA NIM ⇄ Gemini ⇄ Claude).',
    badge: 'In Progress • Web Preview',
    badgeColor: '#EC4899',
    windowLabel: 'JARVIS OS v1.0.0 • Command HUD',
    repoUrl: 'https://github.com/yatinjoshi05/jarvis-os',
    liveUrl: 'https://yatinjoshi05.github.io/jarvis-os/',
    archifyUrl: 'https://yatinjoshi05.github.io/jarvis-os/archify/',
    tags: ['Tauri v2 Desktop Shell', 'Three.js Quantum Globe', 'Vector Memory & Graph', 'Cascading AI Router', 'Express 4 API'],
    workflowSteps: [
      { label: 'Input Interface', desc: 'Voice Waveform & Command HUD' },
      { label: 'Express Gateway', desc: 'Local Proxy (:3001 Dispatch)' },
      { label: 'Memory Intelligence', desc: 'Vector Store & Knowledge Graph' },
      { label: 'AI Cascading Router', desc: 'NVIDIA NIM ⇄ Gemini ⇄ Claude' },
      { label: 'Three.js Synthesis', desc: '3D Globe Response Rendering' }
    ],
    mediaViews: [
      {
        id: 'hud',
        label: 'Command HUD & 3D Globe',
        badge: 'Three.js Quantum Globe Interface',
        imgSrc: '/media/projects/jarvis-os.webp',
        highResSrc: '/media/projects/jarvis-os.webp',
        caption: 'JARVIS OS desktop command center featuring interactive 3D particle globe, audio analyzer, and mission board.'
      }
    ]
  }
];

