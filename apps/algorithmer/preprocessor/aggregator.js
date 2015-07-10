/**
 * Created by zhanghengyang on 15/7/10.
 */

var req = require("request");
var AV = require("avoscloud-sdk").AV;


module.exports = function(){


  var filter_url = "http://127.0.0.1:3000/api/UserLogs?filter=%7B%22where%22%3A%7B%7D%7D";
  var pruned_user_log_url = "http://127.0.0.1:3000/api/pruned_user_logs";

  req.get(filter_url,function(err, msg, body){
    if(!err){
      return new AV.Promise.as(body)
    }else{
      return new AV.Promise.error(err)
    }
  }).then(
    function(body){


      var polished_data = pruning(body)
      req.post(
        {
        url: pruned_user_log_url,
        json: polished_data
      },
      function(err, res, body){
        if(!err || (res.statusCode != 201&& res.statusCode != 200) ){
          console.log(body)
          console.log("save to pruned_user_log successfully")
        }else{
          console.log("save to pruned_user_log failedly")
          console.log(err)
        }
      })

    },
    function(err){
      console.log("meet error");
      console.log(err);
    }

  )


}


var pruning = function(input_list){

  var output_list = []
  input_list.forEach(function(obj){
    obj.deleted = true
    obj.interpolated = false
    output_list.push(obj)
  })

  return output_list
}
