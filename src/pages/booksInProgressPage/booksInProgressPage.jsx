import React from 'react';
import './booksInProgressPage.scss';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SearchBar from '../../components/searchBar/searchBar';
import AddingButton from '../../components/addingButton/addingButton';
import ReadingList from '../../components/readingList/readingList';


export const BooksInProgressPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <ReadingList />
            <AddingButton />
            <Footer />
        </div>
    );
};
