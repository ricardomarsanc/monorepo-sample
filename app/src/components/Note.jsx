import PropTypes from 'prop-types'
import { Button } from './Button'

const Note = (props) => {
  const { note, toggleImportance } = props

  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      {note.content}
      <Button disabled={Boolean(!toggleImportance)} onClick={toggleImportance}>{label}</Button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  toggleImportance: PropTypes.func
}

export { Note }
