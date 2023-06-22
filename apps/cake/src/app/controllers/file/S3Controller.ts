import { StatusCode } from "typescript-openapi-router";
import { uploadImage, getImage, some } from "../../service";
import { Response, Request } from "express";
import { ManagedUpload } from "aws-sdk/clients/s3";
class S3Controller {
	async uploadImage(req: Request, res: Response): Promise<ManagedUpload.SendData | Response> {
		try {
			return await uploadImage(req);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async test(req: Request, res: Response): Promise<ManagedUpload.SendData | Response> {
		try {
			return await some(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async getImage(req: (Request & { key: string }) | any, res: Response): Promise<Response> {
		try {
			return await getImage<Request>(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
}

export default new S3Controller();
