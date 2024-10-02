import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'

const chatContext=createContext()

const initialState={
    chatRoom:{
        _id:'0',
        name:'No chat is selected',
        users:[],
        messages:[],
        owner:{}
    }
}

function chatRoomReducer(state, action){
    switch(action.type){
        case 'ADD_MESSAGE':
            return{
                ...state,
                chatRoom:{
                    ...state.chatRoom,
                    messages:[...state.chatRoom.messages, action.payload]
                }
            }
        case 'SET_CHAT':
            return {
                ...state,
                chatRoom:action.payload
            }
        case 'SET_CHATROOM_NAME':
        return {
            ...state,
            chatRoom:{
                ...state.chatRoom,
                name:action.payload
            }
        }
    }
}

function ChatContextProvider({children}){
    const [state, dispatch]=useReducer(chatRoomReducer, initialState)
    const [socket, setSocket]=useState()

    const value={state, dispatch, socket}

    useEffect(()=>{
        const sc=io('http://localhost:5000/')
        sc.on('addMessage', (message)=>{
            console.log(message)
            dispatch({
                type:'ADD_MESSAGE',
                payload:message
            })
        })

        sc.emit('joinRoom', state.chatRoom._id)

        setSocket(sc)

        return ()=>{
            sc.emit('leaveRoom', state.chatRoom._id)
            sc.disconnect()
        }
    }, [state.chatRoom._id])

    return(
        <chatContext.Provider value={value}>
            {children}
        </chatContext.Provider>
    )
}

export function useChatContext(){
    const context=useContext(chatContext)
    return context
}

export default ChatContextProvider