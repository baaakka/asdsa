import { StatusCode } from 'typescript-openapi-router';
import {
  buyReward,
  claimCakeBox,
  createCakeBoxService,
  createRewardsService,
  getAllRewards,
  getRewardById,
  toConfectionary,
} from '../../service';
import { Request, Response } from 'express';
import { CreateCakeBoxRequestBody, CreateRewardsRequestBody, GetAllRewardResponseBody, ResponseEnvelope } from '@cake/lib-api-interface';
class RewardsController {
  async createRewards(req: Request<CreateRewardsRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await createRewardsService(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }

  async getAllRewards(req: Request, res: Response): Promise<Response<GetAllRewardResponseBody>> {
    try {
      return await getAllRewards(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }

  async getRewardById(req: Request, res: Response) {
    try {
      return await getRewardById(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async toConfectionary(req: Request, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await toConfectionary(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }

  async createCakeBox(req: Request<CreateCakeBoxRequestBody>, res): Promise<Response<ResponseEnvelope>> {
    try {
      return await createCakeBoxService(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async claimCakeBox(req: Request, res): Promise<Response<ResponseEnvelope>> {
    try {
      return await claimCakeBox(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
  async buyReward(req: Request, res): Promise<Response<ResponseEnvelope>> {
    try {
      return await buyReward(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new RewardsController();
