import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Contato — TR Arquitetura e Interiores",
  description:
    "Fale com a arquiteta Tamires Ribas sobre o seu projeto residencial de alto padrão.",
};

export default function ContatoPage() {
  return (
    <div className="has-ambient">
      <ScrollReveal />
      <SiteHeader />

      <main className="page">
        <header className="page-hero">
          <span className="section-index">Contato</span>
          <h1 className="headline text-ink">
            Vamos <em>começar.</em>
          </h1>
          <p className="body-text mt-6">
            Conte um pouco sobre o seu projeto. Respondemos em até dois dias
            úteis.
          </p>
        </header>

        <section className="contact-grid">
          <div data-reveal className="contact-info">
            <div className="contact-item">
              <span className="contact-label">WhatsApp</span>
              <a
                href="https://wa.me/5521964362282"
                target="_blank"
                rel="noopener noreferrer"
              >
                +55 21 96436-2282
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Arquiteta</span>
              <p>Tamires Ribas</p>
            </div>
            <div className="contact-item">
              <span className="contact-label">Atendimento</span>
              <p>Projetos de alto padrão</p>
            </div>
            <div className="contact-item">
              <span className="contact-label">Resposta</span>
              <p>Em até 2 dias úteis</p>
            </div>
          </div>

          <div data-reveal className="contact-form-card">
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
