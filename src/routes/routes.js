const routes = {
  '/': {},
  about: {},
  contact: {},
  work: {},
}

Object.keys(routes).forEach((routeKey) => {
  const route = routes[routeKey]

  switch (routeKey) {
    case '/': {
      const routeName = 'home'
      route.href = routeKey
      route.icon = routeName
      route.label = routeName.toUpperCase()
      break
    }
    default:
      route.href = `/${routeKey}/`
      route.icon = routeKey
      route.label = routeKey.toUpperCase()
      break
  }
})

module.exports = {routes}
