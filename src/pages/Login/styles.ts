import { styled } from "styled-components";

export const StyledSection = styled.section`
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);

  width: clamp(300px, 40vw, 400px);

  display: flex;
  justify-content: space-between;
`;
