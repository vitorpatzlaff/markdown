'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const SaveMessage = ({ isSaving }) => (
  isSaving !== null && isSaving !== undefined && (
    <p className='save-message'>
      {isSaving ? 'Saving...' : 'Saved!'}
    </p>
  )
)

SaveMessage.propTypes = {
  isSaving: PropTypes.bool
}

export default SaveMessage
