import './App.css'
import {gameSubject, initGame, resetGame} from './Game'
import React, {useEffect, useState} from 'react'
import Board from './Board'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { doc } from "firebase/firestore"; 

function GameApp() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState([])
  const [result, setResult] = useState([])
  const {id} = useParams()
  const [initResult, setInitResult] = useState(null)
  const [loading, setLoading] =useState(true)
  const [status, setStatus] =useState('')
  const [game, setGame] =useState({})
  const [position, setPosition] = useState()
  const navigate = useNavigate()
  const sharableLink = window.location.href

  useEffect(()=>{
    let subscribe
    async function init(){

      const res = await initGame(id !== 'local' ? db.doc(`games/${id}`) : null)
      setInitResult(res)
      setLoading(false)
      if(!res){
        subscribe = gameSubject.subscribe((game)=> {
          setBoard(game.board)
          setIsGameOver(game.isGameOver)
          setResult(game.result)
          if(id !== 'local')
            setPosition(game.position)
          setStatus(game.status)
          setGame(game)
        })
      }
    }
    init()
    return ()=>subscribe && subscribe.unsubscribe()
  }, [id])

  async function copyToClipboard(){
    await navigator.clipboard.writeText(sharableLink)
  }

  if(loading){
    return 'Loading ...'
  }else if (initResult === 'notfound') {
    return 'Game not found'
  }else if (initResult === 'intruder') {
    return 'Game already in progress'
  }
  const bgClass = position === 'w' ? ' blue-pink-bg' : ' pink-blue-bg'
  return (
    <div className='app-container'>
      {isGameOver && (
        <h2 className='game-over-text'>Game Over
          <button className='game-over-button' onClick={async () => {
            await resetGame()
            navigate(`/`)
            }}>
            <span>New Game</span>
          </button>
        </h2>
        
      )}
      <div className={`board-container ${bgClass}`}>
        
      {game.opponent && game.opponent.name && (
        <span className='tag is-link userName opponent'>
            {game.opponent.name}
        </span>
        )}  
      <Board board={board} position={id!=='local'? position : 'w'}/>
      {game.member && game.member.name && (
        <span className='tag is-link userName'>
            {game.member.name}
        </span>
        )}
      </div>
      {result && <p className='result-text'>{result}</p>}
      {status === 'waiting' && (
      <div className="notification is-link share-game">
          <strong>Share the game</strong>
          <br/>
          <br/>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input type='text' name='' id='' className='input' readOnly value={sharableLink}/>
            </div>
            <div className='control'>
              <button className='button is-info' onClick={copyToClipboard}>Copy</button>
            </div>
          </div>
      </div>
      )}
      
    </div>
  );
}

export default GameApp;
