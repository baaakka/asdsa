import { Response } from 'typescript-openapi-router';

export const corsMiddleware = async (
  response: Response<any>,
  res,
  next
): Promise<Response<any>> => {
  response.headers['Access-Control-Allow-Origin'] = '*';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  response.headers['Access-Control-Allow-Credentials'] = true;
  next();
  return response;
};
