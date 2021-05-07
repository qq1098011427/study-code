class Vue {
  constructor(opts) {
    this.$options = opts
    this.observe(opts.data)
    this._data = opts.data
    this.compile()
  }
  observe(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      let val = data[key]
      const dep = new Dep() // 一个Key对应 一个收集器
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get () {
          if (Dep.target) { // 类的静态属性
            dep.addSub(Dep.target)
          }
          return val
        },
        set (newValue) {
          // data[key] = newValue; // 同等于无限进入set
          dep.notify(newValue)
          val = newValue
        }
      })
    })
  }
  compile() {
    const node = document.querySelector(this.$options.el)
    this.compileNodes(node)
  }
  compileNodes(node) {
    node.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        console.log(node.attributes);
        [...node.attributes].forEach(attr => {
          console.log(attr);
          let attrName = attr.name
          let attrValue = attr.value
          if (attrName === 'v-model') {
            node.value = this._data[attrValue]
            node.addEventListener('input', (e) => {
              this._data[attrValue] = e.target.value
            })
            new Watcher(this._data, attrValue, (newValue) => {
              node.value = newValue
            })
          }
          if (attrName === 'v-text') {
            node.textContent = this._data[attrValue]
            new Watcher(this._data, attrValue, (newValue) => {
              node.textContent = newValue
            })
          }
          if (attrName === 'v-html') {
            node.innerHTML = this._data[attrValue]
            new Watcher(this._data, attrValue, (newValue) => {
              node.innerHTML = newValue
            })
          }
        })
        // 深层递归
        if (node.childNodes.length > 0) {
          this.compileNodes(node)
        }
      } else if (node.nodeType === 3) {
        // 文本节点
        const reg = /\{\{\s*([^\}\{\s]+)\s*\}\}/
        if (reg.test(node.textContent)) {
          const $1 = RegExp.$1;
          node.textContent = node.textContent.replace(reg, this._data[$1])
          // 订阅者 新建订阅者， 同时触发get里的 收集订阅者
          new Watcher(this._data, $1, (newValue) => {
            node.textContent = node.textContent.replace(this._data[$1], newValue)
          })
        }
      }
    })
  }
}

// 收集器
class Dep {
  constructor () {
    this.subs = []
  }
  addSub(cb) {
    this.subs.push(cb)
  }
  notify(newValue) {
    this.subs.forEach(sub => {
      sub.update(newValue)
    })    
  }
}
// 订阅者
class Watcher {
  constructor(data, key, cb) {
    this.cb = cb
    Dep.target = this
    data[key] // 触发observe的get // 使得dep.addSub 收集订阅者
    Dep.target = null // 收集完清空
  }
  update(newValue) {
    this.cb(newValue) 
  }
}