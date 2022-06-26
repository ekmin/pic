import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    USER_LOADED(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    REGISTER_SUCCESS(state, action) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    REGISTER_FAIL(state) {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    },
    LOGIN_SUCCESS(state, action) {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    LOGIN_FAIL(state) {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    },
    ACCOUNT_DELETED(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
    ACCOUNT_DELETED(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
    AUTH_ERROR(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
    LOGOUT(state) {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
