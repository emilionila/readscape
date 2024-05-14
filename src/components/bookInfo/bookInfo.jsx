import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore, storage } from '../../db/db';
import { ref, getDownloadURL } from 'firebase/storage';
import './bookInfo.scss';

const BookInfo = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    useEffect(() => {
        const fetchBookInfo = async () => {
            try {
                const bookRef = doc(firestore, `books/${bookId}`);
                const bookSnapshot = await getDoc(bookRef);
                if (bookSnapshot.exists()) {
                    const fetchedBook = bookSnapshot.data();
                    setBook(fetchedBook);
                    if (fetchedBook.imageURL) {
                        const imageRef = ref(storage, fetchedBook.imageURL);
                        const url = await getDownloadURL(imageRef);
                        setImageUrl(url);
                    } else {
                        console.error('Image URL not found in book data');
                    }
                } else {
                    console.error('Book not found');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book info:', error);
            }
        };

        fetchBookInfo();
    }, [bookId]);

    const handleShare = async () => {
        const bookUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(bookUrl);
            setShowCopySuccess(true);
            setTimeout(() => {
                setShowCopySuccess(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>Book not found</p>;
    }

    return (
        <div className="BookInfoForm">
            <div className="BookInfoForm__image">
                <img src={imageUrl} alt="Book cover" />
            </div>
            <div className="BookInfoForm__details">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Country: {book.country}</p>
                <p>Publishing year: {book.year}</p>
                <p>Number of Pages: {book.pages}</p>
                <div className="BookInfoForm__description">
                    <h3>Book Description</h3>
                    <p>{book.description}</p>
                </div>
                <button onClick={handleShare} className="BookInfoForm__shareBtn">Share</button>
                {showCopySuccess && <div className="copy-success show">Book link copied</div>}
            </div>
        </div>
    );
};

export default BookInfo;
