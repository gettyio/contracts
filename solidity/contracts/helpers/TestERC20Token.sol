pragma solidity ^0.4.23;
import '../token/TRC20Token.sol';

/*
    Test token with predefined supply
*/
contract TestTRC20Token is TRC20Token {
    constructor(string _name, string _symbol, uint256 _supply)
        public
        TRC20Token(_name, _symbol, 0)
    {
        totalSupply = _supply;
        balanceOf[msg.sender] = _supply;
    }
}
