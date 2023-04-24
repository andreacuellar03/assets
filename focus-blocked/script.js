class LocalStorageService {
  constructor() {
    this.localStorage = window.localStorage;
  }

  setItem(key, value) {
    this.localStorage.setItem(key, value);
  }

  getItem(key) {
    return this.localStorage.getItem(key) ?? false;
  }
}

const LOCAL_STORAGE = {
  IS_PAGE_LOADED: 'is_page_loaded',
  IS_PAGE_RELOADED: 'is_page_reloaded',
};

const urlParams = new URLSearchParams(window.location.search);
let current_url = urlParams.get('old_url');
current_url = current_url.startsWith('http')
  ? current_url
  : `https://${current_url}`;
const old_url = current_url.substring(
  0,
  current_url.indexOf('?') === -1
    ? current_url.length
    : current_url.indexOf('?')
);
const focus_mode = urlParams.get('focus_mode');
const focusEndTime = urlParams.get('focus_mode_end_time');
const block_type = urlParams.get('block_type');
const cuddlyBearMode = urlParams.get('cuddly_bear_mode');
const blocked_reason = urlParams.get('reason');
let blocked_message;
if (block_type)
  blocked_message = block_type.includes('always-block')
    ? 'This site is always blocked'
    : block_type.includes('morning')
    ? "Blocked because you're doing your morning routine"
    : block_type.includes('evening')
    ? "Blocked because you're doing your evening routine"
    : '';
const storage = new LocalStorageService();
const focus_tip_old_url = `<div class='notice-wrapper'>
                    ${
                      block_type
                        ? ''
                        : `<a href=${current_url}>Click here to re-open the original URL ${
                            old_url ?? ''
                          }</a>`
                    }
                    </div>`;
const focus_tip = `<div class='notice-wrapper'>
                    ${
                      block_type
                        ? ''
                        : `<a href=${current_url}>Click here to re-open the original URL ${
                            old_url ?? ''
                          }</a>`
                    }
                    <h6>Want to reprogram your brain so you stay on task during focus blocks?
                      <a href="https://journals.sagepub.com/doi/abs/10.1177/1539449219876877?journalCode=otjb&">Research into breaking bad habits</a> indicates that if you take a positive action immediately after doing a bad habit, you'll start to disrupt the neural triggers for the bad habit. For example, you just opened ${old_url} when you were intending to focus${
  focus_mode ? ` on ${focus_mode}` : ``
}. Try doing some deep breathing for 5 seconds, get up and stretch or go grab a glass of water. <a href="https://journals.sagepub.com/doi/full/10.1177/1539449219876877">Fritz et al's study</a> indicates this approach works much better than punishing yourself (no need to give yourself a mild electric shock for being so naughty). If you want a primer on the science of habit formation, <a href="https://hubermanlab.com/the-science-of-making-and-breaking-habits/">episode 53 of the Huberman Lab podcast</a> is worth a listen.</h6>
                    </div>`;

if (block_type) {
  document.getElementById('focusTitle').innerText = blocked_message;
  if (block_type === 'always-block' || block_type === 'always-blocked') {
    document.getElementById(
      'progressWrapper'
    ).innerHTML = `<div class='notice-wrapper'><h6 class='centeredText'>${old_url} is configured to be always blocked. If you want to allow ${old_url}, go to Preferences > Always Blocked URLs</h6></div>`;
    let imgElement = document.createElement('img');
    imgElement.src =
      'https://focus-bear.github.io/assets/focus-blocked/block_urls.png';
    document.getElementById('progressWrapper').appendChild(imgElement);
  } else {
    document.getElementById(
      'progressWrapper'
    ).innerHTML = `<div class='notice-wrapper'><h6 class='centeredText'>Back to your plans for world domination! Save ${
      !block_type.includes('always-block')
        ? `<a href='${old_url}''>${old_url}</a>`
        : old_url
    } for when you've finished boiling the oceans.</h6></div>`;
    document.getElementById(
      'focusTipWrapper'
    ).innerHTML = `<a id='showFocusTip'>Get a tip for staying focused</a>`;
    document.getElementById('showFocusTip').onclick = function () {
      document.getElementById('focusTipWrapper').innerHTML = focus_tip;
    };
  }
} else {
  const isPageLoaded = storage.getItem(LOCAL_STORAGE.IS_PAGE_LOADED);
  const isPageReloaded = storage.getItem(LOCAL_STORAGE.IS_PAGE_RELOADED);
  if (isPageLoaded) {
    storage.setItem(LOCAL_STORAGE.IS_PAGE_LOADED, true);
  } else {
    storage.setItem(LOCAL_STORAGE.IS_PAGE_RELOADED, true);
  }
  document.getElementById('focusTitle').innerText =
    "Let's keep the focus on " + focus_mode;
  const endTime = moment(focusEndTime);
  let refreshIntervalId = setInterval(
    () => {
      if (endTime.diff(moment(), 'minutes') > 0) {
        document.getElementById(
          'progressWrapper'
        ).innerHTML = `<p id="focusProgressNotice">Your focus block will end ${moment
          .duration(endTime.diff(moment()))
          .humanize(
            true
          )}</p> <a href='${current_url}'>Original URL ${old_url}</a>`;
      } else {
        clearInterval(refreshIntervalId);
        document.getElementById('focusTitle').innerText =
          'Focus block is over!';
        document.getElementById('progressWrapper').innerHTML =
          focus_tip_old_url;
        if (isPageReloaded) {
          window.location.href = old_url;
        }
      }
    },
    1000,
    endTime
  );
}

document.getElementById('privacyBtn').addEventListener('click', () => {
  let noticeElement = document.getElementById('privacyNoticeContent');
  let noticeElementArrow = document.getElementById('arrow');
  if (noticeElement.className === 'hidePrivacyNotice') {
    noticeElement.className = 'privacyNotice';
    noticeElementArrow.className = 'privacyNoticeContentArrow';
  } else {
    noticeElement.className = 'hidePrivacyNotice';
    noticeElementArrow.className = 'hidePrivacyNotice';
  }
});

let cuddlyBearBtn = document.getElementById('cuddlyBearBtn');
if (cuddlyBearMode) {
  cuddlyBearBtn.className = 'showCuddlyBearBtn';
} else {
  cuddlyBearBtn.className = 'hideCuddlyBearBtn';
}

document.getElementById('unblockBtn').addEventListener('click', () => {
  if (old_url.includes('?')) {
    window.open(`${old_url}&focus_bear_temporarily_allow=true`, '_self');
  } else {
    window.open(`${old_url}?focus_bear_temporarily_allow=true`, '_self');
  }
});

if (blocked_reason) {
  let toast = document.getElementById('toast');
  toast.innerHTML = blocked_reason;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 5000);
}
