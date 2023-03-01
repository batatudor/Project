import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../App';

export default function MyProfile() {
  const { auth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3004/users/${auth?.data?.user?.id}`, {
        headers: {
          authorization: `Bearer ${auth?.data?.accessToken}`,
        },
      })
      .then((user) => {
        console.log(user);
        setFirstName(user?.data?.firstName);
        setLastName(user?.data?.lastName);
        setEmail(user?.data?.email);

        setPhoneNumber(user?.data?.phoneNumber);
      });
  }, []);

  function Submit(event) {
    event.preventDefault();
    setError('');

    const confirmValidPassword = validNewPassword();
    const validPasswod = validatePassword(password);
    const validEmail = validateEmail(email);

    if (!confirmValidPassword || !validPasswod || !validEmail) {
      return;
    }

    function validNewPassword() {
      if (newPassword !== password) {
        setError('Password dont match');
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

    axios
      .patch(`http://localhost:3004/users/${auth?.data?.user?.id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: newPassword,
      })
      .then((data) => console.log(data));
  }

  return (
    <form onSubmit={Submit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <p>{emailError}</p>
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
        <p>{passwordError}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <p>{error}</p>
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </div>
      <button>Update User</button>
    </form>
  );
}
