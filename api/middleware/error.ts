import { NextFunction, Response } from "express";

export const errorHandler = (error: any, req: any, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json(error);
}