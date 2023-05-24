import { LoginForm } from "../../components/Forms/Login";
import { Button, Container, Typography } from "@mui/material";
import { StyledMain } from "./styles";

export const HomePage = () => {
  return (
    <main>
      <Container>
        <StyledMain>
          <Typography variant="body1">Ainda não tem conta?</Typography>
          <Button
            variant="outlined"
            size="small"
            type="button"
            color="secondary"
          >
            Criar conta
          </Button>
        </StyledMain>
        <LoginForm />
      </Container>
    </main>
  );
};
