import { MetaMaskEthereumProvider } from '@cake/lib-api-interface';
import detectEthereumProvider from '@metamask/detect-provider';

//TODO don`t working
// export const DetectMetaMask = async (): Promise<boolean> => {
//   const provider: MetaMaskEthereumProvider | null = await detectEthereumProvider();
//   if (provider) {
//     console.log('provider: ', provider);
//     return true;
//   } else {
//     console.log('Please install MetaMask!');
//     return false;
//   }
// };
