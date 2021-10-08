function explore(){
    const spliter = document.querySelector('.spliter');
    const cardCur = document.querySelector('.card_cur');
    const img = document.querySelector('.card_cur img');
    
    let w = img.offsetWidth;
    let imageInterval = setInterval(() => {
        if (img.complete){
            w = img.offsetWidth;
            clearInterval(imageInterval);
        }
    }, 50);
    
    let pos;

    spliter.addEventListener("mousedown", slideReady);
    
    window.addEventListener("mouseup", slideFinish);
    
    spliter.addEventListener("touchstart", slideReady);
    
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
    
      e.preventDefault();
     
      clicked = 1;
     
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      
      clicked = 0;
    }
    function slideMove(e) {
      
      
      if (clicked == 0) return false;
      
      pos = getCursorPos(e)
      
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      
      slide(pos);
    }
    function getCursorPos(e) {
      let a, x = 0;
      e = e || window.event;
      
      a = img.getBoundingClientRect();
      
      x = e.pageX - a.left;
      
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      
      cardCur.style.width = x + "px";
      
      spliter.style.left = cardCur.offsetWidth - (spliter.offsetWidth / 2) + "px";
    }
}

explore();
