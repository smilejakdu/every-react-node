const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true)    
    if(url.pathname == '/product'){
        if(req.method == 'POST'){
            console.log("post called")        
            let body = ''
            req.on('data', function (data) {
                body += data            
            })
            req.on('end', function () {
                const json =JSON.parse(body)
                const good = new Good(json.name, json.price)
                let newDb
                fs.readFile('database.json', 'utf8', function(err, data) {   
                    console.log('data : ', data)             
                    if(data){ // 값이 없을 경우 false
                        
                        let originDb = JSON.parse(data) // 명확히 하기 위해
                        // originDb = [{"name":"goods 1","price":5000}]
                        let arrayDb = Array.from(originDb) // Array.from을 사용하지 않아도 되나, 명확하게 하기 위해 사용합니다.
                        arrayDb.push(good)
                        // arrayDb = [{"name":"goods 1","price":5000},{}]                  
                        newDb = JSON.stringify(arrayDb)
                        
                    } else {
                        // no data exists
                        let goodsArrays = [good]                    
                        newDb = JSON.stringify(goodsArrays)
                    }                
                    fs.writeFile('database.json', newDb, 'utf8', function(err) {
                        res.statusCode = 201
                        res.end(JSON.stringify({result : true, list : newDb}))
                    })
                })         
            })
        } else if(req.method == 'PUT'){
            let body = ''
            req.on('data', function (data) {
                body += data            
            })
            req.on('end', function () {
                const json = JSON.parse(body)
                const good = new Good(json.name, json.price)
                fs.readFile('database.json', 'utf8', function(err, data) {                
                    if(data){                
                        let originDb = JSON.parse(data)     
                        // [{"name":"goods 1","price":5000},{"name":"goods 2","price":3000},{"name":"goods3","price":3000}] 
                        let arrayDb = Array.from(originDb)
                        arrayDb[json.index]  = good // 배열
                        let newDb = JSON.stringify(arrayDb) // json string data
                        fs.writeFile('database.json', newDb, 'utf8', 
                            function(err) {
                                res.statusCode = 201
                                res.end(JSON.stringify({result : true, list : newDb}))
                            })
                    } else {
                        res.end('no data')
                    }                
                })
            })
        } else if (req.method == 'DELETE'){
    
            let body = ''
            req.on('data', function (data) {
                body += data                        
                
            })
            req.on('end', function () {
                const json =JSON.parse(body)
                fs.readFile('database.json', 'utf8', function(err, data) {                
                    let originDb = JSON.parse(data)
                    let arrayDb = Array.from(originDb)
                    delete arrayDb[json.index] 
                    // let newArray = []
                    // for (let i=0i<array.lengthi++){
                    //     console.log('i : ',i)
                    //     let item = array[i]
                    //     if(item != null){
                    //         newArray.push(item)
                    //     }                    
                    // }
                    arrayDb = arrayDb.filter(x => x != null)   
                    fs.writeFile('database.json', JSON.stringify(arrayDb), 'utf8',
                        function(err) {
                            res.statusCode = 201
                            res.end(JSON.stringify({result : true, list : arrayDb}))
                        })
                })
            })
        } else {
            res.statusCode = 200
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader('Content-Type', 'text/plain')
            fs.readFile('database.json', 'utf8', function(err, data) {                
                res.end(JSON.stringify({result : true, list : data}))
            })
        }
        class Good {
            constructor(name, price) {
                this.name = name
                this.price = price
            }
        }
    } else {

    }
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})