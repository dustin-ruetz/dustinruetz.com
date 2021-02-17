const {networkInterfaces} = require('os')
const {DOMAIN} = require('./constants.js')

// https://nodejs.org/api/os.html#os_os_networkinterfaces
const localIPconfig = networkInterfaces().en0.find(
  (ipConfig) => ipConfig.family === 'IPv4',
)

const URL = {
  protocol: {
    local: 'https',
    network: 'http',
    production: 'https',
  },
  subdomain: {
    local: 'development',
    network: null,
    production: 'www',
  },
  domain: {
    local: DOMAIN,
    network: localIPconfig.address,
    production: DOMAIN,
  },
  port: {
    local: 4444,
    network: 5555,
    production: null,
  },
}

function getURL(environment) {
  switch (environment) {
    case 'local':
      return `${URL.protocol.local}://${URL.subdomain.local}.${URL.domain.local}:${URL.port.local}`
    case 'network':
      return `${URL.protocol.network}://${URL.domain.network}:${URL.port.network}`
    case 'production':
      return `${URL.protocol.production}://${URL.subdomain.production}.${URL.domain.production}`
    default: {
      const invalidEnvironmentArg =
        typeof environment === 'string' ? `'${environment}'` : environment
      const validEnvironmentArgs = ['local', 'network', 'production']
      throw new Error(
        `getURL(environment) requires one of [${validEnvironmentArgs}] as an argument; received ${invalidEnvironmentArg}.`,
      )
    }
  }
}

module.exports = {getURL, URL}
