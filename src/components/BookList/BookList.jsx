import React, { useState, useEffect } from 'react';
import { firestore } from '../../db/db';
import { collection, query, getDocs } from 'firebase/firestore';
import { Loader } from "../loader";
import {BookCardItem} from "../BookCardItem"
import styles from './BookList.module.scss'

export const BookList = ({ searchQuery }) => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const q = query(collection(firestore, 'books'));
                const querySnapshot = await getDocs(q);
                const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBooks(fetchedBooks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <Loader />;
    }

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={styles.container}>
            {filteredBooks.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <ul className={styles.bookList}>
                    {filteredBooks.map(book => (
                        <li key={book.id}>
                            <BookCardItem book={book} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
