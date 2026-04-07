export type Lang = 'en' | 'pt';

export interface ProjectItem {
  name: string;
  description: string;
  metric: string;
  metricLabel: string;
  impact: string;
  tech: string[];
  github: string | null;
  live: string | null;
  landing: string | null;
  role: string;
}

export const content = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      downloadCV: 'Download CV',
    },
    hero: {
      eyebrow: '> role.current',
      roles: ['Software Engineer', 'AI Engineer', 'Full-Stack Developer'],
      tagline: 'Building scalable systems at the intersection of AI and infrastructure.',
      viewWork: 'View Projects',
      getInTouch: 'Get in Touch',
    },
    about: {
      title: 'About',
      bio: "I'm a software engineer based in Belo Horizonte, Brazil, specializing in AI systems, backend infrastructure, and full-stack development. I'm currently pursuing a Computer Science degree at PUC Minas while running two simultaneous internships — building production-grade AI agents and automation systems.",
      stats: [
        { value: '1,000+', label: 'Users Impacted' },
        { value: '1+', label: 'Year of Experience' },
      ],
    },
    experience: {
      title: 'Experience',
      jobs: [
        {
          role: 'Software Engineering Intern',
          company: 'dti Digital',
          period: 'Sep 2025 — Present',
          location: 'Belo Horizonte, MG',
          bullets: [
            'Reduced MCP Server context token consumption by 98% implementing MCP Optimizer, cutting API costs and improving chatbot response latency',
            'Architected and migrated FastAPI chatbot infrastructure from legacy routing to Model Context Protocol (MCP) using JSON-RPC, ensuring scalability for production AI agent systems',
            'Delivered end-to-end features from design to deployment — covering API integration, MCP tooling, and production testing',
          ],
        },
        {
          role: 'AI Engineering Intern',
          company: 'Magic Mango',
          period: 'Dec 2025 — Present',
          location: 'São Paulo, SP',
          bullets: [
            'Automated lead generation and sales prospecting workflows using n8n and Python/Go scripts, reducing manual outreach time by 90%',
            'Built data aggregation pipelines to generate competitive intelligence reports, helping prospects benchmark against market alternatives',
          ],
        },
        {
          role: 'Backend Developer',
          company: 'PUC COMP — Junior Company',
          period: 'May 2025 — Sep 2025',
          location: 'Belo Horizonte, MG',
          bullets: [
            'Developed robust microservices with Java Spring Boot for real client projects, focusing on scalable class architecture and enterprise-grade solutions',
            'Worked in a cross-functional team to scope, estimate, and document technical requirements for external client deliverables',
          ],
        },
      ],
    },
    projects: {
      title: 'Selected Work',
      items: [
        {
          name: 'Monity',

          description: 'AI-powered personal finance platform with intelligent transaction categorization, collaborative expense splitting, real-time insights, and a companion mobile app. Scaled to 100+ users.',
          metric: '100+ users',
          metricLabel: 'Active Users',
          impact: '80% better categorization accuracy vs. manual',
          tech: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Supabase', 'ML', 'AWS'],
          github: 'https://github.com/Monity-FinanceTracker/Monity',
          live: 'https://app.monity-finance.com',
          landing: 'https://monity-landing-page.vercel.app',
          role: 'Founder & Full-Stack Developer',
        },
        {
          name: 'AlgoFlow',
          description: 'Interactive algorithm visualization platform with frame-by-frame playback, 25+ algorithms across sorting, searching, graph traversal, and dynamic programming, with synchronized pseudocode highlighting.',
          metric: '200+',
          metricLabel: 'Users',
          impact: 'Open source under Apache 2.0 — covers 6 CS categories: sorting, searching, graph traversal, DP, and more',
          tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Recharts', 'Tailwind CSS'],
          github: 'https://github.com/TheAlgoFlow/AlgoFlow',
          live: 'https://app.thealgoflow.com',
          landing: 'https://thealgoflow.com',
          role: 'Founder & Solo Developer',
        },
        {
          name: 'Postable',
          description: 'SaaS platform for Brazilian SMBs to manage and AI-generate social media content. Analyzes local trends, maps competitors, and publishes ready-to-use posts across networks. Built with Go backend and Next.js frontend.',
          metric: 'SMB',
          metricLabel: 'Target Market',
          impact: 'Production-ready: payments, auth, storage, automated publishing, and test coverage',
          tech: ['Next.js', 'Go', 'PostgreSQL', 'Stripe', 'Supabase', 'Docker', 'AI'],
          github: 'https://github.com/postable-org/postable',
          live: 'https://app.thepostable.com',
          landing: 'https://thepostable.com',
          role: 'Co-founder & Product Engineer',
        },
        {
          name: 'sofIA',
          description: 'Multi-agent AI payment platform for WhatsApp using Google\'s AP2 (Agent Payments Protocol). Handles PIX, boleto, and credit card payments through natural conversation with Gemini 2.5 Flash.',
          metric: '90%',
          metricLabel: 'Checkout Drop Reduction',
          impact: 'Eliminates app installs and checkout forms — payments happen entirely inside a WhatsApp conversation',
          tech: ['Python', 'FastAPI', 'Google ADK', 'Gemini 2.5', 'Node.js', 'PostgreSQL', 'Docker'],
          github: 'https://github.com/sofIA-Payment-Agent/sofIA-payment-agent',
          live: null,
          landing: null as string | null,
          role: 'Co-founder & AI/Backend Engineer',
        },
      ],
    },
    skills: {
      title: 'Tech Stack',
      categories: [
        { label: '// languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'C#', 'SQL'] },
        { label: '// backend', items: ['FastAPI', 'Node.js', 'NestJS', 'Express', 'Spring Boot', 'GraphQL', 'REST APIs', 'JSON-RPC'] },
        { label: '// frontend', items: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'] },
        { label: '// infra & tools', items: ['AWS (S3, CloudFront)', 'Docker', 'GitHub Actions', 'CI/CD', 'Redis', 'PostgreSQL', 'MySQL'] },
        { label: '// ai & ml', items: ['MCP Protocol', 'Gemini AI', 'Google ADK', 'n8n', 'Machine Learning', 'LLM Integration'] },
      ],
    },
    awards: {
      title: 'Recognition',
      items: [
        {
          emoji: '🥇',
          title: 'Best Software Development Work',
          place: '1st Place',
          date: 'August 2025',
        },
        {
          emoji: '🥉',
          title: '3rd Hackathon Unifecaf',
          place: '3rd Place',
          date: 'June 2025',
        },
      ],
    },
    contact: {
      title: "Let's build something.",
      subtitle: 'Open to freelance projects, collaborations, and full-time opportunities.',
      emailLabel: 'Send an email',
      email: 'leostuart05@gmail.com',
      footer: '© 2026 Leonardo Stuart',
    },
  },
  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      skills: 'Habilidades',
      contact: 'Contato',
      downloadCV: 'Baixar CV',
    },
    hero: {
      eyebrow: '> role.atual',
      roles: ['Engenheiro de Software', 'Engenheiro de IA', 'Desenvolvedor Full-Stack'],
      tagline: 'Construindo sistemas escaláveis na interseção entre IA e infraestrutura.',
      viewWork: 'Ver Projetos',
      getInTouch: 'Entrar em Contato',
    },
    about: {
      title: 'Sobre',
      bio: 'Sou engenheiro de software baseado em Belo Horizonte, especializado em sistemas de IA, infraestrutura backend e desenvolvimento full-stack. Estudo Ciência da Computação na PUC Minas enquanto realizo dois estágios simultâneos — construindo agentes de IA e sistemas de automação em produção.',
      stats: [
        { value: '1.000+', label: 'Usuários Impactados' },
        { value: '1+', label: 'Ano de Experiência' },
      ],
    },
    experience: {
      title: 'Experiência',
      jobs: [
        {
          role: 'Estagiário de Engenharia de Software',
          company: 'dti Digital',
          period: 'Set 2025 — Presente',
          location: 'Belo Horizonte, MG',
          bullets: [
            'Reduziu em 98% o consumo de tokens do MCP Server implementando MCP Optimizer, diminuindo custos de API e melhorando latência do chatbot',
            'Arquitetou e migrou a infraestrutura FastAPI de sistema de roteamento legado para Model Context Protocol (MCP) com JSON-RPC',
            'Entregou funcionalidades de ponta a ponta — cobrindo integração de API, ferramentas MCP e testes em produção',
          ],
        },
        {
          role: 'Estagiário de Engenharia de IA',
          company: 'Magic Mango',
          period: 'Dez 2025 — Presente',
          location: 'São Paulo, SP',
          bullets: [
            'Automatizou workflows de geração de leads com n8n e Python/Go, reduzindo tempo de outreach manual em 90%',
            'Construiu pipelines de agregação de dados para gerar relatórios de inteligência competitiva, auxiliando prospects a comparar alternativas de mercado',
          ],
        },
        {
          role: 'Desenvolvedor Backend',
          company: 'PUC COMP — Empresa Júnior',
          period: 'Mai 2025 — Set 2025',
          location: 'Belo Horizonte, MG',
          bullets: [
            'Desenvolveu microsserviços robustos com Java Spring Boot para projetos de clientes reais, focando em arquitetura escalável',
            'Atuou em equipe multidisciplinar para escopo, estimativa e documentação de requisitos técnicos de projetos para clientes externos',
          ],
        },
      ],
    },
    projects: {
      title: 'Trabalhos Selecionados',
      items: [
        {
          name: 'Monity',
          description: 'Plataforma de finanças pessoais com IA, categorização inteligente de transações, divisão colaborativa de despesas, insights em tempo real e app mobile. Escalou para 100+ usuários.',
          metric: '100+ usuários',
          metricLabel: 'Usuários Ativos',
          impact: '80% mais precisão na categorização vs. manual',
          tech: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'Supabase', 'ML', 'AWS'],
          github: 'https://github.com/Monity-FinanceTracker/Monity',
          live: 'https://app.monity-finance.com',
          landing: 'https://monity-landing-page.vercel.app',
          role: 'Fundador & Desenvolvedor Full-Stack',
        },
        {
          name: 'AlgoFlow',
          description: 'Plataforma de visualização interativa de algoritmos com reprodução quadro a quadro, 25+ algoritmos em sorting, busca, grafos e programação dinâmica, com pseudocódigo sincronizado.',
          metric: '200+',
          metricLabel: 'Usuários',
          impact: 'Open source Apache 2.0 — cobre 6 categorias de CS: ordenação, busca, grafos, programação dinâmica e mais',
          tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Recharts', 'Tailwind CSS'],
          github: 'https://github.com/TheAlgoFlow/AlgoFlow',
          live: 'https://app.thealgoflow.com',
          landing: 'https://thealgoflow.com',
          role: 'Fundador & Desenvolvedor Solo',
        },
        {
          name: 'Postable',
          description: 'Plataforma SaaS para PMEs brasileiras gerenciarem e gerarem conteúdo para redes sociais com IA. Analisa tendências locais, mapeia concorrentes e publica posts prontos. Backend em Go e frontend em Next.js.',
          metric: 'PME',
          metricLabel: 'Mercado-Alvo',
          impact: 'Pronto para produção: pagamentos, autenticação, storage, publicação automatizada e cobertura de testes',
          tech: ['Next.js', 'Go', 'PostgreSQL', 'Stripe', 'Supabase', 'Docker', 'IA'],
          github: 'https://github.com/postable-org/postable',
          live: 'https://app.thepostable.com',
          landing: null as string | null,
          role: 'Co-fundador & Engenheiro de Produto',
        },
        {
          name: 'sofIA',
          description: 'Plataforma de pagamentos multi-agente para WhatsApp usando o AP2 (Agent Payments Protocol) do Google. Processa PIX, boleto e cartão via conversa natural com Gemini 2.5 Flash.',
          metric: '90%',
          metricLabel: 'Redução de Abandono',
          impact: 'Elimina instalação de apps e formulários de checkout — pagamentos acontecem dentro de uma conversa no WhatsApp',
          tech: ['Python', 'FastAPI', 'Google ADK', 'Gemini 2.5', 'Node.js', 'PostgreSQL', 'Docker'],
          github: 'https://github.com/sofIA-Payment-Agent/sofIA-payment-agent',
          live: null,
          landing: null as string | null,
          role: 'Co-fundador & Engenheiro de IA/Backend',
        },
      ],
    },
    skills: {
      title: 'Stack Técnico',
      categories: [
        { label: '// linguagens', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'C#', 'SQL'] },
        { label: '// backend', items: ['FastAPI', 'Node.js', 'NestJS', 'Express', 'Spring Boot', 'GraphQL', 'REST APIs', 'JSON-RPC'] },
        { label: '// frontend', items: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'] },
        { label: '// infra & ferramentas', items: ['AWS (S3, CloudFront)', 'Docker', 'GitHub Actions', 'CI/CD', 'Redis', 'PostgreSQL', 'MySQL'] },
        { label: '// ia & ml', items: ['Protocolo MCP', 'Gemini AI', 'Google ADK', 'n8n', 'Machine Learning', 'Integração LLM'] },
      ],
    },
    awards: {
      title: 'Reconhecimento',
      items: [
        {
          emoji: '🥇',
          title: 'Melhor Trabalho de Desenvolvimento de Software',
          place: '1º Lugar',
          date: 'Agosto 2025',
        },
        {
          emoji: '🥉',
          title: '3º Hackathon Unifecaf',
          place: '3º Lugar',
          date: 'Junho 2025',
        },
      ],
    },
    contact: {
      title: 'Vamos construir algo.',
      subtitle: 'Aberto a projetos freelance, colaborações e oportunidades de trabalho.',
      emailLabel: 'Enviar um email',
      email: 'leostuart05@gmail.com',
      footer: '© 2026 Leonardo Stuart.',
    },
  },
};
