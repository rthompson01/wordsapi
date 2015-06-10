"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
// es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise
// just Node?
// var fetch = require('node-fetch')

var $ = require('jquery'),
    backbone = require('backbone'),

var apikey =  'f2d4ec0a1ecb44ecb73a88b581af5c0f'

//inputs: state, apikey

var Capitol = backbone.Model.extend({
    defaults: {
        key: apikey
    },

    validate: function(attrs){
        if (!attrs.state) return "No state provided"
    },

    initialize: function(){
        this.on("request", () => {
            console.log('requesting data')
        })
        this.on("sync", () => {
            console.log('request finished')
        })
        this.on("error", (...args) => {
            console.error(args)
        })
    },

    urlRoot: function(){
        return `http://capitolwords.org/api/1/phrases.json?entity_type=state&entity_value=${this.get('state_entry')}&apikey=${this.get('apikey')}?callback=?`
    }
})

var capitolwords = new Capitol({state_entry: `TX`})

console.log('capitolwords')
