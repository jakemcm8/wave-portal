
const main = async () => {
  // get address of owner and a random wallet
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // compile contract and gen files to artifacts dir
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // deploy compiled contract on fresh local eth network
  const waveContract = await waveContractFactory.deploy();
  // logs contract address after it is deployed
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  var waveCount;
  waveCount = await waveContract.getTotalWaves();

  var waveTxn = await waveContract.wave();
  await waveTxn.wait();
  // check if anything changed
  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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