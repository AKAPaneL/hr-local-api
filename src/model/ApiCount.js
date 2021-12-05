/*!
 * Koa CMS Backstage management
 *
 * Copyright JS suwenhao
 * Released under the ISC license
 * Email shuiruohanyu@foxmail.com
 *
 */
var mongoose = require('mongoose')
const sd = require('silly-datetime')

var schema = new mongoose.Schema({
    "user_agent": {type: String },
    "api_host": {type: String},
    "api_method": { type: String },
	"api_user" : { type: String },
	"api_url" : { type: String },
    "api_name" : { type: String },
	"create_time" : { type: String , default:() =>  sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') },
	"update_time" : { type: String , default:() =>  sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') }
})
var UserRead = mongoose.model('api_count', schema, 'api_count'); 

module.exports = UserRead