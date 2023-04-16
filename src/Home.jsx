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

    function handlePlayLocal(){
        navigate(`/game/local`)
    }

    async function startOnlineGame(startingPiece){
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        navigate(`/game/${game.gameId}`)
    }

    return(
    <>
        <div className="columns home">
            <div className="column home-columns has-backg-pink">
                <button className="button  has-backg-blue" onClick={handlePlayLocal}>
                    Play Locally
                </button>
            </div>
            <div className="column home-columns has-backg-blue">
            <button className="button  has-backg-pink" onClick={handlePlayOnline}>
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