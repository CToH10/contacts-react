import { LoginForm } from "../../components/Forms/Login";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { StyledSection } from "./styles";
import { useState } from "react";
import { RegisterForm } from "../../components/Forms/Register";

export const LoginPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <Container
        sx={{
          height: "100vh",
          backgroundColor: "rgba(207, 216, 220, 0.1)",
          backdropFilter: "blur(4px)",
          zIndex: 2,
          position: "relative",
        }}
      >
        <StyledSection>
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
        </StyledSection>
        <LoginForm />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="Register form"
          aria-describedby="Registration for new users"
        >
          <DialogTitle color="secondary">Register</DialogTitle>
          <DialogContent>
            <RegisterForm />
          </DialogContent>
        </Dialog>
      </Container>
    </main>
  );
};
