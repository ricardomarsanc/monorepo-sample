import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { Note } from './Note'

const note = {
  content: 'This is a test',
  important: false
}

describe('Note component', () => {
  test('render content', () => {
    render(<Note note={note} />)

    expect(screen.getByText(note.content)).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toHaveTextContent(note.content)
  })

  test('render button disabled when no toggleImportance function is passed', () => {
    render(<Note note={note} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('click on button calls event handler once', () => {
    const mockClickHandler = jest.fn()
    render(<Note note={note} toggleImportance={mockClickHandler} />)

    const button = screen.getByRole('button')

    expect(button).toBeEnabled()

    fireEvent.click(button)

    expect(mockClickHandler).toHaveBeenCalledTimes(1)
  })
})
