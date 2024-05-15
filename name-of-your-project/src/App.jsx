import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.insertedId){
          alert('User added successfully')
          form.reset();
        }
      })



  }
  return (
    <>
      <h1>Simple Crud</h1>
      <form action="" onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Input Your Name' />
        <br />
        <input type="email" name="email" placeholder='Input Your Email' />
        <br />
        <input type="submit" name="submit" value="Add User" />
        <br />
      </form>

    </>
  )
}

export default App
