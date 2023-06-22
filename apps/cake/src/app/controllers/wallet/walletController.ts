import { StatusCode } from "typescript-openapi-router";
import { AddWallet, EditWallet, GetWallet, RemoveWallet } from "../../service";
import { Response, Request } from "express";
import { ResponseEnvelope } from "@cake/lib-api-interface";

class walletController {
	async addWallet(req: Request, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await AddWallet(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async getWallet(req: Request, res: Response): Promise<Response<unknown>> {
		try {
			return await GetWallet(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async editWallet(req: Request, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await EditWallet(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
	async removeWallet(req: Request, res: Response): Promise<Response<ResponseEnvelope>> {
		try {
			return await RemoveWallet(req, res);
		} catch (error) {
			return res.status(StatusCode.internalServerError).json(error);
		}
	}
}

export default new walletController();
