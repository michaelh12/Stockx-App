import axios from 'axios';
// import store from './index';

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
    let latestPrices = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch`,
      {
        params: {
          symbols: portfolioRes.data
            .map(item => {
              return item.symbol;
            })
            .join(','),
          types: 'price',
        },
      }
    );
    var today = new Date();
    let time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log('latest prices', time, latestPrices.data);
    let updatedPortfolio = portfolioRes.data.map(item => {
      let newPrice = latestPrices.data[item.symbol]
        ? latestPrices.data[item.symbol].price
        : item.currentPrice;
      return { ...item, currentPrice: Number(newPrice) };
    });
    dispatch(setPortfolio(updatedPortfolio));
  } catch (e) {
    console.error(e);
  }
};

export const updatePortfolio = lastPortfolio => async dispatch => {
  let latestPrices = await axios.get(
    `https://api.iextrading.com/1.0/stock/market/batch`,
    {
      params: {
        symbols: 'IBM',
        types: 'price',
      },
    }
  );
  console.log('this.props', lastPortfolio);
  console.log(latestPrices.data);
  // let latestPrices = await axios.get(
  //   'https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl&types=price'
  // );

  // console.log(latestPrices.data);
  // // lastPortfolio
  //         .map(item => {
  //           return item.symbol;
  //         })
  //         .join(','),
  // console.log(lastPortfolio);
  // console.log('hellllo');
  // let currentPortfolio =
  //   lastPortfolio &&
  //   lastPortfolio.map(item => {
  //     console.log('new price', latestPrices);
  //     let newPrice = latestPrices.data[item.symbol]
  //       ? latestPrices.data[item.symbol].price
  //       : item.currentPrice;
  //     console.log(newPrice);
  //     return { ...item, currentPrice: newPrice };
  //   });
  // console.log(currentPortfolio);
  // dispatch(setUpdatePortfolio(currentPortfolio));
  dispatch(setUpdatePortfolio());
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
  // let latestPrices = await axios.get(
  //   `https://api.iextrading.com/1.0/stock/market/batch`,
  //   {
  //     params: {
  //       symbols: currentPortfolio
  //         .map(item => {
  //           return item.symbol;
  //         })
  //         .join(','),
  //       types: 'price',
  //     },
  //   }
  // );
  // console.log(latestPrices.data);
  // //   .then(res => {
  // currentPortfolio = currentPortfolio.map(item => {
  //   console.log(latestPrices);
  //   let newPrice = latestPrices.data[item.symbol]
  //     ? latestPrices.data[item.symbol]['price']
  //     : item.currentPrice;
  //   console.log(newPrice);
  //   return { ...item, currentPrice: Number(newPrice) };
  // });
  // return currentPortfolio;
  // });
  // console.log(latestPrices);
  // return;
  const newPortfolio = currentPortfolio.map(item => {
    const newPrice = Number(item.currentPrice) - 0.02;
    return { ...item, currentPrice: newPrice };
  });
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
      // setNewPrice(state.portfolio);
      // console.log(setNewPrice(state));
      // console.log('----from update-----');
      // return { ...state, portfolio: setNewPrice(state.portfolio) };
      // return { ...state, portfolio: action.portfolio };
      return state;
    default:
      return state;
  }
}
