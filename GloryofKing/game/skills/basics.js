export default class Basics {
  constructor({name, icon}) {
    if (new.target=== Basics) {
      throw new Error("技能基类Basics不能被实例化");
    }
    this.name = name
    this.icon = icon
  }
}