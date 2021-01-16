import { AbstractService, IExecutionContext, IService, IServiceContext, IServiceExecutor } from "../src";

export interface One { name: string };
export interface Two { name: string};

class FormService extends AbstractService<One,Two> {
    doExecute(context: IServiceContext<One>): Two {
        return context.data;
    }
}

const mockExecutor: IServiceExecutor = {
    executeService(context: IExecutionContext<any>): any {
        return context.data;
    }
}

describe('Test FormService Class', () => {
    let serviceRequestData: One;
    let serviceInstance: IService<One, Two>;
    let serviceContext: IServiceContext<One>;

    /**
     * 
     */
    beforeAll(() => {
        // Initial a new instance of FormService
        serviceInstance = new FormService();
    });

    it('Should construct a new FormService instance', () => {
        expect((serviceInstance)).toBeTruthy();
    });

    it('Should construct and execute a FormService instance', () => {
        // Build service invocation context
        serviceRequestData = { name: 'Black'};
        serviceContext = { data: serviceRequestData, serviceExecutor: mockExecutor};
        // Execute service
        let serviceResponseData = serviceInstance.execute(serviceContext);
        // Expect some truthy back
        expect((serviceResponseData)).toBeTruthy();
    })

    it('Response data should equal request data', () => {
        // Build service invocation context
        serviceRequestData = { name: 'Black'};
        serviceContext = { data: serviceRequestData, serviceExecutor: mockExecutor};
        // Execute service
        let serviceResponseData = serviceInstance.execute(serviceContext);
        // Expect response data to be request data
        expect((serviceResponseData)).toBe(serviceRequestData);
    })
});
