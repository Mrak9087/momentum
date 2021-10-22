import './app.css';
import {BaseComponent} from '../baseComponent/baseComponent.js';
import lang from '../lang/language.js';
import {Player} from '../player/player.js';
import sound1 from '../../assets/sounds/AquaCaelestis.mp3';
import sound2 from '../../assets/sounds/EnnioMorricone.mp3';
import sound3 from '../../assets/sounds/RiverFlowsInYou.mp3';
import sound4 from '../../assets/sounds/SummerWind.mp3';
import {Weather} from '../weather/weather.js'
import {Quotes} from '../quotes/quotes.js'


export class App extends BaseComponent{
    constructor(parentNode){
        super(parentNode,'app');
    }

    init(){
        this.urlImg = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=g0ttMV6psSPNZi2BvJ6iYQdKu9aUV8EuEu4ZlK0mOv0'
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.great = '';
        this.imgNum = 1;


        this.content = document.createElement('div');
        this.content.className = 'container';
        this.center = document.createElement('div');
        this.center.className = 'center';

        this.dateTime = document.createElement('div');
        this.dateTime.className = 'dateTime';
        this.weekDays = lang[this.lng].weekDays.slice(0);
        
        this.months = lang[this.lng].months.slice(0);
        this.time = document.createElement('div');
        this.time.className = 'time';
        this.date = document.createElement('div');
        this.date.className = 'date';
        this.dateTime.append(this.time);
        this.dateTime.append(this.date);

        this.greating = document.createElement('div');
        this.greating.className = 'great';
        this.greatTxt = document.createElement('p');
        this.greatTxt.className = 'greatTxt';

        this.center.append(this.dateTime);
        this.content.append(this.center);
        this.node.append(this.content);
        this.getTime();
        this.getDate();
        // this.getLinkToImage();
        this.setBg()
    }

    getLinkToImage() {
        const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
        let urlImage = '';
        fetch(url).then(res => res.json()).then(data => {
            console.log(data);
            urlImage  = data.urls.regular;
            document.body.style = `background-image: url("${urlImage}")`;
        });
    }

    setBg() {  
        this.great = this.getTimeOfDay();
        this.imgNum = this.getRandomNum(1,20);
        this.setImg()
    }

    setImg(){
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/Mrak9087/stage1-tasks/assets/images/${this.great}/${this.addZero(this.imgNum)}.jpg`
        img.onload = () => {      
            document.body.style = `background-image: url("${img.src}")`;
        };
    }

    incImg(){
        this.imgNum++;
        if (this.imgNum > 20){
            this.imgNum = 1;
        }
        this.setImg()
    }

    decImg(){
        this.imgNum--;
        if (this.imgNum < 1){
            this.imgNum = 20;
        }
        this.setImg()
    }

    getRandomNum(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    getTime = () => {
        const locTime = new Date();
        const hour = locTime.getHours();
        const min = locTime.getMinutes();
        const sec = locTime.getSeconds();
        this.time.innerHTML = `${hour}<span>:</span>${this.addZero(min)}<span>:</span>${this.addZero(sec)}`;
      
        setTimeout(this.getTime, 1000);
    }

    getDate = () => {
        const locDate = new Date();
        const weekDay = locDate.getDay();
        const month = locDate.getMonth();
        this.date.innerHTML = `${this.weekDays[weekDay]} ${this.addZero(locDate.getDate())} ${this.months[month]}`;
    }

    getTimeOfDay(){
        const locTime = new Date();
        const hour = locTime.getHours();
        switch(Math.floor(hour/6)){
            case 0: return 'morning';
            case 1: return 'day';
            case 2: return 'evening';
            case 3: return 'night';
        }
    }

    addZero(n){
        return (parseInt(n) < 10 ? '0' : '') + n; 
    }
}