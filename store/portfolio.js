import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_PORTFOLIO = 'SET_PORTFOLIO';

/**
 * INITIAL STATE
 */
const defaultUser = { portfolio: [] };

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setPortfolio = portfolio => ({ type: SET_PORTFOLIO, portfolio });

/**
 * THUNK CREATORS
 */

export const fetchPortfolio = () => async dispatch => {
  try {
    const portfolioRes = await axios.get('http://10.0.2.2:8080/api/portfolios');
    dispatch(setPortfolio(portfolioRes.data));
  } catch (e) {
    console.log(e);
  }
};

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    default:
      return state;
  }
}
