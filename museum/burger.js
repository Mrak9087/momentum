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

// console.log(`
// 1) Вёрстка соответствует макету. Ширина экрана 1024px: +40
// 2) Вёрстка соответствует макету. Ширина экрана 768px: +40
// 3) Вёрстка соответствует макету. Ширина экрана 420px: +40
// 4) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки: +6 
// 5) При изменении ширины экрана плавно изменяются размеры: +14
// 6) На ширине экрана 1024рх и меньше реализовано адаптивное меню: +12
// 7) Оптимизация скорости загрузки страницы( показал 69 - желтая зона) +4
// Итого: 156

// `)