let videoTitle = 'downloaded_video.mp4';  

document.addEventListener('contextmenu', function(event) {
    event.stopPropagation();  // 이벤트 버블링을 중단
    return true;  // 기본 이벤트를 실행
}, true);

function findVideoElementInIframe() {
    let videoElement = document.getElementById('kollus_player_html5_api');
    if (videoElement && videoElement.tagName.toLowerCase() === 'video') {
        chrome.runtime.sendMessage({type: "showNotification"});
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'URL_CHANGED' && (window == window.top)) {
        const spanElement = document.querySelector('span.classroom-sidebar-clip__chapter__clip__title--active');
          if (spanElement) {
            const bigTitle = spanElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.firstChild.textContent.trim();
            const middleTitle = spanElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.textContent.trim();
            const videoTitle = `${bigTitle}-${middleTitle}-${spanElement.textContent.trim()}.mp4`;
           
            window.navigator.clipboard.writeText(videoTitle).then(() => {
                console.log(videoTitle)
                return;
            });
          }
        //startObserver();
    }
    if (message.type === 'onFocus') {
        console.log("works!!!!!!!!!!!!!!!!!!!!!!!")
        const spanElement = document.querySelector('span.classroom-sidebar-clip__chapter__clip__title--active');
        if (spanElement) {
          const bigTitle = spanElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.firstChild.textContent.trim();
          const middleTitle = spanElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.textContent.trim();
          const videoTitle = `${bigTitle}-${middleTitle}-${spanElement.textContent.trim()}.mp4`;
          window.navigator.clipboard.writeText(videoTitle).then(() => {
                console.log(videoTitle)
                return;
            });
        }
    }
});

// 만약 현재 스크립트가 iframe 내에서 실행 중이면 해당 함수를 호출
if (window !== window.top) {
    findVideoElementInIframe();
}