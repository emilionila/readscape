import React, { useState, useEffect } from 'react';
import ReadingListItem from '../readingListItem/readingListItem';
import noBooksImage from '../../images/noBooks.png';
import './readingList.scss';

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const fetchedReadingList = [
      {
        title: 'Book 1',
        author: 'Author 1',
        userId: '1',
        icon: require('../../images/book.jpg').default
      },
      {
        title: 'Book 2',
        author: 'Author 3',
        userId: '1',
        icon: require('../../images/arrow.svg').default
      },
      {
        title: 'Book 3',
        author: 'Author 4',
        userId: '2',
        icon: require('../../images/book.jpg').default
      },
    ];

    setReadingList(fetchedReadingList);
  }, []);

  const userReadingList = readingList.filter(book => book.userId === '1');

  return (
    <div className="readingList__container">
      {userReadingList.length > 0 ? (
        <ul className="readingList" style={{ listStyleType: 'none' }}>
          {userReadingList.map(book => (
            <li key={book.title} className="readingList__item">
              <ReadingListItem book={book} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="readingList__noBooks">
          <img src={noBooksImage} alt="No books" className="readingList__image" />
          <p className="readingList__message">There are currently no books in your reading list. Find your next book!</p>
        </div>
      )}
    </div>
  );
}

export default ReadingList;
