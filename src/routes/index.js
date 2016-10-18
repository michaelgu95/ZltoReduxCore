// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import CategoriesRoute from './Categories'
import PartnersRoute from './Partners'
import ItemsRoute from './Items'
import ImpactRoute from './Impact'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CategoriesRoute(store),
    PartnersRoute(store),
    ItemsRoute(store),
    ImpactRoute(store)
  ]
})

export default createRoutes
