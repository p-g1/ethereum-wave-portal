
const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    const counts = {};

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
    counts.owner = counts.owmer ? counts.owner + 1 : 1;

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
    counts.randomPerson = counts.randomPerson ? counts.randomPerson + 1 : 1;
  
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson2).wave();
    await waveTxn.wait();
    counts.randomPerson2 = counts.randomPerson2 ? counts.randomPerson2 + 1 : 1;
  
    waveCount = await waveContract.getTotalWaves();

    console.log("owner waves: " + counts.owner, "random 1 waves: " + counts.randomPerson, "random 2 waves: " + counts.randomPerson2)

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();