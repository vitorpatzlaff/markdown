'use strict'

import React from 'react'
import Button from './index'
import renderer from 'react-test-renderer'

import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

test('Should Button default to match to snapshot', () => {
  const tree = renderer.create(
    <Button onClick={() => null}>
      Click me
    </Button>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Should Button create to match to snapshot', () => {
  const tree = renderer.create(
    <Button onClick={() => null} kind='create'>
      Click me
    </Button>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Should Button remove to match to snapshot', () => {
  const tree = renderer.create(
    <Button onClick={() => null} kind='remove'>
      Click me
    </Button>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Should with prop kind = "create" should has class "-create"', () => {
  const wrapper = shallow(
    <Button onClick={() => null} kind='create'>
      Button create
    </Button>
  )

  expect(wrapper.hasClass('-create')).toBe(true)
  expect(wrapper.hasClass('-remove')).toBe(false)
})

test('Should with prop kind = "remove" should has class "-remove"', () => {
  const wrapper = shallow(
    <Button onClick={() => null} kind='remove'>
      Button create
    </Button>
  )

  expect(wrapper.hasClass('-remove')).toBe(true)
  expect(wrapper.hasClass('-create')).toBe(false)
})
