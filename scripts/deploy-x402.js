const hre = require("hardhat");

async function main() {
  console.log("Deploying X402Payment contract...");

  const X402Payment = await hre.ethers.getContractFactory("X402Payment");
  const x402Payment = await X402Payment.deploy();

  await x402Payment.waitForDeployment();

  const address = await x402Payment.getAddress();
  
  console.log("X402Payment deployed to:", address);
  console.log("\nAdd this to your .env file:");
  console.log(`NEXT_PUBLIC_X402_PAYMENT_CONTRACT=${address}`);
  
  console.log("\nVerify on CeloScan:");
  console.log(`npx hardhat verify --network alfajores ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
