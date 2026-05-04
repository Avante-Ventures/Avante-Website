import { useState } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    stage: 'idea',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`New Contact: ${formData.name} - ${formData.company || 'No Company'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Stage: ${formData.stage}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:cristian@avanteventures.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          stage: 'idea',
        });
        onClose();
      }, 2000);
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--avante-background)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--avante-radius-24)',
          padding: 'var(--avante-space-6)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--avante-space-3)',
            right: 'var(--avante-space-3)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <X size={16} color="rgba(255, 255, 255, 0.7)" />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 'var(--avante-space-5)' }}>
          <h2
            style={{
              fontSize: '28px',
              lineHeight: '1.2',
              color: 'var(--avante-text-primary)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--avante-space-2)',
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--avante-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div
            style={{
              padding: 'var(--avante-space-4)',
              backgroundColor: 'rgba(152, 80, 154, 0.1)',
              border: '1px solid rgba(152, 80, 154, 0.3)',
              borderRadius: 'var(--avante-radius-12)',
              marginBottom: 'var(--avante-space-4)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                color: 'var(--avante-text-primary)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              {t('contact.success')}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--avante-space-3)' }}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  marginBottom: 'var(--avante-space-1)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 'var(--avante-space-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  marginBottom: 'var(--avante-space-1)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 'var(--avante-space-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  marginBottom: 'var(--avante-space-1)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t('contact.form.company')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--avante-space-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>

            {/* Stage */}
            <div>
              <label
                htmlFor="stage"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  marginBottom: 'var(--avante-space-1)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t('contact.form.stage')}
              </label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 'var(--avante-space-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <option value="idea">{t('contact.form.stages.idea')}</option>
                <option value="mvp">{t('contact.form.stages.mvp')}</option>
                <option value="traction">{t('contact.form.stages.traction')}</option>
                <option value="scaling">{t('contact.form.stages.scaling')}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  marginBottom: 'var(--avante-space-1)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: 'var(--avante-space-2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: 'var(--avante-space-2) var(--avante-space-4)',
                background: 'var(--avante-gradient-linear)',
                color: 'var(--avante-text-primary)',
                border: 'none',
                borderRadius: 'var(--avante-radius-12)',
                fontSize: '16px',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginTop: 'var(--avante-space-2)',
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(152, 80, 154, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}