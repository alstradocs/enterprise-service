import { ServiceNotFoundException } from "./exceptions";
import { 
    IService, IServiceExecutor, IServiceRepository, 
    IServiceConstructor, IServiceContext, IExecutionContext} from "./model";

/**
 * Abstract service
 */
export abstract class AbstractService<T, U> implements IService<T, U>  {

    /**
     * 
     * @param data 
     */
    execute(context: IServiceContext<T>): any {
        return this.doExecute(context);
    }

    /**
     * 
     * @param data 
     */
    abstract doExecute(context: IServiceContext<T>): U ;
}

export class ServiceExecutor implements IServiceExecutor {
    
    /**
     * 
     * @param repository 
     */
    constructor(private repository: IServiceRepository) {
    }

    /**
     * 
     * @param context 
     */
    executeService<T, U>(context: IExecutionContext<T>): U {
        let businessService: IService<T, U> = this.repository.get(context.serviceName);
        let serviceContext: IServiceContext<T> = { data: context.data, serviceExecutor: this };
        return businessService.execute(serviceContext);
    }
}

export interface ServiceRepositoryEntry {

    /**
     * Service name
     */
    serviceName: string;

    /**
     * Reference to the static side of a service
     */
    serviceContructor: IServiceConstructor<any>;
}

export class ServiceRepository implements IServiceRepository {

    private services: Map<string, IServiceConstructor<any>>;

    constructor(entries: ServiceRepositoryEntry[]) { 
        this.services = new Map<string, IServiceConstructor<any>>();
        // Register services
        entries.forEach(entry => {
            this.register(entry.serviceName, entry.serviceContructor)
        });
    }

    /**
     * 
     * @param serviceName 
     */
    get<T, U>(serviceName: string): IService<T, U> {
        let serviceConstructor = this.services.get(serviceName);
        if(serviceConstructor) {
            let service: IService<T, U> = new serviceConstructor({});
            return service;

        } else{ throw new ServiceNotFoundException('Service not found'); };
    }

    /**
     * 
     * @param serviceName 
     * @param serviceClass 
     */
    register<T>(serviceName: string, serviceConstructor: IServiceConstructor<T>): void {
        this.services.set(serviceName, serviceConstructor);
    }
    

    
}