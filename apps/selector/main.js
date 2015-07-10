/**
 * Created by zhanghengyang on 15/7/10.
 */

var req = require("request");
var AV = require("avoscloud-sdk").AV;
var sub = require("./rabbit_lib/subscriber");

module.exports = function(){

  sub.registerEvent(algo, "user_status_crf", "new_crf_status_creation");
  sub.registerEvent(algo, "user_status_hmm", "new_hmm_status_creation");

};


var crf = function(status_object){
  //this is core algo module
  status_object.predictedBy = "crf"
  var output = core(status_object)

  return output
}

var hmm = function(status_object){
  status_object.predictedBy = "hmm"
  core(status_object);

};


var lastupdatedAt = null;


var core = function(object){

  //发布到user_status上
  //这里可以做throttling和limiting
  //
  var user_status_url = "http://127.0.0.1:3000/api/user_statuses";

  userId = object.userId;
  var find_by_userId_url = "http://127.0.0.1:3000/api/user_statuses?filter=%7B%22where%22%3A%7B%22userId%22%3A%22" + userId +"%22%7D%7D";
  req.get(find_by_userId_url,function(err, msg, body){

    return new AV.Promise.as(body)

  }).then(
    function(user_status_list){

      if(user_status_list[0].lastUpdatedAt > (Date.now() - 1000) )
      {
        return;
      }
      req.post(
        {
          url: user_status_url,
          json: object
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
    function(){

    }
  )




}
