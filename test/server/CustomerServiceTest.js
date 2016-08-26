/*globals expect: true, Promise: true, describe: true, it: true, beforeEach: true, before: true, after: true, afterEach: true */
"use strict";

const xcatalog = require("xcatalog"),
    source = require("xreq").server,
    Exceptions = source("exceptions/ServiceExceptions");

describe("Customer Service", () => {
    let service, model;
    const customer01 = {
        "username": "aber866",
        "fullname": "Jhon Smith",
        "email": "jhon@outlook.com",
        "address": {
            "line1": "39 Carengie House",
            "city": "Milton Keynes",
            "postcode": "MK9 2DA",
            "country": "UK"
        }
    };

    before(() =>
        xcatalog.ready().then(() => {
            service = xcatalog("customerService");
            model = xcatalog("customerModel");
        })
    );

    function cleanUp () {
        return model.deleteAll();
    }

    beforeEach(cleanUp);
    afterEach(cleanUp);

    describe("CustomerService.insertCustomer(username, fullname, email, address)", () => {
        it("should insert a new customer to the data base", () =>
            service.insertCustomer(customer01.username, customer01.fullname, customer01.email,
            customer01.address).then((customer) => {
                expect(customer.id).is.a("string");
                expect(customer.username).equal(customer01.username);
                expect(customer.fullname).equal(customer01.fullname);
                expect(customer.email).equal(customer01.email);
                expect(customer.address).eql(customer01.address);
            })
        );
        it("should throw a validation exception when username parameter is missing", () =>
            expect(service.insertCustomer(null, customer01.fullname, customer01.email, customer01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when email parameter is missing", () =>
            expect(service.insertCustomer(customer01.username, customer01.fullname, null, customer01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when email parameter has wrong email format", () =>
            expect(service.insertCustomer(customer01.username, customer01.fullname, "wrongMail", customer01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when address parameter is not an object", () =>
            expect(service.insertCustomer(customer01.username, customer01.fullname, customer01.email, "wrongAddress"))
            .rejectedWith(Exceptions.Validation)
        );
    });
});
