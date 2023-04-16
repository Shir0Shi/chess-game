import React from "react";

export default function Square({children, black}){
    const bgClass = black ? 'black' : 'white'
    return (
    <div className={`${bgClass} board-square`}>
        {children}
    </div>)
}