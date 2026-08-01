const { useState, useEffect } = React;

function StatItem({ icon, targetValue, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    if (targetValue <= 0) {
      setCount(0);
      return;
    }
    const stepTime = Math.max(15, Math.floor(duration / Math.max(1, targetValue)));
    const timer = setInterval(() => {
      start += Math.ceil(targetValue / 25);
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span className="stat-value">{count}{suffix}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

function Stats({ t }) {
  const [githubData, setGithubData] = useState({
    publicRepos: 15,
    yearsExperience: 2,
    totalStars: 5,
    followers: 3
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const userRes = await fetch('https://api.github.com/users/KainChin');
        if (userRes.ok) {
          const userData = await userRes.json();
          const createdYear = new Date(userData.created_at).getFullYear();
          const currentYear = new Date().getFullYear();
          const calculatedYears = Math.max(1, currentYear - createdYear + 1);

          const reposRes = await fetch('https://api.github.com/users/KainChin/repos?per_page=100');
          let starsCount = 5;
          if (reposRes.ok) {
            const reposData = await reposRes.json();
            starsCount = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
          }

          setGithubData({
            publicRepos: userData.public_repos || 15,
            yearsExperience: calculatedYears,
            totalStars: starsCount,
            followers: userData.followers || 3
          });
        }
      } catch (err) {
        console.warn("Using fallback GitHub stats:", err);
      }
    }

    fetchGitHubStats();
  }, []);

  const statsData = [
    {
      targetValue: githubData.publicRepos,
      suffix: '+',
      label: t.stats.projects,
      icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    },
    {
      targetValue: githubData.yearsExperience,
      suffix: '+',
      label: t.stats.experience,
      icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
    },
    {
      targetValue: githubData.totalStars,
      suffix: '+',
      label: t.stats.stars,
      icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    },
    {
      targetValue: githubData.followers,
      suffix: '+',
      label: t.stats.followers,
      icon: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    }
  ];

  return (
    <section className="stats-bar">
      {statsData.map((item, idx) => (
        <StatItem key={idx} {...item} />
      ))}
    </section>
  );
}

window.Stats = Stats;
