import type { Lang } from './content';

export const CLUE = '__clue__';

export const mascotLines: Record<Lang, Record<string, string[]>> = {
  en: {
    top: ['beep. I test things for a living.', 'try ⌘K, I dare you.', 'that pipeline up there? demo data. the vibes are real.'],
    about: ['he speaks Portuguese, English and fluent TypeScript.', 'BH has the best pão de queijo. not up for debate.'],
    experience: ['growth + AI = experiments that write their own copy.', 'agents ship faster when someone tests them. hi.'],
    projects: ['every row shipped. zero rollbacks.', 'click a row, it expands like a good diff.', CLUE],
    github: ['green squares = commits. grey squares = touching grass.', 'the busiest day is hiding something…'],
    skills: ['yes, he knows Go. no, not the board game.', 'Python for agents, TypeScript for humans, MCP for both.'],
    contact: ['hiring? the palette has a sudo command…', 'say hi, he answers faster than CI.'],
  },
  pt: {
    top: ['bip. eu testo coisas por profissão.', 'aperta ⌘K, duvido.', 'aquele pipeline ali? dados de demo. a vibe é real.'],
    about: ['ele fala português, inglês e TypeScript fluente.', 'BH tem o melhor pão de queijo. sem debate.'],
    experience: ['growth + IA = experimentos que escrevem o próprio texto.', 'agente entrega mais rápido quando alguém testa. oi.'],
    projects: ['todas as linhas entregues. zero rollback.', 'clica numa linha, ela abre igual um bom diff.', CLUE],
    github: ['quadrado verde = commit. cinza = tocando grama.', 'o dia mais movimentado esconde algo…'],
    skills: ['sim, ele sabe Go. não, não o jogo de tabuleiro.', 'Python pros agentes, TypeScript pros humanos, MCP pros dois.'],
    contact: ['contratando? o palette tem um comando sudo…', 'manda um oi, ele responde mais rápido que o CI.'],
  },
};

export const clueText: Record<Lang, string> = {
  en: 'psst… ⌘K knows how to ship. try: deploy --to …',
  pt: 'psiu… o ⌘K sabe fazer deploy. tenta: deploy --to …',
};
