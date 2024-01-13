import React from 'react'
import { useState } from 'react'
import '../style.css'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'

export default function App() {
    const [dice, setDice] = useState(allNewDice())


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

    const diceElement = dice.map(die => <Die key={die.id} value={die.value} status={die.isHeld} hold={() => holdDice(die.id)}/>)
    
    return (
        <main>
            <div className='dice--container'>
                {diceElement}
            </div>
            <button className='roll-button' onClick={rollDice}>Roll</button>
        </main>
    )
}