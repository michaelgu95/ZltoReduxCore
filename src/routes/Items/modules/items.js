//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:7000'

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const REQUEST_TRANSACTION = 'REQUEST_TRANSACTION';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

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

export function requestTransaction() {
  return {
    type: REQUEST_TRANSACTION
  }
}

export function receiveTransaction(detail) {
  return {
    type: RECEIVE_TRANSACTION,
    payload: {
      detail
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

export function initiateTransaction(payload) {
  return dispatch => {
    dispatch(requestTransaction())
    return fetch(`${WALLET_URI}/user/transact/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      dispatch(receiveTransaction(json.detail))
    })  
  }
}

export const actions = {  
  requestItems,
  receiveItems,
  fetchItems,
  requestTransaction,
  receiveTransaction,
  initiateTransaction
}

//Reducer
const initialState = {
  items: [],
  transactionResponse: {}
}

function items(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ITEMS:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_ITEMS:
      const { items } = action.payload
      return _.assign({}, state, {items: items}, { isFetching: true });
    case REQUEST_TRANSACTION:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_TRANSACTION:
      const { detail } = action.payload
      return _.assign({}, state, {transactionResponse: detail}, { isFetching: true });
    default:
      return state;
  }
}

export default items;
