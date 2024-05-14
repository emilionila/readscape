import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../db/db';
import './SharedList.scss';
import { SharedListItem } from '../sharedListItem/SharedListItem';
import noBooksImage from '../../images/noBooks.png';

export const SharedList = ({ userId }) => {
    const [userSharedList, setUserReadingList] = useState([]);
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

                setUserReadingList(() => userBooks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user reading list:', error);
            }
        };

        fetchUserReadingList();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (userSharedList.length === 0) {
        return (
            <div className="sharedList__noBooks">
                <img src={noBooksImage} alt="No books" className="sharedList__image" />
                <p className="sharedList__message">There are currently no books in this user's collection.</p>
            </div>
        );
    }


    return (
        <div className="sharedList__container">
            <ul className="sharedList" style={{ listStyleType: 'none' }}>
                {userSharedList.map((book) => (
                    <li key={book.id} className="sharedList__item">
                        <SharedListItem bookId={book.id} userId={userId} />
                    </li>
                ))}
            </ul>
        </div>
    );
};