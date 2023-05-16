import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const imbarcaAnimal = createAsyncThunk(
  'animali/imbarca',
  async (formData, thunkAPI) => {
    const response = await axios.post('/arca/rest/animale/imbarca', formData);
    return response.data;
  }
);

const animaliSlice = createSlice({
  name: 'animali',
  initialState: { entities: [], loading: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(imbarcaAnimal.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(imbarcaAnimal.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(imbarcaAnimal.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default animaliSlice.reducer;