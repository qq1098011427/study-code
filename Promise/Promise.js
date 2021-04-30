const resolve = Symbol('resolve')
const reject = Symbol('reject')

class Promisem {
  constructor(handle) {
    console.log(handle, 'handle');
    this['[[PromiseState]]'] = 'pending';
    this['[[PromiseResult]]'] = undefined;
    handle(this[resolve].bind(this), this[reject].bind(this))
  }
  [resolve](val) {
    this['[[PromiseState]]'] = 'fulfilled';
    this['[[PromiseResult]]'] = val;
  }
  [reject](err) {
    this['[[PromiseState]]'] = 'rejected';
    this['[[PromiseResult]]'] = err;
  }
}