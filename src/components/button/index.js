'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

const Button = ({ onClick, children, kind }) => (
  <button onClick={onClick} className={`button -${kind || ''}`}>
    {children}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  kind: PropTypes.oneOf(['create', 'remove'])
}

export default Button
