import React from "react";
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from "react";

function RouteProtector({children}){
    const [authenticated, setAuthenticated]=useState(false)

    useEffect(()=>{
        function isAuthenticated(){
            const token=sessionStorage.getItem('token')
            if(!token){
                return setAuthenticated(false)
            }
    
            const decoded=jwtDecode(token)
            if(decoded.exp<Date.now()/1000){
                return setAuthenticated(false)
            }
    
            return setAuthenticated(true)
        }

       isAuthenticated() 
    }, [])

    return(
        <div>
            {authenticated?(
                children
            ):(
                <div>
                    Not authorized
                </div>
            )}
            
        </div>
    )
}

export default RouteProtector