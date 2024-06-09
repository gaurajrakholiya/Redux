import { incBonus, incByAmt } from "../actions";

export function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incBonus:
      return { points: state.points + 1 };
    case incByAmt:
        return { points: state.points + action.payload };
    default:
      return state;
  }
}
