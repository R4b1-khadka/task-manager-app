
import './App.css'
import Header from "./Header"
import Form from "./Form"
function App() {
  const name = "rabi"


  function handleClick(){
    console.log("button Clicked")
  }
  return (
    <>
      <h1>Hello {name}</h1>
      <Header title = "new task manager"/>
      

        <button onClick={handleClick}> Add</button>

      <p>welcome to the jungle</p>

      <Form/>
    </>
  )
}

export default App
