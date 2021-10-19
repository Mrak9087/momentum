import { BaseComponent } from "../baseComponent";
import style from "./dateTime.css";
export class DateTime extends BaseComponent{
    constructor(parentNode){
        super(parentNode,style.dateTime)
    }

    init(){
        this.weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
        this.months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        this.time = document.createElement('div');
        this.time.className = style.time;
        this.date = document.createElement('div');
        this.date.className = style.date;
        this.node.append(this.time);
        this.node.append(this.date);
        this.getTime();
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