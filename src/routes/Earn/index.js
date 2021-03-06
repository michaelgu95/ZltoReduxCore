import { injectReducer } from '../../store/reducers'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import { requireAuthentication } from '../../utils'
// import Spinner from '../../components/Spinner'


export default (store) => ({
  path : 'earn',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/EarnContainer', './modules/earn'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const EarnContainer = requireAuthentication(require('./containers/EarnContainer').default)
      const reducer = require('./modules/earn').default

      /*  Add the reducer to the store on key 'earn'  */
      injectReducer(store, { key: 'earnReducer', reducer })
      /*  Return getComponent   */
      cb(null, EarnContainer)

    /* Webpack named bundle   */
    }, 'earn')
  }
})
