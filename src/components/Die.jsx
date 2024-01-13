import React from 'react'

export default function Die(props) {
    console.log(props.status)
    return (
        <div className={props.status ? 'die-face isHeld' : 'die-face'}>
            <h2 className='die-number'>{props.value}</h2>
        </div>
    )
}