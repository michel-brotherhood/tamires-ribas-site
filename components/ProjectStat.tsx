/**
 * ProjectStat.tsx
 * -----------------------------------------------------------------------------
 * Item de estatística do projeto (valor grande + rótulo). Usado na seção
 * "Fachada" para exibir área construída, suítes e pavimentos.
 * -----------------------------------------------------------------------------
 */

type ProjectStatProps = {
  value: string;
  label: string;
};

export default function ProjectStat({ value, label }: ProjectStatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-semibold leading-none tracking-[-0.03em] text-ink md:text-4xl">
        {value}
      </span>
      <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">
        {label}
      </span>
    </div>
  );
}
