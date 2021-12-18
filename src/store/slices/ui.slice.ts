import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  viewHeight?: number;
  propertiesEditionVisible: boolean;
  propertiesEditionHeight: number;
};

const initialState: UIState = {
  viewHeight: undefined,
  propertiesEditionVisible: true,
  propertiesEditionHeight: 400,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewHeight(state, action: PayloadAction<number>) {
      state.viewHeight = action.payload;
    },
    setPropertiesEditionVisible(state, action: PayloadAction<boolean>) {
      state.propertiesEditionVisible = action.payload;
    },
    setPropertiesEditionHeight(state, action: PayloadAction<number>) {
      state.propertiesEditionHeight = action.payload;
    },
  },
});

export const { setViewHeight, setPropertiesEditionVisible, setPropertiesEditionHeight } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
