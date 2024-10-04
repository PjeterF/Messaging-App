import React, { cloneElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useChatContext } from "../Context/ChatContextProvider";

import '../Styles/ChatRoomList.css'
import '../Styles/MessagingApp.css'

function ChatList(){
    const [list, setList]=useState([])
    const [search, setSearch]=useState('')
    const {state, dispatch}=useChatContext()

    const username=sessionStorage.getItem('username')

    async function selectChat(ID){
        const response=await fetch('/api/chatRoom/'+ID)

        const data=await response.json()
        if(response.ok){
            dispatch({
                type:'SET_CHAT',
                payload:data
            })
        }else{
            alert('Failed selecting chat')
        }
    }

    async function createChat(){
        try {
            const response=await fetch('/api/chatRoom/create', {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    users:[username],
                    name:'New chat room'
                })
            })

            if(response.ok){
                const data=await response.json()
                setList([...list, data])
                dispatch({
                    type:'SET_CHAT',
                    payload:data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        async function fetchAllChatRooms(){
            try {
                const response=await fetch('/api/chatRoom/all')
    
                const data=await response.json()
                if(response.ok){
                    setList(data)
                }else{
                    setList([])
                }
            } catch (error) {
                setList([])
                console.log(error)
            }
        }

        async function fetchChatRoomsOfAUser() {
            try {
                const response=await fetch('/api/chatRoom/user/'+username)

                if(response.ok){
                    const data=await response.json()
                    setList(data)
                }else{
                    setList([])
                }
            } catch (error) {
                setList([])
                console.log(error)
            }
        }

        fetchChatRoomsOfAUser()
    }, [state.chatRoom.name])

    const listItemStyle={
        cursor:'pointer',
        padding:'5px'
    }
    
    return(
        <div style={{borderTop:'1px solid black'}} className="container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontSize:'25px', fontWeight:'bold', marginBottom:'5px'}}>Chat rooms</div>
                <img onClick={createChat} className="icon" style={{height:'20px', cursor:'pointer'}}  src="https://i.ibb.co/sVnYctZ/plus-icon.png"></img>
            </div>
            <div className="list_container">
                {list.map((item, index)=>(
                    <div style={listItemStyle} key={index} className="list_item" onClick={()=>{selectChat(item._id)}}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}

export default ChatList