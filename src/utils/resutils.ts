import { Response } from 'express';
import { CustomException } from '../exception';

export class ResponseUtils {

    public static returnWithError(response: Response, error: Error): void{
        if(error instanceof CustomException){
            response.status(error.code).send({code: error.code, message: error.message});
        }else{
            response.status(500).send({code: 500, message: error.message || 'System error'});
        }
    }
}