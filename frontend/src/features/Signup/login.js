import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../util/firebaseFunction'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("")
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div>
            <input type="text" placeholder="Email" />
            <input type="password " placeholder="Password" />
        </div>
    )
}

export default Login
