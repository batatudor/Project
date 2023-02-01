import axios from 'axios';
import React, { useState } from 'react';

export default function Book(props) {
  const { title, thumbnail, key, authors, description, id } = props;
  const url = 'http://localhost:3004/books';

  function AddSubmit(event) {
    event.preventDefault();

    const body = {
      volumeInfo: {
        title: title,
        authors: authors,
        description: description,
        imageLinks: {
          thumbnail: thumbnail,
        },
      },
    };

    axios.post(`${url}`, body).then((data) => console.log(data));
  }

  return (
    <div>
      <li className="flex m-10 bg-gray-400 border-t-4 w-screen-1/2" key={key}>
        <img src={thumbnail} alt={title} />
        <div>
          <p className="font-bold">{title}</p>
          <p>{authors}</p>
          <p>{description}</p>
          <p>{id}</p>
        </div>
        <button onClick={AddSubmit}>Add</button>
      </li>
    </div>
  );
}
