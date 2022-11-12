import styled from 'styled-components'

const Button = styled.button`
  background: white;
  font-size: 1em;
  margin: 1em;
  padding: 4px 12px;
  border: 1px solid #09f;
  border-radius: 5px;
  transition: .2s all linear;
  cursor: pointer;

  &:hover {
    background-color: #09f;
  }
`

export { Button }
