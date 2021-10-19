export class BaseComponent{
    constructor(parentNode, className, tagName = 'div'){
        this.node = document.createElement(tagName);
        this.node.className = className;

        parentNode.append(this.node)
    }
}