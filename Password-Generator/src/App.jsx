import { useCallback, useState, useEffect, useRef } from "react";
import React from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
    document.querySelector(".copy").style.backgroundColor = "blue";
  }, [length, numberAllowed, charAllowed]);

  // if input captured by select() doesn't exist, by using ? it will not throw an error just return undefined

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    document.querySelector(".copy").style.backgroundColor = "#00008B";
    passwordRef.current?.select();
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="title">Password Generator</div>
          <div className="input-container">
            <input type="text" value={password} readOnly ref={passwordRef} />
            <div className="copy" onClick={copyPasswordToClipboard}>
              Copy
            </div>
          </div>
          <div className="range-box">
            <div className="range-container">
              <div className="range-label">Length: {length}&nbsp;</div>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label" htmlFor="num">
                {" "}
                &nbsp; Numbers &nbsp;
              </label>
              <input
                type="checkbox"
                id="num"
                defaultChecked={numberAllowed}
                onChange={(e) => setNumberAllowed(e.target.checked)}
              />
              <label
                className="checkbox-label"
                htmlFor="char"
                defaultChecked={charAllowed}
              >
                {" "}
                &nbsp; Symbols &nbsp;
              </label>
              <input
                type="checkbox"
                id="char"
                defaultChecked={charAllowed}
                onChange={(e) => setCharAllowed(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
