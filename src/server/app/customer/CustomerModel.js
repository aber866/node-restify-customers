"use strict";

const xreq = require("xreq"),
    helpers = xreq.utils("mongo-helpers"),
    ObjectID = require("mongodb").ObjectID;

class CustomerModel {
    constructor (db, moment) {
        this.collection = db.collection("customers");
        this.moment = moment;
    }

    insertCustomer (customer) {
        const doc = { username: customer.username, fullname: customer.fullname, email: customer.email,
            address: customer.address, lastUpdated: customer.lastUpdated };
        return helpers.mongodb.insertOne(this.collection, doc).then((id) => id.toHexString());
    }

    deleteAll () {
        return helpers.mongodb.deleteAll(this.collection);
    }
}

module.exports = CustomerModel;
