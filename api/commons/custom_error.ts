export default class CustomError extends Error {
    constructor(
        public status = 200,
        public message = "Internal Server Error"
    ){
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name
    }
}