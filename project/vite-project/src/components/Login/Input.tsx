import React, { useState, useEffect } from "react";

interface IInputProps {
    type: string;
    value: string;
    valueChange: (value:string) => void;
}

export const Input : React.FC<IInputProps> =({type, value, valueChange}:IInputProps) => {

    let [showPassword, setShowPassword] = useState(false);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        valueChange(event.target.value);
    };

    useEffect(() => {

        if (showPassword){
            const timer = setTimeout(() => {
                setShowPassword(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showPassword]); 

    return (
        <div>
        <input 
            type={type === "password" && showPassword? 'text':type}
            value={value}
            onChange={handleInputChange}
            ></input>
        {type !== 'password' ? null:<button onClick={handleShowPassword}>{showPassword ? '❌':'👁️'}</button>}
        </div>
    );
}
