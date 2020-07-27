import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, config, uiConfig } from '../../util/firebaseFunction'
import { addUser } from '../Users/usersSlice'
import { Input } from '@material-ui/core';
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAPI } from '../../util/utils'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("")

    const history = useHistory();
    const dispatch = useDispatch();
    const API = getAPI()

    // useEffect(() => {
    //     if (!firebase.apps.length) {
    //         firebase.initializeApp(config);
    //       }
    // },[])
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
            
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input value={email} type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
                <Input value={password} type="password " placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit" >Submit</button>
            </form>
            {/* <button onClick={() => firebase.auth().signOut()}>Sign out</button> */}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {console.log(errMessage)}
            {console.log(firebase.auth().currentUser)}
        </div>
    )
}

export default Login;
