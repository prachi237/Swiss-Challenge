const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const CONTRACT_ADDRESS = "0xD7b76780D2429C55A5824BF46193839Ebe6d5E75";
const NUMBER = 10;
const RECEIVER_ADDRESS = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
const sendShieldedTransaction = async (signer, destination, data, value) => {
    const RPC_URL = hre.network.config.url;
    const [encryptedData] = await encryptDataField(RPC_URL, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
}

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("PRACHI");
    const contract = contractFactory.attach(CONTRACT_ADDRESS);
    const mintTxn = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("mint", [NUMBER]), 0);
    await mintTxn.wait();
    console.log("Transaction Receipt: ", mintTxn);
    const mintTxn1 = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("transfer", [RECEIVER_ADDRESS, NUMBER]), 0);
    await mintTxn1.wait();
    console.log("Transaction Receipt1: ", mintTxn1);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})