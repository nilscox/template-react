import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    propertiesEditionVisible: true,
  },
  reducers: {
    setPropertiesEditionVisible(state, action: PayloadAction<boolean>) {
      state.propertiesEditionVisible = action.payload;
    },
  },
});

export const { setPropertiesEditionVisible } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
