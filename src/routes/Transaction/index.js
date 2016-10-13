import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'transaction/:partnerId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/TransactionContainer', './modules/transaction'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const TransactionContainer = require('./containers/TransactionContainer').default
      const reducer = require('./modules/transaction').default

      /*  Add the reducer to the store on key 'transaction'  */
      injectReducer(store, { key: 'transactionReducer', reducer })
      /*  Return getComponent   */
      cb(null, TransactionContainer)

    /* Webpack named bundle   */
    }, 'transaction')
  }
})
