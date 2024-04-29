import React, { useState, useEffect } from 'react';
import './readingList.scss'
import ReadingListItem from '../readingListItem/readingListItem';
import noBooksImage from '../../images/noBooks.png';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../db/db';

const ReadingList = ({ userId }) => {
  const [userReadingList, setUserReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReadingList = async () => {
      try {
        const q = query(collection(firestore, 'usersBooks'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const userBooks = [];
        querySnapshot.forEach((doc) => {
          userBooks.push(doc.data().bookId);
        });
        setUserReadingList(userBooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user reading list:', error);
      }
    };

    fetchUserReadingList();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (userReadingList.length === 0) {
    return (
      <div className="readingList__noBooks">
        <img src={noBooksImage} alt="No books" className="readingList__image" />
        <p className="readingList__message">There are currently no books in your reading list. Find your next book!</p>
      </div>
    );
  }

  return (
    <div className="readingList__container">
      <ul className="readingList" style={{ listStyleType: 'none' }}>
        {userReadingList.map((bookId) => (
          <li key={bookId} className="readingList__item">
            <ReadingListItem bookId={bookId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadingList;
