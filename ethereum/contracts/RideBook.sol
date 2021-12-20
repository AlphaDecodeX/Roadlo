// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract RidesFactory {
    address[] public deployedRides;

    function deployRide(
        string memory name, 
        string memory from,
        string memory to,
        uint noOfPerson,
        uint[] memory priceRange,
        string memory contact) 
        public{
            address newRide = address(new Ride(name, from, to, noOfPerson, priceRange, contact));
            deployedRides.push(newRide);
        }

    function getDeployedRides() public view returns(address[] memory){
        return deployedRides;
    }

}

contract Ride{

    struct User{
        string  name;
        string  from;
        string  to;
        uint  noOfPerson;
        uint[]  priceRange;
        string contact;
    }

    struct Driver{
        string name;
        string noPlate;
        string contact;
        string car;
    }

    User private user;
    Driver private driver;
    bool private statusRide = false;

    constructor(string memory _name, 
     string memory _from, string memory _to,
     uint _noOfPerson, 
     uint[] memory _priceRange, string memory _contact){
         user.name = _name;
         user.from = _from;
         user.to = _to;
         user.noOfPerson = _noOfPerson;
         user.priceRange = _priceRange;
         user.contact = _contact;
    }

    function approveRide(uint minimumContribution, 
    string memory _name, string memory _noPlate,
    string memory _contact, string memory _car) public payable {
        require(msg.value > minimumContribution);
        
        statusRide = true;
        driver.name = _name;
        driver.contact = _contact;
        driver.noPlate = _noPlate;
        driver.car = _car;
    }

}