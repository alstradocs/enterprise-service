import * as service from "../src";

export interface One { name: string };
export interface Two { name: string};

class FormService extends service.AbstractService<One,Two> {
    doExecute(context: service.IServiceContext<One>): Two {
        return context.data;
    }
}

const mockExecutor: service.IServiceExecutor = {
    executeService(context: service.IExecutionContext<any>): any {
        return context.data;
    }
}

describe('Test ServiceRepository Class', () => {
    let repository: service.IServiceRepository;
    let serviceData = { name: 'Stringer' };

    /**
     * 
     */
    beforeAll(() => {

        /**
         * Initialize repository with one service
         */
        repository = new service.ServiceRepository([{ serviceName:'formService', serviceContructor: FormService } ]);
    });

    /**
     * 
     */
    it('Service repository should be a valid object', () => {
        // Expect the request and response data to be the same
        expect(repository).toBeTruthy();
    });

    /**
     * 
     */
    it('Should find a service from the repository', () => {
        // Retrieve and execute service
        let serviceInstance = repository.get('formService');
        let isServiceInstance = serviceInstance instanceof service.AbstractService;
        // Expect the request and response data to be the same
        expect(isServiceInstance).toBe(true);
    });

    /**
     * 
     */
    it('Should not find a service with a wrong name from the repository', () => {
        // Expect an error
       expect(() => {
            repository.get('formerService')
        }).toThrow(service.ServiceNotFoundException);
    });

    /**
     * 
     */
    it('Should find and execute a service from the repository', () => {
        // Initial the service invocation context
        let serviceContext: service.IServiceContext<One> = { data: serviceData, serviceExecutor: mockExecutor};
        // Retrieve and execute service
        let serviceInstance = repository.get('formService');
        let serviceResponseData = serviceInstance.execute(serviceContext);
        // Expect the request and response data to be the same
        expect(serviceData).toBe(serviceResponseData);
    })
});