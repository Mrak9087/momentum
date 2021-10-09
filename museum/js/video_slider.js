function videoSlider(){
    const slider = document.querySelector('.video_slider');
    let wrapper = document.querySelector('.video_slider_wrapper');
    const prev = document.querySelector('.video_slider .nav_prev');
    const next = document.querySelector('.video_slider .nav_next');
    let crSlide = document.querySelector('.active_video');
    const positions = document.querySelectorAll('.nav_position');

    const player = document.querySelector('.player');
    const btnBigPlay = document.querySelector('.btn_play_video');
    const sound = document.querySelector('.sound_progress');
    const progress = document.querySelector('.video_progress');
    const muteBtn = document.querySelector('.btn_control_sound');

    muteBtn.addEventListener('click',(e) => {
        if (player.muted){
            player.muted = false;
            muteBtn.classList.remove('mute');
        } else {
            player.muted = true;
            muteBtn.classList.add('mute');
            
        }
    });
    player.addEventListener('timeupdate', (e)=>{
        let percent = (player.currentTime / player.duration) * 100;
        progress.value = percent;
        progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #fff ${progress.value}%, white 100%)`
    })
    progress.addEventListener('input',(e)=>{
        let scrub = (progress.value * player.duration) / 100;
        console.log(e) ;
        console.log(scrub);
        player.currentTime = scrub;

    })
    btnBigPlay.addEventListener('click', videoPlay);
    sound.addEventListener('change', changeSound);
    sound.addEventListener('mousemove', changeSound);

    function videoPlay(){
        if (player.paused){
            player.play();
        } else {
            player.pause();
        }
    }

    function changeSound(){
        player.volume = this.value/100;
    }

    const slides = wrapper.querySelectorAll('.video_card');
    
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
    wrapper.appendChild(cloneFirst);
    wrapper.insertBefore(cloneLast, firstSlide);
    wrapper.style.left = `0px`;

    slides[0].classList.add('active_video');
    
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
                wrapper.style.left = (posInitial - slideSize-42) + "px";
                index++;      
            } else if (dir == -1) {
                wrapper.style.left = (posInitial + slideSize+84) + "px";
                index--;      
            }
        };

        allowShift = false;
    }
        
    function checkIndex (){
        slideSize = slides[0].offsetWidth;
        wrapper.classList.remove('shifting');
        // console.log('work');
        if (index == -1) {
            wrapper.style.left = -(slidesLength * slideSize)-84 + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            wrapper.style.left = "0px";
            index = 0;
        }
        
        allowShift = true;
        positions.forEach((item)=>{
            item.classList.remove('nav_cur');
        })
        positions[index].classList.add('nav_cur');

        slides.forEach((item)=>{
            console.log(item)
            item.classList.remove('active_video');
        })
        slides[index].classList.add('active_video');
        let videoPoster = slides[index].querySelector('img').src;
        player.poster = videoPoster;
        let srcVideo = slides[index].dataset.video; //querySelector('.video__link').href
        player.src = srcVideo;
        
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
        slideSize = slides[0].offsetWidth * countLoop + 42 * (countLoop-1);
        shiftSlide(dir);
        index = idx;
        positions.forEach((item)=>{
            item.classList.remove('nav_cur');
        })
        positions[index].classList.add('nav_cur');

        slides.forEach((item)=>{
            item.classList.remove('active_video');
        })
        slides[index].classList.add('active_video');
    }
}

videoSlider();