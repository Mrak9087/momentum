function videoSlider(){
    const slider = document.querySelector('.video_slider');
    let wrapper = document.querySelector('.video_slider_wrapper');
    const prev = document.querySelector('.video_slider .nav_prev');
    const next = document.querySelector('.video_slider .nav_next');
    let crSlide = document.querySelector('.active_video');
    const positions = document.querySelectorAll('.nav_position');

    const slides = wrapper.querySelectorAll('.video_card');
    console.log(slides)
    let slidesLength = slides.length;
    // let slideSize = slides[0].offsetWidth;
    let posX1 = 0;
    let posX2 = 0;
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
    wrapper.appendChild(cloneFirst);
    wrapper.insertBefore(cloneLast, firstSlide);
    wrapper.style.left = `${-(slideSize+42)}px`;
    
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });
    wrapper.addEventListener('transitionend', checkIndex);

    wrapper.onmousedown = dragStart;
    wrapper.addEventListener('touchstart', dragStart);
    wrapper.addEventListener('touchend', dragEnd);
    wrapper.addEventListener('touchmove', dragAction);


    function dragStart (e) {
        // e = e || window.event;
        e.preventDefault();
        posInitial = wrapper.offsetLeft;

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
        wrapper.style.left = (wrapper.offsetLeft - posX2) + "px";
    }
    
    function dragEnd (e) {
        posFinal = wrapper.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            wrapper.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        wrapper.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = wrapper.offsetLeft; }
            
            if (dir == 1) {
                wrapper.style.left = (posInitial - slideSize) + "px";
                index++;      
            } else if (dir == -1) {
                wrapper.style.left = (posInitial + slideSize) + "px";
                index--;      
            }
        };

        allowShift = false;
    }
        
    function checkIndex (){
        slideSize = slides[0].offsetWidth;
        wrapper.classList.remove('shifting');
        console.log('work');
        if (index == -1) {
            wrapper.style.left = -(slidesLength * slideSize + 42) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            wrapper.style.left = -(1 * slideSize + 42) + "px";
            index = 0;
        }
        
        allowShift = true;
        positions.forEach((item)=>{
            item.classList.remove('nav_cur');
        })
        positions[index].classList.add('nav_cur');
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
            item.classList.remove('nav_cur');
        })
        positions[index].classList.add('nav_cur');
    }
}

videoSlider();