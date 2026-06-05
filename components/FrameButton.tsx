/**
 * FrameButton.tsx
 * -----------------------------------------------------------------------------
 * Botão "moldura": borda clara + hover animado (o preenchimento recua nas duas
 * direções). Texto sempre em <span> (acima dos pseudo-elementos). Renderiza
 * como link externo (<a>), link interno (next/link) ou <button>.
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
};

export default function FrameButton({ children, href, external, type, className = "", onClick }: Props) {
  const cls = `frame-btn ${className}`.trim();
  const inner = <span>{children}</span>;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
