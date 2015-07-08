module.exports = function(Installation) {

  Installation.observe("after save", function(ctx, next) {

    next();
  });

  var result = null;
  Installation.invent = function(body, cb){



    var response = "created successfully"
    cb(null,response)
  };


  Installation.remoteMethod(
    "invent",
    {
      accepts: { arg: "body", type: "object"},
      returns: { arg: result ,type:"string"}
    }
  )


};
