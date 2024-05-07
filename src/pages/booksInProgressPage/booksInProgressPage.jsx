import React from 'react';
import './booksInProgressPage.scss';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SearchBar from '../../components/searchBar/searchBar';
import AddingButton from '../../components/addingButton/addingButton';
import ReadingList from '../../components/readingList/readingList';
import useAuth from "../../db/user";
import Filter from '../../components/filter/filter';


export const BooksInProgressPage = () => {
    const user = useAuth();

    return (
        <div>
            <Header />
            <SearchBar />
            <ReadingList userId={user ? user.firestoreUserId : null} />
            <AddingButton />
            <Footer />
        </div>
    );
};
