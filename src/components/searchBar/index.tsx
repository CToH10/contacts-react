import { useForm } from "react-hook-form";
import { useTheme, TextField, styled } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { SearchData } from "./search.validator";
import { UserContext } from "../../providers/user.provider";
import { useContext } from "react";

const StyledSearchInput = styled(TextField)(({ theme }: any) => {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.625rem",
      fontSize: "1rem",
      "& fieldset": {
        borderColor: `${theme.palette.text.secondary}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.primary}`,
      },
    },
  };
});

export const SearchBar = () => {
  const { contactsList } = useContext(UserContext);
  const theme = useTheme();

  const { register, handleSubmit } = useForm<SearchData>({});

  const search = (data: SearchData) => {
    const { name } = data;
    name ? contactsList(name) : contactsList();
  };

  return (
    <form onSubmit={handleSubmit(search)}>
      <StyledSearchInput
        placeholder={"Search..."}
        variant="outlined"
        {...register("name")}
        InputProps={{
          startAdornment: (
            <SearchOutlined
              sx={{
                color: theme.palette.text.secondary,
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          ),
        }}
      />
    </form>
  );
};
