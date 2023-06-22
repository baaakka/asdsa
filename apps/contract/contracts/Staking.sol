// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Staking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;

  IERC20 private immutable _token;
  mapping(address => uint256) private _balances;
  mapping(address => uint256) private _unlockTime;
  mapping(address => bool) private _isIDO;
  bool public halted;
  address private idoFactory;

  event Stake(address indexed account, uint256 timestamp, uint256 value);

  constructor(address token) {
    require(token != address(0), "Cake: Token address can not be 0.");
    _token = IERC20(token);
  }

  function stake(uint256 value) external notHalted nonReentrant {
    require(value > 0, "Cake: stake value should be greater than 0");
    _balances[_msgSender()] = _balances[_msgSender()].add(value);
    emit Stake(_msgSender(), block.timestamp, value);
    _token.safeTransferFrom(_msgSender(), address(this), value);
  }

  modifier notHalted() {
    require(!halted, "Cake: Deposits are paused");
    _;
  }
}
