import { ethers } from 'hardhat';
import { USDT_CONTRACT } from '../../../libs/lib-api-interface/src';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const Lock = await ethers.getContractFactory('Staking');
  const lock = await Lock.deploy(USDT_CONTRACT);

  await lock.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
