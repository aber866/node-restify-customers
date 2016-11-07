"use strict";

const xreq = require("xreq"),
    exceptions = xreq.exceptions,
    routes = xreq.routes,
    customer = xreq.customer,
    customerapi = xreq.customerapi,
    client = require("mongodb").MongoClient,
    bluebird = require("bluebird");

function load (xcatalog, onTest, conf) {
    const config = conf, url = onTest ? config.mongodb.url_test : config.mongodb.url;

    xcatalog
    //  Driver
    .set("db", "constant", client.connect(url, { promiseLibrary: bluebird }))

    // Cross dependencies
    .set("xcatalog", "constant", xcatalog)
    .set("moment", "constant", require("moment"))
    .set("Joi", "constant", require("joi"))
    .set("exceptions", "constant", exceptions("ServiceExceptions"))
    .set("config", "constant", config)

    // Schemas
    .set("customerSchemas", "singleton", customer("CustomerSchemas"), ["Joi"])

    // App employee
    .set("customerModel", "singleton", customer("CustomerModel"), ["db", "moment"])
    .set("customerService", "singleton", customer("CustomerService"), ["exceptions", "customerModel",
        "customerSchemas", "Joi"])

    // Api user
    .set("insert", "constant", customerapi("insert"))
    .set("list", "constant", customerapi("list"))
    .set("get", "constant", customerapi("get"))
    .set("update", "constant", customerapi("update"))

    // Router
    .set("customerRouter", "singleton", routes("customerRouter"), ["xcatalog"]);

}

module.exports = load;
