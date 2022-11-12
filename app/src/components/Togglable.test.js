import { render, screen, fireEvent } from '@testing-library/react'
import { Togglable } from './Togglable'

describe('<Togglable />', () => {
  const buttonLabelTextMock = 'Show'
  const testContentTextMock = 'Test'

  beforeEach(() => {
    render(
      <Togglable buttonLabel={buttonLabelTextMock}>
        <div>{testContentTextMock}</div>
      </Togglable>
    )
  })

  test('does not render children initially', () => {
    screen.debug()
    expect(screen.queryByText(testContentTextMock)).not.toBeVisible()
  })

  test('render show button', () => {
    expect(screen.getByRole('button', { name: buttonLabelTextMock })).toBeInTheDocument()
  })

  test('render cancel button AND children after show button clicked', () => {
    const showButton = screen.getByRole('button', { name: buttonLabelTextMock })
    fireEvent.click(showButton)

    expect(screen.queryByRole('button', { name: buttonLabelTextMock })).not.toBeInTheDocument()

    expect(screen.getByText(testContentTextMock)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('hide content and cancel button after clicking twice', () => {
    /** This is more an Integration test than a Unit test */
    const showButton = screen.getByRole('button', { name: buttonLabelTextMock })

    expect(showButton).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
    expect(screen.queryByText(testContentTextMock)).not.toBeVisible()

    fireEvent.click(showButton)

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(cancelButton).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: buttonLabelTextMock })).not.toBeInTheDocument()
    expect(screen.getByText(testContentTextMock)).toBeInTheDocument()

    fireEvent.click(cancelButton)

    expect(showButton).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
    expect(screen.queryByText(testContentTextMock)).not.toBeVisible()
  })
})
