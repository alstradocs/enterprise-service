import { IServiceEngine } from "./engine";

export interface IRequestData<T> {
    data: T
}

export interface IResponseData<T> {
    data: T
}

export interface IBusinessService<T, U> {
    execute(data: IRequestData<T>): IResponseData<U>;
}

export type IBusinessServiceType<P, R, T extends IBusinessService<P, R>> = { new (...args: any[]): T; };

export interface IBusinessServiceConstructor {
    new(serviceEngine: IServiceEngine): IBusinessService<any, any>;
}

export interface IBusinessServiceRepository {

    /**
     * 
     * @param serviceName 
     */
    get(serviceName: string): IBusinessServiceConstructor;

    /**
     * 
     * @param serviceName 
     * @param serviceClass 
     */
    register(serviceName: string, serviceClass: IBusinessServiceConstructor): void;
}

export abstract class AbstractBusinessService<T, U> implements IBusinessService<T, U> {
    protected serviceEngine: IServiceEngine;
    
    constructor(serviceEngine: IServiceEngine){  
        this.serviceEngine = serviceEngine;   
    }

    execute(data: IRequestData<T>): IResponseData<U> {
        return this.doExecute(data);
    }

    abstract doExecute(data: IRequestData<T>): IResponseData<U>;
}