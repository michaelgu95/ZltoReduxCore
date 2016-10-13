//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:8000'

export const REQUEST_TRANSACTION = 'REQUEST_TRANSACTION';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

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

export function fetchTransaction(payload) {
  return dispatch => {
    dispatch(requestTransaction())
    return fetch(`${WALLET_URI}/user/transaction`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(receiveTransaction(json.detail))
    })  
  }
}

export const actions = {  
  requestTransaction,
  receiveTransaction,
  fetchTransaction
}

//Reducer
const initialState = {
  transactionResponse: {}
}

function transaction(state = initialState, action) {
  switch(action.type) {
    case REQUEST_TRANSACTION:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_TRANSACTION:
      const { detail } = action.payload
      return _.assign({}, state, {transactionResponse: detail}, { isFetching: true });
    default:
      return state;
  }
}

export default transaction;
