import { FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { IErrorResponse } from './error.interface';

export const makeErrorResponse = (
  code: number,
  message: string
): IErrorResponse => {
  const errorResponse: IErrorResponse = {
    error: {
      statusCode: code,
      status: StatusCodes[code],
      message,
    },
  };

  return errorResponse;
};
