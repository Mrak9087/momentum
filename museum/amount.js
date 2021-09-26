const btnBuy = document.querySelector('.btn_buy');
const buy = document.querySelector('.buy');
const btnClose = document.querySelector('.btn_close')


btnBuy.addEventListener('click',(e) => {
    buy.classList.add('buy_show');
})

btnClose.addEventListener('click',(e) => {
    buy.classList.remove('buy_show');
})

buy.addEventListener('click',(e) => {
    if (e.target === buy){
        buy.classList.remove('buy_show');
    }
    
})
