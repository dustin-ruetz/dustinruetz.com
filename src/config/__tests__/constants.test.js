const {getURL, URL} = require('../constants.js')

test('getURL function', () => {
  // verify that it returns the correct development URL
  expect(getURL('development')).toEqual(
    'https://development.dustinruetz.com:4444/',
  )

  // verify that it returns the correct production URL
  expect(getURL('production')).toEqual('https://www.dustinruetz.com/')

  // verify that it throws an error when passed a non-existent environment
  expect(() => getURL('neither development nor production')).toThrow(
    "getURL(environment) requires either 'development' or 'production' as an argument; received 'neither development nor production'.",
  )

  // verify that it throws an error when passed nothing
  expect(getURL).toThrow(
    "getURL(environment) requires either 'development' or 'production' as an argument; received undefined.",
  )

  // verify that it is of the correct type
  expect(typeof getURL).toEqual('function')
})

test('URL configuration', () => {
  // verify that the site is intended to be accessed only via an HTTPS connection
  expect(URL.PROTOCOL).toEqual('https')
  // verify that there are exactly two environments configured
  expect(Object.keys(URL.SUBDOMAIN).length).toEqual(2)
  // verify that the subdomains are spelled correctly
  expect(URL.SUBDOMAIN.development).toEqual('development')
  expect(URL.SUBDOMAIN.production).toEqual('www')
  // verify that the domain is spelled correctly
  expect(URL.DOMAIN).toEqual('dustinruetz.com')
  // verify that the port is the correct number
  expect(URL.PORT).toEqual(4444)

  // verify that all of URL configuration variables are of the correct type
  expect(typeof URL).toEqual('object')
  expect(typeof URL.PROTOCOL).toEqual('string')
  expect(typeof URL.SUBDOMAIN).toEqual('object')
  expect(typeof URL.SUBDOMAIN.development).toEqual('string')
  expect(typeof URL.SUBDOMAIN.production).toEqual('string')
  expect(typeof URL.DOMAIN).toEqual('string')
  expect(typeof URL.PORT).toEqual('number')
})
