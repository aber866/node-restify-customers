Middleware RESTful API to manage CRUD operations about customers with Node JS.

Use of restify, which borrows heavily from express but it is lighter to build "strict" API services that are maintanable and observable.

Use of restify-server-manager to create/start/stop a restify.js server based on configuration object.

Use of Joi to do object schema validation for Javascript objects.

Use of Mocha and Chai to test the API.

Steps:
* run mongod ("C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath c:\data)
* npm install
* npm start

To try the routes of the API import CustomerAPI.postman_collection.json in postman.
