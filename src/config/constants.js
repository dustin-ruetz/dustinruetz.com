/* eslint-disable no-console */

const URL = {
  PROTOCOL: 'https',
  SUBDOMAIN: {
    development: 'development',
    production: 'www',
  },
  DOMAIN: 'dustinruetz.com',
  PORT: 4444,
}

function getURL(environment) {
  switch (environment) {
    case 'development':
      return `${URL.PROTOCOL}://${URL.SUBDOMAIN.development}.${URL.DOMAIN}:${URL.PORT}/`
    case 'production':
      return `${URL.PROTOCOL}://${URL.SUBDOMAIN.production}.${URL.DOMAIN}/`
    default: {
      const badEnvironmentArg =
        typeof environment === 'string' ? `'${environment}'` : environment
      throw new Error(
        `getURL(environment) requires either 'development' or 'production' as an argument; received ${badEnvironmentArg}.`,
      )
    }
  }
}

module.exports = {getURL, URL}
