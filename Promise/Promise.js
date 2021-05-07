const resolve = Symbol('resolve')
const reject = Symbol('reject')

class Promisem {
  constructor(handle) {
    this['[[PromiseState]]'] = 'pending';
    this['[[PromiseResult]]'] = undefined;
    handle(this[resolve].bind(this), this[reject].bind(this))
    this.isresolve = false
    this.isreject = false
    this.resolveQueue = []
    this.rejectQueue = []
  }
  [resolve](val) {
    if (this.isresolve || this.isreject) return this
    this['[[PromiseState]]'] = 'fulfilled';
    this['[[PromiseResult]]'] = val;
    this.isresolve = true
    const run = () => {
      let cb;
      while (cb = this.resolveQueue.shift()) {
        cb && cb(val)
      }
    }
    // 宏任务
    // setTimeout(() => {
    //   run()
    // }, 0)
    // 模拟微任务
    this.#microtasking(run)
  }
  #microtasking(cb) {
    const ob = new MutationObserver(cb)
    const configs = { attributes: true }
    ob.observe(document.body, configs)
    document.body.setAttribute('value', Math.random())
  }
  [reject](err) {
    // 模拟微任务
    if (this.isresolve || this.isreject) return this
    this['[[PromiseState]]'] = 'rejected';
    this['[[PromiseResult]]'] = err;
    this.isreject = true
    const run = () => {
      let cb;
      while (cb = this.rejectQueue.shift()) {
        cb && cb(err)
      }
    }
    // 模拟微任务
    this.#microtasking(run)
  }
  then(resfn, errfn) {
    if (!resfn && !errfn) return this // 处理then()的情况
    return new Promisem((resolve, reject) => {
      const resolveFn = (result) => {
        let ret = resfn && resfn(result)
        if (ret instanceof Promisem) ret.then(res => resolve(res), err => reject(err)) // 这里已经处理了 新promise返回的结果
        else {
          resolve(ret) // 其实这句话（如果return new promise 这种情况， 这句话是返回新Promise的resolve了）
        }
      }
      this.resolveQueue.push(resolveFn)
      //
      const rejectFn = (error) => {
        let ret = errfn && errfn(error)
        if (ret instanceof Promisem) ret.then(res => resolve(res), err => reject(err))
        else {
          if (errfn) resolve(ret) // 存在回调，说明要被resolve，之后就捕获不到。不存在回调，能够一直冒泡直到被catch捕获。即便在then(err=> return 2) 这种情况 也是resolve
          else { reject(error) }
        }
      }
      this.rejectQueue.push(rejectFn)
    })
  }
  catch(cb) {
    if (this['[[PromiseState]]'] === 'fulfilled') return this // 已经被resolve()的promise直接返回自身
    else {
      this.then(undefined, cb)
      return new Promisem((resolve, reject) => { // 返回值是一个fulfilled状态 undefined的promise
        resolve(undefined)
      })
    }
  }
  finally(cb) {
    this.then(cb, cb)
    return this
  }
  static resolve(val) {
    return new Promisem((res, rej) => {
      res(val)
    })
  }
  static reject(val) {
    return new Promisem((res, rej) => {
      rej(val)
    })
  }
  static race(lists) {
    return new Promisem((resolve, reject) => {
      lists.forEach(item => {
        item.then(res => resolve(res), rej => reject(rej))
      })
    })
  }
  static all(lists) {
    let allPromiseResult = []
    return new Promisem((resolve, reject) => {
      lists.forEach((item, index) => {
        item.then(res => {
          allPromiseResult[index] = res
          if (lists.length === allPromiseResult.length) resolve(allPromiseResult)
        })
      })
    })
  }
  static allSettled(lists) {
    let allPromiseResult = []
    return new Promisem((resolve, reject) => {
      lists.forEach((item, index) => {
        let obj = {}
        item.then(res=> {
          obj['status'] = 'fulfilled'
          obj['value'] = res
          allPromiseResult[index] = obj
          if (lists.length === allPromiseResult.length) resolve(allPromiseResult)
        }, err=> {
          obj['status'] = 'rejected'
          obj['reason'] = err
          allPromiseResult[index] = obj
          if (lists.length === allPromiseResult.length) resolve(allPromiseResult)
        })
      })
    })
  }
}