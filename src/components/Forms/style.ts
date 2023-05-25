import styled from "styled-components";

interface iForm {
  type?: "Register" | "Login" | "Contact";
}

export const StyledForm = styled.form<iForm>`
  ${(props) =>
    props.type !== "Login"
      ? `  width: clamp(250px, 40vw, 450px);
      `
      : `position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: clamp(300px, 50vw, 600px);
  `}

  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
