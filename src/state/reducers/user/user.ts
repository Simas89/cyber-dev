import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface State {
  isSessionLoading: boolean;
  data: User | undefined;
}

const initialState: State = { isSessionLoading: true, data: undefined };

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsSessionLoading: (state: State, action: PayloadAction<boolean>) => {
      state.isSessionLoading = action.payload;
    },
    setUserData: (state: State, action: PayloadAction<User | undefined>) => {
      state.data = action.payload;
    },
  },
});

export default slice.reducer;
