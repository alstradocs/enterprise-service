
import * as reduxActions from "../redux/service";
import { IEvent, IEventDispatcher, IEventListener, IEventListenerFactory } from "@alstradocs/event/dist";
import { IServiceEngine } from "../service";

export const getServiceInitEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceInitAction(event.data));
        }
    }
}

export const getServiceInitializedEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceInitializedAction(event.data));
        }
    }
}

export const getServiceStartEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return  (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceStartAction(event.data));
        }
    }
}

export const getServiceStartedEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return  (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceStartedAction(event.data));
        }
    }
}

export const getServiceStopEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceStopAction(event.data));
        }
    }
}

export const getServiceStoppedEventFactory =  (serviceEngine: IServiceEngine): IEventListenerFactory<string>  => {
    return (dispatcher: IEventDispatcher): IEventListener<string> => {
        return (event: IEvent<string>) => {
            serviceEngine.dispatchAction(reduxActions.serviceStoppedAction(event.data));
        }
    }
}