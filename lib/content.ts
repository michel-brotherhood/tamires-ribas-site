/**
 * content.ts
 * -----------------------------------------------------------------------------
 * Conteúdo editável do site: PROJETOS (portfólio) e DEPOIMENTOS.
 *
 * ✅ É AQUI que você adiciona projetos de clientes e depoimentos depois.
 *    Basta seguir o formato dos exemplos. As páginas se montam sozinhas.
 *
 * Imagens dos projetos: coloque em public/projetos/ e referencie o caminho
 * (ex.: "/projetos/casa-aurora-01.webp"). Se a imagem não existir, a página
 * mostra um placeholder elegante no lugar — nada quebra.
 * -----------------------------------------------------------------------------
 */

export type Project = {
  slug: string; // usado na URL: /projetos/[slug]
  title: string;
  location: string;
  year: string;
  category: string; // ex.: "Residencial", "Corporativo"
  area: string; // ex.: "420 m²"
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

/* ============================================================================
   PROJETOS (exemplos — substitua pelos reais)
   ============================================================================ */
export const PROJECTS: Project[] = [
  {
    slug: "casa-aurora",
    title: "Casa Aurora",
    location: "Itu · SP",
    year: "2025",
    category: "Residencial",
    area: "420 m²",
    summary:
      "Residência de três pavimentos que equilibra concreto aparente, madeira e grandes panos de vidro.",
    description: [
      "A Casa Aurora nasce de um terreno em leve aclive, organizado em três pavimentos que acompanham a topografia.",
      "A paleta de materiais — concreto aparente, madeira natural e vidro — foi escolhida para envelhecer bem e dialogar com a vegetação ao redor.",
      "A circulação central conecta visualmente o jardim, as áreas sociais e os dormitórios, reforçando a sensação de continuidade entre interior e exterior.",
    ],
    cover: "/projetos/casa-aurora-cover.webp",
    gallery: [
      "/projetos/casa-aurora-01.webp",
      "/projetos/casa-aurora-02.webp",
      "/projetos/casa-aurora-03.webp",
    ],
  },
  {
    slug: "residencia-mata",
    title: "Residência Mata",
    location: "Campos do Jordão · SP",
    year: "2024",
    category: "Residencial",
    area: "310 m²",
    summary:
      "Refúgio de montanha com volumes baixos, lareira central e aberturas voltadas à mata.",
    description: [
      "Pensada como um refúgio, a Residência Mata privilegia volumes baixos e horizontais que se assentam no terreno.",
      "A lareira central organiza o estar, enquanto as aberturas emolduram a mata nativa como uma pintura viva ao longo do dia.",
    ],
    cover: "/projetos/residencia-mata-cover.webp",
    gallery: [
      "/projetos/residencia-mata-01.webp",
      "/projetos/residencia-mata-02.webp",
    ],
  },
  {
    slug: "pavilhao-corporativo",
    title: "Pavilhão Corporativo",
    location: "São Paulo · SP",
    year: "2023",
    category: "Corporativo",
    area: "1.200 m²",
    summary:
      "Sede corporativa com fachada modular, pátio interno e luz natural difusa nos ambientes de trabalho.",
    description: [
      "O Pavilhão Corporativo propõe um ambiente de trabalho permeado por luz natural difusa e áreas de convívio.",
      "A fachada modular controla a incidência solar e cria um ritmo sóbrio, enquanto o pátio interno traz vegetação ao coração do edifício.",
    ],
    cover: "/projetos/pavilhao-corporativo-cover.webp",
    gallery: ["/projetos/pavilhao-corporativo-01.webp"],
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
