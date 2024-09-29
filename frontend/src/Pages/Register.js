import React from "react";
import '../Styles/Authentication.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register(){
    const navigate=useNavigate()
    const [username, setUsername]=useState('')
    const [password1, setPassword1]=useState('')
    const [password2, setpassword2]=useState('')
    const [error, setError]=useState('')

    async function onRegister(){
        if(username=='' || password1=='' || password2==''){
            setError('All fields must have a value')
            return;
        }

        if(password1!=password2){
            setError('Passwords do not match')
            return;
        }

        try{
            const user={
                username:username,
                password:password1
            }
            const response=await fetch('/api/authentication/register',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({username:username, password:password1})
                }
            )

            const data=await response.json()
            if(response.ok){
                setError('')
                navigate('/login')
            }else{
                setError(data.error)
            }
        }catch(error){
            setError(error)
        }
    }

    return(
        <div className="auth_form_container">
            <h2 className="auth_title">Registration</h2>
            <input className="auth_input" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input className="auth_input" type="password" placeholder="Password" onChange={(e)=>{setPassword1(e.target.value)}}></input>
            <input className="auth_input" type="password" placeholder="Repeat Password" onChange={(e)=>{setpassword2(e.target.value)}}></input> 
            <div className="auth_group">
                <button className="auth_submit_button" onClick={()=>{onRegister()}}>Register</button>
                <div className="auth_link" onClick={()=>{navigate('/login')}}>Login</div>
            </div>
            <div className="auth_error">{error}</div>
        </div>
    )
}

export default Register