/**
 * Represents the runtime environment 
 * of a service executor
 */
export interface IExecutionContext<T> {

    /**
     * Service data
     */
    data: T;

    /**
     * Service name
     */
    serviceName: string;
}

/**
 * Initializes and executes services
 */
export interface IServiceExecutor {

    /**
     * Executes a service.
     * 
     * @param context service lookup and data parameters
     */
    executeService<T, U>(context: IExecutionContext<T>): U
}

/**
 * Represents the runtime environment 
 * of an executing service
 */
export interface IServiceContext<T> {

    /**
     * Service execution
     */
    data: T;

    /**
     * 
     */
    serviceExecutor: IServiceExecutor;
}

/**
 * This defines the contract
 * of the instance of a service
 */
export interface IService<T, U> {

    /**
     * 
     * @param request 
     */
    execute(context: IServiceContext<T>): U;
}

/**
 * Interface to enable us to
 * reference the stactic side
 * of a serivice
 */
export interface IServiceConstructor<T> {

    /**
     * 
     */
    new(...args: any[]): T;
}


/**
 *  Business service repository
 */
export interface IServiceRepository {

    /**
     * 
     * @param serviceName 
     */
    get<T, U>(serviceName: string): IService<T, U>;

    /**
     * 
     * @param serviceName 
     * @param serviceConstructor 
     */
    register<T>(serviceName: string, serviceConstructor: IServiceConstructor<T>): void;
}
