"use strict";

const conf = require("config"),
    xcatalog = require("xcatalog"),
    ServerManager = require("restify-server-manager").RestifyServerManager;

let config;

console.log("Configuration environment: " + conf.util.getEnv("NODE_ENV"));

try {
    config = conf.util.extendDeep({}, conf);
	// Load dependency inyection module with config
    require("./src/server/catalog-config")(xcatalog, false, config);
	// When all components are loaded Create and start a new server using config
    xcatalog.ready().then(() => {
        config.formatters = {
            "application/json": function formatJson (req, res, body, cb) {
                if (!body || body.length === 0) {
                    res.send(204);
                    return;
                }
                if (body instanceof Error) {
                    const doc = body;
                    if(!body.body) {
                        doc.name = body.name || null;
                        doc.info = body.message || null;
                    }
                    for (const i in doc) {
                        if (doc[i] === null) {
                            delete doc[i];
                        }
                    }
                    if (doc.errors && doc.errors.isJoi) {
                        delete doc.errors.isJoi;
                    }
                    if (doc.errors && doc.errors._object) {
                        delete doc.errors._object;
                    }
                    if(body.status) {
                        res.status(body.status);
                    }
                    return cb(null, JSON.stringify(doc));
                }
                return cb(null, JSON.stringify(body, null, 10));
            }
        };
        const serverManager = new ServerManager(config);
        serverManager.createServer();
        serverManager.startServer();
    })
	.catch((reason) => {
		console.log(reason);
	});

} catch(e) {
	console.log(e);
}
