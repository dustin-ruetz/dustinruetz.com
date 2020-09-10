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
      route.icon = `${routeName}.svg`
      route.label = routeName
      break
    }
    default: {
      route.href = `/${routeKey}/`
      route.icon = `${routeKey}.svg`
      route.label = routeKey
      break
    }
  }
})

module.exports = {routes}
