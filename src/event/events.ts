import { IEvent, IEventFactory } from "@alstradocs/event/dist";

export const SERVICE_INIT_EVENT = "SERVICE_INIT";
export const SERVICE_INITIALIZED_EVENT = "SERVICE_INITIALIZED";
export const SERVICE_START_EVENT = "SERVICE_START";
export const SERVICE_STARTED_EVENT = "SERVICE_STARTED";
export const SERVICE_STOP_EVENT = "SERVICE_STOP";
export const SERVICE_STOPPED_EVENT = "SERVICE_STOPPED";
export const SERVICE_MSG_RECIEVED_EVENT = "SERVICE_MSG_RECIEVED";
export const SERVICE_MSG_REQUEST_EVENT = "SERVICE_MSG_REQUEST";
export const SERVICE_MSG_RESPONSE_EVENT = "SERVICE_MSG_RESPONSE";
export const DISPATCH_ACTION_EVENT = "DISPATCH_ACTION";


export const dispatchActionEvent: IEventFactory<any> = (data: any): IEvent<any> => {
    return { type: DISPATCH_ACTION_EVENT,  data: data,  callback: () => {}  };
}
export const serviceInitEvent: IEventFactory<string> = (data: string): IEvent<string> => {
    return { type: SERVICE_INIT_EVENT,  data: '', callback: () => {} };
}

export const serviceInitializedEvent: IEventFactory<string> = (data: string): IEvent<string> => {
    return { type: SERVICE_INITIALIZED_EVENT,  data: '', callback: () => {} };
}

export const serviceStartEvent: IEventFactory<string> = (): IEvent<string> => {
    return { type: SERVICE_START_EVENT,  data: '', callback: () => {} };
}

export const serviceStartedEvent: IEventFactory<string> = (): IEvent<string> => {
    return { type: SERVICE_STARTED_EVENT,  data: '', callback: () => {} };
}

export const serviceStopEvent: IEventFactory<string> = (): IEvent<string> => {
    return { type: SERVICE_STOP_EVENT,  data: '', callback: () => {} };
}