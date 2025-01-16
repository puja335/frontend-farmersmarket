import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../service/userService";

// Helper function to load state from localStorage
const loadInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }

  try {
    const token = localStorage.getItem("BearerToken");
    const userStr = localStorage.getItem("User");
    const user = userStr ? JSON.parse(userStr) : null;

    return {
      user,
      accessToken: token,
      isAuthenticated: !!token && !!user,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    console.error("Error loading auth state:", error);
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }
};

// Async thunk for login
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      if (response.success) {
        // Store auth data in localStorage
        localStorage.setItem("BearerToken", response.data.token);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("BearerToken");
      localStorage.removeItem("User");
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("BearerToken", action.payload);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("User", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, refreshToken, updateUser } = authSlice.actions;
export default authSlice.reducer;
