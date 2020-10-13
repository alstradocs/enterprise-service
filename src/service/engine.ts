import { Store, Action } from "redux";
import { BusinessServiceExecutor, IBusinessServiceExecutor } from "./executor";
import { IEvent, IEventListenerFactory, Subscription, IEventBus, IEventDispatcher } from "@alstradocs/event/dist";
import { IRequestData, IResponseData, IBusinessServiceConstructor, IBusinessServiceRepository } from "./service";

export interface IServiceEngine {

    initialize(): void;

    /**
     * 
     * @param action 
     */
    dispatchAction(action: Action): void;

    /**
     * 
     */
    subscribeToStore(observer: Function): Subscription;

    /**
     * 
     * @param event 
     */
    dispatchEvent<T>(event: IEvent<T>): void;

    /**
     * 
     * @param eventType 
     * @param listener 
     */
    subscribeToEvent<T>(eventType: string, listenerFactory: IEventListenerFactory<T>): Subscription;

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U>;

    /**
     * 
     * @param token 
     * @param serviceClass 
     */
    registerService(token: string, serviceClass: IBusinessServiceConstructor): void;

    /**
     * 
     * @param token 
     */
    resolveService(token: string): IBusinessServiceConstructor;

    /**
     * 
     * @param name 
     * @param value 
     */
    setItem<T = any>(name: string, value: T): void;

    /**
     * 
     * @param name 
     */
    getItem<T = any>(name: string): T;

    /**
     * 
     * @param name 
     */
    removeItem<T = any>(name: string): void;

}

export abstract class AbstractServiceEngine implements IServiceEngine {

    protected store!: Store<any>;
    protected iEventDispatcher!: IEventBus;
    protected serviceExecutor!: IBusinessServiceExecutor;
    protected serviceRepository!: IBusinessServiceRepository;
    protected itemStore: Map<string, any> = new Map<string, any>();
    /**
     * 
     */
    initialize(): void {
        this.store = this.initStore();
        this.iEventDispatcher = this.initIEventDispatcher();
        this.serviceRepository = this.initServiceRepository();
        this.serviceExecutor = this.initServiceExecutor();
    }

    /**
     * 
     * @param action 
     */
    dispatchAction(action: Action<any>): void {
        this.store.dispatch(action);
    }

    /**
     * 
     * @param observer 
     */
    subscribeToStore(observer: () => void): Subscription {
        const subscription = this.store.subscribe(observer);
        return { unsubscribe:  subscription }
    }

    /**
     * 
     * @param event 
     */
    dispatchEvent<T>(event: IEvent<T>): void {
        this.iEventDispatcher.dispatch(event);
    }

    /**
     * 
     * @param eventType 
     * @param listenerFactory 
     */
    subscribeToEvent<T>(eventType: string, listenerFactory: IEventListenerFactory<T>): Subscription {
        return this.iEventDispatcher.subscribe(eventType, listenerFactory);
    }

    /**
     * 
     * @param serviceName 
     * @param data 
     */
    executeService<T, U>(serviceName: string, data: IRequestData<T>): IResponseData<U> {
        return this.serviceExecutor.executeService(serviceName, data);
    }

    /**
     * 
     * @param serviceName 
     * @param serviceClass 
     */
    registerService(serviceName: string, serviceClass: IBusinessServiceConstructor): void {
        this.serviceRepository.register(serviceName, serviceClass);
    }

    /**
     * 
     * @param serviceName 
     */
    resolveService(serviceName: string): IBusinessServiceConstructor {
        return this.serviceRepository.get(serviceName);
    }

    
    /**
     * 
     * @param name 
     * @param value 
     */
    setItem<T = any>(name: string, item: T): void {
        this.itemStore.set(name, item);
    }

    /**
     * 
     * @param name 
     */
    getItem<T = any>(name: string): T {
        return this.itemStore.get(name);
    }

    /**
     * 
     * @param name 
     */
    removeItem<T = any>(name: string): void {
        this.itemStore.delete(name);
    }

    /**
     * 
     */
    protected abstract initStore(): Store<any>;

    /**
     * 
     */
    protected abstract initIEventDispatcher(): IEventBus;

    /**
     * 
     */
    protected abstract initServiceRepository(): IBusinessServiceRepository;

    /**
     * 
     */
    protected initServiceExecutor(): IBusinessServiceExecutor {
        this.registerServices()
        return new BusinessServiceExecutor(this);
    }

    /**
     * 
     */
    protected abstract registerServices(): void;
    
}