const http = require('http')
const fs = require('fs');

const obj = {
  'name': '鲁班',
  'feature': 'silly'
}
const routesMap = new Map();
routesMap.set('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset="utf-8"');
    res.end(JSON.stringify(obj));
});
routesMap.set('/a', async (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset="utf-8"');
  res.end('现在a页面哦');
});

const server = http.createServer();

server.on('request', async (req, res) => {
  // 静态资源 匹配public
  const url = req.url.startsWith('/public')
  if (url) {
    let content = '默认'
    if (fs.existsSync(`.${req.url}`)) {
      content = fs.readFileSync(`.${req.url}`).toString()
    }
    res.end(content)
  } else {
    // 动态资源
    if (routesMap.has(req.url)) {
      const fn = routesMap.get(req.url)
      await fn(req, res)
    } else {
      res.statusCode = 302
      res.setHeader('location', '/')
      res.end()
    }
  }
})
server.listen(8888, '0.0.0.0', () => {
  console.log(`服务启动成功`);
});