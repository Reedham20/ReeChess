import * as Chess from "chess.js";
import {BehaviorSubject} from 'rxjs';

let promotion = 'rnb2nr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'

const chess = new Chess();

export const gameSubject = new BehaviorSubject()



function whiteMoved(x) {
    document.getElementById('tw').innerHTML='white moved'
    console.log("White Moved")
}

function blackMoved(x) {
    document.getElementById('tw').innerHTML='Black moved'
    console.log("Black Moved")

}

export function initGame() {
    updateGame()
}

export function move(from, to, x) {

    const legalMove = chess.move({from,to})

    if(legalMove) {
        updateGame()
        x === 'w' ? whiteMoved(x) : blackMoved(x)
    }
}

function updateGame() {
    const newGame = {
        board: chess.board()
    }
    gameSubject.next(newGame)
}