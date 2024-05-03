import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import {BooksInProgressPage} from "./pages/booksInProgressPage";
import {SignUpPage} from "./pages/SignUpPage";
import {App} from "./App";
import {LogInPage} from "./pages/LogInPage";
import {WelcomePage} from "./pages/WelcomePage";
import NewBookPage from './pages/newBookPage/NewBookPage';
import {NotFound} from "./pages/NotFound";

export const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<WelcomePage />}/>
                    <Route path='signup' element={<SignUpPage/>}/>
                    <Route path='login' element={<LogInPage/>}/>
                    <Route path='inprogress' element={<BooksInProgressPage/>}/>
                    <Route path='addbook' element={<NewBookPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Router>
    );
};
