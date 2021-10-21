import {BaseComponent} from "../baseComponent/baseComponent.js";
import stPlayer from "./player.css";

export class Player extends BaseComponent{
    constructor(parentNode){
        super(parentNode, 'player');
    }

    init(){
        
        this.player = new Audio();
        this.player.volume = 0.5;
        this.curIndex = 0;
        this.controls = document.createElement('div');
        this.controls.className = 'controls';

        this.btns = document.createElement('div');
        this.btns.className = 'btns';
        this.ranges = document.createElement('div');
        this.ranges.className = 'ranges';
        this.durInput = document.createElement('input');
        this.durInput.classList.add('progress', 'video_progress')
        this.durInput.type = 'range';
        this.durInput.value = 0;
        this.durInput.min = 0;
        this.durInput.max = 100;
        this.soundDiv = document.createElement('div');
        this.soundDiv.className = 'sound_container';
        this.soundBtn = document.createElement('button');
        this.soundBtn.classList.add('player-icon', 'sound');

        this.soundInput = document.createElement('input');
        this.soundInput.classList.add('progress', 'sound_progress')
        this.soundInput.type = 'range';
        this.soundInput.value = this.player.volume * 100;
        this.soundInput.min = 0;
        this.soundInput.max = 100;
        this.soundInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.soundInput.value}%, #fff ${this.soundInput.value}%, white 100%)`;

        this.soundDiv.append(this.soundBtn,this.soundInput);
        this.ranges.append(this.durInput,this.soundDiv);
        this.controls.append(this.btns,this.ranges);

        this.prevBtn = document.createElement('button');
        this.prevBtn.classList.add('play-prev','player-icon')
        this.playBtn = document.createElement('button');
        this.playBtn.classList.add('play','player-icon')
        this.nextBtn = document.createElement('button');
        this.nextBtn.classList.add('play-next','player-icon')
        this.btns.append(this.prevBtn,this.playBtn,this.nextBtn)



        this.playListDiv = document.createElement('ul');
        this.playListDiv.className = 'play-list';

        this.node.append(this.controls, this.playListDiv);

        this.playBtn.addEventListener('click',this.clickPlayStop);

        this.player.addEventListener('timeupdate', (e)=>{
            let percent = ((this.player.currentTime / this.player.duration) * 100) || 0;
            this.durInput.value = percent;
            this.durInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.durInput.value}%, #fff ${this.durInput.value}%, white 100%)`;
            if (this.player.ended){
                this.playBtn.classList.remove('pause');
                this.durInput.value = 0;
            }
        })

        this.durInput.addEventListener('input',(e)=>{
            let scrub = (this.durInput.value * this.player.duration) / 100;
            this.player.currentTime = scrub;
    
        })

        this.soundInput.addEventListener('input', this.changeSound);
        this.soundBtn.addEventListener('click', this.soundClick);
        this.nextBtn.addEventListener('click', this.clickNext);
        this.prevBtn.addEventListener('click', this.clickPrev);
        // this.soundInput.addEventListener('mousemove', changeSound);
    }

    changeSound = () => {
        // if (!isChangeSound) return;
        this.player.volume = this.soundInput.value / 100;
        
        
        if (!+this.soundInput.value){
            this.player.muted = true;
            this.soundBtn.classList.add('mute');
        }else{
            if (this.player.muted){
                this.player.muted = false;
                this.soundBtn.classList.remove('mute');
            }
        }
        this.soundInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.soundInput.value}%, #fff ${this.soundInput.value}%, white 100%)`;
    }

    soundClick = () => {
        if (this.player.muted){
            this.player.muted = false;
            this.soundBtn.classList.remove('mute');
        } else {
            this.player.muted = true;
            this.soundBtn.classList.add('mute');
        }
    }

    loadPlaylist = (listMusic) =>{
        this.playList = [];
        listMusic.forEach((item) => {
            this.playList.push(item)
        })
        this.showList();
    }

    showList(){
        this.playList.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'play-item';
            li.innerText = `${item.name}`;
            
            this.playListDiv.append(li);
        })
        this.player.src = this.playList[0].src;
        this.listItems = this.playListDiv.querySelectorAll('li');
        this.listItems[this.curIndex].classList.add('item-active');
        this.listItems.forEach((item,index)=>{
            item.addEventListener('click', () => {
                this.clickItem(index);
                item.classList.add('item-active');
                // this.player.src = this.playList[index].src;
            })
        })
    }

    clickItem = (index) =>{
        this.player.pause();
        this.player.currentTime = 0;
        this.curIndex = index;
        this.playBtn.classList.remove('pause');
        this.player.src = this.playList[this.curIndex].src;
        this.durInput.value = 0;
        this.clearActive()
    }

    clickNext = () => {
        this.curIndex ++;
        if (this.curIndex >= this.playList.length){
            this.curIndex = this.playList.length - 1;
        }
        if (!this.player.paused){
            this.player.pause();
            this.playBtn.classList.remove('pause');
            this.player.playbackRate = 1;
        }
        this.player.src = this.playList[this.curIndex].src;
        this.durInput.value = 0;
        this.clearActive()
        this.listItems[this.curIndex].classList.add('item-active');
    }

    clickPrev = () => {
        this.curIndex --;
        if (this.curIndex < 0){
            this.curIndex = 0;
        }
        if (!this.player.paused){
            this.player.pause();
            this.playBtn.classList.remove('pause');
            this.player.playbackRate = 1;
        }
        this.player.src = this.playList[this.curIndex].src;
        this.durInput.value = 0;
        this.clearActive()
        this.listItems[this.curIndex].classList.add('item-active');
    }

    clearActive(){
        this.listItems.forEach((item) => {
            item.classList.remove('item-active')
        })
    }

    clickPlayStop = () =>{
        if (this.player.paused){
            this.player.play();
            this.playBtn.classList.add('pause');
            
        } else {
            this.player.pause();
            this.playBtn.classList.remove('pause');
            this.player.playbackRate = 1;
        }
    }

}