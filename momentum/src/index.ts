import './owfont-regular.css';
import './style.css';
// const json = require('./quotes_ru.json');

import {App} from './components/app/app.js';



// const arrMusic = [
//     {name:'Aqua Caelestis',
//     src:sound1},
//     {name:'Ennio Morricone',
//     src:sound2},
//     {name:'River Flows In You',
//     src:sound3},
//     {name:'Summer Wind',
//     src:sound4},
//]

const app = new App(document.body);
app.init();

// setTimeout(() => {
//     app.incImg();
// },10000);

// const pl = new Player(document.body);
// pl.init();
// pl.loadPlaylist(arrMusic);

// const wth = new Weather(document.body);
// wth.init();

// const quote = new Quotes(document.body);
// quote.init();

