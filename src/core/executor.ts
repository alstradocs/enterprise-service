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
    executeService<T, U>(serviceName: string, data: IRequestData<T>, store: BusinessServiceStore): IResponseData<U>
}

export class BusinessServiceExecutor implements IBusinessServiceExecutor {
    

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>, store: BusinessServiceStore): IResponseData<U> {
        let businessService: IBusinessService = BusinessServiceFactory.getInstance(store, serviceName, data);
        return businessService.execute(data);
    }
}