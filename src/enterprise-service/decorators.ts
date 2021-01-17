import { IServiceConstructor } from "./model";

/**
 * 
 */
export function Service() {
    return <U extends IServiceConstructor>(constructor: U) => { constructor };
}

/* class decorator to implement given type*/
// function Implements<T>() {
//     return <U extends T>(constructor: U) => {constructor};
// }
// @Implements<MyType>()   /* this statement implements both normal interface & static interface */
// class MyServiceClass { /* implements MyType { */ /* so this become optional not required */

//     /**
//      * 
//      * @param request 
//      */
//     execute(context: IServiceContext<One>): Two {
//         return {}
//     }
// }
