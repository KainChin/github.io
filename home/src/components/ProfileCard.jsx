function ProfileCard() {
  return (
    <div className="hero-right">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src="../assets/images/avatar.png" alt="Khanh Trinh Profile Avatar" />
          <div className="status-badge">
            <span className="status-dot"></span>
            Available for work
          </div>
        </div>
        <div className="code-snippet-card">
          <div><span className="keyword">const</span> <span class="variable">developer</span> = &#123;</div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">passion</span>: <span className="string">"Building impactful solutions"</span>,
          </div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">focus</span>: [<span className="string">"Web Development"</span>, <span className="string">"AI"</span>, <span className="string">"UI/UX"</span>],
          </div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">goal</span>: <span className="string">"Make ideas come true"</span>
          </div>
          <div>&#125;;</div>
        </div>
        <a
          href="https://github.com/KainChin"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action-btn"
          title="Visit GitHub Profile"
        >
          &lt;/&gt;
        </a>
      </div>
    </div>
  );
}
