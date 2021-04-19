class Player1 {
  constructor(name) {
    this.name = name
  }
}
class Player2 {
  constructor(name) {
    this.name = name
  }
}
// 工厂模式
function Factory(type) {
  switch (type) {
    case "Player1":
      return getSingleInstance(Player1) // 结合单例
      break
    case "Player2":
      return getSingleInstance(Player2)
      break
    default:
      console.log("没有匹配");
      break;
  }
}
// 单例模式
function getSingleInstance(fn) {
  let instance;
  return function(...args) {
    if (!instance) {
      instance = new fn(...args)
    }
    return instance
  }
}

let p = Factory('Player1')
let p1 = new p('玩家1')
let p2 = new p('玩家2')
let p3 = new p('玩家3')

console.log(p1, p2, p3);
