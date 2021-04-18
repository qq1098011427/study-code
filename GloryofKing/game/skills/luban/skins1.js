import Basics from '../basics.js'
export default class Skins1 extends Basics {
  constructor() {
    const obj = {
      name: '鲁班技能1',
      icon: './sources/skills/11210.png'
    }
    super(obj)
    this.describle = '减速'
  }
}