const images_path = [
    "./assets/img/galery/galery1.jpg",
    "./assets/img/galery/galery2.jpg",
    "./assets/img/galery/galery3.jpg",
    "./assets/img/galery/galery4.jpg",
    "./assets/img/galery/galery5.jpg",
    "./assets/img/galery/galery6.jpg",
    "./assets/img/galery/galery7.jpg",
    "./assets/img/galery/galery8.jpg",
    "./assets/img/galery/galery9.jpg",
    "./assets/img/galery/galery10.jpg",
    "./assets/img/galery/galery11.jpg",
    "./assets/img/galery/galery12.jpg",
    "./assets/img/galery/galery13.jpg",
    "./assets/img/galery/galery14.jpg",
    "./assets/img/galery/galery15.jpg",
];

const galery = document.querySelector(".picture_container");
const imagesGalery = [];
function setGalery(){
    shuffle(images_path);
    images_path.map((item)=>{
        const pic_wrap = document.createElement('div'); 
        pic_wrap.classList.add('picture');
        const img = document.createElement('img');
        // img.classList.add('picture');
        img.src = item;
        img.alt = `galery1`;
        pic_wrap.append(img);
        imagesGalery.push(pic_wrap);
        galery.append(pic_wrap);
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

setGalery();

const glr = document.querySelector('.gallery_pictures')
const parentTop = glr.offsetTop; 

function debounce(func, wait = 30, immediate = true){
    let timeout;
    return function(){
        let context = this;
        let args = arguments;
        const later = function(){
            timeout = null;
            if (!immediate) func.apply(context,args);
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context,args);
    }
}

function checkSlide(e){
    imagesGalery.forEach((item)=>{
        const imgInAt = (window.scrollY + window.innerHeight) - item.clientHeight;
        console.log(imgInAt)
        const imgBottom = parentTop + item.offsetTop + item.clientHeight;
        const isHalfShown = imgInAt > parentTop + item.offsetTop;
        const isNotScrolledPast = window.scrollY < imgBottom;
        console.log(isHalfShown, isNotScrolledPast);
        if (isHalfShown && isNotScrolledPast){
            item.classList.add('pic_show');
        } else {
            item.classList.remove('pic_show');
        }
    })
}

window.addEventListener('scroll',debounce(checkSlide))



