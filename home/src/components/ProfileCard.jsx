function ProfileCard({ t }) {
  const { status, passion, focus, goal } = t.profile;

  return (
    <div className="hero-right">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src="../assets/images/avatar.png" alt="Khanh Trinh Profile Avatar" />
          <div className="status-badge">
            <span className="status-dot"></span>
            {status}
          </div>
        </div>
        <div className="code-snippet-card">
          <div><span className="keyword">const</span> <span className="variable">developer</span> = &#123;</div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">passion</span>: <span className="string">"{passion}"</span>,
          </div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">focus</span>: [{focus.map((item, i) => <React.Fragment key={i}><span className="string">"{item}"</span>{i < focus.length - 1 ? ', ' : ''}</React.Fragment>)}],
          </div>
          <div style={{ paddingLeft: '1.2rem' }}>
            <span className="property">goal</span>: <span className="string">"{goal}"</span>
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

window.ProfileCard = ProfileCard;
