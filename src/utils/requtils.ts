import { Request } from 'express';
import { Pageable } from '../model/patination';

export class RequestUtils {

    public static getPageable(request: Request): Pageable {
        let page: number = 1;
        if(request.query.page) page = parseInt(request.query.page as string);
        let pageCount: number = 10;
        if(request.query.pageCount) pageCount = parseInt(request.query.pageCount as string);
        const pageable: Pageable = new Pageable(page, pageCount);
        return pageable;
    }

    public static getConditionsFromQuery(request: Request, keys: string[]): Map<string, any> {
        const conditions: Map<string, any> = new Map<string, any>();
        keys.forEach( (key: string, index: number) => {
            if(request.query[key]){
                conditions.set(key, request.query[key]);
            }
        });
        return conditions;
    }
}