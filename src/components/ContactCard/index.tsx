import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Mail, Delete } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { iContact } from "../../providers/user.provider";
import { red } from "@mui/material/colors";

interface iContactProps {
  contact: iContact;
}

export const ContactCard = ({ contact }: iContactProps) => {
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
      <CardActions
        sx={{
          width: 255,
          justifyContent: {
            xs: "center",
            sm: "end",
            md: "end",
          },
        }}
      >
        <Button
          type="button"
          color="secondary"
          size="small"
          rel="noopener nonreferrer"
          href={`mailto:${contact.email}`}
          aria-label="Button to send email to contact"
        >
          <Mail />
        </Button>
        <Button
          type="button"
          size="small"
          rel="noopener nonreferrer"
          aria-label="Button to edit contact"
        >
          <ModeEditIcon />
        </Button>
        <Button
          type="button"
          size="small"
          rel="noopener nonreferrer"
          aria-label="Delete contact"
          sx={{ color: red[600] }}
        >
          <Delete />
        </Button>
      </CardActions>
    </Card>
  );
};
