import React from 'react'
import { useState, useEffect } from 'react'
import '../style.css'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

/*
To-do:
- Replace numbers by dots (done)
- Display best score (localStorage)
- Display time to beat

*/

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
            setTenzies(true)
        }
    }, [dice])


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
    }

    const diceElement = dice.map(die => <Die key={die.id} value={die.value} status={die.isHeld} hold={() => holdDice(die.id)}/>)
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice--container'>
                {diceElement}
            </div>
            <button className='roll-button' onClick={tenzies ? resetGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}