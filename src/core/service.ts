import { IBusinessServiceData } from "./data";

export interface IBusinessService<T extends IBusinessServiceData> {
    execute(data: T): void;
}
