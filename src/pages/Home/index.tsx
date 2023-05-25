import { Container, Grid } from "@mui/material";
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

      <Container sx={{ marginTop: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {foundContacts.map((contact) => (
            <Grid item xs={3} sm={4} md={4} key={contact.id + 1}>
              <ContactCard contact={contact} key={contact.id} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
