'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import SaveMessage from 'components/save-message'

const MarkdownEditorHeader = ({ title, isSaving, handleCreate, handleRemove, handleChange }) => (
  <header className='editor-header'>
    <input type='text' value={title} onChange={handleChange('title')} placeholder='Untitled' />
    <SaveMessage isSaving={isSaving} />

    <Button onClick={handleCreate} kind='create'>
      Create
    </Button>

    <Button onClick={handleRemove} kind='remove'>
      Delete
    </Button>
  </header>
)

MarkdownEditorHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default MarkdownEditorHeader
