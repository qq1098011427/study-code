class p {
  constructor(name) {
    this.name = name;
  }
  hurt(val) {
    console.log(`造成${val}点伤害`);
  }
}
function bear(val) {
  return function () {
    console.log(`小兵承受${val}伤害`);
  };
}
let arr = []; // 记录每一次调用的this是什么
Function.prototype.Decorate = function (fn) {
  let _this = this;
  arr.push(_this);
  return function (val1) {
    _this(val1);
    fn();
  };
};
let p1 = new p("player1");
p1.hurt.Decorate(bear(40)).Decorate(bear(40)).Decorate(bear(40))(20);
console.log("数组执行", arr);
arr[2](20); // 这一步等同于 上面return的_this(val1)
bear(40)(); // 这一步等同于 上面return的fn
