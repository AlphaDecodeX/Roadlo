import path from 'path';
import solc from 'solc';
import fs from 'fs-extra';

// --------------- Ride Compilation ------------------

const __dirname = path.resolve();

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const ridePath = path.resolve(__dirname, 'contracts', 'RideBook.sol');
let source = fs.readFileSync(ridePath, 'UTF-8');

var ride = {
    language: 'Solidity',
    sources: {
        'RideBook.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

let output = JSON.parse(solc.compile(JSON.stringify(ride)));

fs.ensureDirSync(buildPath);

fs.outputJSONSync(
    path.resolve(buildPath, "RideFactory" + '.json'),
    output.contracts['RideBook.sol']['RidesFactory']
);

fs.outputJSONSync(
    path.resolve(buildPath, "Ride" + '.json'),
    output.contracts['RideBook.sol']['Ride']
);

// --------------- Driver Contract Compilation ------------------

const driverPath = path.resolve(__dirname, 'contracts', 'DriverRegister.sol');
source = fs.readFileSync(driverPath, 'UTF-8');

var driver = {
    language: 'Solidity',
    sources: {
        'DriverRegister.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

output = JSON.parse(solc.compile(JSON.stringify(driver)));

fs.ensureDirSync(buildPath);

fs.outputJSONSync(
    path.resolve(buildPath, "DriversRegisterFactory" + '.json'),
    output.contracts['DriverRegister.sol']['DriversRegisterFactory']
);

fs.outputJSONSync(
    path.resolve(buildPath, "RegisterDriver" + '.json'),
    output.contracts['DriverRegister.sol']['RegisterDriver']
);