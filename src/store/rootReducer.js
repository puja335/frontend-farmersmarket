import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
});

export default rootReducer;
