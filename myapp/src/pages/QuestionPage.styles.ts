import styled, { createGlobalStyle } from 'styled-components';



export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-color: #f1c111;
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
   
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #212f55;
    font-size: 20px;
    margin:25%;
  }
  > h1 {
    color: #212f55;
    font-size: 50px;
    margin:25%;
  }

  .score {
    color: #212f55;
    font-size: 1rem;
    font-weight:bold;
    margin-top: 10%;
    margin: 0;
    align: left;
  }


  .start, .next {
    cursor: pointer;
    color: #212f55;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;
