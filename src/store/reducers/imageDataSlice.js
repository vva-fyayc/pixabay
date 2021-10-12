import { createSlice } from '@reduxjs/toolkit';

export const imageDataSlice = createSlice({
    name: 'imageData',
    initialState: {
        hits: [],
        totalHits: 0,
        total: 0
    },
    reducers: {
        update: (state, action) => {
            state = action.payload;
        }
    }
})

export const { update } = imageDataSlice.actions;

export default imageDataSlice.reducer;