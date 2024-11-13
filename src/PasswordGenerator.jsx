import React,{ useCallback, useEffect, useRef, useState } from "react"

export default function App() {

  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [numbersAllowed, setNumbersAllowed] = useState(false);
  let [charactersAllowed, setCharactersAllowed] = useState(false);

  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "1234567890";
    if (charactersAllowed) str += "!@#$%^&*()_+~?:;|";
    for (let i = 0; i < length; i++) {
      let randNum = Math.floor(Math.random() * str.length);
      pass += str.charAt(randNum);
    }
    setPassword(pass);
  }, [length, setPassword, numbersAllowed, charactersAllowed]);

  useEffect(() => {
    passwordGenerate();
  }, [length, numbersAllowed, charactersAllowed]);

  let passRef = useRef(null);

  return (
    <>
      <div className='m-10 bg-purple-300 pt-4 px-6 rounded-md'>
        <h1 className='text-center font-extrabold text-blue-600 uppercase p-4'>Password Generator</h1>
        <div className='flex'>
          <input
            type="text"
            className='w-full py-1 px-3 outline-none bg-blue-400 text-white font-bold'
            placeholder='Password'
            readOnly
            value={password}
            ref={passRef}
          />
          <button
            className='w-28 h-10 bg-red-500 text-white'
            onClick={(e) => {
              passRef.current?.select()
              window.navigator.clipboard.writeText(password);
            }}
          >Copy</button>
        </div>
        <div className='flex justify-evenly mt-3 items-center p-6'>
          <div>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={numbersAllowed}
              onChange={() => setNumbersAllowed(perv => !perv)} />
            <label htmlFor="">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={charactersAllowed}
              onChange={() => setCharactersAllowed(perv => !perv)} />
            <label htmlFor="">Characters</label>
          </div>
        </div>
        <h1 className="text-center font-bold pb-4 text-red-500">{password}</h1>
      </div>
    </>
  )
}
