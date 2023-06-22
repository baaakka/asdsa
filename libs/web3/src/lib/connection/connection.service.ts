import { Inject, Injectable } from "@angular/core";
import { ETHEREUM_CHAINS, GOERLI, WindowType } from "@cake/lib-api-interface";
import { from } from "rxjs";
import { WINDOW } from "../provider";

@Injectable({
	providedIn: "root",
})
export class ConnectionsService {
	constructor(
		@Inject(WINDOW)
		public window: WindowType
	) {}
	public connectToGoerli(): boolean {
		const { goerli } = ETHEREUM_CHAINS;

		try {
			from(this.window.ethereum.request({ method: "eth_requestAccounts" }));
			from(
				this.window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: GOERLI }],
				})
			)
			return true;
		} catch (error: any) {
			if (error.code === 4902) {
				try {
					from(
						this.window.ethereum.request({
							method: "wallet_addEthereumChain",
							params: [
								{
									chainId: goerli.chainId,
									chainName: goerli.chanName,
									rpcUrls: goerli.rpcUrls,
								},
							],
						})
					);
					return true;
				} catch (e) {
					throw new Error(error);
				}
			}

			if (error.code === 4001) {
				// User rejected the request.
				throw new Error(error);
			}
		}

		return false;
	}
}
