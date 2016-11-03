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
  // localStorage.setItem('token', token)
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
  console.log('logging in')
  return function(dispatch) {
    dispatch(loginUserRequest())
    // return fetch(`${AUTH_URI}/auth/login/`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //     body: JSON.stringify({id_number: idNumber, password: password})
    //   })
    const response = {
        "status": "success",
        "details": {
          "id_number": "0000000000001",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjAwMDAwMDAwMDAwMDEiLCJvcmlnX2lhdCI6MTQ3ODE2MjE2MSwiaWRfbnVtYmVyIjoiMDAwMDAwMDAwMDAwMSIsImV4cCI6MTQ3ODI0ODU2MSwidXNlcl9pZCI6MTU0MTcsImVtYWlsIjpudWxsfQ.HsmjdngGLp-ca3QJ36rtC4fzcLgYb6L3za4rTomxfro",
          "name": "Michael",
          "surname": "Gu",
          "is_active": 1,
          "reason": "",
          "balance": 0
        }
      }
      // .then(parseJSON)
      // .then(response => {
        const { details } = response
        try {
          dispatch(loginUserSuccess(details.token))
          dispatch(push(redirect))
          console.log('pushing to :', redirect)
        } catch (e) {
          console.log(e)
          dispatch(loginUserFailure({
            response: {
                status: 403,
                statusText: 'Invalid token'
            }
          }))
        }
      // })
      // .catch(error => {
      //     dispatch(loginUserFailure(error))
      // })
  }
}

//Reducer
function login(state = {}, action) {
  const { payload } = action
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return _.assign({}, state, {
        isAuthenticating: true
      });
    case LOGIN_USER_SUCCESS:
      console.log('payload.token: ', payload.token)
      return _.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: payload.token,
        userId: jwtDecode(payload.token).user_id,
        statusText: 'You have been successfully logged in.'
      });
    case LOGIN_USER_FAILURE:
      return _.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userId: null,
        statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userId: null,
        statusText: 'You have been successfully logged out.'
      });
    default:
      return state;
  }
}

export default login;
