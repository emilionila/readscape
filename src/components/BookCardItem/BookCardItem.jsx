import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../../db/db';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { Loader } from "../loader";
import { CustomButton } from "../customButton";
import {useNavigate} from "react-router-dom";
import styles from './BookCardItem.module.scss';

export const BookCardItem = (props) => {
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    console.log(props.book)
    const bookId = props.book.id;

    useEffect(() => {
        fetchBook();
    }, [bookId]);

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

    if (!book || !imageUrl) {
        return <Loader />;
    }

    const handleItemClick = () => {
        navigate(`/books/${bookId}`);
    };

    return (
        <div className={styles.bookCardItem} onClick={handleItemClick}>
            <div className={styles.bookCardContent}>
                <img src={imageUrl} className={styles.bookCardImg} alt="Book cover" />
                <div className={styles.bookCardDetails}>
                    <h3 className={styles.bookCardTitle}>{book.title}</h3>
                    <p className={styles.bookCardAuthor}>{book.author}</p>
                    <CustomButton
                        type={'submit'}
                        title={'Add'}
                        btnStyle='full'
                        onClick={() => console.log('click')}
                    />
                </div>
            </div>
        </div>
    );
}
