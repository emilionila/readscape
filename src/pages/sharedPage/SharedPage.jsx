import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SharedPage.scss'
import { BackButton } from '../../components/backButton';
import { SharedList } from '../../components/sharedList/SharedList';
import { firestore } from '../../db/db';
import { doc, getDoc } from "firebase/firestore";

export const SharedPage = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const getUsername = async () => {
            try {
                const user = doc(firestore, 'users', userId);
                const userSnap = await getDoc(user);
                const userName = userSnap.data().username;
                setUsername(userName);
            }
            catch(error) {
                console.error('Error fetching username:', error);
            }
        }
        getUsername();
    }, [userId])

    return (
        <>
            <BackButton />
            <div className='sharedBooksContainer'>
                <p className='sharedBooksText'>Books of {username}</p>
                <SharedList userId={userId} />
            </div>
        </>
    );
};