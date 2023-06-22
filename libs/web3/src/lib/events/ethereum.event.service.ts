import { from, ReplaySubject, takeUntil } from "rxjs";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { WindowType } from "@cake/lib-api-interface";
import { DataService } from "@cake/utils";

import { Bytes, providers, Signer } from "ethers";
import { Deferrable } from "ethers/lib/utils";

import { PROVIDER, WINDOW } from "../provider";
import { ConnectionsService } from "../connection";
@Injectable({
	providedIn: "root",
})
export class EthereumEventService extends Signer implements OnDestroy {
	protected unsubscribe = new ReplaySubject();
	constructor(
		@Inject(WINDOW)
		public window: WindowType,
		@Inject(PROVIDER) public override provider: providers.BaseProvider,
		public readonly dataService: DataService,
		private connection: ConnectionsService
	) {
		super();
		if (window.ethereum) {
			this.connectToMetaMask();
			connection.connectToGoerli();
			window.ethereum.on("chainChanged", (chainId: string) => {
				console.log(chainId);

				window.location.reload();
			});

			window.ethereum.on("accountsChanged", (account: Array<string>) => {
				this.dataService.setWalletAddress(account[0]);
				console.log(this.dataService.walletAddres.value);
			});
		}
	}

	getAddress(): Promise<string> {
		throw new Error("Method not implemented.");
	}
	connectToMetaMask() {
		const provider = new providers.Web3Provider(this.window.ethereum, "any");
		// Prompt user for account connections
		provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		from(signer.getAddress())
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((address: string) => {
				this.dataService.setWalletAddress(address);
			});
	}

	signMessage(message: string | Bytes): Promise<string> {
		console.log(message);

		throw new Error("Method not implemented.");
	}
	signTransaction(transaction: Deferrable<providers.TransactionRequest>): Promise<string> {
		console.log(transaction);

		throw new Error("Method not implemented.");
	}
	connect(provider: providers.Provider): Signer {
		console.log(provider);

		throw new Error("Method not implemented.");
	}

	ngOnDestroy(): void {
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
	}
}
