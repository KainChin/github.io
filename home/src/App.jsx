const { useState } = React;

function App() {
  const [lang, setLangState] = useState(() => {
    const savedLang = localStorage.getItem('lang');
    return savedLang || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = window.translations[lang] || window.translations.en;

  return (
    <div className="container">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main className="hero">
        <Hero t={t} />
        <ProfileCard t={t} />
      </main>
      <Stats t={t} />
    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
