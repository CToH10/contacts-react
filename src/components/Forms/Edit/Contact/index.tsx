import { InputLabel, Input, Button, Alert } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledForm } from "../../style";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { EditContactData, editProfileSchema } from "../edit.validators";
import { UserContext } from "../../../../providers/user.provider";
import { iProfileProps } from "../../../ContactCard";

export const EditContact = ({ contact }: iProfileProps) => {
  const { editContact, loading } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditContactData>({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone,
    },
  });

  const sendEdit: SubmitHandler<EditContactData> = (data: EditContactData) => {
    editContact(contact.id, data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(sendEdit)} type="Register">
      <InputLabel htmlFor="fullName">Full Name</InputLabel>
      <Input
        disabled={loading}
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
        type="text"
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
