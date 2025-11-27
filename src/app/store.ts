import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import autotestsReducer from './slices/autotestsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    autotests: autotestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;