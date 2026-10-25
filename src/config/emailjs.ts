/**
 * EmailJS Configuration for Haroon Khan Portfolio
 * 
 * Values are retrieved from Vite environment variables (VITE_EMAILJS_*)
 * with fallback to the configured defaults.
 */

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_2q1r4eu',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_wnq4exq',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'tqTye0rKsmGO3DcTgZ4bC',
};
