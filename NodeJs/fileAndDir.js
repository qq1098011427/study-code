// 文件
fs.writeFile("文件路径","写入的内容", { flag: 'w' },(err) => {}) // a:追加写入；w 写入(默认)；r：读取；
fs.readFile("文件路径","utf8",(err,data)=>{})
fs.rename("1.txt","2.txt",err=>{}) // 修改
fs.unlink("2.txt",(err)=>{}) // 删除文件
// 复制
fs.copyFile("index.html","myindex.html",err=>{})
function mycopy(src,dest){
  fs.writeFileSync(dest,fs.readFileSync(src));
}
// 目录
fs.mkdir("11",err=>{}) // 创建目录
fs.readdir("22",(err,data)=>{})
fs.rmdir("11",err=>{}) // 删除目录(空文件夹/目录)
fs.exists("index.html",exists=>{}) // 是否存在
fs.stat("index.html",(err,stat)=>{ // 获取文件或者目录的详细信息；
    // 判断文件是否是文件
    let boolean = stat.isFile();
    // 是否是一个文件夹；
    let boolean = stat.isDirectory();
})
// 带上Sync表示同步，否则异步

// 删除非空文件夹；
// 先把目录里的文件删除-->删除空目录；
function removeDir(path) {
  let arr = fs.readdirSync(path)
   // ["33","1.txt","2.html"];
  for(let i =0; i< arr.length; i++) {
    // 是文件或者是目录； --->?文件 直接删除？目录继续查找；  
    let url = path + '/' + arr[i]
    let stat =  fs.statSync(url)
    if (stat.isDirectory()) {
      removeDir(url)
    } else {
      // 文件 删除
      fs.unlinkSync(url)
    }
  }
  //  删除空目录
  fs.rmdirSync(path);
}