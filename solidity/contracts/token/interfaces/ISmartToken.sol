pragma solidity ^0.4.23;
import './ITRC20Token.sol';
import '../../utility/interfaces/IOwned.sol';

/*
    Smart Token interface
*/
contract ISmartToken is IOwned, ITRC20Token {
    function disableTransfers(bool _disable) public;
    function issue(address _to, uint256 _amount) public;
    function destroy(address _from, uint256 _amount) public;
}
