import React, { useState } from 'react';
import ShortInput from '../../components/shortInput/ShortInput';
import StatusSelect from '../../components/statusSelect/StatusSelect';
import CoverImageInput from '../../components/coverImage/CoverImage';
import TextAreaInput from '../../components/textInput/TextInput';
import './NewBookPage.scss';
import { BackButton } from "../../components/backButton";
import { firestore, storage } from '../../db/db'

const NewBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('reading');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleInputChange = (newValue, setter) => {
    setter(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const storageRef = storage.ref();
      const imageRef = storageRef.child(coverImage.name);
      await imageRef.put(coverImage);
      const imageUrl = await imageRef.getDownloadURL();

      // Save book data (including cover image URL) to Firestore
      await firestore.collection('books').add({
        title,
        author,
        status,
        description,
        feedback,
        imageUrl
      });

      setTitle('');
      setAuthor('');
      setStatus('reading');
      setDescription('');
      setFeedback('');
      setCoverImage(null);

    } catch (error) {
      console.error('Error saving book data:', error.message);
    }

    
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
              <ShortInput
                label="Title"
                type="text"
                value={title}
                onChange={(newValue) => handleInputChange(newValue, setTitle)}
                placeholder="Enter book title..."
              />
            </div>
            <div className="form-field">
              <ShortInput
                label="Author"
                type="text"
                value={author}
                onChange={(newValue) => handleInputChange(newValue, setAuthor)}
                placeholder="Enter book author..."
              />
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
