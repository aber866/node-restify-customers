"use strict";

class CustomerSchemas {
	constructor (Joi) {
		this.insertCustomerSchema = Joi.object().keys({
			username: Joi.string().alphanum().min(3).max(30).required().description("Username"),
			email: Joi.string().email().required().description("Email"),
			address: Joi.object().description("Address")
		});
	}
}

module.exports = CustomerSchemas;
