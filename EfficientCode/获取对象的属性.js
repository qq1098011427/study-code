let obj = {
  play: {
    p1: {
      atk: '10',
      def: '5'
    },
    p2: {
      atk: '无限',
      def: '为零'
    }
  },
  game: [{
    name: '恐龙快打',
    member: ['p1', 'p2']
  }, {
    name: '忍者神龟',
    member: ['p1']
  }]
}

console.log(getObjProperty(obj, 'play.p1.atk', 'play.p2.def', 'game[0].member'))

function getObjProperty(obj, ...selector) {
  let res = selector.map(x => {
    let s = x.replace(/\[(\w+)\]/g, '.$1').split('.')
    return s.reduce((pre, cur) => {
      return pre && pre[cur]
    }, obj) 
  })
  return res
}
