chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "showNotification") {
      chrome.notifications.create({
          type: "basic",
          iconUrl: "google_chrome_new_logo_icon_159144.png",
          title: "Notification Title",
          message: "The page has been loaded!",
          silent: true
      });
  }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log("sssssssssssssssssss",changeInfo.status)
      chrome.tabs.sendMessage(tabId, {
          type: 'URL_CHANGED',
          url: changeInfo.url
      });
  }
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) { // 창이 닫힌 경우를 제외
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0];
        if (tab.url && (tab.url.startsWith("https://fastcampus.app/courses/") || tab.url.startsWith("http://fastcampus.app/courses/"))) {
          console.log("포커싱@@@");
          chrome.tabs.sendMessage(tab.id, { type: "onFocus" });
        }
      }
    });
  }
});