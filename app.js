var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
// MongoDB session store for Express and Connect
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

var app = express();
// 这里要设置端口号，否则后面app.listen port undefined
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用 express-session 和 connect-mongo 模块实现了将会话信息存储到mongodb中。
app.use(session({
  // secret用来防止篡改 cookie
  secret: settings.cookieSecret,
  resave: false,
  saveUninitialized: false,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days，cookie 的生存期，毫秒为单位
  // store选项设置会话存储实例
  // 设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失
  // 参见https://www.npmjs.com/package/connect-mongo#create-a-new-connection-from-a-mongodb-connection-string
  store: new MongoStore({
    url: 'mongodb://localhost/blog'
  })
}));
// 把实现路由功能的代码都放在 routes/index.js 里，把路由控制器和实现路由功能的函数都放到 index.js 里，app.js 中只有一个总的路由接口，也就是这里的routes(app)
routes(app);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});