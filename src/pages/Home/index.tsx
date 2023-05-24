import { Typography, Container } from "@mui/material";
import { UserContext } from "../../providers/user.provider";
import { useContext, useEffect } from "react";
import { ContactCard } from "../../components/ContactCard";

export const HomePage = () => {
  const { contactsList, foundContacts } = useContext(UserContext);

  useEffect(() => {
    contactsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography variant="h1">Welcome, to the mato</Typography>
      {foundContacts.map((contact) => (
        <ContactCard contact={contact} />
      ))}
    </Container>
  );
};
