import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: ''
}

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    toggleLoading: (state, action) =>{
        state.isLoading = action.payload
    }
  }
});

export const {toggleLoading} = loadingSlice.actions

export default loadingSlice.reducer