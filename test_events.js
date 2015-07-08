/**
 * Created by zhanghengyang on 15/7/5.
 */


var a = function(cb){
  console.log(1)
  cb(3)
}

var d = function(cb){
  console.log(1)
  cb(4)
}

var e = function(n){
  process.nextTick(function(){
    console.log(5)

  })
}

var c = function(n){
  process.nextTick(function(){
    console.log(n)

  })
}

a(c)
d(e)
a(c)
process.nextTick(function(){
  console.log(2)
})
