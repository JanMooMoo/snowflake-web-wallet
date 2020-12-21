

const staking = {
    address: '0x267161dCb3ed38FD8105E682FbAD5f25564eA902',
    abi: [{"inputs":[{"internalType":"address","name":"_snowflake","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_deployedAddress","type":"address"}],"name":"newCharityCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charities","outputs":[{"internalType":"contract Charity","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"uint256","name":"_days","type":"uint256"},{"internalType":"uint256","name":"_maxAmount","type":"uint256"},{"internalType":"address","name":"_ownerAddress","type":"address"}],"name":"createNewCharity","outputs":[{"internalType":"address","name":"newContract","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"globalOverlord","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"returnAllCharities","outputs":[{"internalType":"contract Charity[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOverlord","type":"address"}],"name":"transferOverlordAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


}
export default staking;
