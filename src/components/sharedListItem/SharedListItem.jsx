import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SharedListItem.scss';
import { firestore, storage } from '../../db/db';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export const SharedListItem = ({ bookId, userId }) => {
  const [book, setBook] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
    
    console.log(userId)
  }, [bookId, userId]);

  const fetchBook = async () => {
    try {
      const userBookRef = doc(firestore, `users/${userId}/userBooks`, bookId);
      const userBookSnap = await getDoc(userBookRef);
      const bookRef = doc(firestore, 'books', bookId);
      const bookSnap = await getDoc(bookRef);
  
      if (userBookSnap.exists() && bookSnap.exists()) {
        setBook({ ...bookSnap.data(), ...userBookSnap.data() });
        const imageRef = ref(storage, `${bookSnap.data().imageURL}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleItemClick = () => {
    navigate(`/books/${bookId}`);
  };

  if (!book || !imageUrl) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sharedListItem" onClick={handleItemClick}>
      <div className="sharedListItem__content">
        <img src={imageUrl} className="sharedListItem__image" alt="Book cover" />
        <div className="sharedListItem__details">
          <h3 className="sharedListItem__title">{book.title}</h3>
          <p className="sharedListItem__author">{book.author}</p>
          <p className='sharedListItem__status'>{book.status}</p>
        </div>
      </div>
    </div>
  );
};
