import React, { useState } from "react";
import { useChatContext } from "../Context/ChatContextProvider";
import { useEffect } from "react";
import { useRef } from "react";

import '../Styles/ChatRoom.css'
import '../Styles/Theme.css'

function ChatRoom(){
    const {state, dispatch, socket}=useChatContext()
    const [message, setMessage]=useState('')
    const [chatRoomName, setChatRoomName]=useState('')
    const scrollReference=useRef(null)
    const inputReference=useRef(null)

    const username=sessionStorage.getItem('username')
    const userID=sessionStorage.getItem('userID')
    
    async function sendMessage(){
        try {
            const body={
                chatRoomID:state.chatRoom._id,
                username:username,
                content:message
            }

            const response=await fetch('/api/chatRoom/message',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(body)
                }
            )

            if(response.ok){
                const data=await response.json();
                socket.emit('message', {chatRoomID:state.chatRoom._id, message:data})
                setMessage('')
                inputReference.current.value=''
                setTimeout(()=>{scrollReference.current.scrollTop=scrollReference.current.scrollHeight}, 10)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function setName(){
        try {
            const body={
                chatRoomID:state.chatRoom._id,
                newName:chatRoomName
            }

            const response=await fetch('/api/chatRoom/name',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(body)
                }
            )

            if(response.ok){
                dispatch({
                    type:'SET_CHATROOM_NAME',
                    payload:chatRoomName
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        setChatRoomName(state.chatRoom.name)
    }, [state.chatRoom])

    const primaryTheme={
        backgroundColor:'var(--msg-color-2)',
        color:'var(--text-color)',
    }
    
    const secondaryTheme={
        backgroundColor:'var(--secondary-color)',
        color:'var(--text-color)',
        borderColor:'var(--primary-bg-color)',
    }
    
    const accentTheme={
        backgroundColor:'var(--secondary-bg-color)',
        color:'var(--text-color)',
        borderColor:'var(--primary-bg-color)',
    }

    const msgStyle={
        borderStyle:'solid',
        borderRadius:'5px',
        padding:'5px',
        borderWidth:'2px'
    }

    const leftTheme={
        ...accentTheme,
        ...msgStyle
    }

    const rightTheme={
        ...secondaryTheme,
        ...msgStyle
    }

    return(
        <div className="chatRoom_container">
            <div className="chatRoom_info_container text">
                <h2>
                    {state.chatRoom._id!=0 ? (
                        <input value={chatRoomName} onBlur={setName} onChange={(e)=>{setChatRoomName(e.target.value)}} className="chatRoom_info_title text"></input>
                    ):(
                        <div className="text">No chat is selected</div>
                    )}
                </h2>
            </div>
            <div ref={scrollReference} className="chatRoom_list_container">
                {state.chatRoom.messages.map((item, index)=>{
                    return(
                        item.user.username==username ?(
                            <div className="chatRoom_list_item right" key={index}>
                                <div className="text">{item.user.username}</div>
                                <div style={rightTheme}>{item.content}</div>
                            </div>
                        ):(
                            <div className="chatRoom_list_item left" key={index}>
                                <div className="text">{item.user.username}</div>
                                <div style={leftTheme}>{item.content}</div>
                            </div>
                        )
                    )
                })}
            </div>
            <div className="chatRoom_input_container">
                <input ref={inputReference} style={primaryTheme} className="chatRoom_input_input" placeholder="Enter message" type="text" onChange={(e)=>{setMessage(e.target.value)}}></input>
                <button style={primaryTheme} className="chatRoom_input_button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatRoom