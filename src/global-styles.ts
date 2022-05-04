import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 * {
   padding:0;
   margin: 0;
   box-sizing: border-box;
 }

 html, body {
   width: 100%;
   min-height: 100vh;
   font-family: sans-serif;
 }
`

export default GlobalStyle
