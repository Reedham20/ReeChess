import * as Chess from "chess.js";
import {BehaviorSubject} from 'rxjs';

let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'

const chess = new Chess( );

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

export function handleMove(from, to,x) {
    const promotions = chess.moves({verbose: true}).filter(m => m.promotion)
    console.table(promotions)
    if(promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = {from, to, color:promotions[0].color}
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    if(!pendingPromotion){
        move(from,to,x)
    }
}

export function move(from, to, x, promotion) {
    let tempMove = {from,to}
    if(promotion) {
        tempMove.promotion = promotion
    }

    const legalMove = chess.move(tempMove)

    if(legalMove) {
        updateGame()
        x === 'w' ? whiteMoved(x) : blackMoved(x)
    }
}

function updateGame(pendingPromotion) {
    const newGame = {
        board: chess.board(), pendingPromotion
    }
    gameSubject.next(newGame)
}