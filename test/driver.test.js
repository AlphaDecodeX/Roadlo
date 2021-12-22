import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';

import DriversRegisterFactory from '../ethereum/build/DriversRegisterFactory.json';
import RegisterDriver from '../ethereum/build/RegisterDriver.json';

const web3 = Web3(ganache.provider());

let accounts;
let driversFactory;
let driverAddress;
let registeredDriver;

beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();

        driversFactory = await new web3.eth.Contract(JSON.parse(DriversRegisterFactory.abi))
            .deploy({ data: DriversRegisterFactory.bytecode })
            .send({ from: accounts[0], gas: '1000000' });

        await driversFactory.methods.registerDriver("Ramesh", "Pb22g1784", "Creta", "8727855364").send({
            from: accounts[0],
            gas: '1000000'
        });

        [driverAddress] = await driversFactory.methods.getDrivers().call();
        registeredDriver = await new web3.eth.Contract(
            JSON.parse(RegisterDriver.abi),
            driverAddress
        );
    }
);

describe('Driver is ', () => {
    it('Registered Successfully or Deployed', () => {
        assert.ok(driversFactory.options.address);
        assert.ok(registeredDriver.options.address);
    });
    it()
})