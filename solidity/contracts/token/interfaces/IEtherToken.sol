pragma solidity ^0.4.23;
import './ITRC20Token.sol';
import '../../utility/interfaces/ITokenHolder.sol';

/*
    Ether Token interface
*/
contract IEtherToken is ITokenHolder, ITRC20Token {
    function deposit() public payable;
    function withdraw(uint256 _amount) public;
    function withdrawTo(address _to, uint256 _amount) public;
}
