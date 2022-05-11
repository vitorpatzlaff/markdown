'use strict'

import React from 'react'
import Button from './index'
import './button.css'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: 40 }}>
        <Story />
      </div>
    )
  ]
}

export const Default = () => (
  <Button onClick={action('create')}>
    Criar
  </Button>
)

export const Create = () => (
  <Button onClick={action('create')} kind='create'>
    Criar
  </Button>
)

export const Remove = () => (
  <Button onClick={action('remove')} kind='remove'>
    Remover
  </Button>
)
