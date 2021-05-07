import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }
    addNewBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      <Button variant="success" type="submit">add blog</Button>
      </Form.Group>
    </Form>
  )
}

export default NewBlogForm
