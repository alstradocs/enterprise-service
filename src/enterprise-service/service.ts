import { ServiceNotFoundException } from "./exceptions";
import { 
    IService, IServiceExecutor, IServiceRepository, 
    IServiceConstructor, IServiceContext, IExecutionContext, IServiceInterface} from "./model";

/**
 * Abstract service
 */
export abstract class AbstractService<T, U> implements IServiceInterface  {

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
        let businessService: IServiceInterface = this.repository.get(context.serviceName);
        let serviceContext: IServiceContext<T> = { ...context, serviceExecutor: this };
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
    serviceContructor: IServiceConstructor;
}

export class ServiceRepository implements IServiceRepository {

    /**
     * 
     */
    private services: Map<string, IServiceConstructor>;

    /**
     * 
     * @param entries 
     */
    constructor(entries: ServiceRepositoryEntry[]) { 
        this.services = new Map<string, IServiceConstructor>();
        // Register services
        entries.forEach(entry => {
            this.register(entry.serviceName, entry.serviceContructor)
        });
    }

    /**
     * 
     * @param serviceName 
     */
    get(serviceName: string): IServiceInterface {
        let serviceConstructor = this.services.get(serviceName);
        if(serviceConstructor) {
            let service: IServiceInterface = new serviceConstructor({});
            return service;

        } else{ throw new ServiceNotFoundException('Service not found'); };
    }

    /**
     * 
     * @param serviceName 
     * @param serviceClass 
     */
    register(serviceName: string, serviceConstructor: IServiceConstructor): void {
        this.services.set(serviceName, serviceConstructor);
    }
}