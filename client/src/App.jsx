import { useState, useEffect } from 'react'
import './App.css'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://localhost:5005')

function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    // this listens to incoming messages from the server
    socket.on('message', payload => {
      // set the value of the input field
      setText(payload.message)
    })
  }, [])

  const onChange = e => {
    setText(e.target.value)
    // send the text to the server
    socket.emit('new-message', {
      message: e.target.value
    })
  }

  return (
    <div className="App">
      <input type="text" value={text} onChange={onChange} />
    </div>
  )
}

export default App
