"use strict";

const xcatalog = require("xcatalog"),
    runner = require("generator-runner");

exports.run = function (username, fullname, email, address, cb) {
    runner(function* insertCustomer () {
        let result, error;
        try {
            result = yield xcatalog("customerService").insertCustomer(username, fullname, email, address);
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

