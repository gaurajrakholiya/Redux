import axios from "axios";

// action name constants
export const init = "account/init";
export const inc = "account/increment";
export const dec = "account/decrement";
export const incByAmt = "account/incrementByAmt";
export const getAccUserFulfilled = "account/getAccoutUserFulfilled";
export const getAccUserRejected = "account/getAccoutUserRejected";
export const getAccUserPending = "account/getAccoutUserPending";
export const incBonus = "bonus/incrementBonus";

// Action creator for async action
export function getUserAccount(id) {
  return async function (dispatch, getState) {
    try {
      dispatch(getAccountUserPending());
      const { data } = await axios.get(`http://localhost:8080/accounts/${id}`);
      dispatch(getAccountUserFulfilled(data.amount));
    } catch (error) {
      dispatch(getAccountUserRejected(error.message));
    }
  };
}

export function getAccountUserFulfilled(value) {
  return { type: getAccUserFulfilled, payload: value };
}

export function getAccountUserRejected(error) {
  return { type: getAccUserRejected, payload: error };
}
export function getAccountUserPending(error) {
  return { type: getAccUserPending };
}

export function initUser(value) {
  return { type: init, payload: value };
}

export function increment() {
  return { type: inc };
}

export function decrement() {
  return { type: dec };
}

export function incrementByAmt(value) {
  return { type: incByAmt, payload: value };
}

export function incrementBonus() {
  return { type: incBonus };
}
