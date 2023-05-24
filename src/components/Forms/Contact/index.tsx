import { InputLabel, Input, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledForm } from "../style";
import SendIcon from "@mui/icons-material/Send";
import { ContactData, contactSchema } from "./contact.validator";
import { useContext } from "react";
import { UserContext } from "../../../providers/user.provider";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
  });

  const { newContact, loading } = useContext(UserContext);

  const registerContact = (data: ContactData) => {
    newContact(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(registerContact)}>
      <InputLabel htmlFor="fullName">Full Name</InputLabel>
      <Input
        disabled={loading}
        id="fullName"
        aria-describedby="Full name input"
        type="fullName"
        {...register("fullName")}
      />
      {errors.fullName && (
        <Alert severity="warning">{errors.fullName?.message}</Alert>
      )}
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
      <InputLabel htmlFor="phone">Phone</InputLabel>
      <Input
        disabled={loading}
        id="phone"
        aria-describedby="Phone input"
        type="phone"
        {...register("phone")}
      />
      {errors.phone && (
        <Alert severity="warning">{errors.phone?.message}</Alert>
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
