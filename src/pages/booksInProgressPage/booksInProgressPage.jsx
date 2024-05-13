import React, { useState } from 'react';
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
    const [filters, setFilters] = useState({
        finished: false,
        reading: false,
        goingToRead: false,
    });
    const [searchQuery, setSearchQuery] = useState('');


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Header />
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            <Filter handleFilterChange={handleFilterChange} />
            <ReadingList
                userId={user ? user.firestoreUserId : null}
                filters={filters}
                searchQuery={searchQuery}
            />
            <AddingButton />
            <Footer />
        </div>
    );
};
