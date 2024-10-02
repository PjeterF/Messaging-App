import React, { cloneElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useChatContext } from "../Context/ChatContextProvider";
import '../Styles/ChatRoomList.css'
import '../Styles/Theme.css'

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

    const itemTheme={
        backgroundColor:'var(--primary-color)',
        borderColor:'var(--accent-color)',
        color:'var(--text-color)'
    }

    const titleTheme={
        color:'var(--text-color)'
    }

    const buttonTheme={
        backgroundColor:'var(--secondary-bg-color)',
        borderColor:'var(--accent-color)',
        color:'var(--text-color)',
    }
    
    return(
        <div className="container">
            <h2 style={titleTheme} className="title">
                Chat rooms
            </h2>
            <div onClick={createChat} style={buttonTheme} className="chatRoomList_button">
                Create
            </div>
            {list.map((item, index)=>(
                <div key={index} style={itemTheme} className="item" onClick={()=>{selectChat(item._id)}}>{item.name}</div>
            ))}
        </div>
    )
}

export default ChatList