import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import { RootState } from './';
import { CSSProperties } from '@material-ui/styles';

/* LIGHT GREEN */
const primaryColor = {
  0: '#F8FBEF',
  100: '#E5F1C1',
  200: '#D9EAA2',
  300: '#CCE483',
  400: '#C6E073',
  500: '#BADA55',
  600: '#99B346',
  700: '#66772F',
  800: '#44503E',
  900: '#222810',
  'A400': '#BADA55',
};

/* Blue */
const secondaryColor = {
  0: '#EBF3FF',
  100: '#B2D2FF',
  200: '#8CBBFF',
  300: '#539AFF',
  400: '#2D84FF',
  500: '#2978E8',
  600: '#2161BA',
  700: '#19488C',
  800: '#11305D',
  900: '#09182F',
  'A400': '#2978E8',
};

const grays = {
  0: '#F9F9F9',
  100: '#F6F6F6',
  200: '#ECECEC',
  300: '#A0A0A0',
  400: '#7A7A7A',
  500: '#545454',
  600: '#2f2f2f',
  700: '#272727',
  800: '#161616',
  900: '#0D0D0D',
  'A400': '#2f2f2f',
};

const reds = {
  0: '#F4D3D0',
  100: '#E9A7A2',
  200: '#DE7B73',
  300: '#D44F45',
  400: '#C40D00',
  500: '#A10B00',
  600: '#7D0900',
  700: '#5A0600',
  800: '#360400',
  900: '#240300',
  'A400': '#A10B00',
};

export const customThemeSelector: Selector<RootState, CustomTheme> = state => state.customTheme;
export enum PaletteOptions {
  Primary = 'primary',
  Secondary = 'secondary',
  Background = 'background',
  Red = 'red',
}

export type Shades = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'A400';
export type PaletteShades = Record<Shades, string>;
export type Palette = Record<PaletteOptions, PaletteShades>;

export interface CustomTheme {
  palette?: Palette;
  defaults?: {
    [key: string]: CSSProperties;
  };
};

const initialState: CustomTheme = {
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: grays,
    red: reds,
  },
  defaults: {
    circleButton: {
      border: `2px solid ${primaryColor[500]}`,
      backgroundColor: grays[600],
    },
  },
};

const customTheme = createSlice({
  name: 'customTheme',
  initialState,
  reducers: {
    updatePalette: (state, action: PayloadAction<[PaletteOptions, PaletteShades]>) => {
      const [colorType, value] = action.payload;
      state.palette[colorType] = value;
    },
    resetDefault: (state) => initialState,
  }
});

export const {
  updatePalette,
  resetDefault,
} = customTheme.actions;

export default customTheme.reducer;