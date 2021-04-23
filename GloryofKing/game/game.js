import Player from './player.js';
import Event from './event.js'
export default class Game extends Event{
    constructor(){
        super()
        this.player = null;
    }
    login(name){
        this.addEvent('init', (hero) => {
            console.log(hero + '登录初始化')
        })
        this.player = new Player(name);
        this.player.heroes.forEach(hero => {
            this.trigger('init', hero.name)
        })
    }
}