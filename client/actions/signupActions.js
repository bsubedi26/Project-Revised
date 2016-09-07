import axios from 'axios';
// send user data to the server 
export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}
