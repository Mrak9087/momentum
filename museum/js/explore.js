const spliter = document.querySelector('.spliter');
const cardCur = document.querySelector('.card_cur');
const img = document.querySelector('.card_cur img');
spliter.onmousedown = splitStart;
spliter.addEventListener('touchstart', splitStart);
spliter.addEventListener('touchend', splitEnd);
spliter.addEventListener('touchmove', splitAction);
let moveInitial = 0;
let moveX1 = 0;
let moveX2 = 0;
let w = img.offsetWidth;
let imageInt = setInterval(() => {
    if (img.complete){
        w = img.offsetWidth;
        clearInterval(imageInt);
    }
    
}, 50);


function splitStart (e) {
    // e = e || window.event;
    e.preventDefault();
    moveInitial = spliter.offsetLeft;

    if (e.type == 'touchstart') {
        moveX1 = e.touches[0].clientX;
    } else {
        moveX1 = e.clientX;
        document.onmouseup = splitEnd;
        document.onmousemove = splitAction;
    }
}

function splitAction (e) {
    // e = e || window.event;

    if (e.type == 'touchmove') {
        moveX2 = moveX1 - e.touches[0].clientX;
        moveX1 = e.touches[0].clientX;
        
    } else {
        moveX2 = moveX1 - e.clientX;
        moveX1 = e.clientX;
        if (moveX2 > w){
            moveX2 = w;
        }
    }
    let wImg = spliter.offsetLeft - moveX2;
    if (wImg > w){
        wImg = w
    }
    if (wImg < 0){
        wImg = 0
    }
    spliter.style.left = wImg + "px";
    console.log(spliter.style.left);
    cardCur.style.width = spliter.style.left;

}
  
function splitEnd (e) {
    

    document.onmouseup = null;
    document.onmousemove = null;
}