//Actions
import { checkHttpStatus, parseJSON } from '../../../utils'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

const AUTH_URI = 'http://wallet.zlto.mobi'
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function logout() {
  localStorage.removeItem('token')
  return {
      type: LOGOUT_USER
  }
}

export function loginUser(idNumber, password, redirect="/") {
  return function(dispatch) {
    dispatch(loginUserRequest())
    return fetch(`${AUTH_URI}/auth/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({id_number: idNumber, password: password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log(response)
        try {
          let decoded = jwtDecode(response.token)
          dispatch(loginUserSuccess(response.token))
          dispatch(push(redirect))
        } catch (e) {
          dispatch(loginUserFailure({
              response: {
                  status: 403,
                  statusText: 'Invalid token'
              }
          }))
        }
      })
      .catch(error => {
          dispatch(loginUserFailure(error))
      })
  }
}

//Reducer
const initialState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

function login(state = initialState, action) {
  console.log(`action fired: ${action.type} with payload: ${action.payload}`)
  const { payload } = action
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return _.assign({}, state, {
        isAuthenticating: true, 
        'statusText': null 
      });
    case LOGIN_USER_SUCCESS:
      return _.assign({}, state, {
         'isAuthenticating': false,
        'isAuthenticated': true,
        'token': payload.token,
        'userId': jwtDecode(payload.token).user_id,
        'statusText': 'You have been successfully logged in.'
      });
    case LOGIN_USER_FAILURE:
      return _.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'userId': null,
        'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userId': null,
        'statusText': 'You have been successfully logged out.'
      });
    default:
      return state;
  }
}

export default login;
