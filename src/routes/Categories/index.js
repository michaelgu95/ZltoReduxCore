import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'categories',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(['./containers/CategoriesContainer', './modules/categories'], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CategoriesContainer = require('./containers/CategoriesContainer').default
      const reducer = require('./modules/categories').default

      /*  Add the reducer to the store on key 'categories'  */
      injectReducer(store, { key: 'categoryReducer', reducer })
      /*  Return getComponent   */
      cb(null, CategoriesContainer)

    /* Webpack named bundle   */
    }, 'categories')
  }
})
