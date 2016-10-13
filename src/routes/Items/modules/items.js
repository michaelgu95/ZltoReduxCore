//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:8000'

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}

export function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    payload: {
      items
    }
  }
}

export function fetchItems(partnerId) {
  return dispatch => {
    dispatch(requestItems())
    return fetch(`${WALLET_URI}/partner/items/${partnerId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(receiveItems(json.partner_items))
    })  
  }
}

export const actions = {  
  requestItems,
  receiveItems,
  fetchItems
}

//Reducer
const initialState = {
  items: []
}

function items(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ITEMS:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_ITEMS:
      const { items } = action.payload
      return _.assign({}, state, {items: items}, { isFetching: true });
    default:
      return state;
  }
}

export default items;
