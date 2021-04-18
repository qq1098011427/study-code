// 技能
import S1 from '../skills/yase/skins1.js';
import S2 from '../skills/yase/skins2.js';
import S3 from '../skills/yase/skins3.js';
// 皮肤
import P1 from '../skins/yase/pf1.js';
import P2 from '../skins/yase/pf2.js';
import P3 from '../skins/yase/pf3.js';

export default class Yase {
    constructor(){
        this.name = "亚瑟";
        this.ico = "./sources/heroes/yase1.png";
        this.skills = [new S1, new S2, new S3];
        this.skins = [new P1, new P2, new P3];
    }
}