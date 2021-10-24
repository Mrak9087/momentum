import './todo.css';
import {BaseComponent} from "../baseComponent/baseComponent.js";
import lang from '../lang/language';

export class ToDo extends BaseComponent{
    constructor(parentNode){
        super(parentNode,'todo');
    }

    init(){
        this.lng = localStorage.getItem('lngMom') || 'ru';
        
        this.todoName = document.createElement('span');
        this.todoName.innerHTML = lang[this.lng].stTodo || 'ToDo';
        this.node.append(this.todoName);
        this.container = document.createElement('div');
        this.container.className = 'todo_container';
        

        this.containerTop = document.createElement('div');
        this.containerTop.className = 'container_top'

        this.inputTodo = document.createElement('input');
        this.inputTodo.type = 'text';
        this.inputTodo.placeholder = `[${lang[this.lng].placeholderTodo}]`;
        this.inputTodo.className = 'input_todo';
        this.addBtn = document.createElement('button');
        this.addBtn.className = 'add_btn';
        this.addBtn.innerText = '+';
        this.addBtn.addEventListener('click', this.clickAdd);
        this.containerTop.append(this.inputTodo,this.addBtn);
        
        this.containerList = document.createElement('div');
        this.containerList.className = 'container_list';

        this.listTodo = document.createElement('ul');
        this.listTodo.className = 'list_todo';

        this.containerList.append(this.listTodo);

        this.container.append(this.containerTop,this.containerList);
        this.node.append(this.container);
        this.container.addEventListener('click', this.clickContainer)
        this.node.addEventListener('click', this.clickNode)

    }

    setLang(lng){
        this.lng = lng;
        this.inputTodo.placeholder = `[${lang[this.lng].placeholderTodo}]`;
        this.todoName.innerHTML = lang[this.lng].stTodo || 'ToDo';
    }

    clickContainer = (e) => {
        e.stopPropagation();
    }

    clickAdd = () => {
        // console.log(this.inputTodo.value);
        if (this.inputTodo.value){
            const li = document.createElement('li');
            li.innerText = this.inputTodo.value;
            li.className = 'todo_item';
            const span = document.createElement('span');
            span.className = 'close';
            span.innerText = '\u00D7';
            li.addEventListener('click', (e) => {
                if (e.target === li) {
                  e.target.classList.toggle('checked');
                }
            }, false);
            span.addEventListener('click', this.clickClose);
            li.append(span);
            console.log(li);
            this.listTodo.append(li);
            this.inputTodo.value = '';
        }
        
    }

    clickClose = (e) =>{
        const li = e.target.closest('.todo_item');
        this.listTodo.removeChild(li);
    } 

    clickNode = (e) => {
        // if (e.target != this.node) return;
        if (this.node.classList.contains('show') && this.node.classList.contains('app_show')){
            this.node.classList.remove('app_show');
            // setTimeout(() => {
            //     this.node.classList.remove('show');
            // }, 500);
            this.node.classList.remove('show');
            
        } else{
            this.node.classList.add('show');
            this.node.classList.add('app_show');
            // setTimeout(() => {
            //     this.node.classList.add('app_show');
            // }, 500);
        }
        
    }
}