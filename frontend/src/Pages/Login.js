import React from "react";
import '../Styles/Authentication.css'
import '../Styles/Theme.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const navigate=useNavigate()
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [error, setError]=useState('')

    async function onLogin(){
        if(username=='' || password==''){
            setError('All fields must have a value')
            return
        }

        try {
            const response=await fetch('/api/authentication/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username, password:password})
            })

            const data=await response.json()
            console.log(data)
            if(response.ok){
                sessionStorage.setItem('username', data.username)
                sessionStorage.setItem('userID', data._id)

                navigate('/chatRoom')
                setError('')
            }else{
                setError(data.error)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="auth_form_container">
            <h2 className="auth_title text">Log In</h2>
            <input className="auth_input input" placeholder="Username"  onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input className="auth_input input" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <div className="auth_group">
                <button className="auth_submit_button button" onClick={()=>{onLogin()}}>Log In</button>
                <div className="auth_link text" onClick={()=>{navigate('/register')}}>Create an account</div>
            </div>
            <div className="auth_error">{error}</div>
        </div>
    )
}

export default Login