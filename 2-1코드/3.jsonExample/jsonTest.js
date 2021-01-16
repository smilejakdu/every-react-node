let jsonObject = {
    "myName": "dahan",
    "age": 34,    
    "isRich": false,
    "likeColorArray":["red","blue","brown"],
    "hobbies": [
        {
            "name": "Soccer",
            "level": "not bad"
        },
        {
            "name": "Base Ball",
            "level":"horrible"            
        }
    ]
}
console.log('jsonObject : ',jsonObject)
console.log('typeof(jsonObject) : ',typeof(jsonObject))
let stJson = JSON.stringify(jsonObject)
console.log('stJson : ',stJson)
console.log('typeof(stJson) : ',typeof(stJson))
let jsonObjectAgain = JSON.parse(stJson)
console.log('stJjsonObjectAgainson : ',jsonObjectAgain)
jsonObjectAgain.gender = "man"
console.log('jsonObjectAgain["gender"] : ',jsonObjectAgain["gender"])

console.log('jsonObjectAgain.gender : ',jsonObjectAgain.gender)