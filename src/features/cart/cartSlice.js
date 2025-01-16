import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  totalQuantity: 0,
  total: 0,
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:5000/api/v1/cart";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { getState, rejectWithValue }) => {
    const state = getState();
    if (state.cart.items.length > 0) {
      return state.cart;
    }
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        userId,
        productId,
        quantity,
        size,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/remove`, {
        userId,
        productId,
        size,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/update`, {
        userId,
        productId,
        quantity,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update item");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/clear`, { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
        toast.success("Item removed from cart!");
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.total = action.payload.total;
        toast.success("Item updated successfully!");
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalQuantity = 0;
        state.total = 0;
        toast.info("Cart cleared!");
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default cartSlice.reducer;
