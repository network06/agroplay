// Dashboard Fallbacks - Fixes "not defined" errors
// Load FIRST to ensure basic functions exist

window.showTab = window.showTab || function(tabName) {
console.debug('Fallback showTab:', tabName);
  // Hide all tabs
  document.querySelectorAll('[id^="tab-"]').forEach(tab => tab.style.display = 'none');
  // Show target
  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) targetTab.style.display = 'block';
  // Active button
  event?.target?.classList.add('active');
};

window.toggleSearch = window.toggleSearch || function() {
  console.log('Search toggled (fallback)');
  alert('Search feature coming soon!');
};

window.filterStudentsByClass = window.filterStudentsByClass || function() { console.log('Filter fallback'); };
window.loadClassLeaderboard = window.loadClassLeaderboard || function() { console.log('Leaderboard fallback'); };
window.filterActivitiesByClass = window.filterActivitiesByClass || function() { console.log('Activities fallback'); };

console.log('✅ Dashboard fallbacks loaded - showTab, toggleSearch ready');

