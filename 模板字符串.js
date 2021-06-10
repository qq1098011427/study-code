let str = '我是{{name}},我今年{{age}}'
let data = {
  name: 'yxy',
  age: '24'
}
function template(str, data) {
  let s = str.replace(/\{\{\s*([^\}\{\s]+)\s*\}\}/g, function (str, key) {
    return data[key]
  })
  return s
}
const newStr = template(str, data)
console.log(newStr, 'newStr');