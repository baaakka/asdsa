// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import 'hardhat/console.sol';

interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address account) external view returns (uint256);

  function allowance(address owner, address spender) external view returns (uint256);

  function transfer(address recipient, uint256 amount) external returns (bool);

  function approve(address spender, uint256 amount) external returns (bool);

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ERC20Basic is IERC20 {
  string public constant name = 'USDT';
  string public constant symbol = 'USDT';
  uint8 public constant decimals = 18;

  mapping(address => uint256) balances;

  mapping(address => mapping(address => uint256)) allowed;

  uint256 totalSupply_ = 10 ether;

  constructor() {
    balances[msg.sender] = totalSupply_;
  }

  function totalSupply() public view override returns (uint256) {
    return totalSupply_;
  }

  function balanceOf(address tokenOwner) public view override returns (uint256) {
    return balances[tokenOwner];
  }

  function transfer(address receiver, uint256 numTokens) public override returns (bool) {
    require(numTokens <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender] - numTokens;
    balances[receiver] = balances[receiver] + numTokens;
    emit Transfer(msg.sender, receiver, numTokens);
    return true;
  }

  function approve(address delegate, uint256 numTokens) public override returns (bool) {
    allowed[msg.sender][delegate] = numTokens;
    emit Approval(msg.sender, delegate, numTokens);
    return true;
  }

  function allowance(address owner, address delegate) public view override returns (uint256) {
    return allowed[owner][delegate];
  }

  function transferFrom(
    address owner,
    address buyer,
    uint256 numTokens
  ) public override returns (bool) {
    require(numTokens <= balances[owner]);
    require(numTokens <= allowed[owner][msg.sender]);

    balances[owner] = balances[owner] - numTokens;
    allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
    balances[buyer] = balances[buyer] + numTokens;
    emit Transfer(owner, buyer, numTokens);
    return true;
  }
}

contract StakingNew is Ownable {
  event Bought(address indexed setter, uint256 amount);

  event Sold(address indexed setter, uint256 amount);

  IERC20 public token;

  constructor() {
    token = new ERC20Basic();
  }

  function buy() public payable {
    uint256 amountTobuy = msg.value;

    uint256 dexBalance = token.balanceOf(address(this));

    require(amountTobuy > 0, 'You need to send some ether');

    require(amountTobuy <= dexBalance, 'Not enough tokens in the reserve');

    token.transfer(msg.sender, amountTobuy);

    emit Bought(msg.sender, amountTobuy);
  }

  function sell(uint256 amount) public {
    require(amount > 0, 'You need to sell at least some tokens');

    uint256 allowance = token.allowance(msg.sender, address(this));

    require(allowance >= amount, 'Check the token allowance');

    token.transferFrom(msg.sender, address(this), amount);

    payable(msg.sender).transfer(amount);

    emit Sold(msg.sender, amount);
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function withdrawMoneyTo(address payable _to) public onlyOwner {
    _to.transfer(getBalance());
  }
}
