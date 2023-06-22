/* eslint-disable no-undef */
const apiUrl = 'https://www.denis-test.com'

chrome.runtime.onInstalled.addListener(async() => {
  chrome.storage.sync.set({ apiUrl });
});


chrome.action.onClicked.addListener((tabId, changeInfo, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['injectedScriptYoutube.js'],
  });
});

const openWindow = () => {
  chrome.windows.create({
    focused: true,
    width: 368,
    height: 910,
    type: "popup",
    url: 'index.html',
  }, async (win) => {
    chrome.windows.update(win.id, {
      left: (await chrome.windows.getCurrent()).width - 368 * 2,
      top: 0,
    })
    chrome.storage.sync.set({ redirect: '/home' })
  })
}

chrome.runtime.onMessage.addListener(async request => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${request.authToken}`);
  myHeaders.append("Content-Type", "application/json");
  switch (request.case) {
    case 'followUser':
      if (request.isFollow) {
        openWindow();
      } else {
        const raw = JSON.stringify({
          "userId": request.id
        });
      
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch(`${apiUrl}/api/followers`, requestOptions)
        .then(() => openWindow())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }
      break;
  }
})

