const hre = require("hardhat");

async function main() {
  console.log("Deploying AgentIdentity contract...");

  const AgentIdentity = await hre.ethers.getContractFactory("AgentIdentity");
  const agentIdentity = await AgentIdentity.deploy();

  await agentIdentity.waitForDeployment();

  const address = await agentIdentity.getAddress();
  
  console.log("AgentIdentity deployed to:", address);
  console.log("\nAdd this to your .env file:");
  console.log(`NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT=${address}`);
  
  console.log("\nVerify on CeloScan:");
  console.log(`npx hardhat verify --network alfajores ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
