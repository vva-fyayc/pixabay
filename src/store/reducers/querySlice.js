import { createSlice } from '@reduxjs/toolkit';

export const querySlice = createSlice({
    name: 'query',
    initialState: {
        value: ''
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { update } = querySlice.actions;

export default querySlice.reducer;