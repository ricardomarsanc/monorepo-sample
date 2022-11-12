import * as S from './Button.styles.js'

const Button = (props) => {
  const { children, ...otherProps } = props
  return (<S.Button {...otherProps}>{children}</S.Button>)
}

export { Button }
