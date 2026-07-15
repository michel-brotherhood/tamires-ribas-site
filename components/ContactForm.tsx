"use client";

/**
 * ContactForm.tsx
 * -----------------------------------------------------------------------------
 * Formulário de contato moderno: validação inline, estados de envio e tela de
 * sucesso. Sem backend — ao enviar, abre o WhatsApp da arquiteta com a mensagem
 * já preenchida. Para envio por outro canal, troque o corpo de `handleSubmit`.
 * -----------------------------------------------------------------------------
 */

import { FormEvent, useState } from "react";
import FrameButton from "@/components/FrameButton";

const WHATSAPP = "5521964362282"; // +55 21 96436-2282

const PROJECT_TYPES = [
  "Residencial",
  "Corporativo",
  "Interiores",
  "Reforma",
  "Outro",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const type = String(data.get("type") || "");
    const message = String(data.get("message") || "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Informe um e-mail válido.";
    if (message.length < 10) next.message = "Conte um pouco mais (10+ caracteres).";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Abre o WhatsApp da arquiteta com a mensagem já preenchida.
    const text =
      `Olá, Tamires! Sou ${name}.\n` +
      `E-mail: ${email}\n` +
      `Tipo de projeto: ${type}\n\n` +
      `${message}`;
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <div className="form-success-mark" aria-hidden="true">
          ✓
        </div>
        <h3>Conversa aberta no WhatsApp.</h3>
        <p>
          Abrimos o WhatsApp da arquiteta com sua mensagem preenchida. Se não
          abrir, fale direto pelo{" "}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            +55 21 96436-2282
          </a>
          .
        </p>
        <FrameButton type="button" onClick={() => setSent(false)}>
          Enviar outra mensagem
        </FrameButton>
      </div>
    );
  }

  return (
    <form className="form-modern" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Nome</label>
          <input id="cf-name" name="name" type="text" placeholder="Seu nome" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">E-mail</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="voce@email.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-type">Tipo de projeto</label>
        <div className="select-wrap">
          <select id="cf-type" name="type" defaultValue="Residencial">
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-message">Sobre o projeto</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Conte um pouco sobre o terreno, o programa e o que você imagina…"
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <FrameButton type="submit" className="form-submit">
        Falar no WhatsApp
      </FrameButton>
    </form>
  );
}
