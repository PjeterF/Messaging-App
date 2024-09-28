import React from "react";
import '../Styles/Authentication.css'
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate()

    async function onLogin(){

    }

    return(
        <div className="auth_form_container">
            <h2 className="auth_title">Log In</h2>
            <input className="auth_input" placeholder="Username"></input>
            <input className="auth_input" type="password" placeholder="Password"></input>
            <div className="auth_group">
                <button className="auth_submit_button" onClick={()=>{onLogin()}}>Log In</button>
                <div className="auth_link" onClick={()=>{navigate('/register')}}>Create an account</div>
            </div>
        </div>
    )
}

export default Login