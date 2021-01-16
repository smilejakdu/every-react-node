const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
let goodsArray = []; 

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true)    
      
    if(req.method == 'POST'){
        let body = ''
        req.on('data', function (data) {
            // body = body + data
            body += data
        });
        req.on('end', function () {
            const json =JSON.parse(body)
            // const good = new Good(json.name, json.price)
            goodsArray.push(json)
            res.statusCode = 201
            res.end(JSON.stringify({result : true, list : goodsArray}))
        });
    } 

    class Good {
        constructor(name, price) {
            this.name = name
            this.price = price
        }
    }
  
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})