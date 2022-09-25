import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import Notification from './components/Notification.js'
import axios from 'axios'
import api from './services/api.js'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState("success")

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map(p => p.name)
    
    if (names.includes(newName)) {
      if (window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const updatedPerson = {...personToUpdate, number: newNumber}
        api.update(personToUpdate.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
          setNotificationMessage(`Changed ${newName}'s number to ${newNumber}`)
          setNotificationStyle("success")
        })
        .catch(err => {
          setNotificationMessage(`${personToUpdate.name} has already been removed from the server`)
          setNotificationStyle("error")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToUpdate.id))
        })
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      api
      .create(personObj)
      .then(response => {
        setPersons(persons.concat(response))
      })
      setNotificationMessage(`Added ${personObj.name}`)
      setNotificationStyle("success")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      api.delPerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      setNotificationMessage(`Deleted ${person.name}`)
      setNotificationStyle("success")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const namesToShow = persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle}/>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h2>Add a new contact</h2>
      <ContactForm 
      addName={addName}
      newName={newName}
      newNumber={newNumber}
      handleNewName={handleNewName}
      handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App