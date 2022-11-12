import { useParams } from 'react-router-dom'

const NoteDetail = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find(note => note.id === id)

  if (!note) {
    return <div>Not found</div>
  }

  return (
    <div>
      <h1>Note Detail</h1>
      <h2>{note.content}</h2>
      <div>{note.user.username}</div>
      <div>
        <strong>
          {note.important ? 'Important' : 'Not Important'}
        </strong>
      </div>
    </div>
  )
}

export { NoteDetail }
