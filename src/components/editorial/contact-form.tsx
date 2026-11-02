"use client";

import { useId, useState } from "react";

type ContactFormLabels = {
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSubmit: string;
  formNote: string;
  formSubjects: readonly string[];
  formValidation: {
    name: string;
    email: string;
    message: string;
  };
  formReady: string;
};

type ContactFormProps = {
  email: string;
  labels: ContactFormLabels;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "mt-2 w-full border border-charcoal-900/20 bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 outline-none transition-colors placeholder:text-charcoal-400 focus:border-gold-600 aria-[invalid=true]:border-red-700";

/**
 * No backend exists in Milestone 2, so this form does not post anywhere and
 * does not claim to have sent anything. It validates the message, then hands
 * the visitor a mail draft addressed to the secretariat — the same channel the
 * house publishes — which they send from their own mail application.
 */
export function ContactForm({ email, labels }: ContactFormProps) {
  const uid = useId();
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState(labels.formSubjects[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<string | null>(null);

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (name.trim().length < 2) nextErrors.name = labels.formValidation.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender.trim())) {
      nextErrors.email = labels.formValidation.email;
    }
    if (message.trim().length < 10) nextErrors.message = labels.formValidation.message;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setDraft(null);
      return;
    }

    const body = [
      `${labels.formName}: ${name.trim()}`,
      `${labels.formEmail}: ${sender.trim()}`,
      "",
      message.trim(),
    ].join("\n");

    const href = `mailto:${email}?subject=${encodeURIComponent(
      `[Website] ${subject}`,
    )}&body=${encodeURIComponent(body)}`;

    setDraft(href);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="text-[0.6rem] uppercase tracking-[0.18em] text-charcoal-600">
            {labels.formName}
          </label>
          <input
            id={ids.name}
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            autoComplete="name"
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${ids.name}-error`} className="mt-1.5 text-[0.75rem] text-red-800">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={ids.email} className="text-[0.6rem] uppercase tracking-[0.18em] text-charcoal-600">
            {labels.formEmail}
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            value={sender}
            onChange={(event) => setSender(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            autoComplete="email"
            className={fieldClass}
          />
          {errors.email ? (
            <p id={`${ids.email}-error`} className="mt-1.5 text-[0.75rem] text-red-800">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={ids.subject} className="text-[0.6rem] uppercase tracking-[0.18em] text-charcoal-600">
          {labels.formSubject}
        </label>
        <select
          id={ids.subject}
          name="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={fieldClass}
        >
          {labels.formSubjects.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor={ids.message} className="text-[0.6rem] uppercase tracking-[0.18em] text-charcoal-600">
          {labels.formMessage}
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          className={fieldClass}
        />
        {errors.message ? (
          <p id={`${ids.message}-error`} className="mt-1.5 text-[0.75rem] text-red-800">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 border border-gold-500 bg-gold-500 px-7 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:border-gold-400 hover:bg-gold-400"
        >
          {labels.formSubmit}
        </button>
        <p className="max-w-sm text-[0.72rem] leading-relaxed text-charcoal-500">
          {labels.formNote}
        </p>
      </div>

      <div role="status" aria-live="polite" className="mt-4">
        {draft ? (
          <div className="border border-green-700/30 bg-green-50 p-5">
            <p className="text-[0.85rem] leading-relaxed text-green-900">{labels.formReady}</p>
            <a
              href={draft}
              className="mt-3 inline-block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-green-900 underline decoration-green-700/50 underline-offset-4"
            >
              {labels.formSubmit} — {email}
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
}
