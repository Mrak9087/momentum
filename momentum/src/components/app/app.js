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
import {ToDo} from '../todo/todo.js';

export class App extends BaseComponent{
    constructor(parentNode){
        super(parentNode,'app');
    }

    init(){

        this.arrMusic = [
            {name:'Aqua Caelestis',
            src:sound1},
            {name:'Ennio Morricone',
            src:sound2},
            {name:'River Flows In You',
            src:sound3},
            {name:'Summer Wind',
            src:sound4},
        ];

        this.srcImg = localStorage.getItem('srcMom') || 'git';//'unsplash' 'flickr'
        this.catImg = localStorage.getItem('catMom') ||'nature';
        this.flickrArr = [];

        this.urlImg = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=g0ttMV6psSPNZi2BvJ6iYQdKu9aUV8EuEu4ZlK0mOv0'
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.great = '';
        this.imgNum = 1;

        this.top = document.createElement('div');
        this.top.className = 'top';
        this.tLeft = document.createElement('div');
        this.tLeft.className = 't_left';
        this.tRight = document.createElement('div');
        this.tRight.className = 't_right';
        this.top.append(this.tLeft,this.tRight);

        this.player = new Player(this.tLeft);
        this.player.init();
        this.player.loadPlaylist(this.arrMusic);
        this.weather = new Weather(this.tRight);
        this.weather.init();

        this.content = document.createElement('div');
        this.content.className = 'container';
        this.center = document.createElement('div');
        this.center.className = 'center';

        this.slider = document.createElement('div')
        this.slider.className = 'slider';
        this.btnSliderPrev = document.createElement('button');
        this.btnSliderPrev.className = 'slide_prev slider_icon';
        this.btnSliderNext = document.createElement('button');
        this.btnSliderNext.className = 'slide_next slider_icon';
        this.slider.append(this.btnSliderPrev, this.btnSliderNext);

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

        this.greatContainer = document.createElement('div');
        this.greatContainer.className = 'greeting-container';
        this.greatTxt = document.createElement('p');
        this.greatTxt.className = 'greeting';
        this.greatTxt.innerText = lang[this.lng].greetings[this.getTimeOfDay()] || 'Hello';
        this.greatName = document.createElement('input');
        this.greatName.type = 'text';
        this.greatName.value = localStorage.getItem('momName') || ''
        this.greatName.placeholder = `[${lang[this.lng].placeholder}]`;
        this.greatName.className = 'name';

        this.greatName.addEventListener('keypress', this.setName)

        this.greatContainer.append(this.greatTxt,this.greatName);

        this.center.append(this.slider,this.dateTime,this.greatContainer);

        this.quotes = new Quotes(this.center);
        this.quotes.init();

        this.bottom = document.createElement('div');
        this.bottom.className = 'bottom';
        this.btLeft = document.createElement('div');
        this.btLeft.className = 'bt_left';
        this.btRight = document.createElement('div');
        this.btRight.className = 'bt_right';
        this.bottom.append(this.btLeft,this.btRight);

        this.createSettings();
        
        this.todo = new ToDo(this.btRight);
        this.todo.init();

        this.content.append(this.top,this.center,this.bottom);

        this.btnSliderNext.addEventListener('click', this.incImg);
        this.btnSliderPrev.addEventListener('click', this.decImg);

        this.footer = document.createElement('footer');
        this.footer.className = 'footer';
        this.footer.innerHTML =`<div class="footer_container">
                <a class="github" href="https://github.com/Mrak9087" target="blank">Mrak9087</a>
                <span class="rss_year">2021</span>
                <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
                    
                </a>
            </div>`;

        this.node.append(this.content, this.footer);
        this.getTime();
        this.getDate();
        this.setBg()
        this.setGreat();

        this.showItems();
    }

    setName = (e) => {
        if (e.type === "keypress"){
          if (e.which === 13 || e.keyCode === 13) {
            if (!this.greatName.value) {
              localStorage.removeItem('momName');
            } else {
              localStorage.setItem('momName', this.greatName.value);
            }
            this.greatName.blur();
          }
        }else {
          localStorage.setItem('momName', this.greatName.value);
        }
    }

    clickContainerSettings = (e) => {
        e.stopPropagation();
    }

    createSettings(){
        this.settings = document.createElement('div');
        this.settings.className = 'settings';
        this.settingsIcon = document.createElement('div');
        this.settingsIcon.className = 'settings_icon';
        this.settings.append(this.settingsIcon);
        this.btLeft.append(this.settings);

        this.settingsContainer = document.createElement('div');
        this.settingsContainer.className = 'settings_container';

        this.createItems();
        this.settings.append(this.settingsContainer);
        this.settingsContainer.addEventListener('click', this.clickContainerSettings);
        this.settings.addEventListener('click', this.clickSettings);
    }

    showingWidget = (widget, check) => {
        if (check.checked) {
            widget.classList.remove('hideWidget');
        } else {
            widget.classList.add('hideWidget');
        }
    }

    clickSettings = (e) =>{
        if (this.settings.classList.contains('show') && this.settings.classList.contains('app_show')){
            this.settings.classList.remove('app_show');
            this.settings.classList.remove('show');
            
        } else{
            this.settings.classList.add('show');
            this.settings.classList.add('app_show');
        }
    }

    createItems(){
        this.stWeather = document.createElement('div');
        this.stWeather.className = 'stItem';
        this.stWeatherTitle = document.createElement('span');
        this.stWeatherTitle.innerText = lang[this.lng].stWeather || 'Weather';
        this.stWeatherCheck = document.createElement('input');
        this.stWeatherCheck.type = 'checkbox';
        this.stWeatherCheck.checked = true;
        
        this.stWeather.append(this.stWeatherTitle,this.stWeatherCheck);

        this.stPlayer = document.createElement('div');
        this.stPlayer.className = 'stItem';
        this.stPlayerTitle = document.createElement('span');
        this.stPlayerTitle.innerText = lang[this.lng].stPlayer || 'Player';
        this.stPlayerCheck = document.createElement('input');
        this.stPlayerCheck.type = 'checkbox';
        this.stPlayerCheck.checked = true;
        this.stPlayer.append(this.stPlayerTitle,this.stPlayerCheck);

        this.stTime = document.createElement('div');
        this.stTime.className = 'stItem';
        this.stTimeTitle = document.createElement('span');
        this.stTimeTitle.innerText = lang[this.lng].stTime || 'Time';
        this.stTimeCheck = document.createElement('input');
        this.stTimeCheck.type = 'checkbox';
        this.stTimeCheck.checked = true;
        this.stTime.append(this.stTimeTitle,this.stTimeCheck);

        this.stDate = document.createElement('div');
        this.stDate.className = 'stItem';
        this.stDateTitle = document.createElement('span');
        this.stDateTitle.innerText = lang[this.lng].stDate || 'Date';
        this.stDateCheck = document.createElement('input');
        this.stDateCheck.type = 'checkbox';
        this.stDateCheck.checked = true;
        this.stDate.append(this.stDateTitle,this.stDateCheck);

        this.stGreeting = document.createElement('div');
        this.stGreeting.className = 'stItem';
        this.stGreetingTitle = document.createElement('span');
        this.stGreetingTitle.innerText = lang[this.lng].stGreeting || 'Greeting';
        this.stGreetingCheck = document.createElement('input');
        this.stGreetingCheck.type = 'checkbox';
        this.stGreetingCheck.checked = true;
        this.stGreeting.append(this.stGreetingTitle,this.stGreetingCheck);

        this.stQuotes = document.createElement('div');
        this.stQuotes.className = 'stItem';
        this.stQuotesTitle = document.createElement('span');
        this.stQuotesTitle.innerText = lang[this.lng].stDate || 'Quotes';
        this.stQuotesCheck = document.createElement('input');
        this.stQuotesCheck.type = 'checkbox';
        this.stQuotesCheck.checked = true;
        this.stQuotes.append(this.stQuotesTitle,this.stQuotesCheck);

        this.stTodo = document.createElement('div');
        this.stTodo.className = 'stItem';
        this.stTodoTitle = document.createElement('span');
        this.stTodoTitle.innerText = lang[this.lng].stTodo || 'ToDo';
        this.stTodoCheck = document.createElement('input');
        this.stTodoCheck.type = 'checkbox';
        this.stTodoCheck.checked = true;
        this.stTodo.append(this.stTodoTitle,this.stTodoCheck);

        this.stLang = document.createElement('div');
        this.stLang.className = 'stLang';
        this.stRu = document.createElement('input');
        this.stRu.type = 'radio';
        this.stRu.name = 'lang';
        this.stRu.id = 'langRu';
        this.stRu.value = 'ru';
        
        

        this.lRu = document.createElement('label');
        this.lRu.className = 'langLabel';
        this.rSpan = document.createElement('span');
        this.rSpan.innerText = 'ru'
        this.lRu.append(this.stRu, this.rSpan);

        this.stEn = document.createElement('input');
        this.stEn.type = 'radio';
        this.stEn.name = 'lang';
        this.stEn.id = 'langEn';
        this.stEn.value = 'en';

        this.lEn = document.createElement('label');
        this.lEn.className = 'langLabel'
        this.eSpan = document.createElement('span');
        this.eSpan.innerText = 'en'
        this.lEn.append(this.stEn,this.eSpan);
        
        if (!localStorage.getItem('lngMom') || localStorage.getItem('lngMom') == 'ru'){
            this.stRu.checked = true;
        } else if (localStorage.getItem('lngMom') == 'en'){
            this.stEn.checked = true;
        }

        this.stLang.append(this.lRu,this.lEn);


        this.stSrcImg = document.createElement('div');
        this.stSrcImg.className = 'stSrcImg';
        this.stGit = document.createElement('input');
        this.stGit.type = 'radio';
        this.stGit.name = 'srcimg';
        this.stGit.id = 'srcGit';
        this.stGit.value = 'git';
        this.lGit = document.createElement('label');
        this.lGit.className = 'srcLabel';
        this.gitSpan = document.createElement('span');
        this.gitSpan.innerText = 'git'
        this.lGit.append(this.stGit, this.gitSpan);

        this.stUnsplash = document.createElement('input');
        this.stUnsplash.type = 'radio';
        this.stUnsplash.name = 'srcimg';
        this.stUnsplash.id = 'srcUnsplash';
        this.stUnsplash.value = 'unsplash';
        this.lUnsplash = document.createElement('label');
        this.lUnsplash.className = 'srcLabel'
        this.unsplashSpan = document.createElement('span');
        this.unsplashSpan.innerText = 'unsplash'
        this.lUnsplash.append(this.stUnsplash,this.unsplashSpan);

        this.stFlickr = document.createElement('input');
        this.stFlickr.type = 'radio';
        this.stFlickr.name = 'srcimg';
        this.stFlickr.id = 'srcFlickr';
        this.stFlickr.value = 'flickr';
        this.lFlickr = document.createElement('label');
        this.lFlickr.className = 'srcLabel'
        this.flickrSpan = document.createElement('span');
        this.flickrSpan.innerText = 'flickr'
        this.lFlickr.append(this.stFlickr,this.flickrSpan);

        this.selCat = document.createElement('select');
        this.selCat.className = 'selCat';
        this.selCat.disabled = true;
        this.opNature = document.createElement('option');
        this.opNature.value = 'nature';
        this.opNature.innerText = 'nature';
        
        this.opEven = document.createElement('option');
        this.opEven.value = 'evening';
        this.opEven.innerText = 'evening';
        
        this.opMorn = document.createElement('option');
        this.opMorn.value = 'morning';
        this.opMorn.innerText = 'morning';
        

        this.selCat.append(this.opNature,this.opEven,this.opMorn);
        if (this.catImg == 'nature'){
            this.selCat.selectedIndex = 0;
        }
        if (this.catImg == 'evening'){
            this.selCat.selectedIndex = 1;
        }
        if (this.catImg == 'morning'){
            this.selCat.selectedIndex = 2;
        }

        this.selCat.addEventListener('change', this.changeCat);
        if (!localStorage.getItem('srcMom') || localStorage.getItem('srcMom') == 'git'){
            this.stGit.checked = true;
            this.selCat.disabled = true;
        } else if (localStorage.getItem('srcMom') == 'unsplash'){
            this.stUnsplash.checked = true;
            this.selCat.disabled = false;
        } else if (localStorage.getItem('srcMom') == 'flickr'){
            this.stFlickr.checked = true;
            this.selCat.disabled = false;
        }

        this.stSrcImg.append(this.lGit,this.lUnsplash,this.lFlickr);


        this.stGit.addEventListener('change', this.changeSrc);
        this.stUnsplash.addEventListener('change', this.changeSrc);
        this.stFlickr.addEventListener('change', this.changeSrc);
        this.stRu.addEventListener('change', this.changeLng);
        this.stEn.addEventListener('change', this.changeLng);

        this.stWeatherCheck.addEventListener('change', ()=>{
            localStorage.setItem('showWeather',this.stWeatherCheck.checked);
            this.showingWidget(this.weather.node,this.stWeatherCheck);
        })

        this.stPlayerCheck.addEventListener('change', ()=>{
            localStorage.setItem('showPlayer',this.stPlayerCheck.checked);
            this.showingWidget(this.player.node,this.stPlayerCheck);
        })

        this.stTimeCheck.addEventListener('change', ()=>{
            localStorage.setItem('showTime',this.stTimeCheck.checked);
            this.showingWidget(this.time,this.stTimeCheck);
        })

        this.stDateCheck.addEventListener('change', ()=>{
            localStorage.setItem('showDate',this.stDateCheck.checked);
            this.showingWidget(this.date,this.stDateCheck);
        })

        this.stGreetingCheck.addEventListener('change', ()=>{
            localStorage.setItem('showGreeting',this.stGreetingCheck.checked);
            this.showingWidget(this.greatContainer,this.stGreetingCheck);
        })

        this.stQuotesCheck.addEventListener('change', ()=>{
            localStorage.setItem('showQuotes',this.stQuotesCheck.checked);
            this.showingWidget(this.quotes.node,this.stQuotesCheck);
        })

        this.stTodoCheck.addEventListener('change', ()=>{
            localStorage.setItem('showTodo',this.stTodoCheck.checked);
            this.showingWidget(this.todo.node,this.stTodoCheck);
        })

        this.settingsContainer.append(this.stWeather,this.stPlayer,this.stTime,this.stDate,
            this.stGreeting,this.stQuotes,this.stTodo,this.stLang,this.stSrcImg,this.selCat);
    }

    showItems(){

        let w = localStorage.getItem('showWeather');
        let pl = localStorage.getItem('showPlayer');
        let t = localStorage.getItem('showTime');
        let d = localStorage.getItem('showDate');
        let g = localStorage.getItem('showGreeting');
        let q = localStorage.getItem('showQuotes');
        let td = localStorage.getItem('showTodo');
        if (w === null || w === 'true'){
            this.stWeatherCheck.checked = true;
            this.showingWidget(this.weather.node,this.stWeatherCheck);
        } else {
            this.stWeatherCheck.checked = false;
            this.showingWidget(this.weather.node,this.stWeatherCheck);
        }
        if (pl === null || pl === 'true'){
            this.stPlayerCheck.checked = true;
            this.showingWidget(this.player.node,this.stPlayerCheck);

        } else {
            this.stPlayerCheck.checked = false;
            this.showingWidget(this.player.node,this.stPlayerCheck);
        }
        if (t === null || t === 'true'){
            this.stTimeCheck.checked = true;
            this.showingWidget(this.time,this.stTimeCheck);

        } else {
            this.stTimeCheck.checked = false;
            this.showingWidget(this.time,this.stTimeCheck);
        }
        if (d === null || d === 'true'){
            this.stDateCheck.checked = true;
            this.showingWidget(this.date,this.stDateCheck);
        } else {
            this.stDateCheck.checked = false;
            this.showingWidget(this.date,this.stDateCheck);
        }
        if (g === null || g === 'true'){
            this.stGreetingCheck.checked = true;
            this.showingWidget(this.greatContainer,this.stGreetingCheck);

        } else {
            this.stGreetingCheck.checked = false;
            this.showingWidget(this.greatContainer,this.stGreetingCheck);
        }
        if (q === null || q === 'true'){
            this.stQuotesCheck.checked = true;
            this.showingWidget(this.quotes.node,this.stQuotesCheck);

        } else {
            this.stQuotesCheck.checked = false;
            this.showingWidget(this.quotes.node,this.stQuotesCheck);
        }
        if (td === null || td === 'true'){
            this.stTodoCheck.checked = true;
            this.showingWidget(this.todo.node,this.stTodoCheck);
        } else {
            this.stTodoCheck.checked = false;
            this.showingWidget(this.todo.node,this.stTodoCheck);
        }
    }

    changeLng = (e) => {
        localStorage.setItem('lngMom', e.target.value)
        this.setLang(e.target.value);
    }

    changeSrc = (e) => {
        localStorage.setItem('srcMom', e.target.value)
        this.srcImg = e.target.value;
        if (this.srcImg !== 'git'){
            this.catImg = this.selCat.value;
            this.selCat.disabled = false;
        } else {
            this.selCat.disabled = true;
        }
        this.setBg()
    }

    changeCat = (e) => {
        localStorage.setItem('catMom',this.selCat.value);
        this.catImg = this.selCat.value;
        this.flickrArr = [];
        
        this.setBg();
        
    }

    setLang(lng){
        this.lng = lng;
        this.weekDays = lang[this.lng].weekDays.slice(0);
        this.months = lang[this.lng].months.slice(0);
        this.greatName.placeholder = `[${lang[this.lng].placeholder}]`;
        this.weather.setLang(this.lng);
        this.todo.setLang(this.lng);
        this.quotes.setLang(this.lng);
        this.setGreat();
        this.getDate();
        this.stWeatherTitle.innerText = lang[this.lng].stWeather || 'Weather';
        this.stPlayerTitle.innerText = lang[this.lng].stPlayer || 'Player';
        this.stTimeTitle.innerText = lang[this.lng].stTime || 'Time';
        this.stDateTitle.innerText = lang[this.lng].stDate || 'Date';
        this.stGreetingTitle.innerText = lang[this.lng].stGreeting || 'Greeting';
        this.stQuotesTitle.innerText = lang[this.lng].stDate || 'Quotes';
        this.stTodoTitle.innerText = lang[this.lng].stTodo || 'ToDo';
    }

    async getLinkToImage() {
        let url = '';
        if (this.srcImg == 'unsplash'){
            url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${this.catImg}&client_id=g0ttMV6psSPNZi2BvJ6iYQdKu9aUV8EuEu4ZlK0mOv0`;
            let urlImage = '';
            let res = await fetch(url);
            let data = await res.json();
            const img = new Image();
            img.src = data.urls.regular;
            img.onload = () => {      
                document.body.style = `background-image: url("${img.src}")`;
            };
        }
        if (this.srcImg == 'flickr'){
            if (!this.flickrArr.length){
                url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2ac28d512705274f543e6c150964af2e&tags=${this.catImg}&extras=url_h&format=json&nojsoncallback=1`;
                let urlImage = '';
                let res = await fetch(url);
                let data = await res.json();
                this.flickrArr = data.photos.photo.slice(0);
            }
            const img = new Image();
            img.src = this.flickrArr[this.imgNum].url_h
            img.onload = () => {      
                document.body.style = `background-image: url("${img.src}")`;
            };
        }
    }

    setBg = () => {
        if (this.srcImg === 'git'){
            this.great = this.getTimeOfDay();
            this.imgNum = this.getRandomNum(1,20);
            this.setImg();
        } else {
            this.getLinkToImage();
        }
    }

    setGreat = () => {
        this.greatTxt.innerText = lang[this.lng].greetings[this.getTimeOfDay()]
        let locDate = new Date();
        let locMin = locDate.getMinutes();
        let locSec = locDate.getSeconds();
        let leftSec = 3600 - (locMin * 60 +locSec);
        this.setBg();
        setTimeout(this.setGreat, leftSec*1000);
    }

    setImg(){
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/Mrak9087/stage1-tasks/assets/images/${this.great}/${this.addZero(this.imgNum)}.jpg`
        img.onload = () => {      
            document.body.style = `background-image: url("${img.src}")`;
        };
    }

    incImg = () => {
        this.imgNum++;
        if (this.imgNum > 20){
            this.imgNum = 1;
        }
        if (this.srcImg === 'git'){
            this.setImg()
        } else if (this.srcImg === 'flickr'){
            this.getLinkToImage()
        }
        else {
            this.getLinkToImage()
        }
        
    }

    decImg = () => {
        this.imgNum--;
            if (this.imgNum < 1){
                this.imgNum = 20;
            }
        if (this.srcImg == 'git'){
            this.setImg()
        } else {
            this.getLinkToImage();
        }
        
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
        if (this.lng === 'ru'){
            this.date.innerHTML = `${this.weekDays[weekDay]}, ${this.addZero(locDate.getDate())} ${this.months[month]}`;
        }
        if (this.lng === 'en'){
            this.date.innerHTML = `${this.weekDays[weekDay]}, ${this.months[month]} ${this.addZero(locDate.getDate())}`;
        }
        
    }

    getTimeOfDay(){
        const locTime = new Date();
        const hour = locTime.getHours();
        switch(Math.floor(hour/6)){
            case 0: return 'night';
            case 1: return 'morning';
            case 2: return 'day';
            case 3: return 'evening';
        }
    }

    addZero(n){
        return (parseInt(n) < 10 ? '0' : '') + n; 
    }
}