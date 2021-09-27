const progress = document.querySelectorAll('.progress');
  
progress.forEach((item)=>{
    item.addEventListener('input', function() {
        const value = this.value;
        this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
      })
})