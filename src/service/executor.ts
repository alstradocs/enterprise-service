import { IBusinessService, IRequestData, IResponseData, IBusinessServiceConstructor } from "./service";
import { LogIt } from "@alstradocs/util/dist";
import { IServiceEngine } from "./engine";

export interface IBusinessServiceExecutor {

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U>
}

export class BusinessServiceExecutor implements IBusinessServiceExecutor {
    
    /**
     * 
     * @param store 
     */
    constructor(private serviceEngine: IServiceEngine) {
    }

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    @LogIt()
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U> {
        let businessServiceClassRef: IBusinessServiceConstructor = this.serviceEngine.resolveService(serviceName);
        let businessService:IBusinessService<T, U> = new businessServiceClassRef(this.serviceEngine);
        return businessService.execute(data);
    }
}