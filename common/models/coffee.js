module.exports = function(Coffee) {

  Coffee.temperature = function(cb){

    var temp = 100 ;
    console.log(temp);

    var response = "The coffee is " + temp + " F"
    cb(null,response)


  }

  Coffee.remoteMethod(
    "temperature",{
      http: {path:"/temperature", verb:"get"},
      returns: {arg: "Temperature", type:"string"}
    }
  )

};
