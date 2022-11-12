import styled from 'styled-components'
import { Link as BaseLink } from 'react-router-dom'

const Link = styled(BaseLink)`
display: inline-block;
  text-decoration: none;
  color: #09f;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #09f;
    transition: width .3s;
  }

  &:hover::after {
    width: 100%;
  }
`

export { Link }
