import React, { useState } from 'react';
import TitleInput from '../../components/titleInput/TitleInput';
import StatusSelect from '../../components/statusSelect/StatusSelect';
import CoverImageInput from '../../components/coverImage/CoverImage';
import TextAreaInput from '../../components/textInput/TextInput';
import './NewBookPage.scss';
import {BackButton} from "../../components/backButton";

const NewBookPage = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('reading');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    //add logic

    setTitle('');
    setStatus('reading');
    setDescription('');
    setFeedback('');
    setCoverImage(null);
  };

  return (
      <>
        <BackButton/>
        <div className="book-form-container">
          <h2 className="book-form-title">Add New Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <CoverImageInput onChange={setCoverImage}/>
            </div>
            <div className="form-field">
              <TitleInput value={title} onChange={setTitle}/>
            </div>
            <div className="form-field">
              <StatusSelect value={status} onChange={setStatus}/>
            </div>
            <div className="form-field">
              <TextAreaInput label="Description/Note" value={description} onChange={setDescription}/>
            </div>
            <div className="form-field">
              <TextAreaInput label="Feedback" value={feedback} onChange={setFeedback}/>
            </div>
            <button className='save-button' type="submit">Add Book</button>
          </form>
        </div>
      </>
  );
};

export default NewBookPage;
