import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function add(){
	setCount(count => count + 1);
  }

  const sub = () => {
	setCount(count => count - 1)
  }

  return (
	<div className='bg-gray-800 box-border text-white h-screen flex justify-center content-center text-center flex-col'>
		<div id="title" className='text-5xl m-10'>Counter</div>
		<div className='flex justify-evenly content-center'>
			<button onClick={add} className='p-2 rounded-xl border border-white border-solid border-1'>Add</button>
			<button onClick={sub} className='p-2 rounded-xl border border-white border-solid border-1'>Subtract</button>
		</div>
	  	<div id="adder" className='text-xl m-10'>The value : {count}</div>
	</div>
  )
}

export default App
