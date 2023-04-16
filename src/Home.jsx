import React, {useState} from "react";
import {auth, db} from './firebase'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore"; 

export default function Home(){
    const {currentUser} = auth
    const newGameOptions = [
        {label: 'Black', value: 'b'},
        {label: 'White', value: 'w'},
        {label: 'Random', value: 'r'},
    ]
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

    function handlePlayOnline(){
        setShowModal(!showModal)
    }

    async function startOnlineGame(startingPiece){
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'random' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        console.log("Doc set")
        navigate(`/game/${game.gameId}`)
    }

    return(
    <>
        <div className="columns home">
            <div className="column has-background-primary home-columns">
                <button className="button is-link">
                    Play Locally
                </button>
            </div>
            <div className="column has-background-link home-columns">
            <button className="button is-primary" onClick={handlePlayOnline}>
                Play Online
            </button>
            </div>
        </div>
        <div className={`modal ${showModal ? 'is-active': ''}`}>
            <div className="model-background"></div>
            <div className="card">
                <div className="card-content">
                    Please select the piece you want to start
                </div>
            
                <footer className="card-footer"> 
                    {newGameOptions.map(({label, value}) => (
                        <span 
                            className="card-footer-item pointer" 
                            key={value} 
                            onClick={()=> startOnlineGame(value)}>
                            {label}
                        </span>
                    ))}

                </footer>
            </div>
            <button className="modal-close is-large" onClick={handlePlayOnline}></button>
        </div>
        
    </>
    )
}