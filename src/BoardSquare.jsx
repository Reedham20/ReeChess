import React from "react";
import Square from "./Square.jsx"
import Piece from "./Piece.jsx";
import {useDrop} from 'react-dnd'
import {move} from './Game'

export default function BoardSquare({piece, black, position}) {
    const [ , drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_')
            move(fromPosition, position, item.id.split('_')[2])}
    })

    return (
        <div className="board-square" ref={drop}>
            <Square black={black}>
                {piece && <Piece piece={piece} position={position} />}
            </Square>
        </div>
    )
}