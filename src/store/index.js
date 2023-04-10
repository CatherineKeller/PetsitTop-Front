import { configureStore } from '@reduxjs/toolkit';
import adReducer from './reducers/ads';
import createAccountReducer from './reducers/createAccount';
import petsittersReducer from './reducers/petsitters';
import updateAccountReducer from './reducers/updateAccount';
import userReducer from './reducers/user';
import errorReducer from './reducers/error';

const store = configureStore({
  reducer: {
    user: userReducer,
    petsitters: petsittersReducer,
    createAccount: createAccountReducer,
    ads: adReducer,
    updateAccount: updateAccountReducer,
    error: errorReducer,
  },
});

export default store;
