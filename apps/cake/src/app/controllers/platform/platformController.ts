import { StatusCode } from "typescript-openapi-router";
import { addPlatformService, removePlatformService } from "../../service";
import { Response, Request } from "express";
import { AddPlatformRequestBody, RemovePlatformRequestBody, ResponseEnvelope } from "@cake/lib-api-interface";
import { GetPlatformById } from "../../service/platform/getPlatformById.service";
class PlatformController {
	async addPlatform(req: Request<AddPlatformRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await addPlatformService(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async removePlatform(req: Request<RemovePlatformRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await removePlatformService(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async getPlatformById(req: Request<RemovePlatformRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await GetPlatformById(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
}

export default new PlatformController();
