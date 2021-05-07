// 通过观测者模式 实现
class Vuem extends EventTarget {
    constructor(opts) {
        super()
        this.$options = opts
        this.observe(opts.data)
        this._data = opts.data
        this.compile()
    }
    // 观察数据
    observe(data) {
        let keys = Object.keys(data)
        let _this = this
        keys.forEach(key => {
            let val = data[key] // 做存储 防止无限触发get死循环
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get () {
                    console.log('get');
                    return val;
                },
                set (newValue) {
                    console.log('set', val, newValue);
                    // data[key] = newValue; // 同等于无限进入set
                    _this.dispatchEvent(new CustomEvent(key, {
                        detail: newValue
                    }))
                    val = newValue
                }
            })
        })
    }
    // 编译
    compile() {
        let  el= document.querySelector(this.$options.el);
        this.compileNodes(el)
    }
    compileNodes(el) {
        let childNodes = el.childNodes;
        childNodes.forEach(node => {
            if (node.nodeType === 1) {
                // 元素节点
                if (node.childNodes.length >0) {
                    this.compileNodes(node)
                }
            } else if (node.nodeType === 3) {
                // 文本
                let textContent = node.textContent;
                // console.log(textContent);
                let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/
                if (reg.test(textContent)) {
                    let $1 = RegExp.$1; // 匹配到双空号的内容
                    // console.log(this._data[$1]); // 数据的值
                    node.textContent = node.textContent.replace(reg, this._data[$1]) // 替换
                    this.addEventListener($1, (e)=> {
                        // console.log('触发了set操作， 视图更新', e.detail);
                        let newValue = e.detail;
                        let oldValue = this._data[$1];
                        node.textContent = node.textContent.replace(oldValue, newValue)
                    })
                }
            }
        })
    }
}