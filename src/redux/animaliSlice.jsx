import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//SBARCA
export const sbarcaAnimal = createAsyncThunk(
    'aniamli/sbarca',
    async (formData, thunkAPI) => {
        const url = '/arca/rest/animale/sbarca';
        const data = { id: formData.id }
        const response = await axios({
            method: 'DELETE',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.data;
    }
);
//GET LISTA
export const getAnimali = createAsyncThunk(
    'aniamli/lista',
    async (_, thunkAPI) => {
        const url = '/arca/rest/animale/lista';
        const response = await axios.get(url)
        return response.data;
    }
);
//UPDATE
export const aggiornaPeso = createAsyncThunk(
    'aniamli/aggiornaPeso',
    async (animal, thunkAPI) => {

        const response = await axios({
            method: 'PUT',
            url: '/arca/rest/animale/update',
            data: {
                id: animal.id,
                peso: animal.peso
            }
        });
        return response.data;

    }
);

//IMBARCA


export const imbarcaAnimal = createAsyncThunk(
    'animali/imbarca',
    async (formData, thunkAPI) => {
        const response = await axios.post('/arca/rest/animale/imbarca', formData);
        return response.data;
    }
);

//SLICE

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


            })
            .addCase(sbarcaAnimal.pending, (state, action) => {
                state.loading = 'loading';
            })
            .addCase(sbarcaAnimal.fulfilled, (state, action) => {
                state.loading = 'idle';
            })
            .addCase(sbarcaAnimal.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;


            })
            .addCase(aggiornaPeso.pending, (state, action) => {
                state.loading = 'loading';
            })
            .addCase(aggiornaPeso.fulfilled, (state, action) => {
                state.loading = 'idle';
            })
            .addCase(aggiornaPeso.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message


            }).addCase(getAnimali.pending, (state, action) => {
                state.loading = 'loading';
            })
            .addCase(getAnimali.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities=action.payload
            })
            .addCase(getAnimali.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message
            })
    },
})


export default animaliSlice.reducer;