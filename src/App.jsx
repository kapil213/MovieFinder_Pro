import { useState } from 'react'
import './App.css'
import MainApp from './MovieFinderProProject/MainApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainApp/>
    </>
  )
}

export default App
