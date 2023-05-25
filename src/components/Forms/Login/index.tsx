import { InputLabel, Input, Button, Alert } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "./login.validator";
import { StyledForm } from "../style";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { UserContext } from "../../../providers/user.provider";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const { loginSubmit, loading } = useContext(UserContext);

  const singIn: SubmitHandler<LoginData> = (data: LoginData) => {
    loginSubmit(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(singIn)} type="Login">
      <InputLabel htmlFor="email">Email address</InputLabel>
      <Input
        disabled={loading}
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
        disabled={loading}
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
        disabled={loading}
      >
        Submit
      </Button>
    </StyledForm>
  );
};
