import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChange } from '../reducers/toggleFilterReducer'

const Togglable = React.forwardRef((props, ref) => {
  const visible = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(toggleChange(visible))
  }

  useImperativeHandle(ref,() => {
    return { toggleVisibility }
  })

  return(
    <div>
      <div style = {hideWhenVisible}>
        <Button variant = 'primary' onClick = {toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <Button variant = 'secondary' onClick = {toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable