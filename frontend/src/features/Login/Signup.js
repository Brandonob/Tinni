//signup page
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signUp } from '../../util/firebaseFunction'
import { getAPI } from '../../util/utils'
import { addUser } from '../Users/usersSlice'
import { Input } from '@material-ui/core';

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
        <div>
            <form onSubmit={handleSubmit}>
                <Input value={firstName} type="text" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} />
                <Input value={lastName} type="text" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} />
                <Input value={email} type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
                <Input value={password} type="text" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
                <Input value={phone} type="text" placeholder="Phone number" onChange={(e)=> setPhone(e.target.value)} />
                <button type="submit" >Submit</button>
            </form>
            {console.log(errMessage)}
        </div>
    )
}

export default Signup
