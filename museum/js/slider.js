function slider() {
    const slider = document.querySelector('.slider');
    let items = document.querySelector('.slider_image');
    const prev = document.querySelector('.btn_prev');
    const next = document.querySelector('.btn_next');
    let crSlide = document.querySelector('.slide_current');
    const positions = document.querySelectorAll('.slider .slide_position');

    const slides = items.querySelectorAll('img');
    // console.log(slides)
    let slidesLength = slides.length;
    // let slideSize = slides[0].offsetWidth;
    let posX1 = 0;
    let posX2 = 0;
    let posInitial = 100;
    let posFinal = 100;
    let threshold = 100;
    let firstSlide = slides[0];
    // console.log(firstSlide.offsetWidth);
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

    items.onmousedown = dragStart;
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);


    function dragStart (e) {
        // e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        // e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }
    
    function dragEnd (e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

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
        // console.log('work');
        if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
        }

        if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
        }
        crSlide.textContent = `0${index+1}`;
        allowShift = true;
        positions.forEach((item)=>{
            item.classList.remove('current_position');
        })
        positions[index].classList.add('current_position');
    }

    positions.forEach((item,idx)=>{
        item.addEventListener('click',()=>{
            if (idx == index) return;
            if (idx < index) {
                shiftItems(-1,idx,index-idx)
            }
            else {
                shiftItems(1,idx,idx-index)
            }
        })
        
    })

    function shiftItems(dir,idx,countLoop){
        slideSize = slides[0].offsetWidth * countLoop;
        shiftSlide(dir);
        index = idx;
        positions.forEach((item)=>{
            item.classList.remove('current_position');
        })
        positions[index].classList.add('current_position');
    }

}

slider();