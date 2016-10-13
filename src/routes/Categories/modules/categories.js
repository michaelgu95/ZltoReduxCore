//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:8000'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: {
      categories
    }
  }
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return fetch(`${WALLET_URI}/partner/categories/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(receiveCategories(json.categories))
    })  
  }
}

export const actions = {  
  requestCategories,
  receiveCategories,
  fetchCategories
}

//Reducer
const initialState = {
  categories: []
}

function categories(state = initialState, action) {
  switch(action.type) {
    case REQUEST_CATEGORIES:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_CATEGORIES:
      const { categories } = action.payload
      return _.assign({}, state, {categories: categories}, {isFetching: false})
    default:
      return state;
  }
}

export default categories;
