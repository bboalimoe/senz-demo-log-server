module.exports = function(SenzApp) {

  SenzApp.observe("after save", function(ctx, next){
    if(ctx.isNewInstance){
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
    }
    else{
      console.log('Updated %s matching %j',
        ctx.Model.pluralModelName,
        ctx.instance);    }
    next();
  })
};
