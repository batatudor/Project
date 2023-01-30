import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

export default function FirstPage() {
  const [book, setBook] = useState('');
  const [apiKey, setApiKey] = useState(
    'AIzaSyB4hSbZnhW7bbxINLO04MBlANitt4R_Hy0'
  );
  const [result, setResult] = useState([]);

  function BookSearch(event) {
    const book = event.target.value;

    setBook(book);
  }

  function BookSearchResult(event) {
    event.preventDefault();

    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?&q=' +
          book +
          '&key=' +
          apiKey +
          '&maxResults=20'
      )
      .then((data) => {
        console.log(data);
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div>
      <div
        className="navbar fixed top-0 h-16 flex flex-row w-screen z-0
       bg-blue-800  items-center"
      >
        <h1>BookStore</h1>
        <div className="block ml-auto mr-auto">
          <form onSubmit={BookSearchResult}>
            <input
              type="text"
              placeholder="Enter Your Book Name"
              onChange={BookSearch}
            />
            <button type="submit" className="bg-red-400">
              Search
            </button>
          </form>
        </div>
        <div className="ml-auto ">
          <button className=" m-2">
            <Link to="/profil">Profil</Link>
          </button>
          <a className="m-2" href="/">
            Home
          </a>
          <a className="mr-10" href="/">
            About
          </a>
        </div>
      </div>
      <ul className="flex flex-col items-start gap-10 mt-20 ">
        {result.map((book, index) => {
          /* {
          console.log(index);
        } */

          return (
            <Book
              key={index}
              title={book?.volumeInfo?.title}
              thumbnail={
                book?.volumeInfo?.imageLinks
                  ? book?.volumeInfo?.imageLinks?.thumbnail
                  : 'http://books.google.com/books/content?id=dyQEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
              }
              authors={book?.volumeInfo?.authors}
              description={book?.volumeInfo?.description}
            ></Book>
          );
        })}
      </ul>
    </div>
  );
}
