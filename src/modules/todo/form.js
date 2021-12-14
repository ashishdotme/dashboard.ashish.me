import React, { useState, ChangeEvent, FormEvent } from 'react'

const Form = (props) => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addTodo(event, inputValue)
    setInputValue('')
  }

  return (
    <div className="container mb-5">
      <form className="box" onSubmit={handleSubmit}>
        <label className="label is-large">Add a task</label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              name="title"
              type="text"
              className="input"
              placeholder="What's your new task?"
              onChange={handleChange}
              value={inputValue}
            />
          </div>
          <div className="control">
            <input type="submit" value="Add" className="button is-info" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form
