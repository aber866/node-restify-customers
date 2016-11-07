/*globals expect: true, Promise: true, describe: true, it: true, beforeEach: true, before: true, after: true, afterEach: true */
"use strict";

const xcatalog = require("xcatalog"),
    source = require("xreq").server,
    Exceptions = source("exceptions/ServiceExceptions");

describe("Customer Service", () => {
    let service, model;
    const data = Object.freeze(require("./data.json")),
        c01 = data.customer01, c02 = data.customer02, c03 = data.customer03;

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

    describe("CustomerService.insert(username, fullname, email, address)", () => {
        it("should insert a new customer to the data base", () =>
            service.insert(c01.username, c01.fullname, c01.email,
            c01.address).then((customer) => {
                expect(customer.id).is.a("string");
                expect(customer.username).equal(c01.username);
                expect(customer.fullname).equal(c01.fullname);
                expect(customer.email).equal(c01.email);
                expect(customer.address).eql(c01.address);
            })
        );
        it("should throw a validation exception when username parameter is missing", () =>
            expect(service.insert(null, c01.fullname, c01.email, c01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when email parameter is missing", () =>
            expect(service.insert(c01.username, c01.fullname, null, c01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when email parameter has wrong email format", () =>
            expect(service.insert(c01.username, c01.fullname, "wrongMail", c01.address))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw a validation exception when address parameter is not an object", () =>
            expect(service.insert(c01.username, c01.fullname, c01.email, "wrongAddress"))
            .rejectedWith(Exceptions.Validation)
        );
        it("should throw an exception when the customer already exists", () =>
            service.insert(c01.username, c01.fullname, c01.email, c01.address)
            .then(() =>
                expect(service.insert(c01.username, c01.fullname, c01.email, c01.address))
                .rejectedWith(Exceptions.Internal)
            )
        );
    });

    describe("CustomerService.list(options)", () => {
        beforeEach(function () {
            return Promise.all([
                service.insert(c01.username, c01.fullname, c01.email, c01.address),
                service.insert(c02.username, c02.fullname, c02.email, c02.address),
                service.insert(c03.username, c03.fullname, c03.email, c03.address)
            ]);
        });
        it("should get all customers", () =>
            service.list().then((list) => expect(list.length).equal(3))
        );
        it("should get all customers supporting pagging", () =>
            Promise.all([
                service.list({ page: 1, size: 1 }),
                service.list({ page: 1, size: 2 })
            ]).then((list) => {
                expect(list[0].length).equals(1);
                expect(list[1].length).equals(2);
            })
        );
        it("should throw a validation exception when page or size are not integers over 1", () =>
            expect(service.list({ page: 0, size: "1" })).rejectedWith(Exceptions.Validation)
        );
    });

    describe("CustomerService.get(username)", () => {
        beforeEach(function () {
            return service.insert(c01.username, c01.fullname, c01.email, c01.address);
        });
        it("should get a previouly inserted customer", () =>
            service.get(c01.username).then((info) => {
                expect(info).is.a("object");
                expect(info.username).equal(c01.username);
                expect(info.fullname).equal(c01.fullname);
                expect(info.email).equal(c01.email);
                expect(info.address).eql(c01.address);
            })
        );
        it("should throw a validation exception when username parameter is missing", () =>
            expect(service.get()).rejectedWith(Exceptions.Validation)
        );
        it("should throw a notfound exception if the customer is not found", () =>
            expect(service.get(c02.username)).rejectedWith(Exceptions.NotFound)
        );
    });

    describe("CustomerService.update(username, fields)", () => {
        beforeEach(function () {
            return service.insert(c01.username, c01.fullname, c01.email, c01.address);
        });
        it("should update several details of a customer", () =>
            service.update(c01.username, data.updatedDetails)
            .then((result) => {
                expect(result).equal(1);
                return service.get(c01.username);
            }).then((customer) => {
                expect(customer.fullname).equal(data.updatedDetails.fullname);
                expect(customer.email).equal(data.updatedDetails.email);
                expect(customer.address).eql(c01.address);
            })
        );
        it("should update the username of a customer", () =>
            service.update(c01.username, { "username": "test01Updated" })
            .then((result) => {
                expect(result).equal(1);
                return service.get("test01Updated");
            }).then((customer) => {
                expect(customer.username).equal("test01Updated");
                expect(customer.fullname).equal(c01.fullname);
            })
        );
        it("should throw a notfound exception if the customer is not found", () =>
            expect(service.update(c02.username, data.updatedDetails))
            .rejectedWith(Exceptions.NotFound)
        );
        it("should throw a validation exception when username parameter is missing", () =>
            expect(service.update()).rejectedWith(Exceptions.Validation)
        );
        it("should not throw and error and not update anything when the second parameter is an empty object", () =>
            service.update(c01.username, { }).then((result) => {
                expect(result).equal(1);
            })
        );
    });
});
