const pri = Symbol('pri')
class Jquery {
    constructor(arg) {
        if (typeof arg === 'string') {
            this[pri](document.querySelectorAll(arg))
        }
        if (typeof arg === 'object') { // document.querySelector这种形式
            if (arg.length === undefined) {
                this[0] = arg
                this.length = 1
            } else { // 多个节点
                this[pri](arg)
            }
        }
        if (typeof arg === 'function') {
            document.addEventListener('DOMContentLoaded', arg)
        }
    }
    [pri](arg) {
        for (let i = 0; i < arg.length; i++) {
            this[i] = arg[i]
        }
        this.length = arg.length 
    }  
    click(fn) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener('click', fn)
        }
    }
    on(eventName, fn) {
        const eventArr = eventName.split(' ')
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < eventArr.length; j++) {
                this[i].addEventListener(eventArr[j], fn)
            }
        }
    }
}

function $(arg) {
    return new Jquery(arg)
}