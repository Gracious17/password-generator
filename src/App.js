import React, { useState } from "react";
import "./App.css";
import { FiCopy } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { COPY_SUCCESS } from "./message";
import "react-toastify/dist/ReactToastify.css";
import {
  numbers,
  uppercaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const handleGeneratePassword = () => {
    if (
      !includeLowercase &&
      !includeNumbers &&
      !includeUppercase &&
      !includeSymbols
    ) {
      notify("You must select atleast one option", true);
    }
    let characterList = "";
    if (includeLowercase) {
      characterList = characterList += lowerCaseLetters;
    }
    if (includeUppercase) {
      characterList = characterList += uppercaseLetters;
    }
    if (includeNumbers) {
      characterList = characterList += numbers;
    }
    if (includeSymbols) {
      characterList = characterList += specialCharacters;
    }
    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Nothing to copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
      setPassword("");
    }
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button className="copy_btn" onClick={handleCopyPassword}>
              <FiCopy width={25} height={25} />
            </button>
          </div>
          {/* Password form */}
          {/* password strength */}
          <div className="form-group">
            <label htmlFor="password-strength"> Password Length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="100"
              min="5"
            />
          </div>
          {/* uppercase check */}
          <div className="form-group">
            <label htmlFor="uppercase-letters"> Include Uppercase</label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          {/* include lowercase */}
          <div className="form-group">
            <label htmlFor="lowercase-letters"> Include Lowercase</label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>
          {/* include numbers */}
          <div className="form-group">
            <label htmlFor="include-numbers"> Include Numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              id="include-numbers"
              name="include-numbers"
            />
          </div>
          {/* include symbols */}
          <div className="form-group">
            <label htmlFor="include-symbols"> Include Symbols</label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              id="include-symbols"
              name="include-symbols"
            />
          </div>
          {/* generate password btn */}
          <button onClick={handleGeneratePassword} className="generator_btn">
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default App;
