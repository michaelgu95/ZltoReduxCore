//Actions
import fetch from 'isomorphic-fetch'
import _ from 'lodash';

const WALLET_URI = 'http://127.0.0.1:8000'

export const REQUEST_IMPACT = 'REQUEST_IMPACT';
export const RECEIVE_IMPACT = 'RECEIVE_IMPACT';

export function requestImpact() {
  return {
    type: REQUEST_IMPACT
  }
}

export function receiveImpact(impact) {
  console.log(impact)
  return {
    type: RECEIVE_IMPACT,
    payload: {
      impact
    }
  }
}

export function fetchImpact() {
  return dispatch => {
    dispatch(requestImpact())
    // return fetch(`${WALLET_URI}/partner/impact/1`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // })

    const mockData = {
      "status": "success",
      "details": [{
          "id": 1,
          "name": "Community",
          "total": 140
        }, {
          "id": 2,
          "name": "Economic Opportunities",
          "total": 20
        }, {
          "id": 3,
          "name": "Environmental",
          "total": 40
        }, {
          "id": 4,
          "name": "Health",
          "total": 77
        }, {
          "id": 5,
          "name": "NGO\'s",
          "total": 34
        }, {
          "id": 6,
          "name": "Opportunities Taken",
          "total": 4
        }, {
          "id": 7,
          "name": "Personal Development Training",
          "total": 90
        }, {
          "id": 8,
          "name": "School",
          "total": 43
        },{
          "id": 9,
          "name": "Skills Training",
          "total": 43
        }]
      }
    dispatch(receiveImpact(mockData))
    // .then(response => {
    //   return response.json()
    // })
    // .then(json => {
      // dispatch(receiveImpact(json.impact))

      
    }
    // )  
  // }
}

export const actions = {  
  requestImpact,
  receiveImpact,
  fetchImpact
}

//Reducer
const initialState = {
  impact: []
}

function impact(state = initialState, action) {
  switch(action.type) {
    case REQUEST_IMPACT:
      return _.assign({}, state, { isFetching: true });
    case RECEIVE_IMPACT:
      const { impact } = action.payload
      const { details } = impact
      return _.assign({}, state, {impact: details}, {isFetching: false});
    default:
      return state;
  }
}

export default impact;
