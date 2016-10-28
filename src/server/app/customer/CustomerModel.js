"use strict";

const xreq = require("xreq"),
    helpers = xreq.utils("mongo-helpers"),
    ObjectID = require("mongodb").ObjectID;

class CustomerModel {
    constructor (db, moment) {
        this.collection = db.collection("customers");
        this.moment = moment;
    }

    insert (customer) {
        const doc = { username: customer.username, fullname: customer.fullname, email: customer.email,
            address: customer.address, lastUpdated: customer.lastUpdated };
        return helpers.mongodb.insertOne(this.collection, doc).then((id) => id.toHexString());
    }

    list (page, size) {
        return this.collection.find()
        .skip((page - 1) * size)
        .limit(size)
        .toArray();
    }

    get (username) {
        const selector = { username };
        return helpers.mongodb.findOne(this.collection, selector);
    }

    deleteAll () {
        return helpers.mongodb.deleteAll(this.collection);
    }
}

module.exports = CustomerModel;
