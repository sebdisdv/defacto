import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError, ApiErrorCode } from '@/types/api';
import { dbId } from '@/utils/database';

export function validate(validator: (body: any) => boolean, message: string = 'Invalid body'): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        
        if (!validator(body)) {
            const err: ApiError = {
                message: message,
                code: ApiErrorCode.INVALID_BODY
            };
            res.status(400).send(err);
        }
        else {
            next();
        }
    };
}

export async function asyncValidate(validator: (body: any) => Promise<boolean>, message: string = 'Invalid body'): Promise<RequestHandler> {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        
        if (!(await validator(body))) {
            const err: ApiError = {
                message: message,
                code: ApiErrorCode.INVALID_BODY
            };
            res.status(400).send(err);
        }
        else {
            next();
        }
    };
}

export function validateDbId(params: string | string[], exonerate: string | string[] = [], message: string = 'Invalid id parameter'): RequestHandler {
    if (typeof params === 'string') {
        params = [params];
    }
    if (typeof exonerate === 'string') {
        exonerate = [exonerate];
    }

    return (req: Request & { idParams: any }, res: Response, next: NextFunction) => {
        try {
            req.idParams = {};
            for (const param of params) {
                if (exonerate.includes(param)) {
                    req.idParams[param] = req.params[param];
                }
                else {
                    req.idParams[param] = dbId(req.params[param]);
                }
            }
            next();
        }
        catch (error) {
            console.error(error);
            const err: ApiError = {
                message: message,
                code: ApiErrorCode.INVALID_BODY
            };
            res.status(400).send(err);
        }
    };
}