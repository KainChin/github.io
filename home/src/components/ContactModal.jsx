const { useState } = React;

function ContactModal({ isOpen, onClose, t }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/khanhtrinh882004@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || 'Portfolio Contact Message',
          message: formData.message
        })
      });

      if (response.ok) {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setIsSent(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX error, fallback to mailto:', err);
      setIsSending(false);
      const mailtoUrl = `mailto:khanhtrinh882004@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            {t.modal.title}
          </h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {isSent ? (
          <div style={{ color: '#10b981', textAlign: 'center', padding: '2.5rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
            ✓ {t.modal.success}
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t.modal.name}</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Nguyen Van A" />
            </div>

            <div className="form-group">
              <label>{t.modal.email}</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="example@gmail.com" />
            </div>

            <div className="form-group">
              <label>{t.modal.subject}</label>
              <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Job offer / Cooperation" />
            </div>

            <div className="form-group">
              <label>{t.modal.message}</label>
              <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} placeholder="Hello Khanh Trinh..."></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSending}>
                {isSending ? t.modal.sending : t.modal.send}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

window.ContactModal = ContactModal;
