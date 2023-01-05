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
    html {
        padding: 0;
        margin: 0;
    }
    body {
        padding: 0 0.3rem;
        margin: 5rem auto 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-family: "Mulish";
        font-size: 1rem;
        width: 100%;
        min-height: 100vh;
        color: #401d1a; 
        background: #e9f2ef;
        box-shadow: inset -49px -49px 98px #c1c9c6,
            inset 49px 49px 98px #ffffff;
        }
        
    * {
        box-sizing: border-box;
    }

    p {
        font-family: "Mulish-light";
    }

    .invalid {
        align-items: flex-end;
    }

    .valid {
        align-items: flex-end;
    }
`;

export default GlobalStyles;
