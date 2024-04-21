import React from 'react';
import './addingButton.scss';

const AddingButton = () => {
  return (
    <div className="addingButton">
      <p className="addingButton__text">Can't find your book? Add it manually.</p>
      <button className="addingButton__button">Add Book</button>
    </div>
  );
}

export default AddingButton;