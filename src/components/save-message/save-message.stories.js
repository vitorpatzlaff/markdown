'use strict'

import React from 'react'
import SaveMessage from './index'

export default {
  title: 'SaveMessage',
  component: SaveMessage
}

export const isSavingNull = () => (
  <div style={{ background: '#ccc' }}>
    Message: "<SaveMessage isSaving={null} />"
  </div>
)

export const isSavingTrue = () => (
  <div style={{ background: '#ccc' }}>
    Message: "<SaveMessage isSaving />"
  </div>
)
export const isSavingFalse = () => (
  <div style={{ background: '#ccc' }}>
    Message: "<SaveMessage isSaving={false} />"
  </div>
)
