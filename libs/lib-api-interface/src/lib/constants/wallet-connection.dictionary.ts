export const DEFAULT_GAS_LIMIT = 500000;
export const WALLET_CONNECT_PROVIDER_INFURA_ID = "";
export const TEST_PROVIDER = "http://localhost:4200/";

export const METAMASK_LINK = "https://metamask.io/";
export const ETHEREUM = "ethereum";
export const ETHER = "ether";
export const WEB3 = "web3";
export const STAKING_RETURNED = "STAKING_RETURNED";
export const GET_BALANCES = "GET_BALANCES";
export const METAMASK_ERRORS = {
	notInstalled: "ERROR.METAMASK__NOT__INSTALLED",
	needUserPermission: "ERROR.NEED__USER__PERMISSION",
	failedToRetrieveGasPrice: "ERROR.FAILED__RETRIEVING__GAS__PRICE",
};

export enum Network {
	Moonbeam = 507,
	MainNet = 1,
	Ropsten = 3,
	Rinkeby = 4,
	Goerli = 5,
	Kovan = 42,
	Polygon = 89,
	Mumbai = 13881,
	Moonriver = 505,
	Binance = 38,
}
export enum NetworkName {
	Moonbeam = "moonbeam",
	MainNet = "mainnet",
	Ropsten = "ropsten",
	Rinkeby = "rinkeby",
	Goerli = "goerli",
	Kovan = "kovan",
	Polygon = "polygon",
	Mumbai = "mumbai",
	Moonriver = "moonriver",
	Binance = "binance",
}

export const ETHEREUM_NETWORK_IDS: Record<Network, string> = {
	[Network.MainNet]: "Ethereum Mainnet (1)",
	[Network.Ropsten]: "Ethereum Ropsten (3)",
	[Network.Rinkeby]: "Ethereum Rinkeby (4)",
	[Network.Goerli]: "Ethereum Goerli (5)",
	[Network.Kovan]: "Ethereum Kovan (42)",
	[Network.Moonbeam]: "Ethereum Moonbeam (1287)",
	[Network.Polygon]: "Polygon Mainnet (137)",
	[Network.Mumbai]: "Mumbai TestNet (13881)",
	[Network.Moonriver]: "Moonriver TestNet (1285)",
	[Network.Binance]: "Binance Smart Chain (56)",
};

export const BINANCE_NETWORK_IDS = {
	56: "Binance Smart Chain (56)",
	97: "Binance Smart Chain TESTING Network (97)",
};

export const NETWORK_PROVIDERS = [
	{
		name: "MetaMask",
		imgPath: "/assets/img/wallet-connect/wallet/metamask.svg",
	},
];

export const defaultNetwork = Network.Moonbeam;
export const defaultNetworkID = `0x${defaultNetwork}`;
export const RINKEBY = `0x${Network.Rinkeby}`;
export const MAINNET = `0x${Network.MainNet}`;
export const POLYGON = `0x${Network.Polygon}`;
export const MUMBAI = `0x${Network.Mumbai}`;
export const MOONRIVER = `0x${Network.Moonriver}`;
export const BINANCE = `0x${Network.Binance}`;
export const GOERLI = `0x${Network.Goerli}`;

export const ETHEREUM_CHAINS: typeNetwork = {
	moonbeam: {
		chainId: defaultNetworkID,
		chanName: "Moonbeam",
		nativeCurrency: { name: "DEV", symbol: "DEV", decimals: 18 },
		rpcUrls: ["https://rpc.testnet.moonbeam.network/"],
		blockExplorerUrls: ["https://moonbase-blockscout.testnet.moonbeam.network/"],
	},
	rinkeby: {
		chainId: RINKEBY,
		chanName: "Rinkeby",
		rpcUrls: ["https://rinkeby.infura.io/v3/f0961e3efc8d4548a9c5fa9a1a165c20"],
	},
	mainnet: {
		chainId: MAINNET,
		chanName: "Mainnet",
		rpcUrls: ["https://mainnet.infura.io/v3/f0961e3efc8d4548a9c5fa9a1a165c20"],
	},
	polygon: {
		chainId: POLYGON,
		chanName: "Polygon",
		nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
		rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
		blockExplorerUrls: ["https://explorer.matic.network/"],
	},
	mumbai: {
		chainId: MUMBAI,
		chanName: "Mumbai",
		nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
		rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
	},
	binance: {
		chainId: BINANCE,
		chanName: "Binance",
		nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
		rpcUrls: ["https://bsc-dataseed.binance.org/"],
		blockExplorerUrls: ["https://bscscan.com/"],
	},
	moonriver: {
		chainId: MOONRIVER,
		chanName: "Moonriver",
		rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
	},
	goerli: {
		chainId: GOERLI,
		chanName: "Goerli",
		rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
	},
	ropsten: {
		chainId: GOERLI,
		chanName: "Goerli",
		rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
	},
	kovan: {
		chainId: GOERLI,
		chanName: "Goerli",
		rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
	},
};
type typeNetwork = {
	[name in NetworkName]: networkInterface;
};

export interface networkInterface {
	chainId: string;
	chanName: string;
	nativeCurrency?: { name: string; symbol: string; decimals: number };
	rpcUrls: Array<string>;
	blockExplorerUrls?: Array<string>;
}
