import styled from "styled-components";

export const LogoutButton = styled.button`
  background-color: #a61f2b;
  border-radius: 5px;
  color: #e9f2ef;
  border: none;
  width: 7rem;
  height: 2rem;
  box-shadow: 4px 4px 8px 1px rgba(166, 31, 43, 0.65);

  :hover {
    background-color: #a61f43;
    box-shadow: 4px 4px 8px 1px rgba(166, 31, 67, 0.65);
    transform: scale(1.1);
    transition: ease-in 0.2s;
  }
`;

export const StartPageButton = styled.button`
  border: none;
  background-color: #e9f2ef;

  :hover {
    transform: scale(1.2);
    transition: ease-in 0.2s;
  }
`;

export const FormButton = styled.button`
  background-color: #5e8c49;
  border: none;
  box-shadow: 4px 4px 8px 1px rgba(104, 139, 81, 0.65);
  border-radius: 5px;
  color: #e9f2ef;
  height: 2rem;

  :hover {
    background: #224024;
    box-shadow: 4px 4px 8px 1px rgba(34, 64, 36, 0.65);
    transform: scale(1.1);
    transition: ease-in 0.2s;
  }
`;
