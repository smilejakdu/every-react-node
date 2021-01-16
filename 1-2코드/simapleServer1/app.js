const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

let schoolArrays = [];  

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true);    
     
    if(req.method == 'POST'){
        console.log("post called")        
        let body = '';
        req.on('data', function (data) {
            body += data;            
        });
        req.on('end', function () {
            console.log('body : ',body)
            const json =JSON.parse(body);
            console.log('son : ',json)
            console.log('json.name : ',json.name)
            const school = new School(json.name, json.address, json.type);
            console.log('school : ',school)
            let schoolArrays = [school];
            console.log('schoolArrays : ',schoolArrays)
            let newDb;
            fs.readFile('database.json', 'utf8', function(err, data) {                
                if(data){
                    let originDb = JSON.parse(data);
                    let arrayDb = Array.from(originDb);
                    arrayDb.push(school);
                    newDb = JSON.stringify(arrayDb);

                } else {
                    // no data exists
                    newDb = JSON.stringify(schoolArrays);
                    // newDb = schoolArrays;
                }

                fs.writeFile('database.json', newDb, 'utf8', function(err) {
                    res.statusCode = 201;
                    res.end(JSON.stringify({result : true, list : newDb}))
                });
            });            
        });
    } else if (req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'text/plain');
        fs.readFile('database.json', 'utf8', function(err, data) {                
            res.end(JSON.stringify({result : true, list : data}))
        });
    } else if (req.method == 'PUT'){
        let body = '';
        req.on('data', function (data) {
            body += data;            
        });
        req.on('end', function () {
            const json =JSON.parse(body);
            const school = new School(json.name, json.address, json.type);
            fs.readFile('database.json', 'utf8', function(err, data) {                
                let originDb = JSON.parse(data);                    
                let arrayDb = Array.from(originDb);
                arrayDb[json.index]  = school;             
                arrayDb = JSON.stringify(arrayDb)
                fs.writeFile('database.json', arrayDb, 'utf8', function(err) {
                    res.statusCode = 201;
                    res.end(JSON.stringify({result : true, list : arrayDb}))
                });
            });
        });   
    } else if(req.method == 'DELETE'){
        let body = '';
        req.on('data', function (data) {
            body += data;            
        });
        req.on('end', function () {
            const json =JSON.parse(body);
            fs.readFile('database.json', 'utf8', function(err, data) {                
                let originDb = JSON.parse(data);                    
                let arrayDb = Array.from(originDb);                
                delete arrayDb[json.index] 
                arrayDb = arrayDb.filter(x => x != null)               
                fs.writeFile('database.json', JSON.stringify(arrayDb), 'utf8', function(err) {
                    res.statusCode = 201;
                    res.end(JSON.stringify({result : true, list : arrayDb}))
                });
            });
        });   
    }

    class School {
        constructor(name, address, type) {
            this.name = name;
            this.address = address;
            this.type = type;
        }
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});