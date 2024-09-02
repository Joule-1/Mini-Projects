import { useState, useRef, useEffect } from 'react'
import { evaluate } from 'mathjs';
import './App.css'

function App() {
	const [count, setCount] = useState('0')
	const [preview, setPreview] = useState('0')

	const resultCopyRef = useRef(null)

	const handleButtonClick = (value) => {

		handleAfterCopied();

		setCount((prevCount) => {
			if(prevCount === '0' || prevCount == 'Syntax Error' || prevCount == 'Infinity' || prevCount == 'NaN' || prevCount == 'undefined'){
				return value
			}
			else{
				return prevCount + value
			}	
		})
	}

	const deleteLast = () => {

		handleAfterCopied();

		setCount((prevCount) => {
			if(prevCount == 'Syntax Error' || prevCount == 'Infinity' || prevCount == 'NaN' || prevCount == 'undefined'){
				deleteAll();
			}
			else{
				return (prevCount.length > 1 ? prevCount.slice(0, -1) : '0')	
			}
		})
		
	}

	const deleteAll = () => {

		handleAfterCopied();

		setCount('0')
	}

	const handleBracket = () => {
		let openBracketCnt = (count.match(/\(/g) || []).length
		let closeBracketCnt = (count.match(/\)/g) || []).length

		handleAfterCopied();

		setCount((prevCount) => {

			if(openBracketCnt === closeBracketCnt){
				return prevCount === '0' ? '(' : prevCount + '('
			}
			else if(openBracketCnt > closeBracketCnt){
				return prevCount + ')'
			}

		})
	}

	const evaluator = () => {
		setPreview('');
		setCount((prevCount) => {
			try{
				let ans = (evaluate(prevCount))

				const copyTimeout = setTimeout(handleCopyDisplay, 1000)

				if(ans != Math.floor(ans)){
					return (ans.toFixed(2)).toString()
				}
				else{
					return ans;
				}
			}
			catch{
				return "Syntax Error"
			}
		})
	}

	useEffect(() => {
		setPreview(() => {
			try{
				let ans = (evaluate(count))

				if(ans != Math.floor(ans)){
					return (ans.toFixed(2)).toString()
				}
				else{
					return ans;
				}
			}
			catch{

			}
		})
	}, [count])

	const handleCopyDisplay = () => {
		document.querySelector('.copyResult').style.display = 'block'
	}

	const handleAfterCopied = () => {
		const element = document.querySelector('.copyResult')

		element.innerHTML = 'Copy To Clipboard'
		element.style.cursor = 'cursor';
		element.style.display = 'none';
	}

	const clipboradCopy = () => {
		document.querySelector('.copyResult').innerHTML = 'Copied'
		document.querySelector('.copyResult').style.cursor = 'default';

		const resultCopy = resultCopyRef.current
		resultCopy.select();
		resultCopy.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(resultCopy.value);
	}

	const handleKeyPress = (event) => {
		const key = event.key;

		if (event.ctrlKey && key === 'a' || event.ctrlKey && key === 'A') {
			event.preventDefault();
		}

		// Handle number keys
		if (/\d/.test(key)) {
			handleButtonClick(key);
		}

		// Handle operator keys
		if (['+', '-', '*', '/', '%'].includes(key)) {
			handleButtonClick(key);
		}

		// Handle Enter key for evaluation
		if (key === 'Enter') {
			evaluator();
		}

		// Handle Backspace key for deletion
		if (key === 'Backspace' || key === 'Delete') {
			deleteLast();
		}

		// Handle 'C' key for clearing all input
		if (key === 'C' || key === 'c') {
			deleteAll();
		}

		// Handle brackets
		if (key === '(' || key === ')') {
			handleBracket(); //	
		}
	}

	useEffect(() => {
		document.addEventListener('keyup', handleKeyPress);

		return () => {
			document.removeEventListener('keyup', handleKeyPress);
		};
	}, []);

	return (
			<div id="main" className='h-screen flex justify-center items-center bg-gradient-to-r from-gray-700 to-gray-800 box-border'>

				<div id="Calcbody" className='rounded w-1/5 xxs:w-full xs:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-900'>

					<section id='input-taker' className='bg-transparent text-right w-full  h-35 grid grid-cols-1 px-5 py-3'>

						<input type='text' id='prev' disabled className=' previewInput text-purple-800 text-2xl text-right bg-transparent outline-none' value={preview}/>
						
						<input type='text' id="current" disabled className='text-white text-3xl bg-transparent outline-none text-right' value={count} ref={resultCopyRef}/>
					
					</section>

					<hr className='w-3/4 mx-auto my-2' />

					<section id="input-giver" className='grid grid-cols-4 gap-2 p-3'>

						<div className="outer text-red-400 font-semibold" onClick={deleteAll}>C</div>
						<div className="outer diff" onClick={handleBracket}>( )</div>
						<div className="outer diff" onClick={() => handleButtonClick('%')}>%</div>
						<div className="outer divide" onClick={() => handleButtonClick('/')} >÷</div>
						<div className="inner" onClick={() => handleButtonClick('7')}>7</div>
						<div className="inner" onClick={() => handleButtonClick('8')}>8</div>
						<div className="inner" onClick={() => handleButtonClick('9')}>9</div>
						<div className="outer multiply" onClick={() => handleButtonClick('*')}>×</div>
						<div className="inner" onClick={() => handleButtonClick('4')}>4</div>
						<div className="inner" onClick={() => handleButtonClick('5')}>5</div>
						<div className="inner" onClick={() => handleButtonClick('6')}>6</div>
						<div className="outer minus" onClick={() => handleButtonClick('-')}>-</div>
						<div className="inner" onClick={() => handleButtonClick('1')}>1</div>
						<div className="inner" onClick={() => handleButtonClick('2')}>2</div>
						<div className="inner" onClick={() => handleButtonClick('3')}>3</div>
						<div className="outer plus" onClick={() => handleButtonClick('+')}>+</div>
						<div className="inner" onClick={() => handleButtonClick('0')}>0</div>
						<div className="inner" onClick={() => handleButtonClick('.')} >.</div>

						<div className="resultContainer">
							<div className="special" onClick={evaluator}>=</div>
							<button className="copyResult text-green-300 border border-red-500 border-[2px] border-dashed p-4 rounded-full text-center absolute right-1 top-[70px]" onClick={clipboradCopy}>Copy To Clipboard</button>
						</div>

						<div className="outer diff" onClick={deleteLast}>⌫</div>

					</section>
				</div>
			</div>
	)
}

export default App
