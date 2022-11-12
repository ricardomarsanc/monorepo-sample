import { useState } from 'react'
import { Note, Notification, NoteForm } from '../components'
import { useNotes, useUser } from '../hooks'
import { Outlet, Link } from 'react-router-dom'

const Notes = () => {
  const { notes, addNote, toggleImportance } = useNotes()
  const { user, logout } = useUser()

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogout = () => {
    logout()
  }

  const toggleImportanceOfNote = (id) => {
    toggleImportance(id)
      .catch(() => {
        setErrorMessage(
          'Note was already removed from server'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user
          ? <NoteForm
              addNote={addNote}
              handleLogout={handleLogout}
            />
          : <Link to='/login'>Please login to create new notes</Link>
      }

      <div style={{ padding: '10px' }}>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOfNote(note.id)}
          />
        )}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export { Notes }

// import { useState, useEffect } from 'react'
// import { Note, Notification, NoteForm } from '../components'
// import { Outlet } from 'react-router-dom'
// import {
//   setToken,
//   create as createNote,
//   getAll as getNotes,
//   update as updateNote
// } from '../services'

// const Notes = () => {
//   const [notes, setNotes] = useState([])

//   const [showAll, setShowAll] = useState(true)

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       setToken(user.token)
//     }
//   }, [])

//   useEffect(() => {
//     getNotes()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   }, [])

//   const addNote = (noteObject) => {
//     createNote(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//       })
//   }

//   const toggleImportanceOf = (id) => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }

//     updateNote(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//       })
//       .catch(() => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//       })
//   }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   return (
//     <div>
//       <h1>Notes</h1>

//       <Notification message={errorMessage} />

//       <NoteForm
//         addNote={addNote}
//         handleLogout={handleLogout}
//       />

//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map((note, i) =>
//           <Note
//             key={i}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         )}
//       </ul>

//     </div>
//   )
// }

// export { Notes }
