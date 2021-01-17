import * as service from "../src/enterprise-service";
import { Service } from "../src/enterprise-service";

export interface One { name: string };
export interface Two { name: string};

@Service()
class FormService extends service.AbstractService<One,Two> {
    doExecute(context: service.IServiceContext<One>): Two {
        return context.data;
    }    
    public static serviceName: string = 'BgInitService';

}

const mockExecutor: service.IServiceExecutor = {
    executeService(context: service.IExecutionContext<any>): any {
        return context.data;
    }
}

describe('Test FormService Class', () => {
    let serviceRequestData: One;
    let serviceInstance: service.IService<One, Two>;
    let serviceContext: service.IServiceContext<One>;

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
