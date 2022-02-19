import { NextFunction, Response } from "express";

export const errorHandler = (error: any, req: any, res: Response, next: NextFunction) => {
    console.log("ERROR",error);
    
    res.status(error.status || 500).json(error);
}