import "./quotes.css";
import {BaseComponent} from '../baseComponent/baseComponent.js';


export class Quotes extends BaseComponent{
    constructor(parentNode){
        super(parentNode, 'quotes')
    }

    init(){
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.btnQuote = document.createElement('button');
        this.btnQuote.className = 'quote_btn';

        this.quoteText = document.createElement('div');
        this.quoteText.className = 'quote_text';

        this.quoteAuthor = document.createElement('div');
        this.quoteAuthor.className = 'quote_author';

        this.node.append(this.btnQuote,this.quoteText,this.quoteAuthor);
        this.btnQuote.addEventListener('click', this.showQuote);
        this.loadQuote();
    }

    loadQuote(){
        fetch(`../../quotes_${this.lng}.json`).then(res => res.json()).then(data =>{
            this.quoteArr = data.slice(0);
        })
    }

    setLang(lang){
        this.lng = lang;
        this.loadQuote();
    }

    showQuote = () =>{
        this.quoteText.innerText = this.quoteArr[0].text;
    }
}