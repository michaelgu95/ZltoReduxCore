import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'items/:partnerId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/ItemsContainer', './modules/items'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ItemsContainer = require('./containers/ItemsContainer').default
      const reducer = require('./modules/items').default

      /*  Add the reducer to the store on key 'items'  */
      injectReducer(store, { key: 'itemsReducer', reducer })
      /*  Return getComponent   */
      cb(null, ItemsContainer)

    /* Webpack named bundle   */
    }, 'items')
  }
})
