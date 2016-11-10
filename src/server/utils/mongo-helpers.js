"use strict";

module.exports = {
    mongodb: {
        findOne (collection, filter) {
            return collection.findOne(filter, { "_id": 0 }).then((doc) =>
                doc ? doc : null
            );
        },
        insertOne (collection, doc) {
            return collection.insertOne(doc).then((r) => r.insertedId);
        },
        updateOne (collection, selector, document, options) {
            return collection.updateOne(selector, document, options).then((r) =>
                r.matchedCount ? r.modifiedCount || r.upsertedCount : null
            );
        },
        deleteAll (collection) {
            return collection.deleteMany({}).then((r) => r.deletedCount);
        },
        deleteOne (collection, filter) {
            return collection.deleteOne(filter).then((r) => r.deletedCount || null);
        }
    }
};
