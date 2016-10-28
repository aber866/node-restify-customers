"use strict";

const xcatalog = require("xcatalog"),
    runner = require("generator-runner");

exports.run = function (username, cb) {
    runner(function* list () {
        let result, error;
        try {
            result = yield xcatalog("customerService").get(username);
        } catch(err) {
            error = err;
        } finally {
            if(error instanceof Error) {
                throw error;
            }
            return result;
        }
    }, (err, ret) => {
        cb(err, ret);
    });
};