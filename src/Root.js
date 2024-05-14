import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React from "react";
import {BooksInProgressPage} from "./pages/booksInProgressPage";
import {SignUpPage} from "./pages/SignUpPage";
import {App} from "./App";
import {LogInPage} from "./pages/LogInPage";
import {WelcomePage} from "./pages/WelcomePage";
import NewBookPage from './pages/newBookPage/NewBookPage';
import {NotFound} from "./pages/NotFound";
import {ProfileSettingsPage} from "./pages/profileSettingsPage";
import {BookPage} from "./pages/bookPage"
import useAuth from "./db/user";
import {SearchBooksPage} from "./pages/SearchBooksPage";
import { CommunityPage } from './pages/communityPage/CommunityPage';
import { SharedPage } from './pages/sharedPage/SharedPage';

export const Root = () => {
    const user = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<WelcomePage/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                    <Route path="login" element={<LogInPage/>}/>
                    <Route path="sharedBooks/:userId" element={<SharedPage/>}/>
                    
                    {user && (
                        <>
                            <Route path="inprogress" element={<BooksInProgressPage/>}/>
                            <Route path="addbook" element={<NewBookPage/>}/>
                            <Route path="profile" element={<ProfileSettingsPage/>}/>
                            <Route path="search" element={<SearchBooksPage/>}/>
                            <Route path="community" element={<CommunityPage userId={user ? user.firestoreUserId : null}/>}/>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="/books/:bookId" element={<BookPage/>}/>
                        </>
                    )}
                </Route>
            </Routes>
        </Router>
    );
};
