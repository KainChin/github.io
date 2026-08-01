const { useState, useEffect } = React;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [lang, setLangState] = useState(() => {
    const savedLang = localStorage.getItem('lang');
    return savedLang || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    document.body.classList.toggle('light-theme', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const t = window.translations[lang] || window.translations.en;

  return (
    <div className="container">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} lang={lang} setLang={setLang} t={t} />
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
