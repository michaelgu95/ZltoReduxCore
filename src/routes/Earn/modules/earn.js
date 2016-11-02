//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:7000'

export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';

export function requestActivities() {
  return {
    type: REQUEST_ACTIVITIES
  }
}

export function receiveActivities(activities) {
  return {
    type: RECEIVE_ACTIVITIES,
    payload: {
      activities
    }
  }
}

export function fetchActivities(userId) {
  return dispatch => {
    dispatch(requestActivities())
    return fetch(`${WALLET_URI}/activity/all_for_user/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(receiveActivities(json.activities))
    })  
  }
}

export const actions = {  
  requestActivities,
  receiveActivities,
  fetchActivities
}

//Reducer
const initialState = {
  activities: []
}

function activities(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ACTIVITIES:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_ACTIVITIES:
      const { activities } = action.payload
      console.log(activities)
      return _.assign({}, state, {activities: activities}, {isFetching: false})
    default:
      return state;
  }
}

export default activities;
