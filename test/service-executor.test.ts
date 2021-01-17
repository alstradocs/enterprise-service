import * as service from "../src/enterprise-service";

export interface One { name: string };
export interface Two { name: string };

class FormService extends service.AbstractService<One, Two> {
    doExecute(context: service.IServiceContext<One>): Two {
        return context.data;
    }
    public static someStaticMethod() {}
}

describe('Test ServiceExecutor Class', () => {
    let serviceData = { name: 'Stringer' };
    let repository: service.IServiceRepository;
    let serviceExecutor: service.IServiceExecutor;

    /**
     * 
     */
    beforeAll(() => {

        /**
         * Initialize repository with one service
         */
        repository = new service.ServiceRepository([{ serviceName: 'formService', serviceContructor: FormService }]);
        serviceExecutor = new service.ServiceExecutor(repository);

    });

    /**
     * 
     */
    it('Service executor should be a valid object', () => {
        // Expect the request and response data to be the same
        expect(serviceExecutor).toBeTruthy();
    });

    /**
     * 
     */
    it('Should execute a service using the executor', () => {
        // Initial the execution invocation context
        let executionContext: service.IExecutionContext<One> = { serviceName: 'formService', data: serviceData };
        // Retrieve and execute service
        let serviceResponseData = serviceExecutor.executeService(executionContext);
        // Expect the request and response data to be the same
        expect(serviceData).toBe(serviceResponseData);
    });

    /**
     * 
     */
    it('Should fail to execute a service using wrong name the executor', () => {
        // Initial the execution invocation context
        let executionContext: service.IExecutionContext<One> = { serviceName: 'formerService', data: serviceData };
        // Retrieve and execute service
        // Expect the request to fail
        expect(() => {
            serviceExecutor.executeService(executionContext);
        }).toThrow(service.ServiceNotFoundException);
    })
});