import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gameOfLifeReducer from "./reducers/gameOfLife";
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameOfLife: gameOfLifeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateDispatch = () => useDispatch<AppDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
