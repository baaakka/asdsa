import { ResponseEnvelope } from '@cake/lib-api-interface';
import { Request, Response } from 'express';
import { StatusCode } from 'typescript-openapi-router';
import { AddFollower, RemoveFollower } from '../../service';

class FollowerController {
  async addFollower(req: Request<{ userId: string }>, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await AddFollower(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async removeFollower(req: Request<{ userId: string }>, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await RemoveFollower(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new FollowerController();
