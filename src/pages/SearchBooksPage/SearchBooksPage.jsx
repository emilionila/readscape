import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SearchBar from "../../components/searchBar/searchBar";
import {BookList} from "../../components/BookList";
import {useState} from "react";

export const SearchBooksPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <Header />
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            <BookList searchQuery={searchQuery} />
            <Footer />
        </div>
    )
}
