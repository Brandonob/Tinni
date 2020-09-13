//signup page
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { signUp } from '../../util/firebaseFunction'
// import { getAPI } from '../../util/utils'
// import { addUser } from '../Users/usersSlice'
// import { Input } from '@material-ui/core';

// const Signup = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [errMessage, setErrMessage] = useState("");

//     const history = useHistory();
//     const dispatch = useDispatch();
//     const API = getAPI();

//     const handleSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             // debugger
//             let res = await signUp(email, password)
//             await axios.post(`${API}/users/`, {
//                 id: res.user.uid,
//                 first_name: firstName,
//                 last_name: lastName,
//                 email: email,
//                 password: password,
//                 phone: phone,
//                 location: "",
//                 profile_pic:""
//             });
//             setErrMessage("Thank you for signing up. Redirecting!");
//             dispatch(addUser(res.user.uid));
//             history.push("/home")
            
//         } catch (error) {
//             setErrMessage(error.message)
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Input value={firstName} type="text" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} />
//                 <Input value={lastName} type="text" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} />
//                 <Input value={email} type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
//                 <Input value={password} type="text" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
//                 <Input value={phone} type="text" placeholder="Phone number" onChange={(e)=> setPhone(e.target.value)} />
//                 <button type="submit" >Submit</button>
//             </form>
//             {console.log(errMessage)}
//         </div>
//     )
// }

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signUp } from '../../util/firebaseFunction'
import { getAPI } from '../../util/utils'
import { addUser } from '../Users/usersSlice'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from "react-router-dom"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const API = getAPI();
    const classes = useStyles();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // debugger
            let res = await signUp(email, password)
            await axios.post(`${API}/users/`, {
                id: res.user.uid,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                phone: phone,
                location: "",
                profile_pic:""
            });
            setErrMessage("Thank you for signing up. Redirecting!");
            dispatch(addUser(res.user.uid));
            history.push("/home")
            
        } catch (error) {
            setErrMessage(error.message)
        }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e)=> setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e)=> setLastName(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=> setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=> setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={phone}
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone number"
                    id="phone"
                    onChange={(e)=> setPhone(e.target.value)}
                    autoComplete="phone"
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <NavLink to={"/login"}>
            <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </NavLink>
              
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup
