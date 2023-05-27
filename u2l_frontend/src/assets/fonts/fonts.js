import { createGlobalStyle } from 'styled-components';
import PoppinsRegular from './Poppins-Regular.ttf';
import PoppinsBold from './Poppins-Bold.ttf';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }
`;

export default GlobalFonts;
