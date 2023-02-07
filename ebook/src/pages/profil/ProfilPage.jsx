import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import BookProfilPage from './BookProfilPage';

export default function ProfilPage() {
  const url = 'http://localhost:3004/books';
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [result, setResult] = useState([]);
  useEffect(() => {
    console.log(auth.data.accessToken);
    const test = auth?.data?.accessToken;

    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${test}`,
        },
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.data);
        setResult(data.data);
      });
  }, []);

  return (
    <ul>
      {result.map((book, index) => {
        return (
          <BookProfilPage
            key={index}
            title={book?.volumeInfo?.title}
            thumbnail={
              book?.volumeInfo?.imageLinks
                ? book?.volumeInfo?.imageLinks?.thumbnail
                : 'http://books.google.com/books/content?id=dyQEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            }
            author={book?.volumeInfo?.authors}
            description={book?.volumeInfo?.description}
            id={book?.id}
          ></BookProfilPage>
        );
      })}
    </ul>
  );
}
