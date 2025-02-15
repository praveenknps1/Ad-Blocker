chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true, customFilters: [], blockedAdsCount: 0 });
  });
  
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.blockedAdsCount) {
      chrome.action.setBadgeText({ text: changes.blockedAdsCount.newValue.toString() });
    }
  });