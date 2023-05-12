import axios from 'axios';
import React, {useEffect} from 'react';
import {IBook, IGlobalState} from "./modules";
import {connect} from "react-redux";
import {getAllBooks} from "./redux/actions";
import Navigation from "./components/Navigation";
import {Route, Routes} from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import AllBooks from "./pages/AllBooks";
import BookDetailsPage from "./pages/BookDetailsPage";
import {MainPage} from "./pages/MainPage";
import AddBookPage from "./pages/AddBookPage";


interface IProps {
    dark: boolean
    getAllBooks: (books: IBook[]) => { type: string, payload: IBook[] }
}

function App({getAllBooks, dark}: IProps) {

    const getData = async () => {
        const books = await axios.get("http://localhost:3004/books");
        getAllBooks(books.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={dark ? "App App-dark" : "App"}>
            <Navigation/>
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/all-books" element={<AllBooks/>}/>
                    <Route path="/all-books/:bookId" element={<BookDetailsPage/>}/>
                    <Route path="/add-book" element={<AddBookPage/>}/>
                </Routes>
            </div>
        </div>


    );
}

const mapStateToProps = (state: IGlobalState) => {
    return {
        dark: state.dark.dark
    }
};
export default connect(mapStateToProps, {getAllBooks})(App)
