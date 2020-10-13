import * as ACTION_TYPES from './types'
import * as ACTIONS from './actions'


type ValueOf<T> = T[keyof T];

export type ActionsType = ValueOf<{[k in keyof typeof ACTIONS]: ReturnType<typeof ACTIONS[k]>}>

export const enum Status {
	UNINITIALIZED,
	INITIALIZING,
	INITIALIZED,
	STARTING,
	STARTED,
	STOPPING,
	STOPPED
}

export type initialStateType = {
	status: Status
};

const initialState: initialStateType = {
	status: Status.UNINITIALIZED 
}


export const serviceReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
	console.log('Event Service reducer>>>>>>>>>>>>>>>>>>>>', state, action);
	switch(action.type){
		case ACTION_TYPES.SERVICE_INIT: {
			return { ...state, status: Status.INITIALIZING }
		}
		case ACTION_TYPES.SERVICE_INITIALIZED: {
			return { ...state, status: Status.INITIALIZED }
		}
		case ACTION_TYPES.SERVICE_START: {
			return { ...state, status: Status.STARTING }
		}
		case ACTION_TYPES.SERVICE_STARTED: {
			return { ...state, status: Status.STARTED }
		}
		case ACTION_TYPES.SERVICE_STOP: {
			return { ...state, status: Status.STOPPING }
		}
		case ACTION_TYPES.SERVICE_STOPPED: {
			return { ...state, status: Status.STOPPED }
		}
		default: return state;
	}
}
