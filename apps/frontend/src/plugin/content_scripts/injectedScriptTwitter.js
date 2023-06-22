/* eslint-disable no-undef */
console.log('working on twitter');


function follow(id,authToken, isFollow) {
  chrome.runtime.sendMessage({case:'followUser', id, authToken, isFollow});
}

const getNumber = (value) => {
  if (value < 1000) return `${value}`;
  else if (value > 1000 && value < 1000000) return `${(value / 1000).toFixed(0)}k`;
  else return `${(value / 1000000).toFixed(0)}m`;
}

const insertCakeButton = (data,authToken) => {
  if (!document.querySelector('div.banner-cake button.btn')) {
      const insertContainer = document.querySelector('body');
      const cakeBtnContainer = document.createElement('div');
      cakeBtnContainer.classList.add('banner-cake');

      cakeBtnContainer.innerHTML = `
      <img src='https://s3.eu-central-1.amazonaws.com/backend.dev.cake/1668163523310-banner_bg.png'>
      <button class="btn">
      Cak3
      <span class="badge">${getNumber(data.data.followers)}</span>
      </button>
      <div class='close-banner-cake'><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8155 0.780273L1.26953 10.3262M10.8155 10.3262L1.26953 0.780273" stroke="#5C2448" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`
      insertContainer.insertAdjacentElement('beforebegin', cakeBtnContainer);
      document.querySelector('div.banner-cake button.btn').addEventListener('click', ()=> {follow(data.data.id, authToken, data.data.isFollow)})
      document.querySelector('div.banner-cake div.close-banner-cake').addEventListener('click', ()=> {cakeBtnContainer.style.display = 'none'})
  }
}

const getInfo = async(authToken, channelLink) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    chrome.storage.sync.get('apiUrl').then(url => {
      const { apiUrl } = url;
      fetch(`${apiUrl}/api/user/platform?link=${channelLink}`, requestOptions)
      .then(response => {
        response.text().then(text => {
          const data = JSON.parse(text);
          insertCakeButton(data,authToken);
        })
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }); 
  }

const timer = () => {
    setTimeout(() => {
        const twitterHref = location.href;

        if (document.querySelector('div.css-1dbjc4n[data-testid="placementTracking"]')) {
            chrome.storage.sync.get('authToken', (token)=> {
            if(token?.authToken) {
              getInfo(token.authToken, twitterHref);
            }
          });
        } else {
            timer();
        }
    }, 1000);
}



window.addEventListener('load', () => {
    timer()
}, false)

window.addEventListener('popstate', () => {
    timer();
})
