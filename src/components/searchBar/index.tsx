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
        borderColor: `${theme.palette.grey[100]}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.grey[100]}`,
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
        placeholder="Search..."
        variant="outlined"
        {...register("name")}
        sx={{
          placeholder: {
            color: theme.palette.grey[100],
          },
        }}
        InputProps={{
          startAdornment: (
            <SearchOutlined
              sx={{
                color: theme.palette.grey[100],
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          ),
          style: {
            color: theme.palette.grey[100],
          },
        }}
      />
    </form>
  );
};
