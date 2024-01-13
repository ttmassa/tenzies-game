import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.status ? "#59E391" : "white"
    }
    return (
        <div className='die-face' style={styles}>
            <h2 className='die-number'>{props.value}</h2>
        </div>
    )
}