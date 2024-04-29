import React from 'react';
import './addingButton.scss';
import {useNavigate} from "react-router-dom";


const AddingButton = () => {
    const navigate = useNavigate();

  return (
    <div className="buttonContainer">
      <button className="addingButton" onClick={() => navigate('/addbook')}>Add Book</button>
    </div>
  );
}

export default AddingButton;
