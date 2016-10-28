"use strict";

class CustomerSchemas {
	constructor (Joi) {
		this.insertCustomerSchema = Joi.object().keys({
			username: Joi.string().alphanum().min(3).max(30).required().description("Username"),
			email: Joi.string().email().required().description("Email"),
			address: Joi.object().description("Address")
		});
		this.listSchema = Joi.object().keys({
			page: Joi.number().integer().min(1).description("Pagination page"),
            size: Joi.number().integer().min(1).max(100).description("Pagination size"),
		});
		this.getSchema = Joi.object().keys({
			username: Joi.string().alphanum().min(3).max(30).required().description("Username")
		});
	}
}

module.exports = CustomerSchemas;
