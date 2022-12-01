import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Mulish";
    src: local("Mulish"), url('/fonts/Mulish-Regular.ttf') format("truetype");
}
@font-face {
    font-family: "Mulish-light";
    src: local("Mulish-light"), url('/fonts/Mulish-Light.ttf') format("truetype");
}
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-family: "Mulish";
    }
    * {
        box-sizing: border-box;
    }

    p {
        font-family: "Mulish-light";
    }
`;

export default GlobalStyles;
