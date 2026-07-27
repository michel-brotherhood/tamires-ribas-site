/**
 * content.ts
 * -----------------------------------------------------------------------------
 * Conteúdo editável do site: PROJETOS (portfólio) e DEPOIMENTOS.
 *
 * ✅ É AQUI que você adiciona novos projetos de clientes e depoimentos.
 *    Basta seguir o formato dos exemplos. As páginas se montam sozinhas.
 *
 * Imagens dos projetos: coloque em public/projetos/ e referencie o caminho
 * (ex.: "/projetos/casa-camboinhas-01.webp"). Se a imagem não existir, a
 * página mostra um placeholder elegante no lugar — nada quebra.
 *
 * location / year / area são opcionais: quando um projeto não tiver o dado
 * (obra antiga, cliente que preferiu não informar etc.), simplesmente omita
 * o campo — a página se ajusta sozinha e não mostra "undefined" nem traços
 * soltos.
 * -----------------------------------------------------------------------------
 */

export type Project = {
  slug: string; // usado na URL: /projetos/[slug]
  title: string;
  location?: string;
  year?: string;
  category: string; // ex.: "Residencial", "Comercial"
  area?: string; // ex.: "420 m²"
  summary: string; // frase curta (cartão e topo da página)
  description: string[]; // parágrafos da página do projeto
  cover: string; // imagem de capa
  gallery: string[]; // imagens internas
  panorama?: string; // (opcional) slug/arquivo para futuro link ao tour 360
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string; // ex.: "Cliente · Casa Aurora"
  avatar?: string; // foto do cliente (opcional). Ex.: "/depoimentos/marina.webp"
};

/** Junta local, ano e área com " · ", pulando o que não existir. */
export function projectMeta(p: Project): string {
  return [p.location, p.year, p.area].filter(Boolean).join(" · ");
}

/* ============================================================================
   PROJETOS — obras reais da TR Arquitetura e Interiores.
   Os 3 primeiros aparecem em destaque na home ("Projetos recentes").
   ============================================================================ */
export const PROJECTS: Project[] = [
  {
    slug: "casa-camboinhas",
    title: "Casa Camboinhas",
    location: "Camboinhas · Niterói, RJ",
    category: "Residencial",
    summary:
      "Residência contemporânea em concreto, madeira e pedra, com piscina, spa e área gourmet integradas ao jardim.",
    description: [
      "A Casa Camboinhas equilibra volumes de concreto aparente com painéis de madeira ripada e revestimento em pedra, formando uma fachada sóbria que se abre totalmente para os fundos.",
      "Piscina, spa e deck se conectam à área gourmet coberta, criando um percurso contínuo entre dentro e fora — pensado tanto para o dia a dia da família quanto para receber.",
      "À noite, a iluminação cênica recorta os volumes e a lâmina d'água, reforçando o caráter escultórico do projeto.",
    ],
    cover: "/projetos/casa-camboinhas-cover.webp",
    gallery: [
      "/projetos/casa-camboinhas-01.webp",
      "/projetos/casa-camboinhas-02.webp",
      "/projetos/casa-camboinhas-03.webp",
      "/projetos/casa-camboinhas-04.webp",
      "/projetos/casa-camboinhas-05.webp",
    ],
  },
  {
    slug: "apartamento-pablo-domingues",
    title: "Apartamento Pablo Domingues",
    category: "Residencial",
    year: "2020",
    summary:
      "Apartamento em tons de azul-marinho e amadeirado, com cozinha americana integrada e ambientes sociais aconchegantes.",
    description: [
      "O projeto parte de uma paleta de azul-marinho, creme e madeira natural para criar ambientes sociais aconchegantes e com identidade forte.",
      "A cozinha americana com marcenaria clara se conecta à sala de jantar, enquanto a sala de estar ganha uma segunda composição de estar mais intimista, com tapete geométrico e poltronas de referência escandinava.",
      "Quadros com paisagens do Rio de Janeiro reforçam a conexão do morador com a cidade.",
    ],
    cover: "/projetos/apartamento-pablo-domingues-cover.webp",
    gallery: [
      "/projetos/apartamento-pablo-domingues-01.webp",
      "/projetos/apartamento-pablo-domingues-02.webp",
      "/projetos/apartamento-pablo-domingues-03.webp",
      "/projetos/apartamento-pablo-domingues-04.webp",
      "/projetos/apartamento-pablo-domingues-05.webp",
    ],
  },
  {
    slug: "apartamento-niteroi",
    title: "Apartamento Niterói",
    location: "Niterói, RJ",
    category: "Residencial",
    summary:
      "Apartamento familiar com suíte em madeira natural, banheiro infantil colorido e quarto temático para as crianças.",
    description: [
      "Pensado para uma rotina em família, o apartamento une a suíte principal — revestida em madeira natural, com iluminação pontual em pendentes globo — a um banheiro social lúdico, com azulejos coloridos em composição geométrica.",
      "O quarto das crianças ganhou beliche sob medida e parede temática de exploração espacial, com nichos iluminados para os brinquedos.",
      "Em todos os ambientes, a marcenaria clara e os toques de latão costuram a identidade do projeto, do quarto principal ao infantil.",
    ],
    cover: "/projetos/apartamento-niteroi-cover.webp",
    gallery: [
      "/projetos/apartamento-niteroi-01.webp",
      "/projetos/apartamento-niteroi-02.webp",
      "/projetos/apartamento-niteroi-03.webp",
      "/projetos/apartamento-niteroi-04.webp",
      "/projetos/apartamento-niteroi-05.webp",
    ],
  },
  {
    slug: "apartamento-santa-rosa",
    title: "Apartamento Santa Rosa",
    location: "Santa Rosa · Niterói, RJ",
    year: "2022",
    category: "Residencial",
    summary:
      "Cozinha e áreas de apoio renovadas com marcenaria verde-sálvia, ferragens douradas e bancadas em quartzo branco.",
    description: [
      "A reforma da cozinha adotou marcenaria verde-sálvia com portas de vidro canelado, contrastando com bancadas em quartzo branco e ferragens douradas.",
      "Um nicho iluminado em madeira natural abriga potes e utensílios do dia a dia, enquanto a bancada de refeições rápidas se conecta ao living por uma abertura ampla.",
      "No lavabo, um espelho circular emoldurado em madeira e ladrilhos geométricos em tons pastel completam a identidade do projeto.",
    ],
    cover: "/projetos/apartamento-santa-rosa-cover.webp",
    gallery: [
      "/projetos/apartamento-santa-rosa-01.webp",
      "/projetos/apartamento-santa-rosa-02.webp",
      "/projetos/apartamento-santa-rosa-03.webp",
      "/projetos/apartamento-santa-rosa-04.webp",
    ],
  },
  {
    slug: "apartamento-icarai",
    title: "Apartamento Icaraí",
    location: "Icaraí · Niterói, RJ",
    category: "Residencial · Reforma",
    summary:
      "Reforma de banheiros com travertino, torneiras douradas e composições vegetais que trazem leveza ao ambiente.",
    description: [
      "A reforma dos banheiros do apartamento explorou o travertino como fio condutor, combinado a torneiras e metais dourados que aquecem a paleta neutra.",
      "Cubas de apoio, espelhos com iluminação embutida e composições com folhagens (como costela-de-adão e estrelítzia) trazem leveza aos ambientes.",
      "O resultado são banheiros espaçosos, com iluminação em camadas e acabamento hotel-like.",
    ],
    cover: "/projetos/apartamento-icarai-cover.webp",
    gallery: [
      "/projetos/apartamento-icarai-01.webp",
      "/projetos/apartamento-icarai-02.webp",
      "/projetos/apartamento-icarai-03.webp",
      "/projetos/apartamento-icarai-04.webp",
    ],
  },
  {
    slug: "clinica-juliane-passos",
    title: "Clínica Juliane Passos",
    category: "Comercial · Estética",
    summary:
      "Clínica de estética com marcenaria ripada, mármore Calacatta e iluminação dourada que reforçam a identidade da marca.",
    description: [
      "Na recepção, a logomarca em latão sobre mármore Calacatta e a marcenaria ripada em madeira natural criam a primeira impressão da clínica — sofisticada e acolhedora.",
      "Nas salas de atendimento, mesas com estrutura em latão, cadeiras estofadas e arranjos florais mantêm a coerência visual em um ambiente clínico que não abre mão da elegância.",
      "A iluminação em fita de LED embutida desenha o teto e reforça o caráter contemporâneo do projeto.",
    ],
    cover: "/projetos/clinica-juliane-passos-cover.webp",
    gallery: [
      "/projetos/clinica-juliane-passos-01.webp",
      "/projetos/clinica-juliane-passos-02.webp",
      "/projetos/clinica-juliane-passos-03.webp",
      "/projetos/clinica-juliane-passos-04.webp",
    ],
  },
  {
    slug: "consultorio-cassia-jardim",
    title: "Consultório Cássia Jardim",
    category: "Comercial · Estética",
    summary:
      "Consultório com marcenaria ripada, nichos iluminados para objetos decorativos e sala de atendimento acolhedora.",
    description: [
      "O painel ripado com nichos iluminados organiza a decoração do consultório, valorizando peças cerâmicas e composições vegetais em meio à luz indireta.",
      "Na sala de atendimento, a poltrona reclinável branca contrasta com a marcenaria em tom de madeira natural, criando um ambiente clínico que transmite cuidado e conforto.",
    ],
    cover: "/projetos/consultorio-cassia-jardim-cover.webp",
    gallery: [
      "/projetos/consultorio-cassia-jardim-01.webp",
      "/projetos/consultorio-cassia-jardim-02.webp",
      "/projetos/consultorio-cassia-jardim-03.webp",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/* ============================================================================
   DEPOIMENTOS (exemplos — substitua pelos reais)
   ============================================================================ */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A TR traduziu em arquitetura exatamente a sensação de aconchego que buscávamos. Cada ambiente tem a nossa cara.",
    author: "Marina e Rafael",
    role: "Residência · Rio de Janeiro",
    avatar: "/depoimentos/marina-rafael.webp",
  },
  {
    quote:
      "Profissionalismo do primeiro esboço à última visita de obra. O resultado superou o que imaginávamos.",
    author: "Helena Costa",
    role: "Residência Mata · Campos do Jordão",
    avatar: "/depoimentos/helena.webp",
  },
  {
    quote:
      "Conseguiram unir identidade da marca e bem-estar dos times em um só projeto. Nosso escritório ganhou vida.",
    author: "Diretoria",
    role: "Pavilhão Corporativo · São Paulo",
    avatar: "/depoimentos/diretoria.webp",
  },
];
