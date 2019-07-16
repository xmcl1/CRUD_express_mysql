var express = require('express');
// var url = require('url')
var router = express.Router();
var db = require("../mysql/db.js");

//查询列表
router.get('/getList', function (req, res) {
  // if (req.url != '/favicon.ico') {
  res.setHeader('Access-Control-Allow-Origin', '*')

  let sqlString = 'select * from user';
  let connection = db.connection();
  db.getList(connection, sqlString, function (result) {
    // console.log('list：' + result);
    res.send({//返回给前端成功的信息
      code: 200,
      status: "Success",
      data: result,
      message: "获取数据成功"
    })
    res.end();
  });
  db.close(connection);
  // }
  return;
});

//用户注册
router.get('/register', function (req, res) {
  // if (req.url != '/favicon.ico') {

  res.setHeader('Access-Control-Allow-Origin', '*')

  // console.log(req.query)//拿到前端get请求的参数（?username=无言&userpass=123）
  // { username: '无言', userpass: '123' }

  // let queryData = url.parse("http://www.baidu.com/test?username=fbq&userpass=fbq241323@", true).query
  // console.log(url)
  // { Url: [Function: Url],
  //   parse: [Function: urlParse],
  //   resolve: [Function: urlResolve],
  //   resolveObject: [Function: urlResolveObject],
  //   format: [Function: urlFormat],
  //   URL: [Function: URL],
  //   URLSearchParams: [Function: URLSearchParams],
  //   domainToASCII: [Function: domainToASCII],
  //   domainToUnicode: [Function: domainToUnicode] }


  // console.log(url.parse("http://www.baidu.com/test?username=fbq&userpass=fbq241323@"))
  // Url {
  //   protocol: 'http:',
  //   slashes: true,
  //   auth: null,
  //   host: 'www.baidu.com',
  //   port: null,
  //   hostname: 'www.baidu.com',
  //   hash: null,
  //   search: '?username=fbq&userpass=fbq241323@',
  //   query: 'username=fbq&userpass=fbq241323@',
  //   pathname: '/test',
  //   path: '/test?username=fbq&userpass=fbq241323@',
  //   href: 'http://www.baidu.com/test?username=fbq&userpass=fbq241323@' }


  // console.log(url.parse("http://www.baidu.com/test?username=fbq&userpass=fbq241323@").query)
  // username=fbq&userpass=fbq241323@



  let user = { username: req.query.username, userpass: req.query.userpass };
  let sqlString = 'INSERT INTO user SET ?';
  let connection = db.connection();
  db.insert(connection, sqlString, user, function (id) {
    console.log('inserted id is:' + id);
    res.send({//返回给前端成功的信息
      code: 200,
      status: "Success",
      data: {
        username: req.query.username,
        userpass: req.query.userpass
      },
      message: "注册成功"
    })
    res.end();
  });
  db.close(connection);
  // }
  return;
});

//删除用户
router.get('/deleteUser', function (req, res) {
  // if (req.url != '/favicon.ico') {
  res.setHeader('Access-Control-Allow-Origin', '*')

  let id = req.query.id
  let sqlString = 'delete from user where id=?';
  let connection = db.connection();
  db.delete(connection, sqlString, id, function (result) {
    // console.log('list：' + result);
    res.send({//返回给前端成功的信息
      code: 200,
      status: "Success",
      data: result,
      message: "删除成功"
    })
    res.end();
  });
  db.close(connection);
  // }
  return;
});

//删除所有用户
router.get('/deleteAllUser', function (req, res) {
  // if (req.url != '/favicon.ico') {
  res.setHeader('Access-Control-Allow-Origin', '*')

// -- 清空全部数据，不写日志，不可恢复，速度极快
// truncate table 表名;
 
// -- 清空全部数据，写日志，数据可恢复，速度慢
// delete from 表名

  let sqlString = 'delete from user';
  // let sqlString = 'truncate user';
  let connection = db.connection();
  db.delete(connection, sqlString, function (result) {
    // console.log('list：' + result);
    res.send({//返回给前端成功的信息
      code: 200,
      status: "Success",
      data: result,
      message: "全部用户删除成功"
    })
    res.end();
  });
  db.close(connection);
  // }
  return;
});

//更新用户
router.get('/updateUser', function (req, res) {
  // if (req.url != '/favicon.ico') {
  res.setHeader('Access-Control-Allow-Origin', '*')

  let param = { username: req.query.username, userpass: req.query.userpass }
  let sqlString = 'update user set ? where id='+req.query.id;
  let connection = db.connection();
  db.update(connection, sqlString, param, function (result) {
    // console.log('list：' + result);
    res.send({//返回给前端成功的信息
      code: 200,
      status: "Success",
      data: result,
      message: "更新成功"
    })
    res.end();
  });
  db.close(connection);
  // }
  return;
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
