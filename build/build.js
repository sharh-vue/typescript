const webpack = require('webpack')
const util = require('util')
const webpackConfig = require('../webpack.config.js')

const compiler = webpack(webpackConfig)

compiler.run(function(err, states) {
  if(err){
    return console.log(err)
  }
  var buildJson = states.toJson();
  if(buildJson.errors){
    buildJson.errors.forEach(element => {
      console.error(element)
    });
  }
  if(buildJson.warns){
    buildJson.warns.forEach(element => {
      console.error(element)
    });
  }
  // console.log(util.inspect(buildJson))
})