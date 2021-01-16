var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//view의 경로 설정
app.set('view engine', 'ejs');
//pug 템플릿을 사용
app.use(logger('dev'));
//logger 모듈을 사용한다면 설정
//logger 모듈 보다 위에 선언한 모듈에 대해서는 로깅을 받지 않는다.
//dev 설정을 하면 response에 따라 색이 다른 로그를 보여준다.
app.use(express.json());
//헤더의 content type을 자동으로 json으로 설정해 줌
app.use(express.urlencoded({ extended: false }));
//한글 등 url을 utf8로 인코딩 할 필요가 있을때 사용
//보다 다양한 모듈과 형식을 지원하고 싶으면 extended를 true로 설정한다.
app.use(cookieParser());
//서버에서 쿠키를 쉽게 생성할 수 있게 해주는 모듈
//http 프로토콜은 통신이 끝나면 상태 정보를 저장하지 않기 때문에, 유저가 다시 접속 시 이전 화면을 보여주는 등 상태에 대한 저장이 필요할 때 사용
app.use(express.static(path.join(__dirname, 'public')));
//static(전 경로에서 참조할 수 있는) 루트 디렉토리를 설정해 줌

app.use('/', indexRouter); // 127.0.0.1:3000
app.use('/users', usersRouter); // 127.0.0.1:3000/users

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
