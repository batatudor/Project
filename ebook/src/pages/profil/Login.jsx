import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  function phoneNumberLogin(event) {
    setPhoneNumber(event.target.value);
  }

  function Submit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:3004/users', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      })
      .then((data) => console.log(data));
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
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={passwordLogin}
        />
      </div>
      <div>
        <label htmlFor="repeatPassword">Repeat Password: </label>
        <input id="repetPassword" type="password" />
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
