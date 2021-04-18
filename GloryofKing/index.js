// 英雄 玩家 皮肤  技能 、游戏管理 ---》类 ---》逻辑关系--》组织代码；
/*
        game {
            login{
              player:{
                heros:{
                    skills
                    skins
                }
              }
            }
        }
*/
// index.js 和dom操作相关内容
import Game from './game/game.js';
let game = new Game();

document.querySelector(".sub").onclick = function(){
  let username = document.querySelector(".username").value;
  game.login(username);
  document.querySelector(".login").style.display = "none";
  document.querySelector(".game").style.display = "block";
  // 添加英雄
  heroModule()
  // 首次进入直接触发渲染英雄列表
  document.querySelector('.heroBtn').click()
}

// 点击英雄模块
const heroModule = () => {
  document.querySelector('.heroBtn').onclick = () => {
      document.querySelector(".heroContainer").style.display = "block";
      document.querySelector(".skinContainer").style.display = "none";
      if (document.querySelector(".heroView").innerHTML.trim() === '') {
        renderHeroList(game.player)
      }
    }
  }
// 渲染英雄列表
const renderHeroList = (player) => {
  let heroView = document.querySelector(".heroView")
  heroView.innerHTML = ''
  player.heroes.forEach(x => {
    let div = document.createElement('div')
    div.classList.add('heroItem')
    div.innerHTML = `<img src="${x.ico}" />
    <span>${x.name}</span>`
    div.onclick = () => {
      if (x.name !== player.selectHero) {
        // 选择英雄
        player.heroSelected(x.name)
        // 渲染皮肤界面
        renderSkins(x.skins[0])
        // 渲染添加技能
        renderSkills(x)
        // 渲染头像
        renderUser(x)
      }
    }
    heroView.appendChild(div)
  })
}
const renderSkins = (item) => {
  game.player.skinSelected(item.name)
  let skinShow = document.querySelector('.skinShow')
  skinShow.innerHTML = ''
  skinShow.innerHTML = `<img src="${item.icon}" alt="">`
}
const renderSkills = (item) => {
  let skillsView = document.querySelector(".skillsView")
  skillsView.innerHTML = ''
  item.skills.forEach(s => {
    let img = document.createElement('img')
    img.src = s.icon;
    img.alt = s.describle;
    skillsView.appendChild(img)
  })
}
const renderUser = (item) => {
  let userView = document.querySelector('.userView')
  userView.innerHTML = ''
  userView.innerHTML = `<div class="heroShow">
    <img src="${item.ico}" />
  </div><span class="chioseusername">${game.player.name}</span>`
}

// 点击皮肤模块
document.querySelector('.skinBtn').onclick = () => {
  if (game.player.selectHero) { // 必须先选中英雄
    document.querySelector(".heroContainer").style.display = "none";
    document.querySelector(".skinContainer").style.display = "block";
    renderSkinsList(game.player)
  }
}
// 渲染皮肤列表
const renderSkinsList = (player) => {
  let skinView = document.querySelector(".skinView")
  skinView.innerHTML = ''
  player.heroes.find(x => x.name === player.selectHero).skins.forEach(x => {
    let div = document.createElement('div')
    div.classList.add('skinItem')
    div.innerHTML = `<img src="${x.icon}" />
    <span>${x.name}</span>`
    div.onclick = () => {
      if (x.name !== player.selectSkin) {
        // 渲染皮肤
        renderSkins(x)
      }
    }
    skinView.appendChild(div)
  })
}
