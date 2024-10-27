const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

async function updateExchangeRate(){
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal === '' || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    let toCur = toCurr.value.toLowerCase();
    let fromCur = fromCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCur}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let toCurKey = data[fromCur];
    let rate = toCurKey[toCur];
    // console.log(rate);
    let x = rate * amtVal;
    let finalAmt = x.toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt) => {
        updateFlag(evt.target);
    })
}

window.addEventListener('load',updateExchangeRate());

btn.addEventListener('click',(evt) => {
    evt.preventDefault();
    updateExchangeRate();
})



