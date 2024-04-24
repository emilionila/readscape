import React from 'react';
import './booksInProgressPage.scss';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SearchBar from '../../components/searchBar/searchBar';
import AddingButton from '../../components/addingButton/addingButton';


export const BooksInProgressPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <AddingButton />
            <Footer />
        </div>
    );
};
