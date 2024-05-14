import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../../db/db';
import {collection, doc, getDoc, getDocs, query, setDoc, where} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { Loader } from "../loader";
import { CustomButton } from "../customButton";
import {useNavigate} from "react-router-dom";
import styles from './BookCardItem.module.scss';
import useAuth from "../../db/user";

export const BookCardItem = (props) => {
    const navigate = useNavigate();
    const user = useAuth();


    const [book, setBook] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
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

    const addBookToUserLibrary = async () => {
        setLoading(true);
        const userBooksRef = doc(firestore, "users", user.firestoreUserId, "userBooks", bookId);
        await setDoc(userBooksRef, {
            title: book.title,
            status: 'Going to Read',
        });
        setLoading(false);
    }


    return (
        <div className={styles.bookCardItem} >
            <div className={styles.bookCardContent} >
                <img src={imageUrl} className={styles.bookCardImg} alt="Book cover" />
                <div className={styles.bookCardDetails}>
                    <h3 className={styles.bookCardTitle} onClick={handleItemClick}>{book.title}</h3>
                    <p className={styles.bookCardAuthor}>{book.author}</p>
                    <CustomButton
                        type={'submit'}
                        title={'Add'}
                        btnStyle='full'
                        loading={loading}
                        onClick={addBookToUserLibrary}
                        classBtn='wide'
                    />
                </div>
            </div>
        </div>
    );
}
