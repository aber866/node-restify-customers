"use strict";

module.exports = function (server) {
    const xcatalog = require("xcatalog");

    /* POST insert customer */
    server.post({ path: "/customers", version: "1.0.0", monitor: true }, (req, res, next) => {
        const username = req.body.username, fullname = req.body.fullname, email = req.body.email,
            address = req.body.address;
        xcatalog("customerService").insert(username, fullname, email, address).then((result) =>
            next(res.json(result))
        ).catch((err) => next(err));
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
        xcatalog("customerService").list(options).then((result) =>
            next(res.json(result))
        ).catch((err) => next(err));
    });

    /* GET a customers */
    server.get({ path: "/customers/:customer", monitor: true }, (req, res, next) => {
        const customer = req.params.customer;
        xcatalog("customerService").get(customer).then((result) =>
            next(res.json(result))
        ).catch((err) => next(err));
    });

    /* PATCH update a customer */
    server.patch({ path: "/customers/:customer", monitor: true }, (req, res, next) => {
        const customer = req.params.customer, fields = req.body;
        xcatalog("customerService").update(customer, fields).then((result) =>
            next(res.json({ result }))
        ).catch((err) => next(err));
    });

    /* DELETE a customer */
    server.del({ path: "/customers/:customer", monitor: true }, (req, res, next) => {
        const customer = req.params.customer;
        xcatalog("customerService").delete(customer).then((result) =>
            next(res.json({ result }))
        ).catch((err) => next(err));
    });
};
