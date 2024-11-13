# Password Generator App

This is a simple **Password Generator App** built with React that allows users to generate secure, customizable passwords. The app provides options to set password length, include numbers, and add special characters, with a one-click copy functionality.

## Features

- Generate a random password with customizable length.
- Optionally include numbers and special characters.
- Copy the generated password to the clipboard with one click.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Salehmangrio/password-Generator-Using-React-JS.git

2. Install dependencies
   ```bash
   cd password-Generator-Using-React-JS
   npm install


## Code Explanation

### 1. Importing React and Hooks
```javascript
import React, { useCallback, useEffect, useRef, useState } from "react";
```
- Imports React along with hooks (`useCallback`, `useEffect`, `useRef`, and `useState`) that manage component state, perform side effects, and interact with the DOM.

### 2. Component Initialization
```javascript
export default function App() {
```
- The main functional component `App` is declared and exported as the default export of this module.

### 3. State Variables
```javascript
let [password, setPassword] = useState("");
let [length, setLength] = useState(8);
let [numbersAllowed, setNumbersAllowed] = useState(false);
let [charactersAllowed, setCharactersAllowed] = useState(false);
```
- `password`: Holds the generated password.
- `length`: Sets the length of the password (default is 8).
- `numbersAllowed` and `charactersAllowed`: Toggle options to include numbers and special characters in the password.

### 4. Password Generation Function
```javascript
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
```
- `passwordGenerate`: A function wrapped in `useCallback` for optimized re-rendering. This function:
  - Initializes a character set containing uppercase and lowercase letters.
  - Conditionally adds numbers and special characters to the character set based on `numbersAllowed` and `charactersAllowed`.
  - Generates a password of the specified `length` by appending random characters from the character set.
  - Updates the `password` state with the generated password.

### 5. Automatic Password Generation
```javascript
useEffect(() => {
  passwordGenerate();
}, [length, numbersAllowed, charactersAllowed]);
```
- `useEffect` automatically triggers `passwordGenerate` whenever the values of `length`, `numbersAllowed`, or `charactersAllowed` change, ensuring that the password updates with user settings.

### 6. Using Refs
```javascript
let passRef = useRef(null);
```
- `passRef` is used to reference the password input element. This allows us to select and copy the password to the clipboard programmatically.

### 7. UI Elements and Rendering
```javascript
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
          onClick={() => {
            passRef.current?.select();
            window.navigator.clipboard.writeText(password);
          }}
        >
          Copy
        </button>
      </div>
```
- **Password Display**:
  - A readonly input field displays the generated password (`value={password}`).
  - `ref={passRef}` associates the input with `passRef`, enabling programmatic text selection.
- **Copy Button**:
  - On click, selects the password text and copies it to the clipboard.

```javascript
      <div className='flex justify-evenly mt-3 items-center p-6'>
        <div>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={numbersAllowed}
            onChange={() => setNumbersAllowed(prev => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={charactersAllowed}
            onChange={() => setCharactersAllowed(prev => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
      <h1 className="text-center font-bold pb-4 text-red-500">{password}</h1>
    </div>
  </>
);
```

- **Controls**:
  - **Password Length**: 
    - A range input slider (`type="range"`) adjusts the `length` state, controlling the password length.
  - **Include Numbers**: 
    - A checkbox toggles the inclusion of numbers in the password.
  - **Include Characters**: 
    - A checkbox toggles the inclusion of special characters.

- **Password Preview**:
  - Displays the current generated password as text below the controls.

### 8. Summary
This password generator component allows users to create a secure password with custom settings. It combines various React hooks (`useState`, `useCallback`, `useEffect`, and `useRef`) to efficiently manage state, handle side effects, and interact with the DOM.
