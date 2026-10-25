/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw } from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { PERSONAL_INFO } from '../data/portfolioData';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface ContactFormProps {
  initialSubject?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialSubject = '' }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: initialSubject,
    message: '',
    website: '', // Honeypot field
  });

  const [errors, setErrors] = useState<{
    from_name?: string;
    from_email?: string;
    subject?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: initialSubject,
      }));
    }
  }, [initialSubject]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Please provide your full name.';
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email.trim())) {
      newErrors.from_email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject line.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check: if filled, quietly abort without sending
    if (formData.website.trim() !== '') {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    if (!validate()) {
      return;
    }

    if (!formRef.current) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        setStatus('success');
        // Reset form data and HTML form fields
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: '',
          website: '',
        });
        setErrors({});
        formRef.current.reset();
      } else {
        throw new Error(`EmailJS responded with status: ${response.status}`);
      }
    } catch (err: unknown) {
      console.error('EmailJS Send Error:', err);
      setStatus('error');
      setErrorMessage(
        'Something went wrong while sending your message. Please try again or contact me directly by email.'
      );
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'sending':
        return 'Sending Message...';
      case 'success':
        return 'Message Sent Successfully';
      case 'error':
        return 'Try Again';
      case 'idle':
      default:
        return 'Send Message';
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Notification Banner */}
      {status === 'success' && (
        <div
          role="alert"
          aria-live="polite"
          className="animate-in space-y-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5 text-emerald-100"
        >
          <div className="flex items-center gap-2.5 font-semibold text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Message Sent!</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            Thank you for contacting me. Your message has been sent successfully. I will get back to you soon.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Send another message</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="animate-in space-y-2 rounded-2xl border border-rose-400/25 bg-rose-400/[0.06] p-5 text-rose-100"
        >
          <div className="flex items-center gap-2.5 font-semibold text-rose-300">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>Submission Notice</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
            {errorMessage ||
              'Something went wrong while sending your message. Please try again or contact me directly by email.'}
          </p>
          <div className="pt-1 text-xs">
            Direct fallback:{' '}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-mono text-accent hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
        aria-label="Contact Haroon Khan"
      >
        {/* Hidden Honeypot Field */}
        <div
          style={{ display: 'none', position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
        >
          <label htmlFor="website">Do not fill this field</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Hidden reply_to field matching EmailJS template requirement */}
        <input
          type="hidden"
          name="reply_to"
          value={formData.from_email}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="from_name"
            className="block font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="from_name"
            name="from_name"
            type="text"
            required
            autoComplete="name"
            value={formData.from_name}
            onChange={handleInputChange}
            placeholder="e.g. Alex Johnson"
            disabled={status === 'sending'}
            aria-invalid={!!errors.from_name}
            aria-describedby={errors.from_name ? 'from_name_error' : undefined}
            className="field"
          />
          {errors.from_name && (
            <p
              id="from_name_error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.from_name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="from_email"
            className="block font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            required
            autoComplete="email"
            value={formData.from_email}
            onChange={handleInputChange}
            placeholder="e.g. alex@example.com"
            disabled={status === 'sending'}
            aria-invalid={!!errors.from_email}
            aria-describedby={errors.from_email ? 'from_email_error' : undefined}
            className="field"
          />
          {errors.from_email && (
            <p
              id="from_email_error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.from_email}</span>
            </p>
          )}
        </div>

        </div>

        {/* Subject Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="block font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase"
          >
            Subject <span className="text-accent">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="e.g. Full-Stack MERN Project Inquiry"
            disabled={status === 'sending'}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject_error' : undefined}
            className="field"
          />
          {errors.subject && (
            <p
              id="subject_error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="block font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase"
          >
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project, timeline, deliverables, or questions..."
            disabled={status === 'sending'}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message_error' : undefined}
            className="field resize-y min-h-[140px]"
          />
          {errors.message && (
            <p
              id="message_error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button & Direct Option */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`btn w-full cursor-pointer sm:w-auto ${
              status === 'sending'
                ? 'cursor-not-allowed border border-white/10 bg-white/[0.06] text-slate-300'
                : status === 'success'
                ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                : status === 'error'
                ? 'bg-rose-500 text-white hover:bg-rose-400'
                : 'btn-primary'
            }`}
          >
            {status === 'sending' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : status === 'error' ? (
              <RotateCcw className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{getButtonText()}</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="link-u pb-0.5 text-xs text-slate-400 hover:text-white"
          >
            Email Me Directly ↗
          </a>
        </div>
      </form>
    </div>
  );
};
