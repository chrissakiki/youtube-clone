import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
import { User } from "../Types";

interface initialState {
  currentUser: User | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const logoutUser = createAsyncThunk<
  string,
  void,
  {
    rejectValue: string;
  }
>("user/logout", async (_, thunkAPI) => {
  try {
    const { data } = await fetch.get("/auth/logout");
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },

    signinPending: (state) => {
      state.isLoading = true;
    },
    signinFulfilled: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    signinRejected: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    changeAvatar: (state, action) => {
      if (state.currentUser?.avatar) {
        state.currentUser.avatar = action.payload;
      }
    },
    subscription: (state, action) => {
      if (state.currentUser?.subscribedChannels?.includes(action.payload)) {
        state.currentUser?.subscribedChannels.splice(
          state.currentUser?.subscribedChannels.findIndex((channel) => {
            return (channel = action.payload);
          }),
          1
        );
      } else {
        state.currentUser?.subscribedChannels?.push(action.payload);
      }
    },

    saveVid: (state, action) => {
      if (!state.currentUser?.saved.includes(action.payload)) {
        state.currentUser?.saved.push(action.payload);
      } else {
        state.currentUser?.saved.splice(
          state.currentUser.saved.findIndex((video) => {
            return video === action.payload;
          }),
          1
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      Promise.reject(action.payload);
      return initialState;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      toast.error(action.payload);
    });
  },
});

export const {
  startLoading,
  stopLoading,
  signinPending,
  signinFulfilled,
  signinRejected,
  subscription,
  saveVid,
  changeAvatar,
} = userSlice.actions;

export default userSlice.reducer;
