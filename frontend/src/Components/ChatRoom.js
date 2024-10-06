import React, { useState } from "react";
import { useChatContext } from "../Context/ChatContextProvider";
import { useEffect } from "react";
import { useRef } from "react";
import PopUp from "./PopUp";

import '../Styles/ChatRoom.css'
import '../Styles/MessagingApp.css'

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

    async function deleteChatRoom(){
        const response=await fetch('/api/chatRoom/delete', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'       
            },
            body:JSON.stringify({chatRoomID:state.chatRoom._id})
        })

        if(response.ok){
            dispatch({
                type:'SET_CHAT',
                payload:{
                    _id:'0',
                    name:'No chat is selected',
                    users:[],
                    messages:[],
                    owner:{}
                }
            })
        }
    }

    useEffect(()=>{
        setChatRoomName(state.chatRoom.name)
    }, [state.chatRoom])

    return(
        <div className="chat_room_container">
            <div className="chat_room_header">
                    {state.chatRoom._id!=0 ? (
                        <div className="input_container">
                            <input className="input_field" value={chatRoomName} onBlur={setName} onChange={(e)=>{setChatRoomName(e.target.value)}}></input>
                        </div>
                       ):(
                        <div>No chat is selected</div>
                    )}
                    <div style={{display:'flex'}}>
                        <img onClick={deleteChatRoom} style={{cursor:'pointer'}} className="icon" src="https://i.ibb.co/Q8qGHm9/recycle-bin-icon.png"></img>
                        <PopUp trigger={<img onClick={deleteChatRoom} style={{cursor:'pointer'}} className="icon" src="https://i.ibb.co/S0zx94t/ellipsis-v-icon.png"></img>}>
                            {state.chatRoom.users.map((user, index)=>{
                                return(
                                    <div style={{display:"flex", flexDirection:"column"}}>
                                        <div>
                                            <div>{user.username}</div>
                                            <div>kick</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </PopUp>
                        
                    </div>
            </div>
            <div ref={scrollReference} className="chat_room_message_list">
                {state.chatRoom.messages.map((item, index)=>{
                    return(
                        item.user.username==username ?(
                            <div className="message_box right" key={index}>
                                <div className="message_username right">{item.user.username}</div>
                                <div className="message_content right">{item.content}</div>
                            </div>
                        ):(
                            <div className="message_box left" key={index}>
                                <div className="message_username left">{item.user.username}</div>
                                <div className="message_content left">{item.content}</div>
                            </div>
                        )
                    )
                })}
            </div>
            <div className="chat_room_input">
                <div className="message_input_container">
                    <input className="message_input" style={{width:'100%'}} ref={inputReference} placeholder="Enter message" type="text" onChange={(e)=>{setMessage(e.target.value)}}></input>
                    <img style={{cursor:'pointer'}} onClick={sendMessage} className="icon" src="https://i.ibb.co/K9zsBnf/direction-corner-top-right-icon.png"></img>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom