import { BaseComponent } from "../baseComponent/baseComponent.js";
import "./dateTime.css";
import lang from '../lang/language.js';
export class DateTime extends BaseComponent{
    constructor(parentNode){
        super(parentNode,'dateTime')
    }

    init(){
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.weekDays = lang[this.lng].weekDays.slice(0);
        // console.log('log',lang[this.lng].weekDays);
        this.months = lang[this.lng].months.slice(0);
        this.time = document.createElement('div');
        this.time.className = 'time';
        this.date = document.createElement('div');
        this.date.className = 'date';
        this.node.append(this.time);
        this.node.append(this.date);
        this.getTime();
        this.getDate();
    }

    setLng(lang){
        this.lng = lang;
        this.weekDays = lang[this.lng].weekDays.slice(0);
        this.months = lang[this.lng].months.slice(0);
        this.getDate();
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

    addZero(n){
        return (parseInt(n) < 10 ? '0' : '') + n; 
    }
}