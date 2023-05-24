import { Typography } from "@mui/material";
import { UserContext } from "../../providers/user.provider";
import { useContext, useEffect } from "react";

export const HomePage = () => {
  const { contactsList, foundContacts } = useContext(UserContext);

  useEffect(() => {
    contactsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h1">Welcome, to the mato</Typography>
      {foundContacts.map((contact) => (
        <li key={contact.id}>{contact.fullName}</li>
      ))}
    </>
  );
};
