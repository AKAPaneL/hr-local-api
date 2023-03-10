/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email swh1057607246@qq.com
 *
 */
const Koa = require("koa"),
  Router = require("koa-router"),
  Static = require("koa-static"),
  Session = require("koa-session"),
  BodyParser = require("koa-bodyparser"),
  path = require("path"),
  compress = require("koa-compress"),
  jsonp = require("koa-jsonp");
  axios = require('axios')
  api = require("./src/routes/api"); // 后端接口
  url = require("url"),
  service = require('./src/bury'),
  require('./src/model/db') // 引入数据库

  const  { historyApiFallback } = require('koa2-connect-history-api-fallback');
  const proxy = require('koa2-proxy-middleware')
  var process = require('child_process');
  var APICount = require('./src/model/ApiCount')
const sd = require('silly-datetime')
 // axios处理
axios.defaults.baseURL = 'http://ihrm-java.itheima.net/' // 设置请求的基地址
// axios响应拦截器
axios.interceptors.response.use(response => { 
  return response.data
}, error => {
  if(error.response && error.response.data) { 
    return  { status: error.status, ...error.response.data  }
  }
  return { data: null, message: '代理线上请求出现异常: '+ error.message, success : false, code:  10006 }
})
var isBuryStart = false

// 初始化web服务
const app = new Koa();
const router = new Router();
//配置session
app.keys = ["some secret hurr"];
app.use(historyApiFallback({ 
  whiteList: ['/prod-api']
}));  // 这里的whiteList是 白名单的意思
app.use(
  Session({
      key: "koa:sess",
      maxAge: 5400000,
      overwrite: true,
      httpOnly: true,
      signed: true,
      rolling: true,
      renew: false,
    },
    app)
);
app.use(proxy({
  targets: {
    // (.*) means anything
    '/prod-api/(.*)': {
        target: 'http://ihrm.itheima.net/api', //后端服务器地址
        changeOrigin: true,
        pathRewrite: { 	
            '/prod-api': ""
        }
    }
  }
}))
//配置静态资源
app.use(Static(path.join(__dirname, "public")));
app.use(Static(path.join(__dirname, "statics")));
//配置post请求数据接收
app.use(BodyParser());
//jsonp
app.use(jsonp());

//gzip
app.use(
  compress({
    filter: function (content_type) {
      return true;
    },
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH,
  })
);
//全局属性
app.use(async (ctx, next) => {

  var pathname = url.parse(ctx.url).pathname;
  if (pathname !== '/api/api_count') {
    APICount.create({
      api_host: ctx.request.header.host,
      api_method: ctx.request.method,
      api_url: pathname,
      api_name: pathname,
      user_agent: ctx.request.header['user-agent'] || ''
    })
  }
   if (pathname === '/api/sys/login' || pathname === '/api/reset') {
      // 如果是登录直接放过
     await next()
   }else {
    let { authorization } = ctx.request.header;
    if (authorization && ctx.session.user && ctx.session.user.token === authorization.split(' ')[1]) {
      console.log("执行请求:" + pathname)
      try {
        await  next()
      } catch (error) {
        // ctx.status = 505
        service.bury(ctx, 'people', error.message)

        ctx.body = {
          message: "程序执行遇到异常！异常信息：" + error.message,
          success: false,
          code: 10003,
          data: null
        }
      }
    }
    else {
       ctx.status = 401 // 超时token
       ctx.body = {
         message: authorization ? 'token超时' : '您还未登录',
         success: false,
         code: 10002,
         data: null
       }
    }
   }
});
// 启动入口
router.get('/',async ctx => {
  ctx.body = '黑马程序员-人力资源接口服务启动, 欢迎使用!!!';
})
router.use("/api", api);
// 重置数据接口
router.post('/api/reset', async (ctx) => {
  await new Promise(resolve => setTimeout(() => resolve(), 5000))
  process.exec(`node reset.js`, function (error, stdout, stderr) {
    if (error) {
      ctx.body = { "success": false, "code": 10000, "message": `重置数据失败, ${error.message}` }
    }
  })
  ctx.body = { "success": true, "code": 10000, "message": "重置数据成功" }

})
// 获取访问的数据集合
router.get('/api/api_count', async ctx => {
  // 请求总次数
  const allCount = await APICount.find().countDocuments() // 总请求次数
  // 只计算12小时之内的请求数据
  var currentTime = new Date()
  var time = new Date(currentTime.setHours(currentTime.getHours() - 1))
  const result = await APICount.aggregate([{
    $match: {
      "create_time": {
        "$gt": sd.format(time, 'YYYY-MM-DD HH:mm:ss') 
      }
    }
  },{
    $group: {"_id":'$create_time', 'api_count': { "$sum": 1 } }
  },{
    $sort: { "_id": 1 }
  }])
  ctx.body = { "success": true, "code": 10000, "message": "获取分析数据成功", data: {
    allCount, result
  }}
})
app.use(router.routes())
//启动路由
app.use(router.allowedMethods());
app.use(async ctx => {
  if(ctx.status === 404) {
    const token = await getToken(ctx)
    if (token) {
      // 组装token
      const headers = { Authorization: `Bearer ${token}` }
      const { query, body, url, method } = ctx.request
      console.log("开始请求线上接口:" + url)
      try {
       const result = await axios({
          headers,
           params: query, 
           data: body ? body : null, 
           method, 
           url  
          })
        if(result && result.code === 10002) {
          // 如果提示未登录 则置空 
          ctx.session.lineToken = null
        }
        ctx.body = result
      } catch (error) {
        console.log("线上接口执行异常:" + error.message )
        service.bury(ctx, 'people', error.message)
      }

   }else {
      console.log("未能获取线上的token")
      ctx.body = {
        message: '登录线上接口失败！请将线上管理员密码改为123456',
        code: 10005,
        success: false,
        data: null
      }
    }
  }
})
// 获取线上的token
const getToken = async (ctx) => {
   if (ctx.session.lineToken) {
    return ctx.session.lineToken
 }
 const   { success, data, message } = await axios.post('api/sys/login', { mobile: '13800000002', password: '123456' })
 if (success) {
    ctx.session.lineToken = data
    return data
 }else {
   console.log(message)
   return null
 }
}
//启动服务器
app.listen(3000, (err) =>{
  console.log("人力资源后端接口启动,http://localhost:3000")
});
