import styled from "styled-components";

export const StyledForm = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: clamp(300px, 50vw, 600px);

  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
