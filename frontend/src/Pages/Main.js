import React from "react";
import '../Styles/Main.css'

import UserList from "../Components/UserList";
import ChatRoomList from "../Components/ChatList";

function Main(){
    return(
        <div className="layoutContainer">
            <div className="header">sdadsa</div>
            <div className="left"><UserList/></div>
            <div className="center">sdadsa</div>
            <div className="right"><ChatRoomList/></div>
            <div className="footer">sdadsa</div>
        </div>
    )
}

export default Main