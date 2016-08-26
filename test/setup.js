"use strict";
const conf = require("config"),
    chai = require("chai"),
    chaiaspromised = require("chai-as-promised"),
    server = require("xreq").server,
    xcatalog = require("xcatalog");

let config;

try{
    config = conf.util.extendDeep({}, conf);
    server("catalog-config")(xcatalog, true, config);
    chai.use(chaiaspromised);
    global.expect = chai.expect;
} catch(e) {
    console.log(e);
}
