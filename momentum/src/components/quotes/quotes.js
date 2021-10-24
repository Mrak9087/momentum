import "./quotes.css";
import {BaseComponent} from '../baseComponent/baseComponent.js';



export class Quotes extends BaseComponent{
    constructor(parentNode){
        super(parentNode, 'quotes')
    }

    async init(){
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.btnQuote = document.createElement('button');
        this.btnQuote.className = 'quote_btn';

        this.quoteText = document.createElement('div');
        this.quoteText.className = 'quote_text';

        this.quoteAuthor = document.createElement('div');
        this.quoteAuthor.className = 'quote_author';

        this.node.append(this.btnQuote,this.quoteText,this.quoteAuthor);
        this.btnQuote.addEventListener('click', this.showQuote);
        await this.loadQuote();
        
    }

    async loadQuote(){
        let res = await fetch(`./quotes_${this.lng}.json`);
        let data = await res.json();
        this.quoteArr = data.slice(0);
        this.showQuote();
    }

    randomNumber(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    setLang(lng){
        this.lng = lng;
        this.loadQuote();
    }

    showQuote = () =>{
        let i = this.randomNumber(0, this.quoteArr.length-1);
        this.quoteText.innerText = this.quoteArr[i].text;
        this.quoteAuthor.innerText = this.quoteArr[i].author;
    }
}
