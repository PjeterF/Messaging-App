import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ChatList(){
    const [list, setList]=useState([])
    const [search, setSearch]=useState('')

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

        fetchAllChatRooms()
    }, [])

    return(
        <div>
            <div>
                <input onChange={(e)=>{setSearch(e.target.value)}}></input>
            </div>
            <div>
                {list.map((item, index)=>(
                    <div key={index}>{item.name}</div>
                ))}
            </div>
        </div>
    )
}

export default ChatList