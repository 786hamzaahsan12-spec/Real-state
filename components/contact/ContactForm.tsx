"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { EASE_OUT } from "@/lib/motion";

interface Values {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface ContactFormProps {
  defaultSubject?: string;
  defaultMessage?: string;
}

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = values.phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{10,14}$/.test(digits)) {
    errors.phone = "Enter a valid phone number, for example 0300 1234567.";
  }

  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject.";

  if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm({ defaultSubject = "", defaultMessage = "" }: ContactFormProps) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: defaultMessage,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof Values) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      /**
       * DEMO MODE: there is no backend yet, so nothing is sent anywhere.
       * To connect a real API later, replace this block with a fetch("/api/contact")
       * POST that sends `values`, then show the success panel only when the response is ok.
       */
      setSubmitted(true);
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  const whatsappMessage = `Hello RealHome, my name is ${values.name}. ${values.subject}: ${values.message} (Phone: ${values.phone})`;
  const hasErrors = Object.values(errors).some(Boolean);

  const fields: {
    id: keyof Values;
    label: string;
    type: string;
    autoComplete?: string;
  }[] = [
    { id: "name", label: "Full name", type: "text", autoComplete: "name" },
    { id: "email", label: "Email address", type: "email", autoComplete: "email" },
    { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { id: "subject", label: "Subject", type: "text" },
  ];

  return (
    <div className="rounded-2xl border border-line bg-card p-6 md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            role="status"
            className="py-6 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
              <Check className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-2xl text-fg">Form validated successfully</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              This is a demo website with no backend connected, so your message was not sent to a
              server. To reach us right now, send the same message on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(SITE.whatsapp, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Send via WhatsApp
              </a>
              <button type="button" onClick={reset} className="btn-outline">
                Write another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {hasErrors ? (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                Please fix the highlighted fields and try again.
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.id} className={field.id === "subject" ? "sm:col-span-2" : ""}>
                  <label
                    htmlFor={`contact-${field.id}`}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`contact-${field.id}`}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={values[field.id]}
                    onChange={handleChange(field.id)}
                    aria-invalid={Boolean(errors[field.id])}
                    aria-describedby={errors[field.id] ? `contact-${field.id}-error` : undefined}
                    className={`field-input ${errors[field.id] ? "!border-red-400" : ""}`}
                  />
                  {errors[field.id] ? (
                    <p id={`contact-${field.id}-error`} className="mt-2 text-xs text-red-300">
                      {errors[field.id]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`field-input resize-y ${errors.message ? "!border-red-400" : ""}`}
              />
              {errors.message ? (
                <p id="contact-message-error" className="mt-2 text-xs text-red-300">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button type="submit" className="btn-gold w-full sm:w-auto sm:px-10">
              Send message
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}