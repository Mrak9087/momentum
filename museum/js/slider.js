const slider = document.querySelector('.slider');
let items = document.querySelector('.slider_image');
const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');

const slides = items.querySelectorAll('img');
console.log(slides)
let slidesLength = slides.length;
// let slideSize = slides[0].offsetWidth;
let posInitial = 100;
let posFinal = 100;
let threshold = 100;
let firstSlide = slides[0];
console.log(firstSlide.offsetWidth);
let slideSize = firstSlide.offsetWidth;
let lastSlide = slides[slidesLength - 1];
let cloneFirst = firstSlide.cloneNode(true);
let  cloneLast = lastSlide.cloneNode(true);
let index = 0;
let allowShift = true;
items.appendChild(cloneFirst);
items.insertBefore(cloneLast, firstSlide);
let imageInterval = setInterval(() => {
    if (firstSlide.complete){
        slideSize = firstSlide.offsetWidth;
        items.style.left = `${-slideSize}px`;
        clearInterval(imageInterval);
    }
    
}, 50);

// items.style.left = `${-slideSize}px`;

// windows.addEventListener('load',()=>{
    
// })

prev.addEventListener('click', function () { shiftSlide(1) });
next.addEventListener('click', function () { shiftSlide(-1) });
items.addEventListener('transitionend', checkIndex);
console.log(prev);
function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }

        if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
        } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
        }
    };

    allowShift = false;
}
    
function checkIndex (){
    slideSize = slides[0].offsetWidth;
    items.classList.remove('shifting');

    if (index == -1) {
    items.style.left = -(slidesLength * slideSize) + "px";
    index = slidesLength - 1;
    }

    if (index == slidesLength) {
    items.style.left = -(1 * slideSize) + "px";
    index = 0;
    }

    allowShift = true;
}
