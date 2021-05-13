const fs = require('fs')

// let rs = fs.createReadStream('64kb')
// let ws = fs.createWriteStream('2.txt')
// rs.pipe(ws)

// 流会把数据分成64kb的小文件传输；
// 创建一个65kb的文件；
let buffer = Buffer.alloc(65 * 1024)
fs.writeFileSync('65kb', buffer)
let rs = fs.createReadStream('65kb')

let str = ''
let num = 0
rs.on('data', chunk => {
  str += chunk
  num++
  console.log(chunk);
})

rs.on('end', () => {
  console.log('流完成', num, str);
})