import React, { useState } from 'react';
import StatusSelect from '../../components/statusSelect/StatusSelect';
import CoverImageInput from '../../components/coverImage/CoverImage';
import TextAreaInput from '../../components/textInput/TextInput';
import './NewBookPage.scss';
import { BackButton } from "../../components/backButton";
import ShortInput from '../../components/shortInput/ShortInput';
import { firestore, storage } from "../../db/db";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import useAuth from "../../db/user";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('reading');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [pages, setPages] = useState(0);
  const [coverImage, setCoverImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const user = useAuth();

  const handleInputChange = (newValue, setter) => {
    setter(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `booksImages/${coverImage.name}`);

      await uploadBytes(imageRef, coverImage).then(() => {
      });

      const imageUrl = await getDownloadURL(imageRef);

      const bookRef = await addDoc(collection(firestore, "books"), {
        title: title,
        description: description,
        feedback: feedback,
        author: author,
        pages: pages,
        imageURL: imageUrl,
      });

      const userBooksRef = doc(firestore, "users", user.firestoreUserId, "userBooks", bookRef.id);
      await setDoc(userBooksRef, {
        title: title,
        status: status,
      });


      setTitle('');
      setStatus('Reading');
      setDescription('');
      setFeedback('');
      setCoverImage(null);
      setImageUrl('');
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  return (
      <>
        <BackButton />
        <div className="book-form-container">
          <h2 className="book-form-title">Add New Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <CoverImageInput onChange={setCoverImage} imageUrl={imageUrl} onChangeUrl={setImageUrl} />
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
              <StatusSelect value={status} onChange={setStatus} />
            </div>
            <div className="form-field">
              <TextAreaInput label="Description/Note" value={description} onChange={setDescription} />
            </div>
            <div className="form-field">
              <TextAreaInput label="Feedback" value={feedback} onChange={setFeedback} />
            </div>
            <button className='save-button' type="submit">Add Book</button>
          </form>
        </div>
      </>
  );
};

export default NewBookPage;
