
// Global Variables
const themes = ['Normal', 'Dark', 'Soda Pop', 'Rainbow'];
let currentTheme = JSON.parse(localStorage.getItem('currentTheme')) || 0;
let selectedTheme;
let clearId;
let imageId;
let isDisabled = false;

// Functions
export function themeButton(){
  const btn        = document.querySelector('.js-setting-button');
  const msg        = document.querySelector('.js-message-popup');
  const warningMsg = document.querySelector('.js-warning-popup');
  const cancelBtn  = document.querySelector('.js-cancel-button');
  const saveBtn    = document.querySelector('.js-save-button');

  // theme option buttons
  const normalBtn  = document.querySelector('.js-normal-theme');
  const darkBtn    = document.querySelector('.js-dark-theme');
  const sodaPopBtn = document.querySelector('.js-soda-pop-theme');
  const rainbowBtn = document.querySelector('.js-rainbow-theme');

  // warning msg buttons
  const yesBtn     = document.querySelector('.js-warning-button-yes');
  const noBtn      = document.querySelector('.js-warning-button-no');

  btn.addEventListener('click', ()=>{
    msg.classList.add('set-visible');
    btn.classList.add('set-invisible');
  });

  cancelBtn.addEventListener('click', ()=>{
    btn.classList.remove('set-invisible');
    msg.classList.remove('set-visible');
    removeExistingSelectedBtn();
    selectedTheme = undefined;
  });

  saveBtn.addEventListener('click', ()=>{
    if(selectedTheme !== undefined){
      disableCurrentTheme();
      currentTheme = selectedTheme;
      saveToStorage();
      setTheme();
      msg.classList.remove('set-visible');
      btn.classList.remove('set-invisible');
    }
  });

  yesBtn.addEventListener('click', ()=>{
    msg.classList.add('set-visible');
    warningMsg.classList.remove('set-visible');
    isDisabled = false;
    renderPopUpMsg();
    themeButton();

    if(selectedTheme !== undefined){
      disableCurrentTheme();
      currentTheme = selectedTheme;
      saveToStorage();
      setTheme();
      msg.classList.remove('set-visible');
      btn.classList.remove('set-invisible');
    }
  });

  noBtn.addEventListener('click', ()=>{
    warningMsg.classList.remove('set-visible');
    isDisabled = false;
    renderPopUpMsg();
    renderWarningPopUpMsg();
    themeButton();
  });

  normalBtn.addEventListener('click', ()=>{
    selectedTheme = 0;
    if(selectedTheme !== currentTheme){
      setSelected('.js-normal-theme');
      setMessage('Normal');
    }else {
      setExistThemeMessage('Normal');
    }
  });

  darkBtn.addEventListener('click', ()=>{
    selectedTheme = 1;
    if(selectedTheme !== currentTheme){
      setSelected('.js-dark-theme');
      setMessage('Dark');
    }else {
      setExistThemeMessage('Dark');
    }
  });

  sodaPopBtn.addEventListener('click', ()=>{
    selectedTheme = 2;
    if(selectedTheme !== currentTheme){
      setSelected('.js-soda-pop-theme');
      setMessage('Soda Pop');
    } else {
      setExistThemeMessage('Soda Pop');
    }
  });

  rainbowBtn.addEventListener('click', ()=>{ 
    selectedTheme = 3;
    if(selectedTheme !== currentTheme){
      setSelected('.js-rainbow-theme');
      warningMsg.classList.add('set-visible');
      isDisabled = true;
      setMessage('Rainbow');
      renderPopUpMsg();
    } else {
      setExistThemeMessage('Rainbow');
    }
    
  });
}

export function renderPopUpMsg(){
  const displayArea = document.querySelector('.js-message-popup');
  const themeId     = checkIndexAndSetCheck(currentTheme);

  let html =`
    <p>Choose a Theme</p>
    <div class="choices">
      <button class="choice-button js-normal-theme">${themeId === 0 ? '&check;': ''}Normal</button>
      <button class="choice-button dark-choice-button js-dark-theme">${themeId === 1 ? '&check;': ''}Dark</button>
      <button class="choice-button soda-pop-choice-button js-soda-pop-theme">${themeId === 2 ? '&check;': ''}Soda Pop</button>
      <button class="choice-button rainbow-choice-button js-rainbow-theme">${themeId === 3 ? '&check;': ''}Rainbow</button>
    </div>
    <div class="info-area js-info-area">
    </div>
    <div class="other-buttons">
      <button class="other-button js-save-button"   ${isDisabled === true ? 'disabled' : ''}>Save</button>
      <button class="other-button js-cancel-button" ${isDisabled === true ? 'disabled' : ''}>Cancel</button>
    </div>
  `;

  displayArea.innerHTML = html;
}

function renderWarningPopUpMsg(){
  const displayArea = document.querySelector('.js-warning-popup');

  const html = `
      <p>Are you sure you want Rainbow Theme?</p>
      <img src="images/image${randomPickImage()}.jpg" alt="image">
      <div class="warning-popup-buttons">
        <button class="warning-button js-warning-button-yes">Yeah &#127752;</button>
        <button class="warning-button js-warning-button-no">Wth, no! &#128128;</button>
      </div>
  `;

  displayArea.innerHTML = html;
  renderPopUpMsg();
}


function checkIndexAndSetCheck(index){
  let i = 0;
  let id;

  themes.forEach((value)=>{
    if(value === themes[index]){
      id = i;
    }
    i++;
  });
  return id;
}

function setSelected(targetClass){
  const button = document.querySelector(targetClass);

  removeExistingSelectedBtn();
  button.classList.add('set-selected');
}

function removeExistingSelectedBtn(){
  const isSelected = document.querySelector('.set-selected')||false;

  if(isSelected){
    isSelected.classList.remove('set-selected');
  }
}

function saveToStorage(){
  localStorage.setItem('currentTheme', JSON.stringify(currentTheme));
}

function setMessage(name){
  const msgArea = document.querySelector('.js-info-area');

  clearTimeout(clearId);

  clearId = setTimeout(()=>{
    const displayMsg = document.querySelector('.js-selected-theme-info');

    if(displayMsg){
      displayMsg.remove();
    }
  },1500);

  const html = `
    <p class="js-selected-theme-info">${name} Theme is Selected</p>
  `;

  msgArea.innerHTML = html;
}

function setExistThemeMessage(name){
  const msgArea = document.querySelector('.js-info-area');

  clearTimeout(clearId);

  clearId = setTimeout(()=>{
    const displayMsg = document.querySelector('.js-selected-theme-info');
    displayMsg.remove();
  },1500);

  const html = `
    <p class="js-selected-theme-info">${name} Theme  is already the current theme.</p>
  `;

  msgArea.innerHTML = html;
}

function disableCurrentTheme(){
  const body        = document.querySelector('.js-calculator-container');
  const htmlBody    = document.body;
  const str         = (themes[currentTheme]).toLowerCase().split(' ');
  const targetTheme = Array.from(str).join('-')+"-theme";
  
  if(targetTheme === 'rainbow-theme'){
    htmlBody.classList.remove(targetTheme);
  } else {
    body.classList.remove(targetTheme);
  }
}

function randomPickImage(){
  const pick = Math.random();
  let id;
  let result;

  if(pick >= 0 && pick < 1/5){
    id = 1;
  } else if (pick >= 1/5 && pick < 2/5){
    id = 2;
  } else if (pick >= 2/5 && pick < 3/5){
    id = 3;
  } else if (pick >= 3/5 && pick < 4/5){
    id = 4;
  } else if (pick >= 4/5 && pick <= 5/5){
    id = 5;
  }

  if(imageId === undefined){
    imageId = id;
    result  = id;
  } else if (imageId !== id) {
    imageId = id;
    result  = id;
  } else if (imageId === id){
    if(id < 5){
      result  = id + 1;
      imageId = id + 1;
    } else if (id === 5){
      result  = 1;
      imageId = 1;
    }
  }

  return result;
}

export function setTheme(){
  const body      = document.querySelector('.js-calculator-container');
  const htmlBody  = document.body;
  const str       = (themes[currentTheme]).toLowerCase().split(' ');
  const target    = Array.from(str).join('-')+"-theme";
  
  if(target === 'rainbow-theme'){
    htmlBody.classList.add(target);
  } else {
    body.classList.add(target);
  }
  renderPopUpMsg();
  renderWarningPopUpMsg();
  themeButton();
}
