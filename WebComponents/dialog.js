let template = document.createElement("template");
template.innerHTML = `
<style>
.k-dialog {
    width: 30%;
    z-index: 2001;
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    margin: 0 auto;
    top: 15vh;
    left:30%;
}

.k-wrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: black;
    opacity: 0.4;
    z-index: 2000;
}

.k-header {
    padding: 20px 20px 10px;
}

.k-header .k-title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    float: left;
}

.k-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
}

.k-footer {
    padding: 10px 20px 30px;
    text-align: right;
}

.k-close {
    color: #909399;
    font-weight: 400;
    float: right;
    cursor: pointer;
}

.k-cancel {
    color: #606266;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    margin-right: 10px;
}

.k-cancel:hover {
    color: #409eff;
    background: #ecf5ff;
    border-color: #c6e2ff;
}

.k-primary {
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    background: #409eff;
    color: #fff;
    margin-left: 10px;
}

.k-primary:hover {
    background: #66b1ff;
}
.k-input{
    width: 100%;
    margin-left: 20px;
    margin-bottom: 20px;
}
.input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    margin-top: 20px;
}
</style>
<div class="k-wrapper"></div>
<div class="k-dialog">
    <div class="k-header">
        <span class="k-title">提示</span><span class="k-close">X</span>
    </div>
    <div class="k-body">
        <span>这是一段文本</span>
        <input class="input-inner" type="text" />
    </div>
    <div class="k-footer">
        <span class="k-cancel">取消</span>
        <span class="k-primary">确定</span>
    </div>
</div> `;
String.prototype.bool = function () {
  return /^true$/.test(this);
};

const close = Symbol('close')
// HTMLElement继承EventTarget 类
class MessageBox extends HTMLElement {
  #sd;
  constructor() {
    super();
    this.#sd = this.attachShadow({ mode: "open" });
    let content = template.content;
    this.#sd.appendChild(content);
    this[close]();
    this.addEvent();
    if (
      typeof this.getAttribute("dragable") === "string" &&
      this.getAttribute("dragable").bool()
    ) {
      this.dragFn();
    }
  }
  set dragable(newValue) {
    if (newValue) {
      this.dragFn();
    }
  }
  dragFn() {
    this.dialog.onmousedown = function (e) {
      let x = e.clientX - this.offsetLeft;
      let y = e.clientY - this.offsetTop;
      this.onmousemove = function (e) {
        let xx = e.clientX;
        let yy = e.clientY;
        this.style.left = xx - x + "px";
        this.style.top = yy - y + "px";
      };
    };
    this.dialog.onmouseup = function () {
      this.onmousemove = "";
    };
  }

  addEvent() {
    let dialog = this.#sd.querySelector(".k-dialog");
    this.dialog = dialog;
    dialog.onclick = (e) => {
      switch (e.target.className) {
        case "k-close":
          this[close]();
          this.dispatchEvent(new CustomEvent("cancel"));
          break;
        case "k-cancel":
          this.dispatchEvent(new CustomEvent("cancel"));
          this[close]();
          break;
        case "k-primary":
          this.dispatchEvent(new CustomEvent("success", { detail: { content: '你点击了成功' } }));
          this[close]();
          break;
      }
    };
  }
  [close]() {
    this.#sd.querySelector(".k-wrapper").style.display = "none";
    this.#sd.querySelector(".k-dialog").style.display = "none";
  }
  open() {
    this.#sd.querySelector(".k-wrapper").style.display = "block";
    this.#sd.querySelector(".k-dialog").style.display = "block";
  }
}
customElements.define("message-box", MessageBox);

export default class Dialog {
  constructor(opts) {
    let defaultConfig = {
      width: "30%",
      height: "250px",
      title: "测试标题",
      content: "测试内容",
      dragable: true, //是否可拖拽
      maskable: true, //是否有遮罩
      isCancel: false, //是否有取消
    };
    this.opts = this.mergeObj(defaultConfig, opts);
    this.createDialog();
  }
  createDialog() {
    let dialog = document.createElement("message-box");
    document.body.appendChild(dialog);
    dialog.dragable = this.opts.dragable;
    this.dialog = dialog;
  }
  mergeObj(obj1, obj2) {
    for (let i in obj2) {
      if (obj2.hasOwnProperty(i)) {
        obj1[i] = obj2[i];
      }
    }
    return obj1;
  }
  open() {
    this.dialog.open();
  }
}
