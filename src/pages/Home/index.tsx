import { Typography, Container } from "@mui/material";
import { UserContext } from "../../providers/user.provider";
import { useContext, useEffect } from "react";
import { ContactCard } from "../../components/ContactCard";
import { NavBar } from "../../components/NavBar";

export const HomePage = () => {
  const { contactsList, foundContacts } = useContext(UserContext);

  useEffect(() => {
    contactsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        {foundContacts.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </Container>
    </>
  );
};
