const toggle = document.getElementById('toggleCleaner');
const sessionEl = document.getElementById('sessionCount');
const totalEl = document.getElementById('totalCount');

// Load toggle state
chrome.storage.sync.get(['enabled'], (result) => {
  toggle.checked = result.enabled ?? true;
});

// Save toggle state
toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

// Load stats
chrome.storage.sync.get(['sessionCount', 'totalCount'], (res) => {
  sessionEl.textContent = res.sessionCount ?? 0;
  totalEl.textContent = res.totalCount ?? 0;
});

// Reset button handler
document.getElementById('resetBtn').addEventListener('click', () => {
  chrome.storage.sync.set({ sessionCount: 0, totalCount: 0 }, () => {
    sessionEl.textContent = "0";
    totalEl.textContent = "0";
    console.log("Stats reset");
  });
});

const milestones = [
  { count: 100, label: "100 Jobs Cleaned" },
  { count: 505, label: "500 Jobs Scrubbed" },
  { count: 1000, label: "1000 Spam Slayed" },
  { count: 5000, label: "5000 Job Warriors" },
  { count: 10000, label: "10000 LinkedIn Slayer" }
];

const achievementList = document.getElementById("achievementsList");

chrome.storage.sync.get(['totalCount'], (res) => {
  const total = res.totalCount || 0;

  milestones.forEach(milestone => {
    if (total >= milestone.count) {
      const li = document.createElement('li');
      li.textContent = milestone.label;
      achievementList.appendChild(li);
    }
  });
});




