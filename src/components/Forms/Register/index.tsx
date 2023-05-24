import { InputLabel, Input, Button, Alert } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "./register.validator";
import { StyledForm } from "../style";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { UserContext } from "../../../providers/user.provider";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const { registerSubmit, loading } = useContext(UserContext);

  const sendRegister: SubmitHandler<RegisterData> = ({
    confirmPassword,
    ...data
  }: RegisterData) => {
    registerSubmit(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(sendRegister)}>
      <InputLabel htmlFor="fullName">Full Name</InputLabel>
      <Input
        id="fullName"
        aria-describedby="Full name input"
        type="text"
        {...register("fullName")}
      />
      {errors.fullName && (
        <Alert severity="warning">{errors.fullName?.message}</Alert>
      )}
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
      <InputLabel htmlFor="phone">Phone</InputLabel>
      <Input
        id="phone"
        aria-describedby="Phone input"
        type="text"
        {...register("phone")}
      />
      {errors.phone && (
        <Alert severity="warning">{errors.phone?.message}</Alert>
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
      <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
      <Input
        id="confirmPassword"
        aria-describedby="Password confirmation input"
        type="password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <Alert severity="warning">{errors.confirmPassword?.message}</Alert>
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
