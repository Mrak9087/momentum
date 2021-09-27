const btnBuy = document.querySelector('.btn_buy');
const buy = document.querySelector('.buy');
const btnClose = document.querySelector('.btn_close')
const btnPay = document.querySelector('.pay_btn')


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


btnPay.addEventListener('click', function (e) {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const rect = btnPay.getBoundingClientRect();

    const xInside =  e.clientX - rect.x; 
    const yInside = e.clientY - rect.y;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
})
