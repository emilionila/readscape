import React from 'react';
import './readingListItem.scss';

const ReadingListItem = ({ book }) => {
  return (
    <div className="reading-list-item">
      <div className="reading-list-item__content">
        <img src={require('../../images/book.jpg')} className="reading-list-item__image" />
        <div className="reading-list-item__details">
          <h3 className="reading-list-item__title">{book.title}</h3>
          <p className="reading-list-item__author">{book.author}</p>
          <button className="reading-list-item__button">{book.status}In Progress</button>
        </div>
      </div>
    </div>
  );
}

export default ReadingListItem;
