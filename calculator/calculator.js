
// Global Variables
const calculation = JSON.parse(localStorage.getItem('calculation')) ||{
  cal: ''
}
let numberOfClick = 0;
let lastInput = 0;


// Functions
function calculatorButton(){
  // buttons
  const calculatorBtn = document.querySelectorAll('.js-cal-button');
  const operatorBtn   = document.querySelectorAll('.js-operator-button');
  const deleteBtn     = document.querySelector('.js-delete-button');
  const clearBtn      = document.querySelector('.js-clear-button');

  calculatorBtn.forEach((button)=>{
    const text = button.innerText;
    
    button.addEventListener('click', ()=>{
      calculation.cal += text;
      saveToStorage();
      renderCalculation();
      lastInput = text;
      numberOfClick = 1; 
    });

  });

  operatorBtn.forEach((button)=>{
    const text = button.innerText;
    let textSymbol;
    text === 'x' && (textSymbol = '*');
    text === '÷' && (textSymbol = '/');

    button.addEventListener('click', ()=>{
      numberOfClick++;

      if(text !== '=' && textSymbol === undefined && numberOfClick <= 2 && !isNaN(lastInput)){
        calculation.cal += text;
        saveToStorage();
        renderCalculation();
        lastInput = text;
        numberOfClick >= 2 && (numberOfClick = 0);
      } else if(textSymbol && numberOfClick <= 2 && !isNaN(lastInput) && numberOfClick > 1){
        calculation.cal += textSymbol;
        saveToStorage();
        renderCalculation();
        lastInput = text;
        numberOfClick >= 2 && (numberOfClick = 0)
      }else if(text === '='){
        doCalculate(lastInput);
        saveToStorage();
      }else{
        numberOfClick = 0;
      }
      
    });
   
  });

  clearBtn.addEventListener('click', ()=>{
    clearDisplayArea();
    saveToStorage();
  });

  deleteBtn.addEventListener('click', ()=>{
    const array     = Array.from(calculation.cal);
    const lastIndex = array.length - 1;

    array.splice(lastIndex, 1);
    lastInput = array[lastIndex-2];
    calculation.cal = array.join('');
    numberOfClick = 1;

    saveToStorage();
    renderCalculation();
  });

}

function saveToStorage(){
  localStorage.setItem('calculation', JSON.stringify(calculation));
}

function doCalculate(num){
  if(!isNotANum(num)){
    const displayArea     = document.querySelector('.js-display-area');
    const numsToCalculate = (calculation.cal).toString();
    const result          = eval(numsToCalculate);

    displayArea.innerText = result;
    calculation.cal       = result.toString();
    const arrResult       = Array.from(calculation.cal);
    lastInput             = arrResult[0];
  } else {
    alert('invalid input : cant calculate ');
  }
}

function isNotANum(num){
  let result = true;
  const array = Array.from(calculation.cal);
  const lastInputOfArray = array[0] || 0;
  lastInput = lastInputOfArray;

  const test1 = isNaN(lastInput); 
  const test2 = isNaN(num);

  if(test1 === false && test2 === false){
    result = false;
  } else if (test1 === true && test2 === false){
    result = false;
  } else if (test1 === false && test2 === true){
    result = false;
  }

  return result;
}

function clearDisplayArea(){
  const displayArea     = document.querySelector('.js-display-area');

  displayArea.innerText = '0';
  calculation.cal       = '';
}

function renderCalculation(){
  const displayArea = document.querySelector('.js-display-area');
  let txt           = calculation.cal;

  txt === '' && (txt = 'Calculator');

  displayArea.innerText = txt;
}

// IIFE Immediately Invoked Function Expression
(function(){
  renderCalculation();
  calculatorButton();
})()
