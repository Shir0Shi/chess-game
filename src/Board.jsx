import React, {useEffect, useState} from "react";
import BoardSquare from "./BoardSquare";

export default function Board({board, position}){

    let letter = position === 'w'
    ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] 
    : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] 

    const [currBoard, setCurrBoard] = useState([])
    useEffect(()=>{
            setCurrBoard(
            position === 'w' ? board.flat() : board.flat().reverse()
        )
    }, [board, position])

    function getXYPosition(i){
        const x = position === 'w' ? i % 8 : Math.abs((i % 8) - 7)
        const y = position === 'w'
            ? Math.abs(Math.floor(i / 8) - 7)
            : Math.floor(i / 8)
        return { x, y }
    }
    function isBlack(i){
        const {x, y} = getXYPosition(i)
        return (x + y) % 2 === 1 // if true the square is white
    }
    function getPosition(i){
        const { x, y } = getXYPosition(i)
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
      x
    ]
    return `${letter}${y + 1}`
    }
    return (
    <div className="board">
        {currBoard.map((piece, i)=> (
        <div key={i} className="square">
            <BoardSquare 
            piece={piece} 
            black={isBlack(i)}
            position={getPosition(i)}
            />
        </div>))}

        <div className='grid'>
            {letter.map(l=>(<div className="grid-item" key={l}>{l}</div>))}
      </div>
    </div>
    )
}