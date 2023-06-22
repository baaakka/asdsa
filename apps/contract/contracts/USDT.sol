// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol';

contract USDT is ERC20PresetFixedSupply {
  uint256 private supply = 213000000000 ether;

  constructor() ERC20PresetFixedSupply('SWAP Token', 'USDT', supply, msg.sender) {}
}
