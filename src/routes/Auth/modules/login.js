//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const AUTH_URI = 'http://127.0.0.1:8000'

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGOUT = 'LOGOUT';

export function requestLogin() {
  return {
    type: REQUEST_USER
  }
}

export function receiveLogin(user) {
  return {
    type: RECEIVE_LOGIN,
    user
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function initiateLogin(idNumber, password) {
  return dispatch => {
    dispatch(requestLogin())
    return fetch(`${AUTH_URI}/api/api-login/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_number: idNumber,
        password: password
      })
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      dispatch(receiveLogin(json))
    });  
  }
}

export const actions = {  
  requestLogin,
  receiveLogin,
  initiateLogin,
  logout
}

//Reducer
const initialState = {
  user: {}
}

function login(state = initialState, action) {
  switch(action.type) {
    case REQUEST_LOGIN:
      return _.assign({}, state, { isFetchingLogin: true });
    case RECEIVE_LOGIN:
      return _.assign({}, state, { user: action.user });
    default:
      return state;
  }
}

export default login;
