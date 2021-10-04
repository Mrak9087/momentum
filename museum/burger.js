const bgMenu = document.querySelector('.burger_menu');
const welcome = document.querySelector('.welcome_text');
const links = document.querySelectorAll('.nav_link');

bgMenu.addEventListener('click', (e) => {
    // this.classList.toggle('active');
    bgMenu.classList.toggle('active');
    welcome.classList.toggle('hide');
})

links.forEach((item)=>{
    item.addEventListener('click', (e)=>{
        bgMenu.classList.remove('active');
        welcome.classList.remove('hide');
    })
})