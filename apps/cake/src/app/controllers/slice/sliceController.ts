import { StatusCode } from 'typescript-openapi-router';
import { createSliceService } from '../../service';
import { Response, Request } from 'express';
import { CreateRewardsRequestBody, ResponseEnvelope } from '@cake/lib-api-interface';
class SliceController {
  async createSlice(req: Request<CreateRewardsRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
    try {
      return await createSliceService(req, res);
    } catch (error) {
      return res.status(StatusCode.internalServerError).json(error);
    }
  }
}

export default new SliceController();
