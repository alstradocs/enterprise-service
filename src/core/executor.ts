import { IRequestData, IResponseData } from "./data";
import { IBusinessService } from "./service";
import { BusinessServiceFactory } from "./factory";
import { BusinessServiceStore } from "./store";

export interface IBusinessServiceExecutor {

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U>
}

export class BusinessServiceExecutor implements IBusinessServiceExecutor {
    
    constructor(private store: BusinessServiceStore) {

    }

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U> {
        let businessService: IBusinessService = BusinessServiceFactory.getInstance(this.store, serviceName, data);
        return businessService.execute(data);
    }
}