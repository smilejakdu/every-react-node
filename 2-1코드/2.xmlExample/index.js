const fs = require('fs'),
      xml2js = require('xml2js')
 
const parser = new xml2js.Parser()
console.log('__dirname : ',__dirname)


fs.readFile(__dirname + '/example.xml', function(err, data) {
    console.log('data:', data)

    parser.parseString(data, function (err, result) {
        console.log('result ',result)
        console.log('result.ORDER_LIST ',result.ORDER_LIST)
        console.log('result.ORDER_LIST.HEADER ' ,result.ORDER_LIST.HEADER)
        console.log('Done')
    })
})