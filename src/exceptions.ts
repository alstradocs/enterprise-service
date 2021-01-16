export class ServiceException extends Error {
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}
export class ServiceNotFoundException extends ServiceException {
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, ServiceNotFoundException.prototype);
    }
}