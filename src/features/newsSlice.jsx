import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsList: [],
  loading: false,
  error: false,
};

export const getNews = createAsyncThunk(
  "getNews",
  async (thunkAPI, { rejectWithValue }) => {
    const API_KEY = "408013e97a3b418e8eab4c8725040a8";
    const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;

    try {
      const { data } = await axios(url);
      return data.articles;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, { payload }) => {
        state.newsList = payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
