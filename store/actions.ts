import { increment } from "./reducer";
import { Dispatch } from "@reduxjs/toolkit";

export const incrementTwice = () => (dispatch: Dispatch) => {
  dispatch(increment());
  dispatch(increment());
};

export { increment };
