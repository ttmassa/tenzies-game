import React from 'react'
import { useState, useEffect } from 'react'
import '../style.css'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

/*
To-do:
- Replace numbers by dots (done)
- Display best score (localStorage) (done)
- Display time to beat (done)
*/

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [game, setGame] = useState(false)
    const [time, setTime] = useState(0)
    const [bestTime, setBestTime] = useState(JSON.parse(localStorage.getItem('bestTime')) || 0)

    // Check if the game is done
    useEffect(() => {
        if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
            setTenzies(true)
            setGame(false)
        }
    }, [dice])

    // Update the timer 
    useEffect(() => {
        if (game) {
            const intervalId = setInterval(() => {
            setTime(prevtime => prevtime + 1);
            }, 1000);
        
            return () => clearInterval(intervalId);
        }
    }, [game]);

    // Save time to localStorage
    useEffect(() => {
        if (tenzies && (time < JSON.parse(localStorage.getItem('bestTime')) || bestTime === 0)) {
            localStorage.setItem('bestTime', JSON.stringify(time))
            setBestTime(time)
        }
    }, [tenzies, bestTime, time])


    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(
                {
                    id: nanoid(),
                    value: (Math.ceil(Math.random() * 6)), 
                    isHeld: false
                }
            )
        }
        return newDice
    }

    function rollDice() {
        const updatedDice = dice.map(die => {
            return {
                ...die,
                value: die.isHeld ? die.value : (Math.ceil(Math.random() * 6)),
            }
        })
        setDice(updatedDice)
    }

    function holdDice(id) {
        const updatedDice = dice.map(die => ({
            ...die,
            isHeld: die.id === id ? !die.isHeld : die.isHeld
        }))

        setDice(updatedDice)
    }

    function resetGame() {
        setTenzies(false)
        setDice(allNewDice())
        setTime(0)
    }

    function startGame() {
        setGame(true)
        setDice(allNewDice())
    }

    const diceElement = dice.map(die => <Die key={die.id} value={die.value} status={die.isHeld} hold={() => holdDice(die.id)}/>)
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='record'>
                <h4>Best score: <span className='bestTime'>{bestTime}</span>s</h4>
                <h4 className='timer'>Current Time: <span className='time'>{time}</span>s</h4>
            </div>
            <div className='dice--container'>
                {diceElement}
            </div>
            <button 
                className='roll-button' 
                onClick={() => (tenzies ? resetGame() : game ? rollDice() : startGame())}
            >
            {
                (tenzies && "New Game") || 
                (!game && "Start Game") || 
                (game && !tenzies &&"Roll")
            }
            </button>
        </main>
    )
}