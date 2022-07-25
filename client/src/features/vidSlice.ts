import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CommentT, VideoT } from "../Types";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
interface initialState {
  allVideos: VideoT[] | null;
  oneVideo: VideoT | null;
  isLoading: boolean;
}

const initialState: initialState = {
  allVideos: null,
  oneVideo: null,
  isLoading: false,
};

export const fetchVideos = createAsyncThunk<
  VideoT[],
  string,
  {
    rejectValue: string;
  }
>("videos/fetchVideos", async (type, thunkAPI) => {
  try {
    const { data } = await fetch.get(`videos/${type}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchOneVideo = createAsyncThunk<
  VideoT,
  string,
  {
    rejectValue: string;
  }
>("video/fetchVideo", async (id, thunkAPI) => {
  try {
    const { data } = await fetch.get(`videos/find/${id}`);
    await fetch.put(`videos/view/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data.message);
  }
});

export const videoSlice = createSlice({
  name: "videos",

  initialState,
  reducers: {
    likeVideo: (state, action) => {
      if (!state.oneVideo?.likes.includes(action.payload)) {
        state.oneVideo?.likes.push(action.payload);
        state.oneVideo?.dislikes.splice(
          state.oneVideo.dislikes.findIndex((userId) => {
            return userId === action.payload;
          }),
          1
        );
      }
    },
    dislikeVideo: (state, action) => {
      if (!state.oneVideo?.dislikes.includes(action.payload)) {
        state.oneVideo?.dislikes.push(action.payload);

        state.oneVideo?.likes.splice(
          state.oneVideo.likes.findIndex((userId) => {
            return userId === action.payload;
          }),
          1
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allVideos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoading = false;
      // toast.error(action.payload);
    });
    builder.addCase(fetchOneVideo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOneVideo.fulfilled, (state, action) => {
      state.oneVideo = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOneVideo.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { likeVideo, dislikeVideo } = videoSlice.actions;

export default videoSlice.reducer;
