import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "~`!@#$%^&*()><?/{}[]=-+_";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 2);
    window.navigator.clipboard.writeText(password);
    // alert("Password Copied Successfully....")
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-5xl text-white center ">Password Generator</h1>
      <div className="mt-10 p-3 flex justify-center">
        <input
          type="text"
          name="uInput"
          id="uInput"
          value={password}
          ref={passwordRef}
          className="w-90 h-10 px-6 border border-2 border-gray-500 rounded rounded-r-none rounded-xl text-yellow-950 font-semibold"
          readOnly
        />
        <button
          className="bg-gray-400 h-10 border border-2 border-gray-500   p-2 w-32"
          onClick={passwordGenerator}
        >
          <b>Generate New</b>
        </button>
        <button
          onClick={copyToClipBoard}
          className="bg-gray-400 h-10 border border-2 border-gray-500 rounded rounded-l-none rounded-xl p-2 w-28 hover:font-mono hover:bg-gray-700"
          style={{ backgroundColor: "white" }}
        >
          <b>Copy </b>
        </button>
      </div>
      <div className="sContainer ">
        <div className="first mx-7 flex justify-center">
          <input
            type="range"
            name="lengthRange"
            id="lengthRange"
            className="cursor-pointer"
            min={6}
            max={35}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <span className="lengthLabel text-white">
            &nbsp;&nbsp; Length: {length} &nbsp;
          </span>
        </div>
        <div className="second mx-7">
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <span className="text-white"> &nbsp; Add Numbers &nbsp; </span>
        </div>
        <div className="third mx-7">
          <input
            type="checkbox"
            name="character"
            id="characters"
            defaultChecked={characterAllowed}
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <span className="text-white"> &nbsp; Add Characters &nbsp; </span>
        </div>
      </div>
    </>
  );
}

export default App;
