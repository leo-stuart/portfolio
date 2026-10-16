import type { Lang } from './content';

export const CLUE = '__clue__';

export const mascotLines: Record<Lang, Record<string, string[]>> = {
  en: {
    top: ['beep. I test things for a living.', 'try ⌘K, I dare you.', 'that pipeline up there? demo data. the vibes are real.'],
    about: ['he speaks Portuguese, English and fluent TypeScript.', 'BH has the best pão de queijo. not up for debate.'],
    experience: ['growth team = making numbers go up, responsibly.', 'retry workers are just optimism with backoff.'],
    funnel: ['visit → signup → activation → 💸', 'scroll slower, the bars are shy.'],
    projects: ['every row settled successfully. no chargebacks.', 'click a row, it unfolds like a receipt.', CLUE],
    github: ['green squares = commits. grey squares = touching grass.', 'the busiest day is hiding something…'],
    skills: ['yes, he knows Go. no, not the board game.', 'Python for agents, TypeScript for humans.'],
    contact: ['hiring? the palette has a sudo command…', 'say hi, he answers faster than CI.'],
  },
  pt: {
    top: ['bip. eu testo coisas por profissão.', 'aperta ⌘K, duvido.', 'aquele pipeline ali? dados de demo. a vibe é real.'],
    about: ['ele fala português, inglês e TypeScript fluente.', 'BH tem o melhor pão de queijo. sem debate.'],
    experience: ['time de growth = fazer número subir, com responsabilidade.', 'worker de retry é otimismo com backoff.'],
    funnel: ['visita → signup → ativação → 💸', 'rola devagar, as barras são tímidas.'],
    projects: ['todas as linhas liquidadas. zero chargeback.', 'clica numa linha, ela abre igual comprovante.', CLUE],
    github: ['quadrado verde = commit. cinza = tocando grama.', 'o dia mais movimentado esconde algo…'],
    skills: ['sim, ele sabe Go. não, não o jogo de tabuleiro.', 'Python pros agentes, TypeScript pros humanos.'],
    contact: ['contratando? o palette tem um comando sudo…', 'manda um oi, ele responde mais rápido que o CI.'],
  },
};

export const clueText: Record<Lang, string> = {
  en: 'psst… the ⌘K palette accepts a famous test card. 4242…',
  pt: 'psiu… o palette ⌘K aceita um cartão de teste famoso. 4242…',
};
