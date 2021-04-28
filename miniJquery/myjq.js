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
        if (typeof arg === 'object') { // document.querySelector这种形式(节点)
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
    animate(...args) {
        if (!$.animate) {
            $.animate = true
            let timer = 500
            if (typeof args[1] !== 'function') {
                if (typeof args[1] === 'string') {
                    switch(args[1]) {
                        case 'slow':
                            timer = 1000
                            break
                        case 'nomal':
                            timer = 500
                            break
                        case 'fast':
                            timer = 250
                            break
                        default:
                            timer = 500
                            break
                    }
                } else if (typeof args[1] === "number"){
                    timer = args[1];
                }
            }
            let timerSecond = timer / 1000 + 's' 
            for (let i = 0; i < this.length; i++) {
                // 添加动画效果
                this[i].style.transition = `${timerSecond} all`
                // 添加样式
                for (let j in args[0]) {
                    this[setStyle](this[i], j, args[0][j])
                }
            }
            // 回调
            let obj = this
            if (typeof args[args.length - 1] === 'function') {
                function transitionend () {
                    args[args.length - 1]()
                    $.animate = false
                    if ($.animateFn.length) {
                        document.removeEventListener('transitionend', transitionend)
                        console.log('//')
                        obj.animate(...$.animateFn.shift())
                    }
                }
                document.addEventListener('transitionend', transitionend)
            }
        } else {
            $.animateFn.push(args) // 还未执行的事件
        }
        return this
    }
    // 私有
    [addNodes](arg) {
        for (let i = 0; i < arg.length; i++) {
            this[i] = arg[i]
        }
        this.length = arg.length 
    } 
    [getStyle](ele, styleName) {
        // cssHooks的get方法
        if ((styleName in $.cssHooks)) {
            $.cssHooks[styleName].get(ele)
        }
        return getComputedStyle(ele, null)[styleName]
    }
    [setStyle](ele, styleName, styleValue) {
        // cssNumber配置表里有的不用加 'px' 单位
        if (typeof styleValue === 'number' && !(styleName in $.cssNumber)) {
            styleValue = styleValue + 'px'
        }
        // cssHooks的set方法
        if ((styleName in $.cssHooks)) {
            $.cssHooks[styleName].set(ele, styleValue)
        }
        ele.style[styleName] = styleValue
    }
}

function $(arg) {
    return new Jquery(arg)
}
$.animate = false
$.animateFn = []

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
$.cssHooks = {
    wh: false
}