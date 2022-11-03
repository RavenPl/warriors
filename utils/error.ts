import {NextFunction, Request, Response} from "express";

export class ErrorValidation extends Error {
}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    res
        .status(err instanceof ErrorValidation ? 400 : 500)
        .render('error', {
            message: err instanceof ErrorValidation ? err.message : "Try again later!"
        })
}