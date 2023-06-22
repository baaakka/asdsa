import { LoginRequestBody, RegisterResponseBody } from '@cake/lib-api-interface';
import { Response, Request } from 'express';
import { StatusCode } from 'typescript-openapi-router';
import { apiLogin } from '../../service/authorization/login.service';

class LoginController {
  async login(req: Request<LoginRequestBody>, res: Response): Promise<Response<RegisterResponseBody>> {
    try {
      return await apiLogin(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new LoginController();
