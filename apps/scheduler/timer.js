/**
 * Created by zhanghengyang on 15/7/10.
 */


var aggr = require("../algorithmer/preprocessor/aggregator");
var crf_predictor = require("../algorithmer/crf/predictor");
var hmm_predictor = require("../algorithmer/hmm/predictor");

var interval = 10000

setInterval(aggr(), interval)
setInterval(crf_predictor(), interval)
setInterval(hmm_predictor(), interval)
