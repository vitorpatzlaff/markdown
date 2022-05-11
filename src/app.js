'use strict'

import React, { Component } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { v4 } from 'uuid'

import MarkdownEditor from 'views/markdown-editor'
import 'css/style.css'

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    }
    return hljs.highlightAuto(code).value
  }
})

class App extends Component {
  constructor () {
    super()

    this.clearState = () => ({
      value: '',
      title: '',
      id: v4(),
      isSaving: null
    })

    this.state = {
      ...this.clearState(),
      files: {}
    }

    this.onHandleChange = (field) => (e) => {
      this.setState({
        [field]: e.target.value,
        isSaving: true
      })
    }

    this.getMarkup = () => {
      return { __html: marked(this.state.value) }
    }

    this.onHandleSave = () => {
      if (this.state.isSaving) {
        const files = {
          ...this.state.files,
          [this.state.id]: {
            title: this.state.title || 'Untitled',
            content: this.state.value
          }
        }

        localStorage.setItem('markdown-editor', JSON.stringify(files))
        this.setState({
          isSaving: false,
          files
        })
      }
    }

    this.createNew = () => {
      this.setState(this.clearState())
      this.textarea.focus()
    }

    this.onHandleRemove = () => {
      const { [this.state.id]: id, ...files } = this.state.files

      localStorage.setItem('markdown-editor', JSON.stringify(files))
      this.setState({ files })
      this.createNew()
    }

    this.onHandleCreate = () => {
      this.onHandleSave()
      this.createNew()
    }

    this.textareaRef = (node) => {
      this.textarea = node
    }

    this.onHandleOpenFile = (fileId) => () => {
      this.setState({
        title: this.state.files[fileId].title,
        value: this.state.files[fileId].content,
        id: fileId
      })
    }

    this.initialDoc = {
      Hello: {
        title: 'Click here!',
        content:
          '# Welcome!!!\n' +
          '## This app is a real time markdown render.\n' +
          '### On the left white part of the app you can write a markdown code and then see it rendering on the right gray part.\n' +
          '### On the up-right side, you can name the current document, create a new document and delete the current document.\n' +
          '### I recommend you delete this introduction and then create a new document.\n' +
          '## ENJOY!'
      }
    }
  }

  componentDidMount () {
    const files = JSON.parse(localStorage.getItem('markdown-editor')) || this.initialDoc

    this.setState({ files })
  }

  componentDidUpdate () {
    clearInterval(this.timer)
    this.timer = setTimeout(this.onHandleSave, 500)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <MarkdownEditor
        value={this.state.value}
        isSaving={this.state.isSaving}
        handleChange={this.onHandleChange}
        handleRemove={this.onHandleRemove}
        handleCreate={this.onHandleCreate}
        getMarkup={this.getMarkup}
        textareaRef={this.textareaRef}
        files={this.state.files}
        handleOpenFile={this.onHandleOpenFile}
        title={this.state.title}
      />
    )
  }
}

export default App
