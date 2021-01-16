var express = require('express');
var router = express.Router();
const fs = require('fs')

class Good {
  constructor(name, price) {
      this.name = name
      this.price = price
  }
}
router.post('/', function(req, res, next) {
    console.log('req : ', req.body)
    const json = req.body
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
            res.json({result : true, list : newDb})
        })
    })         
});


router.put('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
