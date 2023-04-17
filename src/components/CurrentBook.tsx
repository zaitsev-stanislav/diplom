import {IBook} from "../modules";
import {Link} from "react-router-dom";

interface IProps {
    book: IBook,
    contacts: {
        phone: string
        email: string
    }
}

export const CurrentBook = ({book, contacts} : IProps) => {
    return (
        <>
            <div className="wrapper">
                <h1>{book.title}</h1>
                <Link className="mb-32 backLink" to="/all-books">Назад</Link>
                <div className="currentBook">
                    <div className="currentBook__img">
                        <img src={book.cover} alt={book.title}/>
                    </div>
                    <div className="currentBook__text">
                        <b className="currentBook__title">{book.title}</b>
                        {book.available ? (
                            <p className="cart__available cart__available__free">Доступна</p>
                        ): (
                            <p className="cart__available cart__available__busy">Занята</p>
                        )}
                        <p className="currentBook__genre"><b>Жанр:</b> {book.genre}</p>
                        <p className="currentBook__author"><b>Автор:</b> {book.author}</p>
                        <p className="currentBook__description"><b>Описание: </b>{book.description}</p>
                        <p className="currentBook__owner"><b>Контакты владельца:</b></p>
                        <p className="currentBook__email"><b>Почта:</b> {contacts.email}</p>
                        <p className="currentBook__phone"><b>Телефон:</b> {contacts.phone}</p>
                    </div>
                </div>
            </div>

        </>

    )
}