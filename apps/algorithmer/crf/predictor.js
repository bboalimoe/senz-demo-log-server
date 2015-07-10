/**
 * Created by zhanghengyang on 15/7/10.
 */

/**
 * Created by zhanghengyang on 15/7/10.
 */

var req = require("request");
var AV = require("avoscloud-sdk").AV;


module.exports = function(){


  var pruned_user_log_url = "http://127.0.0.1:3000/api/pruned_user_logs?filter=%7B%22where%22%3A%7B%7D%7D"
  //the where clause define the data retrieving strategy

  var crf_status_url = "http://127.0.0.1:3000/api/crf_statuses"

  req.get(pruned_user_log_url, function(err, msg, body){

    if(!err){
      return new AV.Promise.as(body)
    }else{
      return new AV.Promise.error(err)
    }
  }).then(
    function(body){

      var polished_data = algo(body)
      req.post(
        {
          url: crf_status_url,
          json: polished_data
        },
        function(err, res, body){
          if(!err || (res.statusCode != 201&& res.statusCode != 200) ){
            console.log(body)
            console.log("save to crf_status successfully")
          }else{
            console.log("save to crf_status failedly")
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


var algo = function(input_list){
  //this is core algo module

  var output = core(input_list)

  return output
}

var core = function(input_list){

  var output = {
    context: {},
    behavior: {}
  }
  return output
}
