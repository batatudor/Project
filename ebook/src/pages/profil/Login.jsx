import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../App';

export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const { auth, setAuth } = useContext(AuthContext);

  function firstNameLogin(event) {
    setFirstName(event.target.value);
  }

  function lastNameLogin(event) {
    setLastName(event.target.value);
  }

  function emailLogin(event) {
    setEmail(event.target.value);
  }

  function passwordLogin(event) {
    setPassword(event.target.value);
  }

  function repeatLogin(event) {
    setRepeatPassword(event.target.value);
  }

  function phoneNumberLogin(event) {
    setPhoneNumber(event.target.value);
  }

  function Submit(e) {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const confirmValid = validateConfirmPassword(repeatPassword);

    if (!emailValid || !passwordValid || !confirmValid) {
      return;
    }

    axios
      .post('http://localhost:3004/users', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.data.accessToken);
        setAuth(data);
      });

    function validateConfirmPassword() {
      if (repeatPassword === '' || repeatPassword !== password) {
        setConfirmError('Password dont matched');
      } else {
        return true;
      }
    }

    function validateEmail(email) {
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

      const emailValid = emailRegex.test(email);

      if (!emailValid) {
        setEmailError('Please enter a valid email');
      }

      return emailValid;
    }
  }

  function validatePassword(password) {
    const specialCharacterList = ['!', '@', '#', '$', '%', '^', '&', '*'];

    if (!(password.length >= 6)) {
      setPasswordError('Password must contain at least 6 characters');

      return false;
    }

    let hasUpperCaseCharacter = false;
    let hasNumberCharacter = false;
    let hasSpecialCharacter = false;

    for (let letter of password) {
      if (
        !specialCharacterList.includes(letter) &&
        Number.isNaN(Number(letter)) &&
        letter === letter.toUpperCase()
      ) {
        hasUpperCaseCharacter = true;
      }

      if (typeof Number(letter) === 'number') {
        hasNumberCharacter = true;
      }

      if (specialCharacterList.includes(letter)) {
        hasSpecialCharacter = true;
      }
    }

    if (!hasUpperCaseCharacter) {
      setPasswordError(
        'Your password must have at least one upper case character'
      );
    }

    if (!hasNumberCharacter) {
      setPasswordError('Your password must include at least one number');
    }

    if (!hasSpecialCharacter) {
      setPasswordError(
        'Your password must include at least one special character'
      );
    }

    if (hasUpperCaseCharacter && hasNumberCharacter && hasSpecialCharacter) {
      return true;
    }

    return false;
  }

  return (
    <form onSubmit={Submit}>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={firstNameLogin}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={lastNameLogin}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" value={email} onChange={emailLogin} />
        <p>{emailError}</p>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={passwordLogin}
        />
        <p>{passwordError}</p>
      </div>
      <div>
        <label htmlFor="repeatPassword">Repeat Password: </label>
        <input
          id="repetPassword"
          type="password"
          value={repeatPassword}
          onChange={repeatLogin}
        />
        <p>{confirmError}</p>
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input
          id="phoneNumber"
          type="tel"
          pattern="[0-9]{10}"
          value={phoneNumber}
          onChange={phoneNumberLogin}
        />
      </div>
      <button>Log in</button>
    </form>
  );
}
