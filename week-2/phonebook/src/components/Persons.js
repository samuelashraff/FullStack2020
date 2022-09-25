
const Persons = ({personsToShow, handleDelete}) => {

    return (
        <div>
            {personsToShow.map(obj => {
                return (
                <div key={obj.name}>
                    {obj.name}: {obj.number}
                    <button onClick={() => handleDelete(obj)}>Delete</button>
                </div>
                )
            })}
        </div>
    )
}

export default Persons