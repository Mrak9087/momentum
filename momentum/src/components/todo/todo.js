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
        this.arrTodo = JSON.parse(localStorage.getItem('listTodo')) || [];
        this.arrTodo.forEach((item) => {
            this.createTodoItem(item);
        });
        console.log(this.arrTodo);
        // this.listTodo.append(this.arrTodo);

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
            let item = {
                index:this.arrTodo.length,
                txt:this.inputTodo.value,
                checked:0,
            }
            this.createTodoItem(item);
            this.inputTodo.value = '';
            this.arrTodo.push(item);
            // console.log(this.listTodo.childNodes);
            // console.log(this.arrTodo);
            localStorage.setItem('listTodo', JSON.stringify(this.arrTodo));
        }
        
    }

    createTodoItem(item){
        const li = document.createElement('li');
        li.innerText = item.txt;
        li.className = 'todo_item';
        if (item.checked){
            li.classList.add('checked');
        }
        li.dataset.index = item.index; 
        const span = document.createElement('span');
        span.className = 'close';
        span.innerText = '\u00D7';
        li.addEventListener('click', this.clickItem, false);
        span.addEventListener('click', this.clickClose);
        li.append(span);
        this.listTodo.append(li);
    }

    clickItem = (e) => {
        if (e.target.classList.contains('todo_item')) {
            if (e.target.classList.contains('checked')){
                let idx = +e.target.dataset.index;
                this.arrTodo[idx].checked = 0;
                e.target.classList.remove('checked');
            } else {
                let idx = +e.target.dataset.index;
                this.arrTodo[idx].checked = 1;
                e.target.classList.add('checked');
            }
            localStorage.setItem('listTodo', JSON.stringify(this.arrTodo));
        }
    }

    clickClose = (e) =>{
        const li = e.target.closest('.todo_item');
        let idx = +li.dataset.index;
        this.arrTodo.splice(idx,1);
        this.listTodo.removeChild(li);
        this.arrTodo.forEach((item,index) => {
            item.index = index;
            this.listTodo.children[index].dataset.index = index;
        })
        localStorage.setItem('listTodo', JSON.stringify(this.arrTodo))

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