pragma solidity ^0.4.23;
import './IOwned.sol';
import '../../token/interfaces/ITRC20Token.sol';

/*
    Token Holder interface
*/
contract ITokenHolder is IOwned {
    function withdrawTokens(ITRC20Token _token, address _to, uint256 _amount) public;
}
