import {Params, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {IBook, IGlobalState, IUser} from "../modules";
import React, {useEffect, useState} from "react";
import {CurrentBook} from "../components/CurrentBook";
import axios from "axios";

interface IProps {
    books: IBook[]
}

interface IUrlSlag {
    bookId: string
}

interface IOwner {
    phone: string
    email: string
}


const BookDetailsPage = ({books}: IProps) => {
    // тут будет храниться параметр который передается в url после all-books
    // Если урл all-books/1 , то params.bookId = 1
    let params = useParams<Params & IUrlSlag>();

    const [currentBook, setCurrentBook] = useState<IBook[]>([]);
    const [ownerContacts, setOwnerContacts] = useState<IOwner>({
        phone: '',
        email: ''
    });

    useEffect(() => {
        const filteredBook = books.filter(book => {
            if (params.bookId !== undefined) {
                if (book.id === parseInt(params.bookId)) {
                    return true
                }
            }
        });
        const getOwnerContacts = async (id: number) => {
            // console.log(id)
            const res = await axios.get<IUser[]>(`http://localhost:3004/users?id=${id}`);
            setOwnerContacts({email:res.data[0].email, phone: res.data[0].phone })
        };

        // если есть совпадение по книге сделаем запрос к БД чтобы найти информацию о владельце книги
        if (filteredBook.length !== 0){
            getOwnerContacts(filteredBook[0].owner);
            setCurrentBook(filteredBook)
        }
    }, [books]);

    return (
        <>
            {
                currentBook !== undefined && currentBook.length !== 0 ? (
                <CurrentBook book={currentBook[0]} contacts={ownerContacts}/>
            ): (
                <p>Нет такой книги</p>
            )}
        </>
    );
};

const mapStateToProps = (state: IGlobalState) => {
    return {
        books: state.books.books
    }
}

export default connect(mapStateToProps, null)(BookDetailsPage)