import React from "react";
import '../Styles/Main.css'
import '../Styles/Theme.css'

import UserList from "../Components/UserList";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoom from "../Components/ChatRoom";

import ChatContextProvider from "../Context/ChatContextProvider";

const primaryTheme={
    backgroundColor:'var(--primary-color)',
}

const secondaryTheme={
    backgroundColor:'var(--secondary-color)',
}

const accentTheme={
    backgroundColor:'var(--accent-color)',
}

function Main(){
    return(
        <div className="layoutContainer">
            <ChatContextProvider>
                <div style={accentTheme} className="header">sdadsa</div>
                <div style={secondaryTheme} className="left"><UserList/></div>
                <div style={primaryTheme} className="center"><ChatRoom/></div>
                <div style={secondaryTheme} className="right"><ChatRoomList/></div>
            </ChatContextProvider>
        </div>
    )
}

export default Main