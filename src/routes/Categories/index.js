import { injectReducer } from '../../store/reducers'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
// import Spinner from '../../components/Spinner'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace,
  // LoadingComponent: <Spinner spinnerName='circle'></Spinner>,
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export default (store) => ({
  path : 'categories',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/CategoriesContainer', './modules/categories'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CategoriesContainer = UserIsAuthenticated(require('./containers/CategoriesContainer').default)
      const reducer = require('./modules/categories').default

      /*  Add the reducer to the store on key 'categories'  */
      injectReducer(store, { key: 'categoriesReducer', reducer })
      /*  Return getComponent   */
      cb(null, CategoriesContainer)

    /* Webpack named bundle   */
    }, 'categories')
  }
})
