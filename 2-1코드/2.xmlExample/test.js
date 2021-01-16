let name = 'dahan' // 변경이 가능한 변수
const age = 34  // 변경이 불가능한 변수
name = 'jack'

function testCallback(){
    console.log('finish')
}
function testCallback2(){
    console.log('finish2')
}
function testMethod(getText, callback) {
    console.log("getText : ",getText) 
    callback()   
}

testMethod(name, testCallback2)
// testMethod(age)