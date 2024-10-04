import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PopUp from "./PopUp";
import {useChatContext} from "../Context/ChatContextProvider";

import '../Styles/MessagingApp.css'

function UserList(){
    const {state, dispatch, socket}=useChatContext()
    const [list, setList]=useState([])
    const [search, setSearch]=useState('')

    async function addUser(username){
        try {
           const response=await fetch('/api/chatRoom/addUser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username, chatRoomID:state.chatRoom._id})
           })

           const data=await response.json()
           if(response.ok){
                dispatch({
                    type:'ADD_USER',
                    payload:data._id
                })
           }else{
                alert(JSON.stringify(data))
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        async function fetchAllUsers(){
            try {
                const response=await fetch('/api/user/all')
    
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

        async function fetchList() {
            if(search==''){
                fetchAllUsers()
                return
            }

            try {
                const response=await fetch('/api/user/startingWith/'+search)
    
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

        fetchList()
    }, [search])

    return(
        <div styl className="container">
            <div className="input_container">
                <img width='20px' src="https://i.ibb.co/4pmnR9m/search-icon.png"></img>
                <input className="input_field" placeholder="Search"onChange={(e)=>{setSearch(e.target.value)}}></input>
            </div>
            <div className="list_container">
                {list.map((item, index)=>{
                    return(
                        <div className="list_item" key={index}>
                            <div className="user">
                                <div className="user_picture_container">
                                    {item.pictureURL==null ?(
                                        <PopUp trigger={<img className="user_picture" src="https://placehold.co/800?text=No+Image&font=roboto"></img>}>
                                            <div onClick={()=>{addUser(item.username)}}>Add</div>
                                        </PopUp>
                                    ):(
                                        <PopUp trigger={<img className="user_picture" src={item.pictureURL}></img>}>
                                            <div onClick={()=>{addUser(item.username)}}>Add</div>
                                        </PopUp>
                                    )}
                                </div>
                                <div className="user_username">
                                    {item.username}
                                </div>

                            </div>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserList