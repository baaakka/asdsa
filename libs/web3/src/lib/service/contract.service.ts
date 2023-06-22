import { abi, STAKING_CONTRACT } from "@cake/lib-api-interface";
import { Injectable } from "@angular/core";
import { Contract } from "ethers";
import { Web3Service } from "./web3.service";

@Injectable({
	providedIn: "root",
})
export class ContractService extends Contract {
	constructor(private web3Service: Web3Service) {
		super(STAKING_CONTRACT, abi, web3Service);
	}
}
