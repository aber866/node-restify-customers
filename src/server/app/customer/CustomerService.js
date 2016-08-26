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

    insertCustomer (username, fullname, email, address) {
        const nCustomer = { id: null, username, fullname, email, address, lastUpdated: new Date() },
            data = { username, email, address },
            schema = this.schemas.insertCustomerSchema;
        return validation(this, data, schema).then(() =>
            new Promise((resolve, reject) =>
                this.model.insertCustomer(nCustomer)
                .then((id) => {
                    nCustomer.id = id;
                    return resolve(nCustomer);
                })
                .catch(rejectBase(this, reject))
            )
        );
    }
}

module.exports = CustomerService;
