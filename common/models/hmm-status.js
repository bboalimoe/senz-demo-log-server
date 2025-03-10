var log = require("../libraries/utils/logger").log;
var logger = new log("hmm Hook Module");
var publisher = require('../libraries/rabbit_lib/publisher');


module.exports = function(HmmStatus) {

  HmmStatus.observe("after save", function(ctx, next){
    if(ctx.isNewInstance){
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
      var object = ctx.instance;
      var type = ctx.instance.type;

      logger.info("Log to Rabbitmq",'There is a new ' + type +  ' comming.');
      msg = object;
      logger.info("Log to Rabbitmq",'The new hmm status object id: ' + object.id);
      publisher.publishMessage(msg, 'new_hmm_status_creation');


    }
    else{
      console.log("updated %s",ctx.Model.pluralModelName)

    }
    next();
  })


};



