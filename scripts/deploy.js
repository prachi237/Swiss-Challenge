const hre = require("hardhat");

async function main() {
  const prachi = await hre.ethers.deployContract("PRACHI");
  await prachi.waitForDeployment();
  console.log(`Deployed at ${prachi.target}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});