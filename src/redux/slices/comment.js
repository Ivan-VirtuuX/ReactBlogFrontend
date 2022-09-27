import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios"

const initialState = {
    comments: [],
    status: "loading"
}

export const fetchComments = createAsyncThunk("posts/fetchComments", async (id) => {
    if (id) {
        const { data } = await axios.get(`/posts/${id}/comments`);

        return data;
    }
});

export const createComment = createAsyncThunk("comment/createComment", async (thunkAPI) => {
    try {
        const { id, commentText } = thunkAPI

        const { data } = await axios.post(`/posts/${id}/comments`, {
            id,
            commentText
        })

        return data
    } catch (err) {
        console.log(err)
    }
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.comments = [];
            state.status = "loading";
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
            state.status = "loaded";
        },
        [fetchComments.rejected]: (state) => {
            state.comments = [];
            state.status = "error";
        },
    }
})

export default commentSlice.reducer