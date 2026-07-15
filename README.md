# TR Arquitetura e Interiores

Site premium, cinematográfico e *scroll-driven* do escritório **TR Arquitetura e Interiores** (arquiteta Tamires Ribas). Uma experiência 3D interativa na home, tour 360° dos ambientes e páginas internas de portfólio, sobre e contato.

> **Conceito:** _Muito Além de um Projeto_ — Arquitetura e Interiores de Alto Padrão.

---

## ✨ Destaques

- **Home scroll-driven** com um modelo 3D fixo que se move/gira conforme o scroll (GSAP ScrollTrigger), com intro cinematográfica e continuação girando no portfólio.
- **Tour 360°** (`/experiencia-360`) — três opções que apontam para tours hospedados no Chaos Cloud (abrem em nova aba).
- **Páginas internas:** Projetos (portfólio + página por projeto), Sobre (com depoimentos) e Contato.
- **Identidade da marca TR:** cores (taupe `#827B6F` / bege `#CABFAB`), fontes (Glacial Indifference + Westmount), logos e copy oficiais.
- **Contato via WhatsApp:** botão flutuante com painel e formulário que abre a conversa já preenchida.
- **Performance:** Three.js fora do *bundle* inicial (lazy via `dynamic`/`ssr:false`); fontes auto-hospedadas; favicon e Open Graph image gerados.

---

## 🧱 Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Three.js](https://threejs.org/) · [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) · [@react-three/drei](https://github.com/pmndrs/drei)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Como rodar localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
# 1. Instalar dependências
npm install

# 2. Ambiente de desenvolvimento (http://localhost:3000)
npm run dev

# 3. Build de produção
npm run build

# 4. Servir o build de produção
npm start
```

> Dica: se o servidor de dev apresentar erro tipo `Cannot find module './XXX.js'`, apague a pasta de cache `.next` e rode `npm run dev` de novo.

---

## 📂 Estrutura

```
app/
  layout.tsx            # fontes da marca, metadata, fundo
  page.tsx              # home (loading + 3D + seções + showcase + widget)
  globals.css           # design tokens e todos os estilos
  icon.svg              # favicon
  opengraph-image.tsx   # imagem de compartilhamento (gerada)
  projetos/             # listagem + [slug] (página por projeto)
  sobre/                # estúdio + depoimentos
  contato/              # formulário + canais
  experiencia-360/      # tour 360°
components/
  ArchitectureModel.tsx # modelo 3D da home (intro + scroll + free-spin)
  Scene.tsx / SceneClient.tsx        # canvas R3F (lazy)
  AmbientModel/Scene/Client.tsx      # 3D "assinatura" das páginas internas
  Panorama360.tsx / Experience360.tsx# viewer e UI do tour 360
  Header.tsx / SiteHeader.tsx        # header da home / das internas
  HomeShowcase.tsx                   # portfólio + depoimentos + contato (home)
  ScrollSections.tsx                 # 6 seções editoriais da home
  WhatsAppWidget.tsx                 # botão flutuante + painel de contato
  LineButton.tsx / Logo.tsx / ...    # UI reutilizável
lib/
  content.ts            # ⭐ PROJETOS e DEPOIMENTOS (conteúdo editável)
  sceneReady.ts         # coordenação loading ↔ modelo (eventos)
public/
  models/architecture.glb     # modelo 3D (exemplo — substituível)
  panoramas/*.webp            # imagens 360°
  projetos/  depoimentos/     # imagens do portfólio e avatares
  marca/                      # logos TR (taupe / branco)
```

---

## ✏️ Como editar o conteúdo

### Projetos e depoimentos
Tudo em **[`lib/content.ts`](lib/content.ts)** — basta seguir o formato dos exemplos:
- Adicione um objeto em `PROJECTS` (o `slug` vira a URL `/projetos/<slug>`). O **primeiro** projeto da lista aparece em destaque.
- Adicione um objeto em `TESTIMONIALS` (com `avatar` opcional).
- As imagens vão em `public/projetos/` e `public/depoimentos/`. Se faltar uma imagem, aparece um *placeholder* elegante (nada quebra).

### Modelo 3D da home
Substitua **`public/models/architecture.glb`** pelo modelo real (mantendo o nome). Materiais de vidro (nome com `glass`, `vidro`, `window`…) ficam transparentes; o resto, opaco.

### Tour 360°
As opções (título, ambientes e link) ficam em **`app/experiencia-360/page.tsx`**, no array `OPTIONS`. Cada uma aponta para um tour hospedado no Chaos Cloud e abre em nova aba.

### Marca (cores e fontes)
- Cores: tokens em [`app/globals.css`](app/globals.css) (`:root`) e [`tailwind.config.ts`](tailwind.config.ts).
- Fontes: arquivos em `app/fonts/` declarados em [`app/layout.tsx`](app/layout.tsx).

### Contato
O número do WhatsApp está em [`components/WhatsAppWidget.tsx`](components/WhatsAppWidget.tsx), [`components/ContactForm.tsx`](components/ContactForm.tsx) e nos CTAs de [`components/ScrollSections.tsx`](components/ScrollSections.tsx).

---

## 🎨 Marca

| Token | Cor | Uso |
|------|-----|-----|
| Taupe | `#827B6F` | Cor principal, bandas escuras (header/rodapé/loading) |
| Bege | `#CABFAB` | Fundo padrão da página |
| Creme | `#F4F1EA` | Cards e painéis |
| Tinta | `#1A1712` | Texto |

**Tipografia:** Glacial Indifference (títulos) · Westmount (rótulos).

---

© TR Arquitetura e Interiores. Todos os direitos reservados.
