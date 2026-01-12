import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

export interface HttpExceptionResponse {
    statusCode: number;
    message: string | string[];
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Internal server error';

        
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exResponse = exception.getResponse();
            if (typeof exResponse === 'string') {
                message = exResponse;
            } else if (typeof exResponse === "object" && exResponse !== null) {
                
                message = (exResponse as any).message || 'Error';
            }
        }

        const errorResponse : HttpExceptionResponse ={
            statusCode:status,
            message
        }

        response.status(status).json(errorResponse);
    }
}