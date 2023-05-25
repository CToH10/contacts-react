import { InputLabel, Input, Button, Alert, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledForm } from "../../style";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { UserContext } from "../../../../providers/user.provider";
import { EditProfileData, editProfileSchema } from "../edit.validators";
import { since } from "../../../../utils/since.getDate";

export const EditProfile = () => {
  const { editProfile, loading, user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileData>({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    },
  });

  const sendEdit: SubmitHandler<EditProfileData> = (data: EditProfileData) => {
    editProfile(data);
  };

  return (
    <>
      <Typography variant="body2">{since(user.registered)}</Typography>
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
          variant="contained"
          size="large"
          color="secondary"
          endIcon={<SendIcon />}
          disabled={loading}
        >
          Submit
        </Button>
      </StyledForm>
    </>
  );
};
