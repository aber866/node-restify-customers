"use strict";

const xcatalog = require("xcatalog"),
    runner = require("generator-runner");

exports.run = function (options, cb) {
    runner(function* list () {
        let result, error;
        try {
            result = yield xcatalog("customerService").list(options);
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
