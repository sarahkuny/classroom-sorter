import React from 'react'

export default function Banner(props) {
    return (
        <div className="banner">
            <h1>Classroom Sorter</h1>
            <button className='banner-btn' onClick={props.switchToRoster} >Add Students</button>
        </div>
    )
}