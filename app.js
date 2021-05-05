'use strict'

process.chdir(__dirname)

const titbit = require('titbit')
const tloader = require('titbit-loader')
const {resource} = require('titbit-toolkit')
const cluster = require('cluster')
const pg = require('pg')

let pdb = new pg.Pool({
  database : 'recycletrash',
  user     : 'postgres',
  password : '',
  host     : '127.0.0.1',
  max      : 12
})

//引入封装的函数集合模块
const funcs = require('./lib/funcs')

const token = require('./lib/token')

let loadFile = '/tmp/loadinfo.log'

if (process.platform === 'win32') {
  loadFile = 'C:\\Users\\Public\\loadinfo.log'
}

const app = new titbit({
  debug: true,

  loadInfoFile: loadFile,
})


if (cluster.isWorker) {
  
  app.addService('pagePath', __dirname + '/pages')

  app.addService('imagePath', __dirname + '/public/images')

  app.addService('publicPath', __dirname + '/public')

  app.addService('passagePath',__dirname + '/public/passage')

  //把存储负载信息的文件加载到service，在请求中就可以通过c.service.loadFile访问到。
  app.addService('loadFile', loadFile)

  app.addService('funcs', funcs)

  app.addService('token', token)

  //key必须是32位
  app.addService('tokenKey', '123456789012345678900987654321qw')

  let tld = new tloader({
    mdb : pdb
  })
  //开始自动加载过程。
  tld.init(app)
}

if (cluster.isWorker) {

  //启用静态文件组件
  let st = new resource({
    //设定静态资源所在目录
    staticPath: './public',

    //默认就是/static/*,
    //这个是访问静态资源的路由，你必须要有一个路由前缀的，否则容易导致路由冲突。
    /*
      假设在public目录存在文件 css/a.css
      这里设定好/static/*，在前端页面访问css则可以这样使用：
        <link rel="stylesheet" href="/static/css/a.css">

      /static后面的是路径参数。
    */
    routePath : '/static/*',

    //静态资源路由所在分组。
    routeGroup: '_static',

    //设置最大缓存100M，这会缓存读取过的文件，缓存在内存中不会再次去读取文件。
    maxCacheSize: 100000000
  })

  st.init(app)

  //添加到_static分组，之后，在public目录中的存在favicon.ico文件，通过此请求既可以获取到。
  //浏览器会自动发起此请求获取tab标签的图标。
  app.get('/favicon.ico', async c => {}, {group: '_static'})
}

app.options('/*', async c => {})

//监听1234端口，并启用两个worker子进程处理请求。
//daemon通过调用cluster模块实现多进程处理请求。
app.daemon(1234, 2)
