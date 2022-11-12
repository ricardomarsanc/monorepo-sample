import PropTypes from 'prop-types'

const Note = (props) => {
  const { note, toggleImportance } = props

  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button disabled={Boolean(!toggleImportance)} onClick={toggleImportance}>{label}</button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  toggleImportance: PropTypes.func
}

export { Note }
