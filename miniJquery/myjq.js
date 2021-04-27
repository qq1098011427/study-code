const addNodes = Symbol('addNodes')
const getStyle = Symbol('getStyle')
const setStyle = Symbol('setStyle')
class Jquery {
    constructor(arg, root) {
        if (typeof root === 'undefined') {
            this['preObject'] = document
        } else {
            this['preObject'] = root
        }
        if (typeof arg === 'string') {
            this[addNodes](document.querySelectorAll(arg))
        }
        if (typeof arg === 'object') { // document.querySelector这种形式
            if (arg.length === undefined) {
                this[0] = arg
                this.length = 1
            } else { // 多个节点
                this[addNodes](arg)
            }
        }
        if (typeof arg === 'function') {
            document.addEventListener('DOMContentLoaded', arg)
        }
    }
    [addNodes](arg) {
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
    eq(index) {
        return new Jquery(this[index], this)
    }
    end() {
        return this['preObject'];
    }
    css(...args) {
        console.log(args);
        if (args.length === 1) {
            if (typeof args[0] === 'string') { // 获取样式
                return this[getStyle](this[0], args[0])
            }
            if (typeof args[0] === 'object') { // 给每个节点添加样式
                for (let i = 0; i < this.length; i++) {
                    for (let item in args[0]) {
                        this[setStyle](this[i], item, args[0][item])
                    }
                }
            }
        }
    }
    [getStyle](ele, styleName) {
        return getComputedStyle(ele, null)[styleName]
    }
    [setStyle](ele, styleName, styleValue) {
        if (typeof styleValue === 'number' && !(styleName in $.cssNumber)) {
            styleValue = styleValue + 'px'
        }
        ele.style[styleName] = styleValue
    }
}

function $(arg) {
    return new Jquery(arg)
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}