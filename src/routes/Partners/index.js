import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'partners/:categoryId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/PartnersContainer', './modules/partners'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PartnersContainer = require('./containers/PartnersContainer').default
      const reducer = require('./modules/partners').default

      /*  Add the reducer to the store on key 'partners'  */
      injectReducer(store, { key: 'partnersReducer', reducer })
      /*  Return getComponent   */
      cb(null, PartnersContainer)

    /* Webpack named bundle   */
    }, 'partners')
  }
})
