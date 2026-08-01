document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality with Persistence
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  let isDarkMode = savedTheme ? savedTheme === 'dark' : true;

  const sunIcon = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const applyTheme = () => {
    document.body.classList.toggle('light-theme', !isDarkMode);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = isDarkMode ? sunIcon : moonIcon;
    }
  };

  applyTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      applyTheme();
    });
  }

  // Active Navigation Link Highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Animated Counter for Stats
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach(stat => {
    const targetText = stat.innerText;
    const numericMatch = targetText.match(/\d+/);
    if (!numericMatch) return;
    
    const targetNumber = parseInt(numericMatch[0], 10);
    const suffix = targetText.replace(numericMatch[0], '');
    let count = 0;
    const duration = 1500;
    const stepTime = Math.max(10, Math.floor(duration / targetNumber));

    const timer = setInterval(() => {
      count += Math.ceil(targetNumber / 40);
      if (count >= targetNumber) {
        stat.innerText = targetNumber + suffix;
        clearInterval(timer);
      } else {
        stat.innerText = count + suffix;
      }
    }, stepTime);
  });
});
