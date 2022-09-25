import {useState} from 'react'

const Filter = ({newFilter, handleNewFilter}) => {
    return (
        <div>
            search bar: <input value={newFilter} onChange={handleNewFilter}/>
        </div>
    )
}

export default Filter