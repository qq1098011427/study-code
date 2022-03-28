// 基于 Proxy 实现的沙箱
function sandbox(code) {
    code = 'with (sandbox) {' + code + '}'
    const fn = new Function('sandbox', code)
    // function  fn(sandbox) {
    //   log();console.log(a)
    // }

    return function (sandbox) {
        console.log(sandbox, '000', fn)
        const sandboxProxy = new Proxy(sandbox, {
            has(target, key) {
                console.log(target, 'has----', key)
                return Reflect.has(target, key)
            },
            get(target, key) {
                console.log(target, 'get----', key)
                if (key === Symbol.unscopables) return undefined // Symbol.unscopables 对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，这些属性会被 with 环境排除。
                return Reflect.get(target, key)
            }
        })
        return fn(sandboxProxy)
    }
}
var test = {
    b: 2,
    ddd(){
        console.log('11111')
    }
}
var code = 'ddd();return b;' // 1111,TypeError: Cannot read property 'log' of undefined
const res = sandbox(code)(test)
console.log(res, 'rrrrrr')
