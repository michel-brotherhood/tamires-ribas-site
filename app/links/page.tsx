import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Links — TR Arquitetura e Interiores",
  description:
    "Todos os canais da TR Arquitetura e Interiores num só lugar: orçamento, site oficial, curso, localização e Instagram.",
};

/* Mensagem de pré-atendimento que abre o WhatsApp já preenchido. */
const WA_MSG =
  "Olá, Tamires! Vim pela sua página de links e gostaria de solicitar um orçamento para o meu projeto de arquitetura e interiores.";
const ORCAMENTO_URL = `https://wa.me/5521964362282?text=${encodeURIComponent(
  WA_MSG,
)}`;

type LinkItem = {
  label: string;
  sub: string;
  href: string;
  icon: keyof typeof ICONS;
  accent?: boolean;
};

const LINKS: LinkItem[] = [
  {
    label: "Solicitar orçamento",
    sub: "Atendimento pelo WhatsApp",
    href: ORCAMENTO_URL,
    icon: "chat",
    accent: true,
  },
  {
    label: "Site Oficial",
    sub: "tamiresribas.com.br",
    href: "https://tamiresribas.com.br",
    icon: "globe",
  },
  {
    label: "Localização",
    sub: "Charitas · Niterói · RJ",
    href: "https://www.google.com/maps/dir/Tamires+Ribas+Arquitetura+e+Interiores,+R.+Mal.+Raul+de+Albuquerque,+2+-+Cob+701+-+Charitas,+Niter%C3%B3i+-+RJ,+24370-025/tamires+ribas+arquitetura/@-22.9226561,-43.1332628,13z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x9983e732eaaaab:0x35ca824b33f33bd3!2m2!1d-43.092063!2d-22.9226614!1m5!1m1!1s0x9983e732eaaaab:0x35ca824b33f33bd3!2m2!1d-43.092063!2d-22.9226614?entry=tts&shorturl=1",
    icon: "pin",
  },
  {
    label: "Instagram",
    sub: "@tamiresribasarquitetura",
    href: "https://www.instagram.com/tamiresribasarquitetura/",
    icon: "instagram",
  },
];

/* Ícones de traço, monocromáticos, para casar com a estética da marca. */
const ICONS = {
  chat: (
    <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
} as const;

function LinkIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      className="link-btn-glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export default function LinksPage() {
  return (
    <main className="links-page">
      <div className="links-aura" aria-hidden="true" />

      <section className="links-card">
        <header className="links-profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/foto-perfil-paginalinks.webp"
            alt="Tamires Ribas — arquiteta"
            className="links-avatar"
            width={128}
            height={128}
            draggable={false}
          />
          <h1 className="links-name">Tamires Ribas</h1>
          <p className="links-role">Arquitetura e Interiores</p>
        </header>

        <nav className="links-list" aria-label="Canais da TR">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`link-btn ${item.accent ? "link-btn--accent" : ""}`}
            >
              <span className="link-btn-icon">
                <LinkIcon name={item.icon} />
              </span>
              <span className="link-btn-text">
                <span className="link-btn-label">{item.label}</span>
                <span className="link-btn-sub">{item.sub}</span>
              </span>
              <svg
                className="link-btn-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ))}
        </nav>

        <footer className="links-foot">
          <Logo variant="branco" className="brand-logo brand-logo--sm" />
          <span className="links-copy">
            © {new Date().getFullYear()} TR Arquitetura e Interiores
          </span>
        </footer>
      </section>
    </main>
  );
}
