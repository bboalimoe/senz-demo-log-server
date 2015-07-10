var log = require("../libraries/utils/logger").log;
var logger = new log("Model Log Hook Module");
var publisher = require('../libraries/rabbit_lib/publisher');



module.exports = function(Log) {

  Log.observe("after save", function(ctx, next){
    if(ctx.isNewInstance){
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
      // log to rabbitmq  begin
      //
      var object = ctx.instance;

      var type = ctx.instance.type;
      logger.debug("Log to Rabbitmq", type);
      if(type in ["sensor","mic", "location"]){

        logger.info("Log to Rabbitmq",'There is a new ' + type +  ' comming.');
        msg = object;
        logger.info("Log to Rabbitmq",'The new log object id: ' + object.id);
        publisher.publishMessage(msg, 'new_log_arrival');

      }



      //
      // log to rabbitmq end

    }
    else{
      console.log("updated %s",ctx.Model.pluralModelName)

    }
    next();
  })


};
