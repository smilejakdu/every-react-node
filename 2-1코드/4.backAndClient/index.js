var fs = require('fs'),
xml2js = require('xml2js');
 
var parser = new xml2js.Parser();

const http = require('http');
//우리가 만드는 서버는 http 프로토콜을 사용하는 서버 입니다.
//NodeJS로 HTTP 서버 개발을 가능하게 해주는 모듈

const hostname = '127.0.0.1';
//호스트란 우리가 접속 하는 ip 주소를 의미 합니다.

const port = 3000;

const server = http.createServer((req, res) => {
    //웹 서버 객체를 생성하며, 클라이언트에서 호출 될때마다 실행됩니다.
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World\n');
    const url = require('url').parse(req.url, true);
    if(url.pathname === '/xml') {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'text/plain');
        // res.write('sub');
        // res.end();

        fs.readFile(__dirname + '/xml.xml', function(err, data) {
            parser.parseString(data, function (err, result) {
                let json = JSON.stringify(result)
                res.write(json)
                res.end()
            });
        });
    } else if (url.pathname === '/json') {
        // res.statusCode = 200;
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader('Content-Type', 'text/plain');
        // res.end('Hello World\n');
        fs.readFile(__dirname + '/json.json', function(err, data) {
            let json = JSON.parse(data)
            res.write(JSON.stringify(json))
            res.end()
            
        });
    } else {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }   
});

server.listen(port, hostname, () => {
    //이미 만든 객체를 전달 받은 포트로 활성화 합니다.
    console.log(`Server running at http://${hostname}:${port}/`);
});