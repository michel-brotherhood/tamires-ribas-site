/**
 * Testimonials.tsx — grade de depoimentos (com foto opcional do cliente).
 * Usada em /sobre e na home. Recebe a lista de content.ts.
 */

import SmartImage from "@/components/SmartImage";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials({ heading = true }: { heading?: boolean }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="testimonials">
      {heading && (
        <>
          <span className="section-index">Depoimentos</span>
          <h2 className="headline-md mb-12 text-ink">
            Quem vive a <em>TR.</em>
          </h2>
        </>
      )}

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="testimonial-card">
            <blockquote>“{t.quote}”</blockquote>
            <figcaption className="testimonial-foot">
              {t.avatar && (
                <span className="testimonial-avatar">
                  <SmartImage src={t.avatar} alt={t.author} />
                </span>
              )}
              <span className="testimonial-id">
                <span className="testimonial-author">{t.author}</span>
                <span className="testimonial-role">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
