const {DOMAIN} = require('../constants.js')

test('constants', () => {
  // verify that the domain is correct
  expect(DOMAIN).toEqual('dustinruetz.com')

  // verify that all of the constants are of the correct type
  expect(typeof DOMAIN).toEqual('string')
})
