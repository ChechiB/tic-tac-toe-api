export enum StatusType{
    SUCCESS = "success",
    ERROR = "error"
}

export interface IGenericResponse<T>{
    status: StatusType;
    data: T
}

export class CommonResponse<T> implements IGenericResponse<T>{
    status: StatusType;
    data: T
    constructor({ status = StatusType.SUCCESS, data}){
        this.status = status;
        this.data = data;
    }
}