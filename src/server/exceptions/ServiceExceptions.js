/*jslint node: true*/
"use strict";

class ServiceException extends Error {
    constructor (message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.status = 500;
        if (message) {
            this.message = message;
        }
    }
}

class BadRequestException extends ServiceException {
    constructor (message) {
        super(message);
        this.status = 400;
    }
}

class NotFoundException extends ServiceException {
    constructor (collection, resource, message) {
        super(message);
        this.status = 404;
        this.collection = collection;
        this.resource = resource;
    }
}

class AccessDeniedException extends ServiceException {
    constructor (message) {
        super(message);
        this.status = 403;
    }
}

class ValidationException extends ServiceException {
    constructor (errors, message) {
        super(message);
        this.status = 422;
        this.errors = errors;
    }
}

class InternalException extends ServiceException {
    constructor (message) {
        super(message);
        this.status = 500;
    }
}

module.exports = {
    Base: ServiceException,
    AccessDenied: AccessDeniedException,
    NotFound: NotFoundException,
    Validation: ValidationException,
    Internal: InternalException,
    BadRequest: BadRequestException
};
