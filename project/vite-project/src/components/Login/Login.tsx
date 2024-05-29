import React, { useState } from "react";

import { Input } from './Input';

import  style from './Login.module.css';


export const Login: React.FC = () => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    console.log('rendering', username, password)

    return <div className="login">
        <h2>Log in</h2>

        <Input type="text" value={username} valueChange={setUsername} /> 
        <Input type="password" value={password} valueChange={setPassword} /> 

        <button>log in</button>

        <p className={style.information}>Lorem ipsum and more bla blah</p>

    </div>
}

export default Login;