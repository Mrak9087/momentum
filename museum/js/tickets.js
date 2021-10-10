function tickets(){
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
    const DAY_WEEK = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const inputsRadio = document.querySelectorAll('input[type="radio"]');
    const inputBasic = document.querySelector('.number.basic');
    const inputSenior = document.querySelector('.number.senior');
    const buyBasic = document.querySelector('.entry_number.basic');
    const buySenior = document.querySelector('.entry_number.senior');
    const btnsUp = document.querySelectorAll('.amount_btn.up');
    const btnsDown = document.querySelectorAll('.amount_btn.down');
    const btnsBuyUp = document.querySelectorAll('.entry_btn.up');
    const btnsBuyDown = document.querySelectorAll('.entry_btn.down');
    const spanTotalSum = document.querySelector('.totalSum');
    const ticketType = document.querySelector('.input_type');
    const buyDateTick = document.querySelector('.pay_dt.date_pay')
    const buyTimeParent = document.querySelector('.ticket_input.ticket_time');
    const buyTime = document.querySelector('.inp_time');
    const timeRanges = document.querySelectorAll('.time_range div');
    const container = document.querySelector('.buy_container');
    const pTime = document.querySelector('.pay_dt.time_pay');
    let curSpan;
    container.addEventListener('click',(e)=>{
        // if (!e.target.closest('.time_range')){
        //     buyTimeParent.classList.remove('show_time');
        // }
        // console.log(curSpan);
    })

    timeRanges.forEach((item)=>{
        item.addEventListener('click',(e)=>{
            // e.preventDefault();
            // e.stopPropagation();
            
            buyTime.value = item.innerText;
            pTime.innerText = buyTime.value
            buyTimeParent.classList.remove('show_time');
        })
    })
    
    buyTime.addEventListener('focus',()=>{
        buyTimeParent.classList.add('show_time')
    })

    // buyTime.addEventListener('blur',(e)=>{
    //     if (e.target.closest('.time_range')){
    //         console.log(e.target)
    //         // buyTimeParent.classList.remove('show_time')
    //     }
    //     console.log(e.target)
    //     // buyTimeParent.classList.remove('show_time');
    //     // console.log(e.target);
    //     // console.log(e.target.closest('.time_range'));
    // })

    const btnBuy = document.querySelector('.btn_buy');
    const buy = document.querySelector('.buy');
    const btnClose = document.querySelector('.btn_close')
    const btnPay = document.querySelector('.pay_btn')


    btnBuy.addEventListener('click',(e) => {
        setValues();
        buy.classList.add('buy_show');
    })

    btnClose.addEventListener('click',(e) => {
        buy.classList.remove('buy_show');
        buyTimeParent.classList.remove('show_time')
    })

    buy.addEventListener('click',(e) => {
        if (e.target === buy){
            buy.classList.remove('buy_show');
            buyTimeParent.classList.remove('show_time')
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
    
    //buy
    const cntBasicElem = document.querySelector('.cntBasic');
    const cntSeniorElem = document.querySelector('.cntSenior');
    const optionBasicElem = document.querySelector('.optionBasic');
    const optionSeniorElem = document.querySelector('.optionSenior');
    const prcBasicElem = document.querySelector('.prcBasic');
    const prcSeniorElem = document.querySelector('.prcSenior');
    const buyTotalPriceElem = document.querySelector('.buyTotalPrice');
    // const optionBasicElem = document.querySelector('.optionBasic');

    const prices = [20, 25, 40];
    let price = 20;
    let idx = 0;
    let totalSum = 30;
    let countBasic = 1;
    let countSenior = 1;

    ticketType.selectedIndex  = idx+1;
    btnsUp.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            let sibling = item.previousElementSibling;
            if (+sibling.value >= sibling.max) return
            sibling.value = +sibling.value + 1;
            if (sibling == inputBasic){
                countBasic = sibling.value
            }
            if (sibling == inputSenior){
                countSenior = sibling.value
            }

            getTotalSum(inputBasic.value,inputSenior.value);
            
        })
    })

    btnsBuyUp.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            let sibling = item.previousElementSibling;
            if (+sibling.value >= sibling.max) return
            sibling.value = +sibling.value + 1;
            if (sibling == buyBasic){
                countBasic = sibling.value
            }
            if (sibling == buySenior){
                countSenior = sibling.value
            }

            getTotalSum(countBasic,countSenior);
            
        })
    })

    btnsDown.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            let sibling = item.nextElementSibling;
            if (+sibling.value <= sibling.min) return
            sibling.value = +sibling.value - 1;
            if (sibling == inputBasic){
                countBasic = sibling.value
            }
            if (sibling == inputSenior){
                countSenior = sibling.value
            }

            getTotalSum(inputBasic.value,inputSenior.value);
            
        })
    })

    btnsBuyDown.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            let sibling = item.nextElementSibling;
            if (+sibling.value <= sibling.min) return
            sibling.value = +sibling.value - 1;
            if (sibling == buyBasic){
                countBasic = sibling.value
            }
            if (sibling == buySenior){
                countSenior = sibling.value
            }

            getTotalSum(buyBasic.value,buySenior.value);
            
            
        })
    })

    function setValues(){
        inputBasic.value = countBasic;
        inputSenior.value = countSenior;
        cntBasicElem.innerText = countBasic;
        cntSeniorElem.innerText = countSenior;
        spanTotalSum.innerText = totalSum;
        buyBasic.value = countBasic;
        buySenior.value = countSenior;
        optionBasicElem.innerText = `Basic (${prices[idx]} €)`;
        optionSeniorElem.innerText = `Senior (${prices[idx] / 2} €)`;
        prcBasicElem.innerText = `${countBasic * prices[idx]} €`;
        prcSeniorElem.innerText = `${countSenior * (prices[idx] / 2)} €`;
        buyTotalPriceElem.innerText = `${totalSum} €`
    }

    function getTotalSum(basic,senior){
        let basicSum = +basic * price;
        let seniorSum = +senior * (price / 2);
        totalSum = basicSum + seniorSum;
        
        setValues()
    }
    
    inputsRadio.forEach((item,index)=>{
        item.addEventListener('change',(e)=>{
            if (item.checked) {
                idx = +item.dataset.index;
                price = prices[idx];                
                ticketType.selectedIndex  = idx+1;
                getTotalSum(inputBasic.value,inputSenior.value);
                
            }
        })
    })

    ticketType.addEventListener('change', (e) => {
        
        idx = ticketType.selectedIndex-1;
        price = prices[idx];
        getTotalSum(buyBasic.value,buySenior.value);
    })
    

    const inpData = document.querySelector('.inp_date')
    inpData.addEventListener('focus', (e)=>{
        let dt = new Date();
        inpData.min = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
    })
    inpData.addEventListener('change', (e)=>{
        console.log(inpData.value);
        let dt = new Date(inpData.value);
        buyDateTick.innerText = `${DAY_WEEK[dt.getDay()]}, ${MONTHS[dt.getMonth()]} ${dt.getFullYear() % 100}`
        
    })
}

tickets();