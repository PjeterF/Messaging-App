import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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

        fetchAllUsers()
    }, [])

    useEffect(()=>{
        async function fetchUsersStartingWith() {
            if(search==''){
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

        fetchUsersStartingWith()
    }, [search])

    return(
        <div>
            <div>
                <input onChange={(e)=>{setSearch(e.target.value)}}></input>
            </div>
            <div>
                {list.map((item, index)=>(
                    <div key={index}>{item.username}</div>
                ))}
            </div>
        </div>
    )
}

export default UserList