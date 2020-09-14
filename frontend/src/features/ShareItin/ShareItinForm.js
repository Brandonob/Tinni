import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { selectCurrentItin } from "../CurrentItinerary/currentItinerarySlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ShareItinForm() {
  const classes = useStyles();

  const [replyEmail, setReplyEmail] = useState("");
  const [replyName, setReplyName] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("Hey there");
  const currentItinerary = useSelector(selectCurrentItin);

  useEffect(() => {
    debugger;
    createMessage();
  }, []);

  const convertTimeDisplay = (time) => {
    let timeRes = time.split(":");

    if (parseInt(timeRes[0]) > 12) {
      timeRes[0] = parseInt(timeRes[0]) - 12;
      timeRes[2] = "pm";
    } else {
      timeRes[2] = "am";
    }
    if (parseInt(timeRes[1]) === 0) {
      parseInt((timeRes[1] = "00"));
    }
    return timeRes[0] + ":" + timeRes[1] + timeRes[2];
  };

  const createMessage = () => {
    let newMessage = "";
    currentItinerary.forEach((item, i) => {
      newMessage +=
        `Stop:${i + 1}
    ${item.body.name}
    From: ${convertTimeDisplay(item.body.time.startTime)}
    To:${convertTimeDisplay(item.body.time.startTime)}
    address ${item.body.address}
    https://www.google.com/maps/search/?api=1&query=${item.body.latitude},${
          item.body.longitude
        }
    ` + "/n";
    });

    setMessage(newMessage);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    emailjs.send(
      "gmail",
      "template_7yqqy6l",
      {
        from_name: `${fromName}`,
        to_name: `${replyName}`,
        message: `${message}`,
        to_email: `${replyEmail}`,
      },
      "user_a2eO6xZSmNLBjX2Day31P"
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Invite
        </Typography>
        <form className={classes.form} onSubmit={handleForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="yourname"
                name="yourname"
                variant="outlined"
                required
                fullWidth
                id="yourName"
                label="Your Name"
                onChange={(e) => setFromName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="sendername"
                name="sendername"
                variant="outlined"
                required
                fullWidth
                id="senderName"
                label="Reciever Name"
                onChange={(e) => setReplyName(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Reciever Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setReplyEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Share
          </Button>
        </form>
      </div>
    </Container>
  );
}
