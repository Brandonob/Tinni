// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { login, config, uiConfig } from '../../util/firebaseFunction'
// import { addUser } from '../Users/usersSlice'
// import { Input } from '@material-ui/core';
// import firebase from 'firebase/app'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { getAPI } from '../../util/utils'


// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errMessage, setErrMessage] = useState("")

//     const history = useHistory();
//     const dispatch = useDispatch();
//     const API = getAPI()

//     // useEffect(() => {
//     //     if (!firebase.apps.length) {
//     //         firebase.initializeApp(config);
//     //       }
//     // },[])
//     useEffect(() => {
//         firebase.auth().onAuthStateChanged(user => {
//           if(user !== null) {
//               signInAuthUser(user)
//           }
//         })
//       }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let res = await login(email, password)
//             console.log("you have succesfully logged in");
//             dispatch(addUser(res.user.uid));
//             history.push("/home")

//         } catch (error) {
//             setErrMessage(error.message)
//         }
//     }

//     const signInAuthUser = async (currentUser) => {
//         try {
//             let {
//                 displayName,
//                 email,
//                 phoneNumber,
//                 photoURL,
//                 uid
//             } = currentUser.providerData[0]
//             await axios.post(`${API}/users/`, {    //signup auth user
//                 id: uid,
//                 first_name: displayName,
//                 last_name: "",
//                 email: email,
//                 password: "",
//                 phone: phoneNumber,
//                 location: "",
//                 profile_pic: photoURL
//             });
//         } catch (error) {
            
//         }
//     }


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Input value={email} type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
//                 <Input value={password} type="password " placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
//                 <button type="submit" >Submit</button>
//             </form>
//             {/* <button onClick={() => firebase.auth().signOut()}>Sign out</button> */}
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//             {console.log(errMessage)}
//             {console.log(firebase.auth().currentUser)}
//         </div>
//     )
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, config, uiConfig } from '../../util/firebaseFunction'
import { addUser, addInfo } from '../Users/usersSlice'
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAPI } from '../../util/utils'
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

const Copyright = () => {
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("")
    
    
    const history = useHistory();
    const dispatch = useDispatch();
    const API = getAPI()
    const classes = useStyles();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
          if(user !== null) {
            signInAuthUser(user)
          }
        })
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await login(email, password)
            console.log("you have succesfully logged in");
            dispatch(addUser(res.user.uid));
            debugger
            history.push("/home")

        } catch (error) {
            setErrMessage(error.message)
        }
    }

    const signInAuthUser = async (currentUser) => {
        try {
            let {
                displayName,
                email,
                phoneNumber,
                photoURL,
                uid
            } = currentUser.providerData[0]
            await axios.post(`${API}/users/`, {    //signup auth user
                id: uid,
                first_name: displayName,
                last_name: "",
                email: email,
                password: "",
                phone: phoneNumber,
                location: "",
                profile_pic: photoURL
            });
        } catch (error) {
            console.log()
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=> setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=> setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <Box mt={8}>
        <Copyright />
      </Box>
    {console.log(errMessage)}
    </Container>
  );
}

export default Login;
