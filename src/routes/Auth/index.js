import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/LoginContainer', './modules/login'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LoginContainer = require('./containers/LoginContainer').default
      const reducer = require('./modules/login').default

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'authReducer', reducer })
      /*  Return getComponent   */
      cb(null, LoginContainer)

    /* Webpack named bundle   */
    }, 'login')
  }
})
