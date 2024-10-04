import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function PopUp({children, trigger}){
    const [isOpen, setIsOpen]=useState(false)
    const [position, setPosition]=useState([0, 0])
    const triggerRef=useRef(null)

    const triggerElement = React.cloneElement(trigger, {
        onClick: handleOpen,
        ref:triggerRef
    });

    function handleOpen(){
        setIsOpen(true)
        const rect=triggerRef.current.getBoundingClientRect()
        setPosition([rect.left, rect.bottom])
    }

    return(
        <div>
            {triggerElement}
            {isOpen && (
                <div style={{ position: 'fixed', left: position[0], top: position[1], background: 'white', border: '1px solid black', padding: '10px', zIndex:'1'}}>
                    <button onClick={()=>{setIsOpen(false)}}>Close</button>
                    {children}
                </div>
            )}
        </div>
    )
}

export default PopUp