import React from "react";
import '../Styles/Layout.css'

import UserList from "../Components/UserList";
import ChatRoomList from "../Components/ChatRoomList";
import ChatRoom from "../Components/ChatRoom";
import UserInfo from "../Components/UserInfo";

import ChatContextProvider from "../Context/ChatContextProvider";
import PopUp from "../Components/PopUp";

function Main(){
    return(
        <div className="page_container">
            <div className="chatRoom_layout_container">
                <ChatContextProvider>
                    <div style={{backgroundColor:'white', borderLeft:'1px solid black'}} className="header"><UserInfo/></div>
                    <div style={{backgroundColor:'lightsalmon', borderRight:'1px solid black'}} className="left"><UserList/></div>
                    <div style={{backgroundColor:'white'}} className="center"><ChatRoom/></div>
                    <div style={{backgroundColor:'lightsalmon', borderLeft:'1px solid black'}} className="right"><ChatRoomList/></div>
                </ChatContextProvider>
            </div>
                
        </div>
        
    )
}

export default Main