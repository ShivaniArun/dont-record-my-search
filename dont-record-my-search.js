deleteMySearch = () => {
  chrome.history.search({'text': 'google.co'}, (results) => {
    console.log(results);
    results.map((result) => {
      chrome.history.deleteUrl({'url': result.url});
    });
  });
}

// Triggers every 5 minutes
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('delete-my-search', {when: 0, periodInMinutes: 5});
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'delete-my-search')
    deleteMySearch();
});
