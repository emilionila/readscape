import React from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from '../../components/bookInfo/bookInfo';
import { BackButton } from '../../components/backButton/BackButton';

export const BookPage = () => {
    const { bookId } = useParams();

    return (
        <div>
            <BackButton />
            <BookInfo bookId={bookId} />
        </div>
    );
};
