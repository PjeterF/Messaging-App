import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import '../Styles/UserList.css'

function UserList(){
    const [list, setList]=useState([])
    const [search, setSearch]=useState('')

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
        <div>
            <div>
                <input onChange={(e)=>{setSearch(e.target.value)}}></input>
            </div>
            <div className="user_list_container">
                {list.map((item, index)=>{
                    return(
                        <div>
                            <div className="user_list_image_container" key={index}>
                                <img className="user_list_image" src="https://i.ibb.co/jg9ttrh/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp"></img>
                            </div>
                            <div className="user_list_username">{item.username}</div>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default UserList