"use strict";

function validation (itself, data, schema) {
    const result = itself.validator.validate(data, schema);
    if (result.error) {
        return Promise.reject(new itself.exceptions.Validation(result.error, "Error validating mandatory fields"));
    }
    return Promise.resolve();
}

function modelResponse (itself, resolve, reject, id) {
    return function (info) {
        if (!info) {
            reject(new itself.exceptions.NotFound("customers", id, "Customer not found"));
        }
        resolve(info);
    };
}

function rejectBase (itself, reject) {
    return function () {
        reject(new itself.exceptions.Base("There was a problem processing your query"));
    };
}

class CustomerService {
    constructor (exceptions, customerModel, customerSchemas, Joi) {
        this.exceptions = exceptions;
        this.model = customerModel;
        this.schemas = customerSchemas;
        this.validator = Joi;
    }

    insert (username, fullname, email, address) {
        const nCustomer = { id: null, username, fullname, email, address, lastUpdated: new Date() },
            data = { username, email, address },
            schema = this.schemas.insertCustomerSchema;
        return validation(this, data, schema).then(() =>
            this.model.get(username)
        ).then((customer) =>
            new Promise((resolve, reject) => {
                if (customer) {
                    return reject(new this.exceptions.Internal("Username already exists"));
                }
                return this.model.insert(nCustomer)
                .then((id) => {
                    nCustomer.id = id;
                    return resolve(nCustomer);
                })
                .catch(rejectBase(this, reject));
            })
        );
    }

    list (options) {
        options = options || {};
        const data = { page: options.page, size: options.size },
            schema = this.schemas.listSchema;
        return validation(this, data, schema).then(() => this.model.list(options.page || 1, options.size || 100));
    }

    get (username) {
        const data = { username },
            schema = this.schemas.getSchema;
        return validation(this, data, schema).then(() =>
            new Promise((resolve, reject) =>
                this.model.get(username)
                .then(modelResponse(this, resolve, reject, username))
                .catch(rejectBase(this, reject))
            )
        );
    }

    update (username, fields) {
        const data = { username, fields, updatedUsername: fields.username },
            schema = this.schemas.updateSchema;
        return validation(this, data, schema).then(() => {
            fields.lastUpdated = new Date();
            return this.get(username);
        }).then(() =>
            new Promise((resolve, reject) =>
                this.model.update(username, fields)
                .then((updated) => resolve(updated))
                .catch(rejectBase(this, reject))
            )
        );
    }

    delete (username) {
        return this.get(username).then(() =>
            new Promise((resolve, reject) =>
                this.model.delete(username)
                .then((deleted) => resolve(deleted))
                .catch(rejectBase(this, reject))
            )
        );
    }
}

module.exports = CustomerService;
