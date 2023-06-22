import { from } from "rxjs";
import { Injectable, Inject } from "@angular/core";
import { abi, STAKING_CONTRACT, USDT_ABI, USDT_CONTRACT, WindowType } from "@cake/lib-api-interface";
import { WINDOW, PROVIDER } from "../provider";
import { Signer, utils, providers, Wallet, Contract } from "ethers";

import { formatUnits, parseUnits } from "ethers/lib/utils";

@Injectable({
	providedIn: "root",
})
export class Web3Service extends Signer {
	private wallet!: Wallet;

	constructor(
		@Inject(WINDOW)
		public window: WindowType,
		@Inject(PROVIDER) public override provider: providers.BaseProvider
	) {
		console.log(window);
		super();
	}

	async connectToMetaMask() {
		const provider = new providers.Web3Provider(this.window.ethereum, "any");
		// Prompt user for account connections
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		console.log("Account:", await signer.getAddress());
		return await signer.getAddress();
	}

	signTransaction(_transaction: utils.Deferrable<providers.TransactionRequest>): Promise<string> {
		console.log("_transaction: ", _transaction);
		throw new Error("Method not implemented.");
	}
	connect(_provider: providers.Provider): Signer {
		console.log("_provider: ", _provider);

		throw new Error("Method not implemented.");
	}

	async login(password: string) {
		const wallet = await Wallet.fromEncryptedJson(localStorage["get"]("wallet"), password);
		this.wallet = wallet.connect(this.provider);
	}

	getAddress(): Promise<string> {
		return this.wallet.getAddress();
	}

	signMessage(message: string | utils.Bytes): Promise<string> {
		return this.wallet.signMessage(message);
	}

	override sendTransaction(transaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
		return this.wallet.sendTransaction(transaction);
	}

	public getUserBalance() {
		const provider = new providers.Web3Provider(this.window.ethereum);
		provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const daiAddress = USDT_CONTRACT;
		let userbalance = "";
		from(signer.getAddress()).forEach((address) => {
			console.log(address, "signer address");
			const daiContract = new Contract(daiAddress, USDT_ABI, signer);
			const t = from(daiContract["balanceOf"](address)).subscribe((res: any) => {
				console.log(formatUnits(res._hex, 18), "balance daaa");
				userbalance = formatUnits(res._hex, 18);
			});
		});

		return Number(userbalance);
	}

	async approve() {
		const provider = new providers.Web3Provider(this.window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		console.log(signer);
		
		const daiAddress = USDT_CONTRACT;

		const daiContract = new Contract(daiAddress, USDT_ABI, signer);
		console.log();
		const t = await daiContract["approve"](STAKING_CONTRACT, "500000000000000000000000");
		// t.hash();

		t.wait().then((receipt: any) => {
			console.log(receipt);
		});
	}

	async checkAllowance(selectedAddress: string): Promise<boolean> {
		const provider = new providers.Web3Provider(this.window.ethereum);

		const signer = provider.getSigner();
		const address = await provider.send("eth_requestAccounts", []);
		console.log(address[0], "user address");

		const daiAddress = USDT_CONTRACT;

		const daiContract = new Contract(daiAddress, USDT_ABI, signer);

		const { _hex } = await daiContract["allowance"](selectedAddress, STAKING_CONTRACT);
		console.log(_hex, "allowance");
		return _hex === "0x00";
	}

	async deposit(amount?: number) {
		const provider = new providers.Web3Provider(this.window.ethereum);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		console.log(signer);

		const daiAddress = STAKING_CONTRACT;

		const daiContract = new Contract(daiAddress, abi, signer);
		console.log();
		const t = await daiContract["stake"](parseUnits(String(amount), 18));

		t.wait().then((receipt: any) => {
			console.log(receipt);
		});
	}
}
