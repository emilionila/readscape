import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../db/db';
import './readingList.scss';
import ReadingListItem from '../readingListItem/readingListItem';
import noBooksImage from '../../images/noBooks.png';
import NoBooksImg from "../../images/Empty.svg";


const ReadingList = ({ userId, filters, searchQuery }) => {
    const [userReadingList, setUserReadingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserReadingList = async () => {
            try {
                const q = query(collection(firestore, `users/${userId}/userBooks`));
                const querySnapshot = await getDocs(q);
                const userBooks = [];
                querySnapshot.forEach((doc) => {
                    userBooks.push({ id: doc.id, ...doc.data() });
                });

                let filteredBooks = userBooks;
                if (filters.finished || filters.reading || filters.goingToRead) {
                    filteredBooks = userBooks.filter(book => {
                        if (filters.finished && book.status === 'Finished') return true;
                        if (filters.reading && book.status === 'Reading') return true;
                        if (filters.goingToRead && book.status === 'Going To Read') return true;
                        return false;
                    });
                }

                setUserReadingList(() => filteredBooks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user reading list:', error);
            }
        };

        fetchUserReadingList();
    }, [userId, filters]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (userReadingList.length === 0) {
        return (
            <div className="readingList__noBooks">
                <img src={noBooksImage} alt="No books" className="readingList__image" />
                <p className="readingList__message">There are currently no books in your reading list. Find your next book!</p>
            </div>
        );
    }

    const filteredBooks = userReadingList.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));


    return (
        <div className="readingList__container">
            {filteredBooks.length === 0 ? (
                <img
                    src={NoBooksImg}
                    alt="login image"
                    className='noBooksImg'
                />
            ) : (
            <ul className="readingList" style={{ listStyleType: 'none' }}>
                {filteredBooks.map((book) => (
                    <li key={book.id} className="readingList__item">
                        <ReadingListItem bookId={book.id} userId={userId} />
                    </li>
                ))}
            </ul>
                )}
        </div>
    );
};

export default ReadingList;
