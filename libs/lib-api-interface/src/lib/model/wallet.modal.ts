import { WalletEnum } from "../constants";

export type WalletModal = {
	wallets: Array<{ address: string; type: WalletEnum; name: string, id: string }>;
};

export type WalletType = { address: string; type: WalletEnum, id: string, name: string };
