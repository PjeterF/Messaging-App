import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../Styles/UserInfo.css'
import '../Styles/Theme.css'

function UserInfo(){
    const username=sessionStorage.getItem('username')

    const logOutTheme={
        backgroundColor:'var(--error-color)',
        color:'var(--text-color)',
        borderColor:'black'
    }

    return(
        <div className="topbar_container">
            <div className="topbar_left">{username}</div>
            <div style={logOutTheme} className="topbar_logout">Log out</div>
        </div>
    )
}

export default UserInfo