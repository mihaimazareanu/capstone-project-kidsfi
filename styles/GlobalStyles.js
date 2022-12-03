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
        padding: 0 0.3rem;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-family: "Mulish";
        margin-top: 2.5rem;
        font-size: 1rem;
        width: 100%;
        min-height: 100vh;
        background-color: #e9f2ef;
        color: #401d1a;
    }
    * {
        box-sizing: border-box;
    }

    p {
        font-family: "Mulish-light";
    }
`;

export default GlobalStyles;
