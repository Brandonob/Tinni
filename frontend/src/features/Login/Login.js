import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../util/firebaseFunction'
import { addUser } from '../Users/usersSlice'
import { Input } from '@material-ui/core';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("")

    const history = useHistory();
    const dispatch = useDispatch();

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input value={email} type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
                <Input value={password} type="password " placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit" >Submit</button>
            </form>
            {console.log(errMessage)}
        </div>
    )
}

export default Login;
