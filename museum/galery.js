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

function setGalery(){
    shuffle(images_path);
    images_path.map((item)=>{
        const img = document.createElement('img');
        img.classList.add('picture');
        img.src = item;
        img.alt = `galery1`;
        galery.append(img);
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

setGalery();