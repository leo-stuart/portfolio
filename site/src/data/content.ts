export type Lang = 'en' | 'pt';

export interface Link {
  label: string;
  href: string;
}

export interface Job {
  role: string;
  company: string;
  url?: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  name: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  tech: string[];
  links: Link[];
  image?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Award {
  title: string;
  place: string;
  date: string;
}

export interface Content {
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    cv: string;
  };
  hero: {
    name: string;
    role: string;
    headline: string;
    summary: string;
    status: string;
    now: string;
    viewWork: string;
    getInTouch: string;
  };
  stats: Stat[];
  about: {
    title: string;
    bio: string;
    facts: Fact[];
  };
  experience: {
    title: string;
    jobs: Job[];
  };
  projects: {
    title: string;
    items: Project[];
  };
  skills: {
    title: string;
    groups: SkillGroup[];
  };
  education: {
    title: string;
    school: string;
    degree: string;
    period: string;
    note: string;
  };
  awards: {
    title: string;
    items: Award[];
  };
  contact: {
    title: string;
    text: string;
    email: string;
    links: Link[];
    footer: string;
  };
}

const SOCIAL: Link[] = [
  { label: 'github.com/leo-stuart', href: 'https://github.com/leo-stuart' },
  { label: 'linkedin.com/in/leonardo-stuart', href: 'https://linkedin.com/in/leonardo-stuart' },
];

const PROJECT_LINKS = {
  courty: [{ label: 'Site', href: 'https://www.courtyapp.com' }],
  cockpit: [
    { label: 'Site', href: 'https://agent-cockpit.dev' },
    { label: 'Source', href: 'https://github.com/agent-cockpit/agent-cockpit' },
    { label: 'npm', href: 'https://www.npmjs.com/package/@agentcockpit/agent-cockpit' },
  ],
  testa: [{ label: 'Source', href: 'https://github.com/leo-stuart/testa' }],
  monity: [
    { label: 'App', href: 'https://app.monity-finance.com' },
    { label: 'Site', href: 'https://monity-landing-page.vercel.app' },
    { label: 'Source', href: 'https://github.com/Monity-FinanceTracker/Monity' },
  ],
  sofia: [{ label: 'Source', href: 'https://github.com/sofIA-Payment-Agent/sofIA-payment-agent' }],
  postable: [
    { label: 'App', href: 'https://app.thepostable.com' },
    { label: 'Site', href: 'https://thepostable.com' },
    { label: 'Source', href: 'https://github.com/postable-org/postable' },
  ],
  behold: [{ label: 'Demo', href: 'https://behold-bi-dashboard.vercel.app' }],
  algoflow: [
    { label: 'App', href: 'https://app.thealgoflow.com' },
    { label: 'Site', href: 'https://thealgoflow.com' },
    { label: 'Source', href: 'https://github.com/TheAlgoFlow/AlgoFlow' },
  ],
};

const TECH = {
  courty: ['TypeScript', 'Express 5', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.io', 'Asaas', 'Expo', 'Next.js'],
  cockpit: ['TypeScript', 'Node.js', 'node-pty', 'WebSocket', 'SQLite', 'Vitest'],
  testa: ['JavaScript', 'Node.js', 'MCP SDK', 'Playwright', 'axe-core', 'zod'],
  monity: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Supabase', 'AWS', 'GitHub Actions'],
  behold: ['Python', 'FastAPI', 'GraphQL', 'Shopify', 'Google ADK', 'Gemini 2.0 Flash', 'MCP'],
  sofia: ['Python', 'FastAPI', 'Google ADK', 'Gemini 2.5 Flash', 'AP2', 'Node.js', 'PostgreSQL', 'Docker'],
  postable: ['Go', 'Next.js', 'PostgreSQL', 'Supabase', 'Stripe', 'Docker'],
  algoflow: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS', 'Recharts'],
};

const SKILLS = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'SQL'],
  backend: ['FastAPI', 'Node.js', 'Spring Boot', 'GraphQL', 'REST', 'JSON-RPC'],
  frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS'],
  data: ['PostgreSQL', 'Redis', 'Supabase'],
  infra: ['AWS (S3, CloudFront, CLI)', 'Docker', 'GitHub Actions', 'CI/CD'],
  ai: ['Model Context Protocol', 'Google ADK', 'Gemini', 'n8n'],
};

export const content: Record<Lang, Content> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      cv: 'CV',
    },
    hero: {
      name: 'Leonardo Stuart',
      role: 'Software engineer',
      headline: 'I build customer-facing software used by a million people a month.',
      now: 'allu.',
      viewWork: 'See projects',
      getInTouch: 'Email me',
      summary:
        'Software engineer on the growth team at allu., working on the customer-facing applications used by 1M+ people every month. Before that: payment infrastructure at allu., MCP tooling at dti Digital. Studying Computer Science at PUC Minas.',
      status: 'Belo Horizonte',
    },
    stats: [
      { value: '1M+', label: 'monthly users of the allu. apps I work on' },
      { value: 'R$ 591K', label: 'recovered in one month by a retry worker I built' },
      { value: '98%', label: 'fewer context tokens in MCP tool discovery' },
    ],
    about: {
      title: 'About',
      bio: 'Software engineer with production experience across fintech, consulting, e-commerce and enterprise chatbot platforms. I like owning problems end to end: from the data model and the queue to the API and the UI. My recent work spans customer-facing product at scale, payment infrastructure and LLM tooling.',
      facts: [
        { label: 'now', value: 'Software Engineering Intern at allu., growth team' },
        { label: 'education', value: 'B.Sc. Computer Science, PUC Minas (2025–2028)' },
        { label: 'focus', value: 'growth engineering, payments, AI integration' },
        { label: 'languages', value: 'Portuguese (native), English (C1, Cambridge)' },
        { label: 'location', value: 'Belo Horizonte, MG, Brazil' },
      ],
    },
    experience: {
      title: 'Experience',
      jobs: [
        {
          role: 'Software Engineering Intern',
          company: 'allu.',
          url: 'https://allugator.com',
          period: 'Apr 2026 — present',
          location: 'Belo Horizonte',
          bullets: [
            'Now on the growth team, building and maintaining allu.\'s customer-facing applications, used by 1M+ people a month.',
            'Previously worked on payment infrastructure projects on a platform processing millions of reais monthly for a 60K+ customer base.',
            'Built a failed-charge retry system on Supabase Edge Functions as a serverless worker, batch-processing a PostgreSQL-backed queue. Recovered R$591,791.91 in a single month with no added infrastructure cost.',
            'Designed a proprietary white-label payment gateway with multi-tenant isolation and real-time webhook event delivery, reusable across client-facing products.',
          ],
        },
        {
          role: 'Software Engineering Intern',
          company: 'dti Digital',
          url: 'https://www.dtidigital.com.br',
          period: 'Sep 2025 — Apr 2026',
          location: 'Belo Horizonte',
          bullets: [
            'Cut context token consumption in MCP server tool discovery by 98% by building MCP Optimizer, lowering API cost and chatbot latency.',
            'Designed and migrated FastAPI chatbot infrastructure from legacy routing to Model Context Protocol over JSON-RPC.',
            'Shipped production features on FastAPI and MCP used daily by 1,000+ people, reducing manual task time in internal operations.',
          ],
        },
        {
          role: 'AI Engineering Intern',
          company: 'Magic Mango',
          period: 'Dec 2025 — May 2026',
          location: 'São Paulo',
          bullets: [
            'Automated lead generation and sales prospecting with n8n and Python/Go scripts, reducing manual outreach time by 90%.',
            'Built competitive-analysis tooling for prospects, turning market data into inputs for startup strategy.',
          ],
        },
        {
          role: 'Backend Developer',
          company: 'PUC COMP (junior enterprise)',
          url: 'https://www.puccomp.com.br',
          period: 'May 2025 — Sep 2025',
          location: 'Belo Horizonte',
          bullets: [
            'Built Java Spring Boot microservices for real client projects with a focus on maintainable architecture.',
            'Translated business requirements into technical specifications with multidisciplinary teams.',
          ],
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          name: 'Courty',
          period: 'May 2026 — Aug 2026',
          role: 'Co-founder & CTO',
          summary:
            'Operating system and payment layer for independent sports arenas in Brazil: memberships, classes, recurring PIX billing, attendance and court bookings. Player app, owner dashboard and API.',
          highlights: [
            'Recurring billing on Asaas: PIX and card subscriptions, webhook reconciliation, per-arena fee split, partner revenue split and balance anticipation.',
            'Booking engine with Redis distributed locks, weekly availability templates, expiry jobs and Socket.io real-time slot updates.',
            'Expo app for players and owners, Next.js owner dashboard, and a growth engine with referrals and promo codes.',
          ],
          tech: TECH.courty,
          links: PROJECT_LINKS.courty,
          image: '/projects/courty.png',
        },
        {
          name: 'Agent Cockpit',
          period: 'Apr 2026 — Jun 2026',
          role: 'Co-creator',
          summary:
            'Local-first control room for running several coding agents at once. Claude Code and Codex sessions side by side, each with a live terminal, a risk-rated approval queue, timeline and diffs.',
          highlights: [
            'Adapters for Claude Code (hook server) and Codex, each with a risk classifier that rates commands before they run.',
            'SQLite event store with full-text search, WebSocket session catch-up and memory notes that persist across sessions.',
            'Open source. Published to npm as @agentcockpit/agent-cockpit.',
          ],
          tech: TECH.cockpit,
          links: PROJECT_LINKS.cockpit,
          image: '/projects/agent-cockpit.png',
        },
        {
          name: 'testa',
          period: 'Oct 2026 — present',
          role: 'Creator',
          summary:
            'MCP server that lets coding agents like Claude Code, Codex and Cursor test the feature they just built, on the web through Playwright and on the iOS Simulator, including React Native apps.',
          highlights: [
            'Reads the git diff (feature_context) to plan scenarios, then runs them with assertions via run_scenario.',
            'Replay with self-heal when the UI changes, accessibility audits with axe-core and network mocks.',
            'Guardrails: needs_human escalation and explicit confirmation before risky actions like payments or deletes.',
          ],
          tech: TECH.testa,
          links: PROJECT_LINKS.testa,
        },
        {
          name: 'Monity',
          period: 'Jan 2025 — Dec 2025',
          role: 'Founder, full-stack',
          summary:
            'Personal finance app with ML-based transaction categorization, shared expenses and a companion mobile app. Grew to 100+ users.',
          highlights: [
            'ML categorization improved tracking accuracy by 80% over manual tagging.',
            'Caching and batch processing cut duplicate API calls by 70–90%.',
            'AWS S3 + CloudFront with automated deploys, 99.9% uptime; GitHub Actions took deploys from hours to minutes.',
          ],
          tech: TECH.monity,
          links: PROJECT_LINKS.monity,
          image: '/projects/monity.png',
        },
        {
          name: 'Behold',
          period: 'Jun 2025 — Dec 2025',
          role: 'Co-founder, AI engineer',
          summary:
            'Conversational e-commerce automation for Shopify stores: cart creation, discounts and shipping calculation handled by an AI agent.',
          highlights: [
            'Customer journey from discovery to checkout in under 30 seconds.',
            'GraphQL + MCP integration on FastAPI with dynamic query generation, 99% API reliability on Shopify operations.',
            'Google ADK agent on Gemini 2.0 Flash handling 50+ concurrent conversations with session-based state.',
          ],
          tech: TECH.behold,
          links: PROJECT_LINKS.behold,
          image: '/projects/behold.png',
        },
        {
          name: 'sofIA',
          period: '2025',
          role: 'Co-founder, AI / backend',
          summary:
            "Multi-agent payment platform for WhatsApp built on Google's Agent Payments Protocol (AP2). PIX, boleto and card payments through plain conversation.",
          highlights: [
            'No app install and no checkout form: the whole flow lives inside a WhatsApp thread.',
            'Gemini 2.5 Flash agents orchestrated with Google ADK.',
          ],
          tech: TECH.sofia,
          links: PROJECT_LINKS.sofia,
          image: '/projects/sofia.png',
        },
        {
          name: 'Postable',
          period: '2025',
          role: 'Co-founder, product engineer',
          summary:
            'SaaS for Brazilian small businesses to plan, generate and publish social media content. Go backend, Next.js frontend.',
          highlights: [
            'Payments, auth, storage, scheduled publishing and test coverage in place.',
            'Trend analysis and competitor mapping feed the content generator.',
          ],
          tech: TECH.postable,
          links: PROJECT_LINKS.postable,
          image: '/projects/postable.png',
        },
        {
          name: 'AlgoFlow',
          period: '2025',
          role: 'Solo developer',
          summary:
            'Interactive algorithm visualizer with frame-by-frame playback and synchronized pseudocode. 31 algorithms across 4 categories: sorting, searching, data structures and DP. Apache 2.0.',
          highlights: ['FastAPI backend for step-by-step code execution in 8 languages.', '200+ users.'],
          tech: TECH.algoflow,
          links: PROJECT_LINKS.algoflow,
          image: '/projects/algoflow.png',
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        { label: 'languages', items: SKILLS.languages },
        { label: 'backend', items: SKILLS.backend },
        { label: 'frontend', items: SKILLS.frontend },
        { label: 'data', items: SKILLS.data },
        { label: 'infra', items: SKILLS.infra },
        { label: 'ai', items: SKILLS.ai },
      ],
    },
    education: {
      title: 'Education',
      school: 'PUC Minas',
      degree: 'B.Sc. Computer Science',
      period: '2025 — 2028',
      note: 'Expected graduation 2028',
    },
    awards: {
      title: 'Awards',
      items: [
        { title: 'Best Software Development Project', place: '1st place', date: 'Aug 2025' },
        { title: '3rd Unifecaf Hackathon', place: '3rd place', date: 'Jun 2025' },
      ],
    },
    contact: {
      title: 'Contact',
      text: 'If you want to talk growth engineering, payments, agent tooling, or have something worth building together, email me.',
      email: 'leostuart05@gmail.com',
      links: SOCIAL,
      footer: 'Leonardo Stuart, Belo Horizonte',
    },
  },

  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Skills',
      contact: 'Contato',
      cv: 'CV',
    },
    hero: {
      name: 'Leonardo Stuart',
      role: 'Engenheiro de software',
      headline: 'Construo produtos que um milhão de pessoas usam por mês.',
      now: 'allu.',
      viewWork: 'Ver projetos',
      getInTouch: 'Me mande um email',
      summary:
        'Engenheiro de software no time de growth da allu., trabalhando nas aplicações voltadas ao cliente usadas por 1 milhão+ de pessoas por mês. Antes: infraestrutura de pagamentos na allu. e tooling MCP na dti Digital. Curso Ciência da Computação na PUC Minas.',
      status: 'Belo Horizonte',
    },
    stats: [
      { value: '1M+', label: 'usuários mensais dos apps da allu. em que trabalho' },
      { value: 'R$ 591K', label: 'recuperados em um mês por um worker de retentativa que construí' },
      { value: '98%', label: 'menos tokens de contexto na descoberta de ferramentas MCP' },
    ],
    about: {
      title: 'Sobre',
      bio: 'Engenheiro de software com experiência em produção em fintech, consultoria, e-commerce e plataformas de chatbot corporativo. Gosto de ser dono do problema de ponta a ponta: do modelo de dados e da fila até a API e a interface. Meu trabalho recente passa por produto voltado ao cliente em escala, infraestrutura de pagamentos e ferramentas de LLM.',
      facts: [
        { label: 'agora', value: 'Estagiário de Engenharia de Software na allu., time de growth' },
        { label: 'formação', value: 'Bacharelado em Ciência da Computação, PUC Minas (2025–2028)' },
        { label: 'foco', value: 'engenharia de growth, pagamentos, integração de IA' },
        { label: 'idiomas', value: 'Português (nativo), Inglês (C1, Cambridge)' },
        { label: 'local', value: 'Belo Horizonte, MG, Brasil' },
      ],
    },
    experience: {
      title: 'Experiência',
      jobs: [
        {
          role: 'Estagiário de Engenharia de Software',
          company: 'allu.',
          url: 'https://allugator.com',
          period: 'Abr 2026 — atual',
          location: 'Belo Horizonte',
          bullets: [
            'Hoje no time de growth, desenvolvendo e mantendo as aplicações da allu. voltadas ao cliente, usadas por 1 milhão+ de pessoas por mês.',
            'Antes, atuei em projetos de infraestrutura de pagamentos em uma plataforma que processa milhões de reais por mês para uma base de 60 mil+ clientes.',
            'Construí um sistema de retentativa de cobranças falhas em Supabase Edge Functions como worker serverless, processando em lote uma fila em PostgreSQL. Recuperou R$591.791,91 em um único mês sem custo adicional de infraestrutura.',
            'Projetei um gateway de pagamentos white-label proprietário com isolamento multi-tenant e entrega de eventos por webhook em tempo real, reutilizável em vários produtos.',
          ],
        },
        {
          role: 'Estagiário de Engenharia de Software',
          company: 'dti Digital',
          url: 'https://www.dtidigital.com.br',
          period: 'Set 2025 — Abr 2026',
          location: 'Belo Horizonte',
          bullets: [
            'Reduzi em 98% o consumo de tokens de contexto na descoberta de ferramentas do MCP Server com o MCP Optimizer, diminuindo custo de API e latência do chatbot.',
            'Projetei e migrei a infraestrutura do chatbot FastAPI de roteamento legado para Model Context Protocol sobre JSON-RPC.',
            'Entreguei features em produção com FastAPI e MCP usadas diariamente por 1.000+ pessoas, reduzindo tempo de tarefas manuais.',
          ],
        },
        {
          role: 'Estagiário de Engenharia de IA',
          company: 'Magic Mango',
          period: 'Dez 2025 — Mai 2026',
          location: 'São Paulo',
          bullets: [
            'Automatizei geração de leads e prospecção de vendas com n8n e scripts em Python/Go, reduzindo tempo de outreach manual em 90%.',
            'Construí ferramentas de análise competitiva para prospects, transformando dados de mercado em insumos para estratégia.',
          ],
        },
        {
          role: 'Desenvolvedor Backend',
          company: 'PUC COMP (empresa júnior)',
          url: 'https://www.puccomp.com.br',
          period: 'Mai 2025 — Set 2025',
          location: 'Belo Horizonte',
          bullets: [
            'Desenvolvi microsserviços em Java Spring Boot para projetos de clientes reais, com foco em arquitetura sustentável.',
            'Traduzi requisitos de negócio em especificações técnicas junto a equipes multidisciplinares.',
          ],
        },
      ],
    },
    projects: {
      title: 'Projetos',
      items: [
        {
          name: 'Courty',
          period: 'Mai 2026 — Ago 2026',
          role: 'Co-fundador & CTO',
          summary:
            'Sistema operacional e camada de pagamentos para arenas esportivas independentes no Brasil: mensalistas, aulas, cobrança PIX recorrente, presença e reservas de quadra. App para jogadores, painel do dono e API.',
          highlights: [
            'Cobrança recorrente via Asaas: assinaturas PIX e cartão, conciliação por webhook, taxa por arena, split de receita entre sócios e antecipação de saldo.',
            'Motor de reservas com locks distribuídos em Redis, templates de disponibilidade semanal, jobs de expiração e atualização de horários em tempo real com Socket.io.',
            'App Expo para jogadores e donos, painel do dono em Next.js e motor de growth com indicações e códigos promocionais.',
          ],
          tech: TECH.courty,
          links: PROJECT_LINKS.courty,
          image: '/projects/courty.png',
        },
        {
          name: 'Agent Cockpit',
          period: 'Abr 2026 — Jun 2026',
          role: 'Co-criador',
          summary:
            'Sala de controle local-first para rodar vários agentes de código ao mesmo tempo. Sessões de Claude Code e Codex lado a lado, cada uma com terminal ao vivo, fila de aprovações classificada por risco, timeline e diffs.',
          highlights: [
            'Adaptadores para Claude Code (hook server) e Codex, cada um com um classificador de risco que avalia comandos antes de executar.',
            'Armazenamento de eventos em SQLite com busca full-text, catch-up de sessão via WebSocket e notas de memória persistentes entre sessões.',
            'Open source. Publicado no npm como @agentcockpit/agent-cockpit.',
          ],
          tech: TECH.cockpit,
          links: PROJECT_LINKS.cockpit,
          image: '/projects/agent-cockpit.png',
        },
        {
          name: 'testa',
          period: 'Out 2026 — atual',
          role: 'Criador',
          summary:
            'Servidor MCP que permite a agentes de código como Claude Code, Codex e Cursor testar a feature que acabaram de implementar, na web via Playwright e no iOS Simulator, incluindo apps React Native.',
          highlights: [
            'Lê o git diff (feature_context) para planejar cenários e os executa com asserções via run_scenario.',
            'Replay com self-heal quando a interface muda, auditoria de acessibilidade com axe-core e mocks de rede.',
            'Guardrails: escalonamento needs_human e confirmação explícita antes de ações de risco, como pagamentos ou exclusões.',
          ],
          tech: TECH.testa,
          links: PROJECT_LINKS.testa,
        },
        {
          name: 'Monity',
          period: 'Jan 2025 — Dez 2025',
          role: 'Fundador, full-stack',
          summary:
            'App de finanças pessoais com categorização de transações por ML, despesas compartilhadas e app mobile. Chegou a 100+ usuários.',
          highlights: [
            'Categorização por ML melhorou a precisão em 80% em relação à marcação manual.',
            'Cache e processamento em lote cortaram chamadas duplicadas de API em 70–90%.',
            'AWS S3 + CloudFront com deploy automatizado, 99,9% de uptime; GitHub Actions levou o deploy de horas para minutos.',
          ],
          tech: TECH.monity,
          links: PROJECT_LINKS.monity,
          image: '/projects/monity.png',
        },
        {
          name: 'Behold',
          period: 'Jun 2025 — Dez 2025',
          role: 'Co-fundador, engenheiro de IA',
          summary:
            'Automação conversacional de e-commerce para lojas Shopify: criação de carrinho, descontos e cálculo de frete feitos por um agente de IA.',
          highlights: [
            'Jornada do cliente da descoberta ao checkout em menos de 30 segundos.',
            'Integração GraphQL + MCP em FastAPI com geração dinâmica de queries, 99% de confiabilidade nas operações Shopify.',
            'Agente em Google ADK com Gemini 2.0 Flash atendendo 50+ conversas simultâneas com estado por sessão.',
          ],
          tech: TECH.behold,
          links: PROJECT_LINKS.behold,
          image: '/projects/behold.png',
        },
        {
          name: 'sofIA',
          period: '2025',
          role: 'Co-fundador, IA / backend',
          summary:
            'Plataforma de pagamentos multi-agente para WhatsApp construída sobre o Agent Payments Protocol (AP2) do Google. PIX, boleto e cartão por conversa.',
          highlights: [
            'Sem instalar app e sem formulário de checkout: o fluxo inteiro acontece na conversa do WhatsApp.',
            'Agentes em Gemini 2.5 Flash orquestrados com Google ADK.',
          ],
          tech: TECH.sofia,
          links: PROJECT_LINKS.sofia,
          image: '/projects/sofia.png',
        },
        {
          name: 'Postable',
          period: '2025',
          role: 'Co-fundador, engenheiro de produto',
          summary:
            'SaaS para pequenas empresas brasileiras planejarem, gerarem e publicarem conteúdo em redes sociais. Backend em Go, frontend em Next.js.',
          highlights: [
            'Pagamentos, autenticação, storage, publicação agendada e cobertura de testes.',
            'Análise de tendências e mapeamento de concorrentes alimentam o gerador de conteúdo.',
          ],
          tech: TECH.postable,
          links: PROJECT_LINKS.postable,
          image: '/projects/postable.png',
        },
        {
          name: 'AlgoFlow',
          period: '2025',
          role: 'Desenvolvedor solo',
          summary:
            'Visualizador interativo de algoritmos com reprodução quadro a quadro e pseudocódigo sincronizado. 31 algoritmos em 4 categorias: ordenação, busca, estruturas de dados e PD. Apache 2.0.',
          highlights: ['Backend em FastAPI com execução de código passo a passo em 8 linguagens.', '200+ usuários.'],
          tech: TECH.algoflow,
          links: PROJECT_LINKS.algoflow,
          image: '/projects/algoflow.png',
        },
      ],
    },
    skills: {
      title: 'Skills',
      groups: [
        { label: 'linguagens', items: SKILLS.languages },
        { label: 'backend', items: SKILLS.backend },
        { label: 'frontend', items: SKILLS.frontend },
        { label: 'dados', items: SKILLS.data },
        { label: 'infra', items: SKILLS.infra },
        { label: 'ia', items: SKILLS.ai },
      ],
    },
    education: {
      title: 'Formação',
      school: 'PUC Minas',
      degree: 'Bacharelado em Ciência da Computação',
      period: '2025 — 2028',
      note: 'Conclusão prevista para 2028',
    },
    awards: {
      title: 'Prêmios',
      items: [
        { title: 'Melhor Trabalho de Desenvolvimento de Software', place: '1º lugar', date: 'Ago 2025' },
        { title: '3º Hackathon Unifecaf', place: '3º lugar', date: 'Jun 2025' },
      ],
    },
    contact: {
      title: 'Contato',
      text: 'Se quiser falar sobre engenharia de growth, pagamentos, tooling para agentes, ou tem algo que vale a pena construir junto, me mande um email.',
      email: 'leostuart05@gmail.com',
      links: SOCIAL,
      footer: 'Leonardo Stuart, Belo Horizonte',
    },
  },
};
