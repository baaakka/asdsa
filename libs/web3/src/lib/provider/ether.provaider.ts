import { Injectable } from "@angular/core";
import { providers } from "ethers";

@Injectable({ providedIn: "root" })
export class PROVIDER extends providers.BaseProvider {
	constructor() {
		super("goerli");
	}
	// Implement custom method here
}
