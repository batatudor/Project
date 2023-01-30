import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Edit from './Edit';

export default function BookProfilPage(props) {
  const { title, thumbnail, key, author, description, id } = props;
  const navigate = useNavigate();
  function editBook() {
    navigate('./edit/' + id);
  }

  return (
    <div>
      <li className="flex m-10 bg-gray-400 border-t-4 w-screen" key={key}>
        <img src={thumbnail} alt={title} />
        <div>
          <p className="font-bold">{title}</p>
          <p>{author}</p>
          <p>{description}</p>
          <p>{id}</p>
          <button onClick={editBook}>Edit</button>
        </div>
      </li>
    </div>
  );
}
