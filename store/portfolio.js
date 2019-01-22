import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_PORTFOLIO = 'SET_PORTFOLIO';
const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';

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
const setUpdatePortfolio = portfolio => ({ type: UPDATE_PORTFOLIO, portfolio });

/**
 * THUNK CREATORS
 */

export const fetchPortfolio = () => async dispatch => {
  try {
    const portfolioRes = await axios.get('http://10.0.2.2:8080/api/portfolios');
    dispatch(setPortfolio(portfolioRes.data));
  } catch (e) {
    console.error(e);
  }
};

export const updatePortfolio = () => async dispatch => {
  setInterval(() => {
    console.log('from updatePortfolio Thunk');
    dispatch(setUpdatePortfolio());
  }, 2000);
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

const setNewPrice = currentPortfolio => {
  const newPortfolio = currentPortfolio.map(item => {
    const newPrice = Number(item.currentPrice) - 0.02;
    return { ...item, currentPrice: newPrice };
  });
  console.log(newPortfolio);
  return newPortfolio;
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    case UPDATE_PORTFOLIO:
      console.log('----from update-----');
      return { ...state, portfolio: setNewPrice(state.portfolio) };
    default:
      return state;
  }
}
