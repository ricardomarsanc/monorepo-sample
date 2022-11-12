import { useEffect, useState } from 'react'
import { create, getAll, update } from '../services'

const useNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = async (noteObj) => {
    const newNote = await create(noteObj)
    setNotes([...notes, newNote])
  }

  const toggleImportance = async (id) => {
    const note = notes.find(n => n.id === id)
    const updatedNote = { ...note, important: !note.important }

    const updatedDBNote = await update(id, updatedNote)
    setNotes(notes.map(note => note.id !== id ? note : updatedDBNote))
  }

  return { notes, addNote, toggleImportance }
}

export { useNotes }
