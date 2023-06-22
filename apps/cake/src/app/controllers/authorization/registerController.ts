import { StatusCode } from 'typescript-openapi-router';
import { apiRegister } from '../../service/authorization/authorization.service';
import { Response, Request } from 'express';
import { RegisterRequestBody, RegisterResponseBody } from '@cake/lib-api-interface';
class RegisterController {
  async register(req: Request<RegisterRequestBody>, res: Response): Promise<Response<RegisterResponseBody>> {
    try {
      return await apiRegister(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new RegisterController();
