import {BaseComponent} from "../baseComponent/baseComponent.js";
import "./weather.css";
import lang from '../lang/language';

export class Weather extends BaseComponent{
    constructor(parentNode){
        super(parentNode, 'weather');
    }

    init(){
        this.lng = localStorage.getItem('lngMom') || 'ru';
        this.inputCity = document.createElement('input');
        this.inputCity.type = 'text';
        this.inputCity.className = 'city';
        this.inputCity.addEventListener('keypress', this.setCity);
        this.inputCity.addEventListener('blur', this.getCity);

        this.inputCity.value = localStorage.getItem('cityMom') || 'Минск';
        this.icon = document.createElement('i');
        this.icon.className = 'weather-icon owf';

        this.description = document.createElement('div');
        this.description.className = 'description-container';

        this.temperature = document.createElement('span');
        this.temperature.className = 'temperature';
        this.weatherDescr = document.createElement('span');
        this.weatherDescr.className = 'weather-description';

        this.description.append(this.temperature,this.weatherDescr);

        this.wind = document.createElement('div');
        this.wind.className = 'wind';
        this.humidity = document.createElement('div');
        this.humidity.className = 'humidity';

        this.node.append(this.inputCity,this.icon,this.description,this.wind,this.humidity);
        this.getWeather();
    }

    setLang(lang){
      this.lng = lang;
      this.getWeather();
    }

    async getWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.inputCity.value}&lang=${this.lng}&appid=3715a95b09cf4ceed9e7abf94eefccc8&units=metric`;
        const res = await fetch(url); 
        const data = await res.json();
        if (data.cod === "404"){
          this.weatherDescr.textContent = '';//"Ошибка: нет данных"
          this.temperature.textContent='';
          this.wind.textContent = '';
          this.humidity.textContent = '';
        }
        this.icon.classList.add(`owf-${data.weather[0].id}`);
        this.temperature.textContent = `${data.main.temp}°C`;
        this.wind.textContent = `${lang[this.lng].weatherWind}: ${data.wind.speed}${lang[this.lng].weatherSpeed}`;
        this.humidity.textContent = `${lang[this.lng].weatherHumidity}: ${data.main.humidity}%`
        this.weatherDescr.textContent = data.weather[0].description;
        
    }

    setCity = (e) => {
        if (e.type === "keypress"){
          if (e.which === 13 || e.keyCode === 13) {
            if (!this.inputCity.value) {
              localStorage.removeItem('cityMom');
            } else {
              localStorage.setItem('cityMom', this.inputCity.value);
            }
            
            this.inputCity.blur();
          }
        }else {
          localStorage.setItem('cityMom', this.inputCity.value);
        }
        this.getWeather();
    }

    getCity = ()=>{
      if (localStorage.getItem('cityMom') === null){
        this.inputCity.value = ''
      } else {
        this.inputCity.value = localStorage.getItem('cityMom');
      }
    }
}


