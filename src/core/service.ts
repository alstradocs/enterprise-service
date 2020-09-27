import { IRequestData, IResponseData } from "./data";

export interface IBusinessService {
    
    new (...args: any[]): any;

    execute<T, U>(data: IResponseData<T>): IResponseData<U>;
}
