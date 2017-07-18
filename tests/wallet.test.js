/* eslint global-require: "off" */
// import { assert } from 'chai';
import { resetDb, createUserAndLogin, getSomeEth, getSomePTI } from './helpers.js';

describe('wallet', function () {
  beforeEach(function () {
    server.execute(resetDb);
  });

  afterEach(function () {

  });

  it('should be able to send some ETH', function () {
    createUserAndLogin(browser);
    browser.waitForExist('#public_address', 3000);
    browser.execute(getSomeEth, 100);
    browser.waitForExist('#eth_amount', 3000);
    const amount = browser.getHTML('#eth_amount', false);
    assert.equal(amount, 100);
  });

  it('should be able to send some PTI @watch', function () {
    createUserAndLogin(browser);
    browser.waitForExist('#public_address', 3000);
    browser.execute(getSomePTI);
  });
});
