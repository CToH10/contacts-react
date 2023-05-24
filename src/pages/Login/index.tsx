import { LoginForm } from "../../components/Forms/Login";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { StyledMain } from "./styles";
import { useState } from "react";
import { RegisterForm } from "../../components/Forms/Register";

export const LoginPage = () => {
  const [open, setOpen] = useState(false);
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
            onClick={() => setOpen(true)}
          >
            Criar conta
          </Button>
        </StyledMain>
        <LoginForm />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="Register form"
          aria-describedby="Registration for new users"
        >
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <RegisterForm />
          </DialogContent>
        </Dialog>
      </Container>
    </main>
  );
};
