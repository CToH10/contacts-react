import { InputLabel, Input, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "./login.validator";
import { StyledForm } from "../style";
import SendIcon from "@mui/icons-material/Send";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const singIn = (data: LoginData) => {
    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(singIn)}>
      <InputLabel htmlFor="email">Email address</InputLabel>
      <Input
        id="email"
        aria-describedby="Email address input"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <Alert severity="warning">{errors.email?.message}</Alert>
      )}
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id="password"
        aria-describedby="Password input"
        type="password"
        {...register("password")}
      />
      {errors.password && (
        <Alert severity="warning">{errors.password?.message}</Alert>
      )}
      <Button
        type="submit"
        variant="outlined"
        size="large"
        endIcon={<SendIcon />}
        // disabled={loading}
      >
        Submit
      </Button>
    </StyledForm>
  );
};
