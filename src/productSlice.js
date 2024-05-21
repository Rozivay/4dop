import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный экшен для получения данных о продуктах
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://localhost:5000/products');
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { reducer: productReducer } = productSlice;
