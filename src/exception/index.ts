export class CustomException extends Error{

    public code: number;
    public message: string;

    constructor(code: number, message: string){
        super(message);
        this.code = code;
        this.message = message;
    }
}

export class NotFoundException extends CustomException {

    constructor(message: string){
        super(404, message);
    }

}