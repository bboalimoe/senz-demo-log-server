var log = require("../libraries/utils/logger").log;
var logger = new log("Model Log Hook Module");
var publisher = require('../libraries/rabbit_lib/publisher');



module.exports = function(Log) {

  Log.observe("after save", function(ctx, next){
    if(ctx.isNewInstance){
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
      // log to rabbitmq  begin
      //
      var objectId = ctx.instance.id;

      var type = ctx.instance.type;
      logger.debug("Log to Rabbitmq", type);
      if(type === "sensor"){

        logger.info("Log to Rabbitmq",'There is a new motion comming.');
        msg = {
          'objectId': objectId,
          'timestamp': Date.now()
        };
        logger.info("Log to Rabbitmq",'The new motion object id: ' + request.object.id);
        publisher.publishMessage(msg, 'new_motion_arrival');

      }

      else if(type === "mic"){
        logger.info("Log to Rabbitmq",'There is a new sound comming.');
        msg = {
          'objectId': objectId,
          'timestamp': Date.now()
        };
        logger.info("Log to Rabbitmq",'The new sound object id: ' + request.object.id);
        publisher.publishMessage(msg, 'new_sound_arrival');
      }

      else if(type === "location"){

        logger.info("Log to Rabbitmq",'There is a new location comming.');
        msg = {
          'objectId': objectId,
          'timestamp': Date.now()
        };
        logger.info("Log to Rabbitmq",'The new location object id: ' + request.object.id);
        publisher.publishMessage(msg, 'new_location_arrival');
      }
      else{
        logger.error("Log to Rabbitmq","just saved object type doesn't match any value [sensor],[mic],[location]")
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
