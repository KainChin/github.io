document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  let isDarkMode = true;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('light-theme', !isDarkMode);
      
      const icon = themeToggleBtn.querySelector('svg');
      if (icon) {
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
          icon.style.transform = 'rotate(0deg)';
        }, 300);
      }
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
