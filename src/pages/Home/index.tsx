import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import { Mail, PhoneAndroid, Delete } from "@mui/icons-material";
import { UserContext } from "../../providers/user.provider";
import { useContext, useEffect } from "react";

export const HomePage = () => {
  const { contactsList, foundContacts } = useContext(UserContext);

  useEffect(() => {
    contactsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const since = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `Since ${monthNames[month]}/${year}`;
  };

  return (
    <Container>
      <Typography variant="h1">Welcome, to the mato</Typography>
      {foundContacts.map((contact) => (
        <Card
          sx={{ maxWidth: 300, minWidth: 200 }}
          key={contact.id}
          id={contact.id}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {contact.fullName}
            </Typography>
            <Typography>{contact.phone}</Typography>
            <Typography variant="body2">{since(contact.registered)}</Typography>
          </CardContent>
          <CardActions sx={{ width: 255 }}>
            <Button
              type="button"
              color="secondary"
              size="small"
              rel="noopener nonreferrer"
              href={`mailto:${contact.email}`}
              endIcon={<Mail />}
              aria-label="Button to send email to contact"
            >
              Email
            </Button>
            <Button
              type="button"
              size="small"
              rel="noopener nonreferrer"
              aria-label="Delete contact"
            >
              <Delete />
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};
