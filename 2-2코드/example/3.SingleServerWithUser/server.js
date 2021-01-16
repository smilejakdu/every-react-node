const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true);    
    console.log('url : ',url)
    if(url.pathname == '/product'){
        if(req.method == 'POST'){
            let body = '';
            req.on('data', function (data) {
                body += data;                            
            });
            req.on('end', function () {
                const json =JSON.parse(body);
                const product = new Product(json.name, json.price);
                let productArray = [product];
                let newDb;
                fs.readFile('database.json', 'utf8', function(err, data) {                
                    if(data){
                        let originDb = JSON.parse(data);                        
                        console.log('originDb : ',originDb)
                        //점 표기법으로 기존의 데이터를 불러옵니다.
                        let originProductObc = originDb.products
                        let arrayDb = Array.from(originProductObc);
                        arrayDb.push(product);
                        originDb.products = arrayDb;      

                        console.log('originDb : ',originDb)   
                        newDb = JSON.stringify(originDb)                                                             
                    } else {
                        // no data exists                      
                        newDb = JSON.stringify({products: productArray});
                    }

                    fs.writeFile('database.json', newDb, 'utf8', function(err) {
                        res.statusCode = 201;
                        res.end(JSON.stringify({result : true, list : newDb}))
                    });
                });            
            });

        } else if(req.method == 'PUT'){
            let body = '';
            req.on('data', function (data) {
                body += data;            
            });
            req.on('end', function () {
                const json =JSON.parse(body);
                const product = new Product(json.name, json.price);
                fs.readFile('database.json', 'utf8', function(err, data) {                
                    let originDb = JSON.parse(data);   
                    let originProductObc = originDb.products
                    let arrayDb = Array.from(originProductObc);
                    arrayDb[json.index]  = product;
                    originDb.products = arrayDb;      
                    let newDb = JSON.stringify(originDb)             
                    fs.writeFile('database.json', newDb, 'utf8', function(err) {
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
                    let originProductObc = originDb.products
                    let arrayDb = Array.from(originProductObc);
                    delete arrayDb[json.index] 
                    arrayDb = arrayDb.filter(x => x != null)   
                    originDb.products = arrayDb;                
                    let newDb = JSON.stringify(originDb)
                    fs.writeFile('database.json', newDb, 'utf8', function(err) {
                        res.statusCode = 201;
                        res.end(JSON.stringify({result : true, list : arrayDb}))
                    });
                });
            });   
        } else {                    
            res.statusCode = 200;
            // res.end('Hello World\n');
            fs.readFile('database.json', 'utf8', function(err, data) {                
                res.end(JSON.stringify({result : true, list : data}))
            });


        }


    } else if (url.pathname.includes('/user')){

        if(req.method == 'POST'){
            console.log("post called")  
            if(url.pathname == '/user/signin'){
                let body = '';
                req.on('data', function (data) {
                    body += data;            
                });
                req.on('end', function () {
                    const jsosn =JSON.parse(body);
                    fs.readFile('database.json', 'utf8', function(err, data) {                
                        if(data){
                            const json =JSON.parse(body);
                            let originDb = JSON.parse(data);
                            let originUserDb = originDb.user;               
                            //우선 기존에 학생 데이터가 있는 지를 if 문으로 체크합니다.
                            if(originUserDb){
                                let arrayDb = Array.from(originUserDb);
                                for(let i=0;i<arrayDb.length;i++){
                                    let user = arrayDb[i];
                                    if(json.id == user.id && json.pwd == user.pwd){                                   
                                        res.end(JSON.stringify({login : true}))
                                        break;
                                    } else {
                                        console.log('User not exist')
                                    }
                                    res.end(JSON.stringify({login : false}))
                                }
                            } else {
                                //학생 데이터가 없다면 로그인에 실패합니다.
                                //no student exists
                                res.end(JSON.stringify({login : false}))
                            }                         
                        }
                    });            
                });
            } else if (url.pathname == '/user/signup') {
                let body = '';
                req.on('data', function (data) {
                    body += data;            
                });
                req.on('end', function () {
                    const json =JSON.parse(body);
                    const user = new User(json.name, json.id, json.pwd);
                    //입력하려는 user 객체를 class를 이용해서 만들었습니다.
                    let userArray = [];
                    let newDb;
                    fs.readFile('database.json', 'utf8', function(err, data) {                
                        if(data){
                            let originDb = JSON.parse(data);
                            let originUserDb = originDb.user;   
                            //기존에 user database가 존재하는 지 확인합니다.          
                            if(originUserDb){
                                userArray = Array.from(originUserDb)
                                // user가 이미 가입 되어 있는 지 확인합니다.
                                for(let i=0;i<userArray.length;i++){
                                    let user = userArray[i];
                                    if(json.id == user.id && json.pwd == user.pwd){                                   
                                        res.end(JSON.stringify('user exist'))
                                        return;
                                        
                                    } else {
                                        console.log('User not exist')
                                    }
                                }
                                // user가 이미 가입 안되어 있으면 가입을 합니다.
                                userArray.push(user);
                                originDb.user = userArray
                                newDb = JSON.stringify(originDb);
                                fs.writeFile('database.json', newDb, 'utf8', function(err) {
                                    res.statusCode = 201;
                                    res.end(JSON.stringify({result : true, list : newDb}))
                                });
                                
                                
                            } else {
                                console.log('userArray : ',userArray)
                                userArray.push(user);
                                originDb.user = userArray
                                newDb = JSON.stringify(originDb);
                                fs.writeFile('database.json', newDb, 'utf8', function(err) {
                                    res.statusCode = 201;
                                    res.end(JSON.stringify({result : true, list : newDb}))
                                });
                            }
                        }
                    });            
                });
            }      


        } else if(req.method == 'PUT'){
            let body = '';
            req.on('data', function (data) {
                body += data;            
            });
            req.on('end', function () {
                const json =JSON.parse(body);
                const user = new User(json.name, json.id, json.pwd);
                fs.readFile('database.json', 'utf8', function(err, data) {                
                    let originDb = JSON.parse(data);                    
                    let originUserDb = originDb.user;   
                    if(originUserDb){
                        let userArray = Array.from(originUserDb)
                        userArray[json.index]  = user;     
                        originDb.user = userArray
                        newDb = JSON.stringify(originDb);
                        fs.writeFile('database.json', newDb, 'utf8', function(err) {
                            res.statusCode = 201;
                            res.end(JSON.stringify({result : true, list : newDb}))
                        });
                        
                    }
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
                    let originUserDb = originDb.user;               
                    if(originUserDb){
                        let arrayDb = Array.from(originUserDb);
                        delete arrayDb[json.index] 

                        arrayDb = arrayDb.filter(x => x != null)               
                        originDb.user = arrayDb
                        fs.writeFile('database.json', JSON.stringify(originDb), 'utf8', function(err) {
                            res.statusCode = 201;
                            res.end(JSON.stringify({result : true, list : originDb}))
                        });
                    }
                });
            });   
        } else {      
            let user = url.query.user;
            console.log('user : ',user)
            res.statusCode = 200;
            // res.end('Hello World\n');
            fs.readFile('database.json', 'utf8', function(err, data) {                
                let originDb = JSON.parse(data);                    
                let originUserDb = originDb.user; 
                if(originUserDb){
                    let userArray = Array.from(originUserDb);
                    for(let i =0; i<userArray.length;i++){
                        if (user == userArray[i].name) {
                            res.end(JSON.stringify({result : true, users : userArray[i]}))
                            return;
                        }
                        
                    }
                    res.end(JSON.stringify("User Not exist"))
                    
                    
                }    

            });


        }
    }
    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            
        }        
    }  

    class User {
        constructor(name, id, pwd) {
            this.name = name;
            this.id = id;
            this.pwd = pwd;            
        }        
    }  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});