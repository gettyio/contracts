/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const TokenHolder = artifacts.require('TokenHolder.sol');
const TestTRC20Token = artifacts.require('TestTRC20Token.sol');
const utils = require('./helpers/Utils');

let holderAddress;
let TRC20Token;
let TRC20TokenAddress;

// initializes the holder with some TRC20 token balance
async function initHolder() {
    let holder = await TokenHolder.new();
    holderAddress = holder.address;
    TRC20Token = await TestTRC20Token.new('ERC Token 1', 'ERC1', 100000);
    TRC20TokenAddress = TRC20Token.address;
    await TRC20Token.transfer(holderAddress, 1000);
    return holder;
}

contract('TokenHolder', accounts => {
    it('verifies that the owner can withdraw tokens', async () => {
        let holder = await initHolder();
        let prevBalance = await TRC20Token.balanceOf.call(accounts[2]);
        await holder.withdrawTokens(TRC20TokenAddress, accounts[2], 100);
        let balance = await TRC20Token.balanceOf.call(accounts[2]);
        assert.equal(balance.toNumber(), prevBalance.plus(100).toNumber());
    });

    it('should throw when a non owner attempts to withdraw tokens', async () => {
        let holder = await initHolder();

        try {
            await holder.withdrawTokens(TRC20TokenAddress, accounts[2], 100, { from: accounts[3] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to withdraw tokens from an invalid TRC20 token address', async () => {
        let holder = await initHolder();

        try {
            await holder.withdrawTokens('0x0', accounts[2], 100);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to withdraw tokens to an invalid account address', async () => {
        let holder = await initHolder();

        try {
            await holder.withdrawTokens(TRC20TokenAddress, '0x0', 100);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to withdraw tokens to the holder address', async () => {
        let holder = await initHolder();

        try {
            await holder.withdrawTokens(TRC20TokenAddress, holderAddress, 100);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to withdraw an amount greater than the holder balance', async () => {
        let holder = await initHolder();

        try {
            await holder.withdrawTokens(TRC20TokenAddress, accounts[2], 5000);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });
});
