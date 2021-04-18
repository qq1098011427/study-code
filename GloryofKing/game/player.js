import Luban from './heroes/luban.js';
import Yase from './heroes/yase.js';
 
export default class  Player{
    constructor(name){
        this.name = name;
        this.heroes = [new Yase(), new Luban()];
        this.selectHero = ''
        this.selectSkin = ''
    }
    heroSelected(hero) {
        this.selectHero = hero
    }
    skinSelected(skin) {
        this.selectSkin = skin
    }
}