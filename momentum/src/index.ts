import './style.css';
import {DateTime} from './components/dateTime/dateTime.js';
import {Player} from './components/player/player.js';
import sound1 from './assets/sounds/AquaCaelestis.mp3';
import sound2 from './assets/sounds/EnnioMorricone.mp3';
import sound3 from './assets/sounds/RiverFlowsInYou.mp3';
import sound4 from './assets/sounds/SummerWind.mp3';

const arrMusic = [
    {name:'Aqua Caelestis',
    src:sound1},
    {name:'Ennio Morricone',
    src:sound2},
    {name:'River Flows In You',
    src:sound3},
    {name:'Summer Wind',
    src:sound4},
]

const dt = new DateTime(document.body);
dt.init();

const pl = new Player(document.body);
pl.init();
pl.loadPlaylist(arrMusic);

