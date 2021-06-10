const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');	// npm i koa-static-cache
const koaRouter = require('koa-router')
const koaBody = require('koa-body')
const nunjucks = require('nunjucks')
const fs = require('fs')
const mysql = require('mysql2/promise')
 
const main = async () => {
  const app = new Koa();
  const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'departoperation_ts'
  })

  const router = new koaRouter();
  const users = [{id: 1, username: 'haizi'}, {id: 2, username: 'zMouse'}]

  app.use(koaStaticCache({
    // url 中的前缀
    prefix: '/public',
    // url 对应的静态资源存放目录
    dir: './public',
    // 启用 gzip 传输压缩
    gzip: true,
    // 监听静态资源文件变化
    dynamic: true
  }))
  
  
  router.get('/', async (ctx, next) => {
    ctx.body = '首頁'
    next()
  })
  router.get('/get', async (ctx, next) => {
    let template = fs.readFileSync('./public/a.html').toString()
    ctx.response.body = nunjucks.renderString( template, { users } )
    next()
  })
  // 增
  router.post('/item', koaBody({multipart: true}), async (ctx, next) => {
    let  { ItemMold, UserIds } = ctx.request.body
    let [{ insertId }] = await connection.query(
      'insert into `auditgroup` (`ItemMold`, `UserIds`) values(?,?)',
      [ItemMold, UserIds]
    )
    ctx.body = `添加成功，ID是：${insertId}`;
  })
  // 删
  router.delete('/item/:id', async (ctx, next) => {
    let {id} = ctx.params;
    let rs = await connection.query(
        "DELETE FROM `auditgroup` WHERE `id`=?",
        [id]
    );
    ctx.body = `删除成功: ${id}`;
  });
  // 改
  router.patch('/item/:id(\\d+)',  koaBody(), async (ctx, next) => {
    let  { ItemMold, UserIds } = ctx.request.body
    console.log(UserIds, 'UserIds');
    let { id } = ctx.params;
    let res = await connection.query(
      'update `auditgroup` set `ItemMold` =? where id =?',
      [ItemMold, id]
    )
    ctx.body = `更新成功 ${id}`
  })
  // 查
  router.get('/item', async (ctx, next) => {
    let [[{ count }]] = await connection.query(
      'select count(`Id`) as `count` from `auditgroup` where 1 = 1'
    )
    ctx.body = count
  })
  // 文件上传
  router.post('/fileUpload', koaBody({ multipart: true }), async (ctx, next) => {
    let file = ctx.request.files.file
    let data = fs.readFileSync(file.path) // 从上传路径中读取文件
    fs.writeFileSync('public/' + file.name, data)
    ctx.body = 'fileUpload响应'
  })

  app.use( router.routes() )
  
  app.listen(8888)
}
main()
