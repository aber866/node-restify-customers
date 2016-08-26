"use strict";

module.exports = function (server) {
    const xcatalog = require("xcatalog");

    /* POST insert customer */
    server.post({ path: "/customers", version: "1.0.0", monitor: true }, (req, res, next) => {
        const username = req.body.username, fullname = req.body.fullname, email = req.body.email,
            address = req.body.address;
        xcatalog("insertCustomer").run(username, fullname, email, address, (err, result) => {
            if (err instanceof Error) {
                return next(err);
            }
            return next(res.json(result));
        });
    });
};
