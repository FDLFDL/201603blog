//引入express模块
var express = require('express');
//引用用来处理路径 join resolve
var path = require('path');
//处理收藏夹图标的中间件
var favicon = require('serve-favicon');
//日志记录器
var logger = require('morgan');
//处理cookie的 req.cookies属性
var cookieParser = require('cookie-parser');
//用来处理请求体 req.body
var bodyParser = require('body-parser');
//首页路由文件
var routes = require('./routes/index');
//用户路由
var users = require('./routes/users');
//生成app
var app = express();

//设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'ejs');

//收藏夹图标的物理文件路径
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用日志中间件
app.use(logger('dev'));
//处理请求体
app.use(bodyParser.json());//处理 application/json
app.use(bodyParser.urlencoded({ extended: false }));//处理 application/x-www-form-urlencoded
//解析 cookie 请求头中的cookie转成对象 req.cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置首页路由
app.use('/', routes);
//配置用户路由
app.use('/users', users);
//捕获404错误并且转向错误处理中间件
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
