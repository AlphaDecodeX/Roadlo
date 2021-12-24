// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract DriversRegisterFactory{
    address[] drivers;

    function registerDriver(string memory name, string memory noPlate, string memory car, string memory contact) public{
        address driver = address(new RegisterDriver(name, noPlate, car, contact));
        drivers.push(driver);
    }

    function getDrivers() public view returns(address[] memory){
        return drivers;
    }
}

contract RegisterDriver{

    struct Driver{
        string name;
        string noPlate;
        string car;
        string contact;
    }

    Driver public driver;

    constructor(string memory _name, string memory _noPlate, string memory _car, string memory _contact){
        driver.name = _name;
        driver.noPlate = _noPlate;
        driver.contact = _contact;
        driver.car = _car;
    }
}