chrome.storage.sync.get(['enabled'], (result) => {
  if (result.enabled === false) return;

  let sessionCount = 0;

  function removePromotedJobs() {
    const allCards = document.querySelectorAll('div.job-card-container, li');

    allCards.forEach(card => {
      const labels = card.querySelectorAll('span');
      labels.forEach(label => {
        if (label.innerText.trim().toLowerCase() === 'promoted') {
          console.log('Removed a promoted job');
          card.remove();
          sessionCount++;

          // Update stats in storage
          chrome.storage.sync.get(['totalCount'], (res) => {
            const newTotal = (res.totalCount || 0) + 1;
            chrome.storage.sync.set({
              totalCount: newTotal,
              sessionCount: sessionCount
            });
          });
        }
      });
    });
  }

  const observer = new MutationObserver(() => {
    removePromotedJobs();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  removePromotedJobs();
});
