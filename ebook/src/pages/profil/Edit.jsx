import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../App';

export default function Edit() {
  const url = 'http://localhost:3004/books';
  const { id } = useParams();

  const { auth } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const test = auth?.data?.accessToken;

    axios
      .get(`http://localhost:3004/books/${id}`, {
        headers: {
          authorization: `Bearer ${test}`,
        },
      })
      .then((book) => {
        console.log(book);
        const { data } = book;
        setTitle(data?.volumeInfo?.title);
        setAuthors(data?.volumeInfo?.authors);
        setDescription(data?.volumeInfo?.description);
        setThumbnail(data?.volumeInfo?.imageLinks?.thumbnail);
      });
  }, []);

  function authorsChange(event) {
    setAuthors(event.target.value);
  }

  function titleChange(event) {
    setTitle(event.target.value);
  }

  function descriptionChange(event) {
    setDescription(event.target.value);
  }

  function thumbnailChange(event) {
    setThumbnail(event.target.value);
  }

  function Submit(event) {
    event.preventDefault();

    axios
      .patch(`http://localhost:3004/books/${id}`, {
        volumeInfo: {
          title: title,
          authors: authors,
          description: description,
          imageLinks: {
            thumbnail: thumbnail,
          },
        },
      })

      .then((data) => console.log(data));
  }

  return (
    <form onSubmit={Submit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" value={title} onChange={titleChange} />
      </div>

      <div>
        <label htmlFor="authors">Year: </label>
        <input
          id="authors"
          type="text"
          value={authors}
          onChange={authorsChange}
        />
      </div>

      <div>
        <label htmlFor="thumbnail">Poster: </label>
        <input
          id="thumbnail"
          type="text"
          value={thumbnail}
          onChange={thumbnailChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={descriptionChange}
        />
      </div>
      <button>Save</button>
    </form>
  );
}
