import S1 from '../skills/luban/skins1.js';
import S2 from '../skills/luban/skins2.js';
import S3 from '../skills/luban/skins3.js';

import P1 from '../skins/luban/pf1.js';
import P2 from '../skins/luban/pf2.js';
import P3 from '../skins/luban/pf3.js';

export default class Luban {
  constructor () {
    this.name = '鲁班'
    this.ico = "./sources/heroes/luban1.png";
    this.skills = [new S1, new S2, new S3];
    this.skins = [new P1, new P2, new P3];
  }
}