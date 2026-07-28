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
    slug: "casa-rafaella-leandro",
    title: "Casa Rafaella e Leandro",
    category: "Residencial",
    summary:
      "Casa contemporânea com pé-direito duplo, escada escultórica em espiral, piscina e placas solares.",
    description: [
      "A casa se organiza em torno de um living de pé-direito duplo, iluminado por painéis ripados de madeira e uma escada em espiral que se torna o elemento escultórico central do projeto.",
      "A sala de jantar ganha uma adega envidraçada embutida e telas de arte contemporânea que dialogam com o verde visto pelas esquadrias amplas — tudo integrado à cozinha aberta e à área de piscina nos fundos.",
      "Vista aérea revela ainda a cobertura com placas solares, reforçando o compromisso do projeto com eficiência energética sem abrir mão do design autoral.",
    ],
    cover: "/projetos/casa-rafaella-leandro-cover.webp",
    gallery: [
      "/projetos/casa-rafaella-leandro-01.webp",
      "/projetos/casa-rafaella-leandro-02.webp",
      "/projetos/casa-rafaella-leandro-03.webp",
      "/projetos/casa-rafaella-leandro-04.webp",
      "/projetos/casa-rafaella-leandro-05.webp",
      "/projetos/casa-rafaella-leandro-06.webp",
      "/projetos/casa-rafaella-leandro-07.webp",
      "/projetos/casa-rafaella-leandro-08.webp",
      "/projetos/casa-rafaella-leandro-09.webp",
      "/projetos/casa-rafaella-leandro-10.webp",
      "/projetos/casa-rafaella-leandro-11.webp",
      "/projetos/casa-rafaella-leandro-12.webp",
      "/projetos/casa-rafaella-leandro-13.webp",
      "/projetos/casa-rafaella-leandro-14.webp",
      "/projetos/casa-rafaella-leandro-15.webp",
      "/projetos/casa-rafaella-leandro-16.webp",
      "/projetos/casa-rafaella-leandro-17.webp",
    ],
  },
  {
    slug: "vertice-rio",
    title: "Vértice Rio",
    category: "Comercial",
    summary:
      "Clínica multiespecialidade com 9 consultórios, sala de reuniões e identidade visual coesa em madeira natural.",
    description: [
      "Na recepção, a marca Vértice Rio ganha destaque em metal sobre mármore, dando o tom sofisticado que se repete em todos os consultórios do andar.",
      "Cada um dos nove consultórios recebeu a mesma linguagem — marcenaria em madeira natural, iluminação indireta em fita de LED, poltronas reclináveis e nichos com plantas — garantindo identidade visual coesa mesmo com profissionais diferentes atendendo em cada sala.",
      "Uma escada iluminada conecta os pavimentos, e a sala de espera ganhou uma parede viva de plantas ao lado do sofá — um respiro verde antes da sala de reuniões/treinamento que arremata um projeto pensado para operar em grande escala sem perder o acolhimento.",
    ],
    cover: "/projetos/vertice-rio-cover.webp",
    gallery: [
      "/projetos/vertice-rio-01.webp",
      "/projetos/vertice-rio-02.webp",
      "/projetos/vertice-rio-03.webp",
      "/projetos/vertice-rio-04.webp",
      "/projetos/vertice-rio-05.webp",
      "/projetos/vertice-rio-06.webp",
      "/projetos/vertice-rio-07.webp",
      "/projetos/vertice-rio-08.webp",
      "/projetos/vertice-rio-09.webp",
      "/projetos/vertice-rio-10.webp",
      "/projetos/vertice-rio-11.webp",
      "/projetos/vertice-rio-12.webp",
      "/projetos/vertice-rio-13.webp",
      "/projetos/vertice-rio-14.webp",
      "/projetos/vertice-rio-15.webp",
      "/projetos/vertice-rio-16.webp",
      "/projetos/vertice-rio-17.webp",
      "/projetos/vertice-rio-18.webp",
      "/projetos/vertice-rio-19.webp",
      "/projetos/vertice-rio-20.webp",
      "/projetos/vertice-rio-21.webp",
      "/projetos/vertice-rio-22.webp",
      "/projetos/vertice-rio-23.webp",
      "/projetos/vertice-rio-24.webp",
      "/projetos/vertice-rio-25.webp",
      "/projetos/vertice-rio-26.webp",
      "/projetos/vertice-rio-27.webp",
      "/projetos/vertice-rio-28.webp",
      "/projetos/vertice-rio-29.webp",
      "/projetos/vertice-rio-30.webp",
      "/projetos/vertice-rio-31.webp",
      "/projetos/vertice-rio-32.webp",
      "/projetos/vertice-rio-33.webp",
      "/projetos/vertice-rio-34.webp",
      "/projetos/vertice-rio-35.webp",
      "/projetos/vertice-rio-36.webp",
      "/projetos/vertice-rio-37.webp",
      "/projetos/vertice-rio-38.webp",
      "/projetos/vertice-rio-39.webp",
      "/projetos/vertice-rio-40.webp",
    ],
  },
  {
    slug: "apartamento-flamengo",
    title: "Apartamento Flamengo",
    location: "Flamengo · Rio de Janeiro, RJ",
    category: "Residencial",
    summary:
      "Apartamento colorido e cheio de personalidade, com cozinha em laca verde-petróleo e cantinho musical com instrumentos na parede.",
    description: [
      "A cozinha em laca verde-petróleo com bancada em mármore é o contraponto vibrante de um apartamento que também investe em painéis 3D de gesso, quadros autorais e composições com plantas.",
      "Um canto dedicado à música — com violões pendurados como elementos decorativos — mostra como o projeto se molda à personalidade de quem mora ali.",
      "Na sala de jantar, pendentes em esfera e uma mesa em madeira maciça reúnem a família em um ambiente ao mesmo tempo sofisticado e descontraído.",
    ],
    cover: "/projetos/apartamento-flamengo-cover.webp",
    gallery: [
      "/projetos/apartamento-flamengo-01.webp",
      "/projetos/apartamento-flamengo-02.webp",
      "/projetos/apartamento-flamengo-03.webp",
      "/projetos/apartamento-flamengo-04.webp",
      "/projetos/apartamento-flamengo-05.webp",
      "/projetos/apartamento-flamengo-06.webp",
      "/projetos/apartamento-flamengo-07.webp",
      "/projetos/apartamento-flamengo-08.webp",
      "/projetos/apartamento-flamengo-09.webp",
      "/projetos/apartamento-flamengo-10.webp",
      "/projetos/apartamento-flamengo-11.webp",
      "/projetos/apartamento-flamengo-12.webp",
      "/projetos/apartamento-flamengo-13.webp",
      "/projetos/apartamento-flamengo-14.webp",
      "/projetos/apartamento-flamengo-15.webp",
      "/projetos/apartamento-flamengo-16.webp",
      "/projetos/apartamento-flamengo-17.webp",
      "/projetos/apartamento-flamengo-18.webp",
      "/projetos/apartamento-flamengo-19.webp",
      "/projetos/apartamento-flamengo-20.webp",
      "/projetos/apartamento-flamengo-21.webp",
      "/projetos/apartamento-flamengo-22.webp",
      "/projetos/apartamento-flamengo-23.webp",
      "/projetos/apartamento-flamengo-24.webp",
      "/projetos/apartamento-flamengo-25.webp",
    ],
  },
  {
    slug: "apartamento-renata-emerson",
    title: "Apartamento Renata e Emerson",
    location: "Niterói, RJ",
    category: "Residencial",
    summary:
      "Apartamento autoral com sofá verde-esmeralda, arte editorial em preto e branco e jardim vertical na varanda.",
    description: [
      "O sofá de veludo verde-esmeralda e a curadoria de arte em preto e branco — com destaque para um retrato gráfico de borboleta — dão o tom autoral deste projeto.",
      "Na varanda, um jardim vertical transforma a área externa em uma extensão viva do apartamento, criando um refúgio verde em meio à cidade.",
      "Na cozinha, papel de parede botânico em preto e branco reforça a identidade visual marcante que percorre todos os ambientes.",
    ],
    cover: "/projetos/apartamento-renata-emerson-cover.webp",
    gallery: [
      "/projetos/apartamento-renata-emerson-01.webp",
      "/projetos/apartamento-renata-emerson-02.webp",
      "/projetos/apartamento-renata-emerson-03.webp",
      "/projetos/apartamento-renata-emerson-04.webp",
      "/projetos/apartamento-renata-emerson-05.webp",
      "/projetos/apartamento-renata-emerson-06.webp",
      "/projetos/apartamento-renata-emerson-07.webp",
      "/projetos/apartamento-renata-emerson-08.webp",
      "/projetos/apartamento-renata-emerson-09.webp",
      "/projetos/apartamento-renata-emerson-10.webp",
      "/projetos/apartamento-renata-emerson-11.webp",
      "/projetos/apartamento-renata-emerson-12.webp",
      "/projetos/apartamento-renata-emerson-13.webp",
      "/projetos/apartamento-renata-emerson-14.webp",
      "/projetos/apartamento-renata-emerson-15.webp",
      "/projetos/apartamento-renata-emerson-16.webp",
      "/projetos/apartamento-renata-emerson-17.webp",
      "/projetos/apartamento-renata-emerson-18.webp",
      "/projetos/apartamento-renata-emerson-19.webp",
      "/projetos/apartamento-renata-emerson-20.webp",
      "/projetos/apartamento-renata-emerson-21.webp",
      "/projetos/apartamento-renata-emerson-22.webp",
    ],
  },
  {
    slug: "apartamento-raquel-renato",
    title: "Apartamento Raquel e Renato",
    category: "Residencial",
    summary:
      "Apartamento cercado de verde, com quartos infantis lúdicos e varanda gourmet integrada ao jardim.",
    description: [
      "Cercado por vegetação exuberante vista de praticamente todos os ambientes, o apartamento equilibra áreas sociais leves com quartos infantis cheios de cor — um deles com parede ilustrada de mapa-múndi.",
      "A cozinha ganhou marcenaria branca com detalhes em turquesa, enquanto a varanda gourmet se abre totalmente para o jardim, esticando o convívio para fora dos limites do apartamento.",
      "Cada dormitório infantil recebeu uma identidade própria — de um cantinho de estudos lúdico a um quarto com parede ilustrada de mapa-múndi — sem perder a coerência com o restante do projeto.",
    ],
    cover: "/projetos/apartamento-raquel-renato-cover.webp",
    gallery: [
      "/projetos/apartamento-raquel-renato-01.webp",
      "/projetos/apartamento-raquel-renato-02.webp",
      "/projetos/apartamento-raquel-renato-03.webp",
      "/projetos/apartamento-raquel-renato-04.webp",
      "/projetos/apartamento-raquel-renato-05.webp",
      "/projetos/apartamento-raquel-renato-06.webp",
      "/projetos/apartamento-raquel-renato-07.webp",
      "/projetos/apartamento-raquel-renato-08.webp",
      "/projetos/apartamento-raquel-renato-09.webp",
      "/projetos/apartamento-raquel-renato-10.webp",
      "/projetos/apartamento-raquel-renato-11.webp",
      "/projetos/apartamento-raquel-renato-12.webp",
      "/projetos/apartamento-raquel-renato-13.webp",
      "/projetos/apartamento-raquel-renato-14.webp",
      "/projetos/apartamento-raquel-renato-15.webp",
      "/projetos/apartamento-raquel-renato-16.webp",
      "/projetos/apartamento-raquel-renato-17.webp",
      "/projetos/apartamento-raquel-renato-18.webp",
      "/projetos/apartamento-raquel-renato-19.webp",
      "/projetos/apartamento-raquel-renato-20.webp",
      "/projetos/apartamento-raquel-renato-21.webp",
      "/projetos/apartamento-raquel-renato-22.webp",
      "/projetos/apartamento-raquel-renato-23.webp",
      "/projetos/apartamento-raquel-renato-24.webp",
    ],
  },
  {
    slug: "apartamento-raquel-conrado",
    title: "Apartamento Raquel e Conrado",
    category: "Residencial",
    summary:
      "Apartamento com varanda de jardim vertical e vista aberta para a cidade, em paleta clara e amadeirada.",
    description: [
      "A varanda ganhou um jardim vertical que emoldura a vista aberta para a cidade, criando um respiro verde para a sala de estar integrada.",
      "Os dormitórios recebem tons suaves — do verde-sálvia ao terracota — e amplas esquadrias que garantem luz natural em qualquer horário do dia.",
      "Nos banheiros, madeira natural e metais em tom quente completam uma paleta clara e serena, coerente do quarto principal ao lavabo.",
    ],
    cover: "/projetos/apartamento-raquel-conrado-cover.webp",
    gallery: [
      "/projetos/apartamento-raquel-conrado-01.webp",
      "/projetos/apartamento-raquel-conrado-02.webp",
      "/projetos/apartamento-raquel-conrado-03.webp",
      "/projetos/apartamento-raquel-conrado-04.webp",
      "/projetos/apartamento-raquel-conrado-05.webp",
      "/projetos/apartamento-raquel-conrado-06.webp",
      "/projetos/apartamento-raquel-conrado-07.webp",
      "/projetos/apartamento-raquel-conrado-08.webp",
      "/projetos/apartamento-raquel-conrado-09.webp",
      "/projetos/apartamento-raquel-conrado-10.webp",
      "/projetos/apartamento-raquel-conrado-11.webp",
      "/projetos/apartamento-raquel-conrado-12.webp",
      "/projetos/apartamento-raquel-conrado-13.webp",
      "/projetos/apartamento-raquel-conrado-14.webp",
      "/projetos/apartamento-raquel-conrado-15.webp",
      "/projetos/apartamento-raquel-conrado-16.webp",
      "/projetos/apartamento-raquel-conrado-17.webp",
      "/projetos/apartamento-raquel-conrado-18.webp",
    ],
  },
  {
    slug: "apartamento-rose-telmo",
    title: "Apartamento Rose e Telmo",
    category: "Residencial",
    summary:
      "Apartamento compacto com dois dormitórios de personalidades opostas — um em tons de rosa, outro em preto e cinza.",
    description: [
      "O quarto do casal aposta em tons de rosa suave, espelho circular iluminado e penteadeira compacta — um refúgio delicado e funcional.",
      "Já o segundo dormitório inverte a paleta para preto, cinza e madeira, com marcenaria ripada e iluminação em pendente, criando um contraste proposital entre os dois ambientes.",
      "A cozinha linear em madeira clara com iluminação embutida sob os armários completa um projeto que otimiza cada metro quadrado sem abrir mão de personalidade.",
    ],
    cover: "/projetos/apartamento-rose-telmo-cover.webp",
    gallery: [
      "/projetos/apartamento-rose-telmo-01.webp",
      "/projetos/apartamento-rose-telmo-02.webp",
      "/projetos/apartamento-rose-telmo-03.webp",
      "/projetos/apartamento-rose-telmo-04.webp",
      "/projetos/apartamento-rose-telmo-05.webp",
      "/projetos/apartamento-rose-telmo-06.webp",
      "/projetos/apartamento-rose-telmo-07.webp",
      "/projetos/apartamento-rose-telmo-08.webp",
      "/projetos/apartamento-rose-telmo-09.webp",
      "/projetos/apartamento-rose-telmo-10.webp",
      "/projetos/apartamento-rose-telmo-11.webp",
      "/projetos/apartamento-rose-telmo-12.webp",
      "/projetos/apartamento-rose-telmo-13.webp",
      "/projetos/apartamento-rose-telmo-14.webp",
      "/projetos/apartamento-rose-telmo-15.webp",
      "/projetos/apartamento-rose-telmo-16.webp",
      "/projetos/apartamento-rose-telmo-17.webp",
      "/projetos/apartamento-rose-telmo-18.webp",
      "/projetos/apartamento-rose-telmo-19.webp",
      "/projetos/apartamento-rose-telmo-20.webp",
    ],
  },
  {
    slug: "apartamento-sandra-thiago",
    title: "Apartamento Sandra e Thiago",
    category: "Residencial",
    summary:
      "Ambiente social integrado com marcenaria ripada, parede de tijolinho aparente e bar de vidros e cristais.",
    description: [
      "A sala integrada combina teto em madeira com iluminação linear embutida, painel vazado em treliça e uma fotografia em preto e branco como peça de arte sobre o painel da TV.",
      "No aparador ripado que divide sala e sala de jantar, espelhos de formas orgânicas emolduram o ambiente e refletem o lustre de latão sobre a mesa de jantar.",
      "A parede de tijolinho aparente, com espelho circular emoldurado em madeira, traz textura e aconchego ao lavabo.",
    ],
    cover: "/projetos/apartamento-sandra-thiago-cover.webp",
    gallery: [
      "/projetos/apartamento-sandra-thiago-01.webp",
      "/projetos/apartamento-sandra-thiago-02.webp",
      "/projetos/apartamento-sandra-thiago-03.webp",
      "/projetos/apartamento-sandra-thiago-04.webp",
    ],
  },
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
      "/projetos/apartamento-pablo-domingues-06.webp",
      "/projetos/apartamento-pablo-domingues-07.webp",
      "/projetos/apartamento-pablo-domingues-08.webp",
      "/projetos/apartamento-pablo-domingues-09.webp",
      "/projetos/apartamento-pablo-domingues-10.webp",
      "/projetos/apartamento-pablo-domingues-11.webp",
      "/projetos/apartamento-pablo-domingues-12.webp",
      "/projetos/apartamento-pablo-domingues-13.webp",
      "/projetos/apartamento-pablo-domingues-14.webp",
      "/projetos/apartamento-pablo-domingues-15.webp",
      "/projetos/apartamento-pablo-domingues-16.webp",
      "/projetos/apartamento-pablo-domingues-17.webp",
      "/projetos/apartamento-pablo-domingues-18.webp",
      "/projetos/apartamento-pablo-domingues-19.webp",
      "/projetos/apartamento-pablo-domingues-20.webp",
      "/projetos/apartamento-pablo-domingues-21.webp",
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
  {
    slug: "mostra-way-design",
    title: "Mostra Way Design",
    category: "Mostra de Decoração",
    summary:
      "Ambiente de jantar assinado para a mostra Way Design, com mesa em mármore, cadeiras em madeira maciça e composição escultórica de arandelas.",
    description: [
      "Convidada a assinar um ambiente na mostra Way Design, a TR criou uma sala de jantar autoral: mesa de mármore sobre base em madeira, cadeiras torneadas e uma poltrona em terracota que quebra a paleta neutra.",
      "Na parede, uma composição escultórica de arandelas em latão cria um contraponto de luz e textura ao painel ripado em madeira que emoldura o espelho de apoio.",
    ],
    cover: "/projetos/mostra-way-design-cover.webp",
    gallery: ["/projetos/mostra-way-design-01.webp"],
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
    avatar: "/depoimentos/tr-logo.webp",
  },
  {
    quote:
      "Profissionalismo do primeiro esboço à última visita de obra. O resultado superou o que imaginávamos.",
    author: "Helena Costa",
    role: "Residência Mata · Campos do Jordão",
    avatar: "/depoimentos/tr-logo.webp",
  },
  {
    quote:
      "Conseguiram unir identidade da marca e bem-estar dos times em um só projeto. Nosso escritório ganhou vida.",
    author: "Diretoria",
    role: "Pavilhão Corporativo · São Paulo",
    avatar: "/depoimentos/tr-logo.webp",
  },
];
