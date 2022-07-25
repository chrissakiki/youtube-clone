import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
import { CommentT } from "../Types";
interface initialState {
  comments: CommentT[] | null;
  isLoading: boolean;
}

const initialState: initialState = {
  comments: null,
  isLoading: false,
};

interface Like {
  comment: CommentT;
  userId: string;
}

export const fetchComments = createAsyncThunk<
  CommentT[],
  string,
  { rejectValue: string }
>("comment/fetchComment", async (id, thunkAPI) => {
  try {
    const { data } = await fetch.get(`/comments/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data.message);
  }
});

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments?.push(action.payload);
    },

    addLikeToComment: (state, action) => {
      const index = state.comments?.findIndex(
        (comment) => comment._id === action.payload.commentId
      );

      if (
        index !== undefined &&
        state.comments &&
        !state.comments[index].likes.includes(action.payload.userId)
      ) {
        state.comments[index].likes.push(action.payload.userId);
        state.comments[index].dislikes.splice(
          state.comments[index].dislikes.findIndex((userId) => {
            return userId === action.payload.userId;
          }),
          1
        );
      }
    },

    addDislikeToComment: (state, action) => {
      const index = state.comments?.findIndex(
        (comment) => comment._id === action.payload.commentId
      );

      if (
        index !== undefined &&
        state.comments &&
        !state.comments[index].dislikes.includes(action.payload.userId)
      ) {
        state.comments[index].dislikes.push(action.payload.userId);
        state.comments[index].likes.splice(
          state.comments[index].likes.findIndex((userId) => {
            return userId === action.payload.userId;
          }),
          1
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { addComment, addDislikeToComment, addLikeToComment } =
  commentSlice.actions;

export default commentSlice.reducer;
