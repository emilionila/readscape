import React, { useState, useEffect } from 'react';
import './readingListItem.scss';
import { firestore, storage } from '../../db/db';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const ReadingListItem = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(firestore, 'books', bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBook(docSnap.data());
          const imageRef = ref(storage, `${docSnap.data().imageURL}`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
  
    fetchBook();
  }, [bookId]);
  

  if (!book || !imageUrl) {
    return <p>Loading...</p>;
  }

  return (
    <div className="readingListItem">
      <div className="readingListItem__content">
        <img src={imageUrl} className="readingListItem__image" alt="Book cover" />
        <div className="readingListItem__details">
          <h3 className="readingListItem__title">{book.title}</h3>
          <p className="readingListItem__author">{book.author}</p>
          <button className="readingListItem__button">In Progress</button>
        </div>
      </div>
    </div>
  );
}

export default ReadingListItem;
