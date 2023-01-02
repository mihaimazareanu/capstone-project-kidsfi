import styled from "styled-components";

//Icons

export const StyledIcon = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  margin-right: 0.5rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

//Buttons

export const StartPageButton = styled.button`
  border: none;
  background: none;
  margin-top: auto;

  :hover {
    transform: scale(1.2);
    transition: ease-in 0.2s;
  }
`;

export const LogoutButton = styled.button`
  background-color: #a61f2b;
  border-radius: 10px;
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

export const FormButton = styled.button`
  background-color: #5e8c49;
  border: none;
  box-shadow: 4px 4px 8px 1px rgba(104, 139, 81, 0.65);
  border-radius: 10px;
  color: #e9f2ef;
  height: 2rem;
  width: 7rem;

  :hover {
    background-color: #224024;
    box-shadow: 4px 4px 8px 1px rgba(34, 64, 36, 0.65);
    transform: scale(1.1);
    transition: ease-in 0.2s;
  }
`;

export const AddChildButton = styled.button`
  background-color: #401d1a;
  border: none;
  box-shadow: 4px 4px 8px 1px rgba(64, 29, 26, 0.65);
  border-radius: 10px;
  color: #e9f2ef;
  height: 2rem;
  width: 7rem;

  :hover {
    transform: scale(1.1);
    transition: ease-in 0.2s;
  }
`;

// Forms

// const SignForm = styled.form`
//   margin: 1rem auto;
//   border: 2px solid #5e8c49;
//   width: 90%;
//   display: flex;
//   flex-direction: column;
//   justify-items: center;
//   align-items: center;
//   border-radius: 1rem;
//   font-size: 1.2rem;
// `;

// const RegForm = styled.form`
//   margin: 1rem auto;
//   border: 2px solid #5e8c49;
//   width: 95%;
//   display: flex;
//   flex-direction: column;
//   justify-items: center;
//   align-items: center;
//   border-radius: 1rem;
//   font-size: 1.2rem;
// `;

// const RegForm = styled.form`
//   margin: 1rem auto;
//   border: 2px solid #5e8c49;
//   width: 95%;
//   display: flex;
//   flex-direction: column;
//   justify-items: center;
//   align-items: center;
//   border-radius: 1rem;
//   font-size: 1.2rem;
// `;

export const StyledForm = styled.form`
  width: 100%;
  /* border: 3px solid #5e8c49;
  border-radius: 12px; */
  display: flex;
  padding: 0 0.5rem;
  /* flex-direction: column; */
  /* justify-content: space-around;
  align-items: flex-start; */
  /* margin-top: 1rem;
  padding: 0 1rem; */
`;

// //Fieldsets

// const DetailsFieldset = styled.fieldset`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 1rem;
//   border: none;
// `;

// const PasswordFieldset = styled.fieldset`
//   width: 100%;
//   border: none;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin: 0;
// `;

// const LoginTypeFieldset = styled.fieldset`
//   display: flex;
//   border: none;
//   width: 100%;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const DetailsFieldset = styled.fieldset`
//   display: flex;
//   width: 100%;
//   flex-direction: column;
//   gap: 1rem;
//   border: none;
// `;

// const PasswordFieldset = styled.fieldset`
//   width: 100%;
//   border: none;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin: 0;
// `;

// const DetailsFieldset = styled.fieldset`
//   display: flex;
//   width: 100%;
//   flex-direction: column;
//   gap: 1rem;
//   border: none;
// `;

// const PasswordFieldset = styled.fieldset`
//   width: 100%;
//   border: none;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin: 0;
// `;

export const StyledFieldset = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// //Inputs

// const InputFirstName = styled.input`
//   width: 100%;
//   border: none;
// `;

// const InputLastName = styled.input`
//   margin-left: auto;
//   width: 100%;
//   border: none;
// `;

// const InputPassword = styled.input`
//   width: 90%;
//   border: none;
//   align-self: baseline;
// `;

// const InputFirstName = styled.input`
//   width: 100%;
//   border: none;
// `;

// const InputLastName = styled.input`
//   margin-left: auto;
//   width: 100%;
//   border: none;
// `;

// const InputChoosePassword = styled.input`
//   width: 90%;
//   border: none;
//   align-self: baseline;
// `;

// const InputConfirmPassword = styled.input`
//   width: 100%;
//   border: none;
// `;

// const InputFirstName = styled.input`
//   width: 100%;
//   border: none;
// `;

// const InputLastName = styled.input`
//   margin-left: auto;
//   width: 100%;
//   border: none;
// `;

// const InputChoosePassword = styled.input`
//   width: 90%;
//   border: none;
//   align-self: baseline;
// `;

// const InputConfirmPassword = styled.input`
//   width: 100%;
//   border: none;
// `;

export const StyledInput = styled.input`
  border: 1px solid #5e8c49;
  border-radius: 5px;
  color: #401d1a;
`;

// //Divs

export const PasswordDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding: 0 0.5rem;
`;

// const DivParentRadioButton = styled.div`
//   width: 50%;
// `;

// const DivChildRadioButton = styled.div`
//   margin-left: auto;
//   width: 50%;
// `;

// const ChoosePasswordDiv = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 1rem;
// `;

// const StyledDiv = styled.div`
//   width: 50%;
// `;

// const ButtonsDiv = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;
// `;

// const ChoosePasswordDiv = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 1rem;
// `;

export const StyledAnimationContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5%;
  align-items: flex-end;
`;

// const FlexContainer = styled.div`
//   width: 100%;
//   display: flex;
//   padding: 0 0.2rem;
//   gap: 1rem;
// `;

// const StyledDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   width: 50%;
//   font-size: 1.2rem;
// `;

// const ChildrenContainer = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   align-items: center;
//   justify-content: flex-start;
// `;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  width: 70%;
  /* padding-right: 2rem; */
  /* gap: 1rem; */
`;

// const StyledAnimationContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-around;
//   margin-left: 1rem;
// `;

// const ListElementsContainer = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   gap: 5rem;
// `;

// const PiggyBankAnimationContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
// `;

// //Paragraphs

// const ErrorText = styled.p`
//   margin: -0.5rem 0;
//   color: red;
//   font-size: 0.9rem;
//   width: 100%;
// `;

// const StyledParagraph = styled.p`
//   text-align: center;
//   font-size: 1.3rem;
// `;

// const NoChildLogins = styled.p`
//   width: 100%;
//   text-align: center;
// `;

// //Sections

// const ChildLoginSection = styled.section`
//   width: 90%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const StyledSection = styled.section`
//   width: 100%;
//   border: 3px solid #5e8c49;
//   border-radius: 12px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin: 1rem 0;
//   padding: 0.5rem;
//   gap: 1rem;
// `;

// const FlexSection = styled.section`
//   display: flex;
// `;

// const ChildSection = styled.section`
//   width: 100%;
//   border: 3px solid #5e8c49;
//   border-radius: 12px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   margin-top: 1rem;
// `;

// //Spans

// const ErrorSpan = styled.span`
//   color: red;
//   font-size: 0.9rem;
//   width: 100%;
// `;

// const PasswordErrorSpan = styled.span`
//   font-size: 0.8rem;
//   width: 100%;
//   display: flex;
//   align-items: flex-end;
// `;

export const ErrorSpan = styled.span`
  color: red;
  font-size: 0.9rem;
  width: 100%;
`;

// const PasswordErrorSpan = styled.span`
//   font-size: 0.8rem;
//   width: 100%;
//   display: flex;
//   align-items: flex-end;
// `;

// //Headings

// const Heading = styled.h1`
//   text-align: center;
//   font-size: 2rem;
//   padding-top: 1rem;
// `;

//Select

export const StyledSelect = styled.select`
  border: 1px solid #5e8c49;
  border-radius: 5px;
  margin: 0 1rem 1rem 1rem;
  color: #401d1a;
`;

// //Lists

export const StyledList = styled.ul`
  margin-top: -1rem;
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

// const AccountsList = styled.ul`
//   list-style: none;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   gap: 1rem;
// `;
