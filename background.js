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