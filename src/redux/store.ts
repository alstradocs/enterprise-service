
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { serviceReducer } from './service'
import { composeWithDevTools } from 'redux-devtools-extension';
import { IServiceEngine } from '../service';

//@redux-helper/rootReducer
const rootReducer = combineReducers({
	service: serviceReducer,
});

export type StateType = ReturnType<typeof rootReducer>;

export function configureStore(serviceEngine: IServiceEngine) {
	//const rootEpic = combineEpics(serviceEpics);
	
	const epicMiddleware = createEpicMiddleware({ dependencies: { serviceEngine }});
	const middleware: any[] = [epicMiddleware];
	
	const enhancers = [applyMiddleware(... middleware)];
	const composedEnhancers = composeWithDevTools(...enhancers);
	const store = createStore(rootReducer, composedEnhancers);

    //epicMiddleware.run(rootEpic);
	return store;
}

