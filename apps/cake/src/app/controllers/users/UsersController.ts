import { StatusCode } from 'typescript-openapi-router';
import { getAllUserService, getKOLById, getUserById, updateUser, getMe } from '../../service/users/';
import { Response, Request } from 'express';
import { GetKOLById, GetMeResponseBody, KolItem, ResponseEnvelope, UpdateUserRequestBody, UserByPlatformResponse, UserIdParams } from '@cake/lib-api-interface';
import { UserWithRelations } from '../../types';
import { getUserByPlatform } from '../../service/users/getUserByPlatform.service';

class UsersController {
  async getAllUser(req: Request<unknown>, res: Response): Promise<Response<Array<KolItem>>> {
    try {
      return await getAllUserService(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }

  async getKOLById(req: Request<GetKOLById>, res: Response): Promise<Response<KolItem>> {
    try {
      return await getKOLById(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async getUserById(req: Request<UserIdParams>, res: Response): Promise<Response<UserWithRelations>> {
    try {
      return await getUserById(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async updateUser(req: Request<UpdateUserRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await updateUser(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async getMe(req: Request<UserIdParams>, res: Response): Promise<Response<GetMeResponseBody>> {
    try {
      return await getMe(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }

  async getUserByPlatform(req: Request<unknown>, res: Response): Promise<Response<UserByPlatformResponse>> {
    try {
      return await getUserByPlatform(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new UsersController();
