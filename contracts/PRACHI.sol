// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PRACHI is ERC20 {
    constructor() ERC20("Prachi's Token", "PRACHI") {
        _mint(msg.sender, 10 * 10 ** decimals());
    }
    
    function mint(uint256 _amount) public {
        _mint(msg.sender, _amount * 10 ** decimals());
    }
    
    function transfer(address _to, uint256 _amount) public override returns (bool) {
        _transfer(msg.sender, _to, _amount * 10 ** decimals());
        return true;
    }
}