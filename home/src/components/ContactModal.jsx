const { useState } = React;

function ContactModal({ isOpen, onClose, t }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('_subject', formData.subject || 'Portfolio Contact Message');
      data.append('message', formData.message);
      data.append('_captcha', 'false');

      if (selectedFile) {
        data.append('attachment', selectedFile);
      }

      const response = await fetch('https://formsubmit.co/ajax/khanhtrinh882004@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: data
      });

      if (response.ok) {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedFile(null);
        setTimeout(() => {
          setIsSent(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      console.warn('Form submission fallback:', err);
      setIsSending(false);
      const mailtoUrl = `mailto:khanhtrinh882004@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
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
              <textarea name="message" rows="3" required value={formData.message} onChange={handleChange} placeholder="Hello Khanh Trinh..."></textarea>
            </div>

            <div className="form-group">
              <label>{t.modal.fileLabel}</label>
              <input type="file" name="attachment" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} />
              {selectedFile && <span style={{ fontSize: '0.8rem', color: '#00f2fe', marginTop: '0.2rem' }}>📎 {selectedFile.name}</span>}
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
