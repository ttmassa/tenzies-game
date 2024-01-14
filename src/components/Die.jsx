import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.status ? "#59E391" : "white"
    }

    function createDots(nbr) {
        const dotsArray = []
        for (let i = 1; i < nbr + 1; i++) {
            dotsArray.push(<div className={`dot dot${i}`}></div>)
        }
        return dotsArray
    }

    return (
        <div className={`die-face die-face${props.value}`} style={styles} onClick={props.hold}>
            {createDots(props.value)}
        </div>
    )
}