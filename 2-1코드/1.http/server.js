const http = require('http')


// 우리가 만드는 서버는 http 프로토콜을 사용하는 서버 입니다.
// NodeJS로 HTTP 서버 개발을 가능하게 해주는 모듈

const hostname   = '127.0.0.1'
//호스트란 우리가 접속 하는 ip 주소를 의미 합니다.
//localhost

const port       = 3000;


const server     = http.createServer((req, res) => {
    //웹 서버 객체를 생성하며, 클라이언트에서 호출 될때마다 실행됩니다.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
})

server.listen(port, hostname, () => {
    //이미 만든 객체를 전달 받은 포트로 활성화 합니다.
    console.log(`Server running at http://${hostname}:${port}/`)
    
})

