"use strict";

function validation (itself, data, schema) {
    const result = itself.validator.validate(data, schema);
    if (result.error) {
        return Promise.reject(new itself.exceptions.Validation(result.error, "Error validating mandatory fields"));
    }
    return Promise.resolve();
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
            new Promise((resolve, reject) =>
                this.model.insert(nCustomer)
                .then((id) => {
                    nCustomer.id = id;
                    return resolve(nCustomer);
                })
                .catch(rejectBase(this, reject))
            )
        );
    }

    list (options) {
        options = options || {};
        const data = { page: options.page, size: options.size },
            schema = this.schemas.listSchema;
        return validation(this, data, schema).then(() => this.model.list(options.page || 1, options.size || 100));
    }
}

module.exports = CustomerService;
