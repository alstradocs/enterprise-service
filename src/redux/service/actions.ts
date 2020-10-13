import * as ACTION_TYPES from './types'

export const serviceInitAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_INIT as typeof ACTION_TYPES.SERVICE_INIT
	})
}


export const serviceInitializedAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_INITIALIZED as typeof ACTION_TYPES.SERVICE_INITIALIZED
	})
}


export const serviceStartAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_START as typeof ACTION_TYPES.SERVICE_START
	})
}

export const serviceStartedAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_STARTED as typeof ACTION_TYPES.SERVICE_STARTED
	})
}


export const serviceStopAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_STOP as typeof ACTION_TYPES.SERVICE_STOP
	})
}

export const serviceStoppedAction = (payload: any) => {
	return ({
		type: ACTION_TYPES.SERVICE_STOPPED as typeof ACTION_TYPES.SERVICE_STOPPED
	})
}

