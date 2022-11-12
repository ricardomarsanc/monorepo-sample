import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleSubmit, username, handleUsernameChange, password, handlePasswordChange } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <button id='form-login-button'>
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export { LoginForm }
