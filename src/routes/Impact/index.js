import { injectReducer } from '../../store/reducers'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { requireAuthentication } from '../../utils'

export default (store) => ({
  path : 'impact',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/ImpactContainer', './modules/impact'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ImpactContainer = requireAuthentication(require('./containers/ImpactContainer').default)
      const reducer = require('./modules/impact').default

      /*  Add the reducer to the store on key 'impact'  */
      injectReducer(store, { key: 'impactReducer', reducer })
      /*  Return getComponent   */
      cb(null, ImpactContainer)

    /* Webpack named bundle   */
    }, 'impact')
  }
})
