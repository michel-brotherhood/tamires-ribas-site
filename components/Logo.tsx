/**
 * Logo.tsx
 * -----------------------------------------------------------------------------
 * Logotipo TR Arquitetura e Interiores (lockup completo).
 *  - variant "taupe"  → para fundos claros (bege/off-white)  → referencial(1)
 *  - variant "branco" → para fundos escuros (taupe)          → referencial(2)
 * -----------------------------------------------------------------------------
 */

type LogoProps = {
  variant?: "taupe" | "branco";
  className?: string;
};

export default function Logo({ variant = "taupe", className }: LogoProps) {
  const src =
    variant === "branco" ? "/marca/logo-branco.webp" : "/marca/logo-taupe.webp";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="TR Arquitetura e Interiores"
      className={className}
      draggable={false}
    />
  );
}
