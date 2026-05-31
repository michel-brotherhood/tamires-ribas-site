/**
 * LineButton.tsx
 * -----------------------------------------------------------------------------
 * Botão com 4 linhas que animam no hover (contorno "desenhando" continuamente).
 * As linhas usam currentColor, então herdam a cor do contexto (escuro no claro,
 * claro no escuro). Renderiza como <a> (link) por padrão.
 * -----------------------------------------------------------------------------
 */

type LineButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  /* Marca o botão para a animação de intro do hero ([data-hero-reveal]). */
  reveal?: boolean;
};

export default function LineButton({
  href,
  children,
  external,
  className,
  reveal,
}: LineButtonProps) {
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`line-btn ${className ?? ""}`}
      {...(reveal ? { "data-hero-reveal": "" } : {})}
    >
      {children}
      <span className="line-1" />
      <span className="line-2" />
      <span className="line-3" />
      <span className="line-4" />
    </a>
  );
}
