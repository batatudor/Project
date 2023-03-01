import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../App';

export default function MyProfile() {
  const { auth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState('');

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

    const confirmValid = validNewPassword();

    if (!confirmValid) {
      return;
    }

    function validNewPassword() {
      if (newPassword !== confirmPassword) {
        setError('Password dont match');
      } else {
        return true;
      }
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
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
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
