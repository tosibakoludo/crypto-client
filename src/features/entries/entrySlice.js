import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import entryService from "./entryService";

const initialState = {
    entries: [],
    entry: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create new entry
export const createEntry = createAsyncThunk(
    'entries/create',
    async (entryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await entryService.createEntry(entryData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Get user entries
export const getEntries = createAsyncThunk(
    'entries/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await entryService.getEntries(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Get user entry
export const getEntry = createAsyncThunk(
    'entries/get',
    async (entryId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await entryService.getEntry(entryId, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Sell entry
export const sellEntry = createAsyncThunk(
    'entries/sell',
    async (entryId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await entryService.sellEntry(entryId, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEntry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEntry.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEntries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEntries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entries = action.payload;
            })
            .addCase(getEntries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEntry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entry = action.payload;
            })
            .addCase(getEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sellEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.entries.map((entry) => entry._id === action.payload._id ? (entry.status = 'sell') : entry)
            })
    }
})

export const { reset } = entrySlice.actions

export default entrySlice.reducer