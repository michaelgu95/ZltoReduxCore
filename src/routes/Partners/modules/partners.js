//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:7000'

export const REQUEST_PARTNERS = 'REQUEST_PARTNERS';
export const RECEIVE_PARTNERS = 'RECEIVE_PARTNERS';

export function requestPartners() {
  return {
    type: REQUEST_PARTNERS
  }
}

export function receivePartners(partners) {
  return {
    type: RECEIVE_PARTNERS,
    payload: {
      partners
    }
  }
}

export function fetchPartners(categoryId) {
  return dispatch => {
    dispatch(requestPartners())
    return fetch(`${WALLET_URI}/partner/partners_with_category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(receivePartners(json.partners))
    })  
  }
}

export const actions = {  
  requestPartners,
  receivePartners,
  fetchPartners
}

//Reducer
const initialState = {
  partners: []
}

function partners(state = initialState, action) {
  switch(action.type) {
    case REQUEST_PARTNERS:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_PARTNERS:
      const { partners } = action.payload
      return {...state, partners: partners, isFetching: false}
    default:
      return state;
  }
}

export default partners;
