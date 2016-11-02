// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Login from './Auth'
import CategoriesRoute from './Categories'
import PartnersRoute from './Partners'
import ItemsRoute from './Items'
import EarnRoute from './Earn'
import ImpactRoute from './Impact'



/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  childRoutes : [
    Login(store),
    CategoriesRoute(store),
    PartnersRoute(store),
    ItemsRoute(store),
    EarnRoute(store), 
    ImpactRoute(store)
  ]
})

export default createRoutes
