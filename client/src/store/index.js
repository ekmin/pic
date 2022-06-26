import { configureStore } from "@reduxjs/toolkit";

import setAuthToken from '../utils/setAuthToken';

import authReducer from './reducers/auth.reducers';

const store = configureStore({
  reducer: { auth: authReducer }
});

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;