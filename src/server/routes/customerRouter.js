"use strict";

module.exports = function (server) {
    const xcatalog = require("xcatalog");

    /* POST insert customer */
    server.post({ path: "/customers", version: "1.0.0", monitor: true }, (req, res, next) => {
        const username = req.body.username, fullname = req.body.fullname, email = req.body.email,
            address = req.body.address;
        xcatalog("insert").run(username, fullname, email, address, (err, result) => {
            if (err instanceof Error) {
                return next(err);
            }
            return next(res.json(result));
        });
    });

    /* GET list customers */
    server.get({ path: "/customers", version: "1.0.0", monitor: true }, (req, res, next) => {
        const query = req.query, options = {};
        if (query.page) {
            options.page = parseInt(query.page);
        }
        if(query.size) {
            options.size = parseInt(query.size);
        }
        xcatalog("list").run(options, (err, result) => {
            if (err instanceof Error) {
                return next(err);
            }
            return next(res.json(result));
        });
    });

    /* GET a customers */
    server.get({ path: "/customers/:customer", version: "1.0.0", monitor: true }, (req, res, next) => {
        const customer = req.params.customer;
        xcatalog("get").run(customer, (err, result) => {
            if (err instanceof Error) {
                return next(err);
            }
            return next(res.json(result));
        });
    });

    /* PATCH update a customer */
    server.patch({ path: "/customers/:customer", version: "1.0.0", monitor: true }, (req, res, next) => {
        const customer = req.params.customer, fields = req.body;
        xcatalog("update").run(customer, fields, (err, result) => {
            if (err instanceof Error) {
                return next(err);
            }
            return next(res.json({ result }));
        });
    });
};
