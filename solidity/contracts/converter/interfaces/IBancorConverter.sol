pragma solidity ^0.4.23;
import '../../token/interfaces/ITRC20Token.sol';
import '../../utility/interfaces/IWhitelist.sol';

/*
    Bancor Converter interface
*/
contract IBancorConverter {
    function getReturn(ITRC20Token _fromToken, ITRC20Token _toToken, uint256 _amount) public view returns (uint256);
    function convert(ITRC20Token _fromToken, ITRC20Token _toToken, uint256 _amount, uint256 _minReturn) public returns (uint256);
    function conversionWhitelist() public view returns (IWhitelist) {}
    function conversionFee() public view returns (uint32) {}
    function connectors(address _address) public view returns (uint256, uint32, bool, bool, bool) {}
    function getConnectorBalance(ITRC20Token _connectorToken) public view returns (uint256);
    // deprecated, backward compatibility
    function change(ITRC20Token _fromToken, ITRC20Token _toToken, uint256 _amount, uint256 _minReturn) public returns (uint256);
}
