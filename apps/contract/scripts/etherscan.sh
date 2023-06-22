#!/usr/bin/env bash

echo Which contract do you want to verify \(e.g. Greeter\)?
read contract
echo Selected contract name: $contract

echo What is the deployed address?
read deployed
echo Selected contract address: $deployed

echo What is the network of the deployed address?
read network
echo Selected network: $network

if [ -z "$args" ]; then
  npx hardhat verify --contract "contract/${contract}.sol:${contract}" --network ${network} ${deployed}

fi


# npx hardhat verify --contract "contracts/Staking.sol:Staking" --network goerli  0xf270f6FD845D8f88fC588BbDd6547E10Df579577
