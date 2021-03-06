/* eslint global-require: "off" */

export function login (browser) {
  browser.url('http://localhost:3000/profile')
  browser.waitForExist('[name="at-field-email"]', 2000)
  browser.setValue('[name="at-field-email"]', 'guildenstern@rosencrantz.com')
  browser.setValue('[name="at-field-password"]', 'password')
  browser.click('#at-btn')
}

export function getSomeEth (amount) {
  const wallet = require('./imports/lib/ethereum/wallet.js')
  const accounts = wallet.getAccounts()
  wallet.sendUnSignedTransaction(accounts[0], amount)
}

export function getSomePTI (amount) {
  const wallet = require('./imports/lib/ethereum/wallet.js')
  const accounts = wallet.getAccounts()
  wallet.sendUnSignedContractTransaction(accounts[0], amount)
}

export function getContractAddress () {
  const connection = require('./imports/lib/ethereum/connection.js')

  return connection.getContractAddress()
}

export function deployContract () {
  const wallet = require('./imports/lib/ethereum/wallet.js')
  const accounts = wallet.getAccounts()
  wallet.deployTestContract(accounts[0])
  //
}

export function resetDb () {
  Meteor.users.remove({ 'profile.name': 'Guildenstern' })
  Meteor.users.remove({ 'emails.address': 'guildenstern@rosencrantz.com' })
}

export function createUser () {
  Accounts.createUser({
    email: 'guildenstern@rosencrantz.com',
    password: 'password'
  })
}

export function createKeystore () {
  const wallet = require('./imports/lib/ethereum/wallet.js')
  wallet.createKeystore('password', null, function () {
    // remove the seed from the Session to simulate the situation
    // where the user has seen and dismissed the dialog
    Session.set('seed', null)
  })
}

export function createUserAndLogin (browser) {
  server.execute(createUser)
  // now log in
  login(browser)
  browser.execute(createKeystore)
}

export function clearLocalStorage () {
  localStorage.removeItem(`keystore-${Accounts.userId()}`)
}
