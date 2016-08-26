"use strict";


module.exports = {
    copyAndMap (orig, dest, fields) {
        Object.keys(fields).forEach(function (key) {
            if (orig[key] !== undefined) {
                dest[fields[key]] = orig[key];
            }
        });
        return dest;
    },
    mongodb: {
        findOne (collection, filter) {
            return collection.findOne(filter, { "_id": 0 }).then(function (doc) {
                if (!doc) {
                    return null;
                }
                return doc;
            });
        },
        findOneById (collection, id) {
            return collection.findOne({ "_id": id }, { "_id": 0 }).then(function (doc) {
                if (!doc) {
                    return null;
                }
                doc.id = id;
                return doc;
            });
        },
        insertOne (collection, doc) {
            return collection.insertOne(doc).then(function (r) {
                return r.insertedId;
            });
        },

        updateOne (collection, selector, document, options) {
            return collection.updateOne(selector, document, options).then(function (r) {
                return r.matchedCount ? r.modifiedCount || r.upsertedCount : null;
            });
        },

        deleteAll (collection) {
            return collection.deleteMany({}).then(function (r) {
                return r.deletedCount;
            });
        },
        deleteOneById (collection, id) {
            return collection.deleteOne({ "_id": id }).then(function (r) {
                return r.deletedCount || null;
            });
        },
        count (collection) {
            return collection.count({});
        }
    }
};
