import {IBook, IUser} from "../modules";
import {Link} from "react-router-dom";

interface IProps {
    user: IUser,
    books: IBook[] | undefined
}

export const Account = ({user, books}: IProps) => {
    return (
        <>
            <h1>Личный кабинет:</h1>
            <div className="myAccount">
                <p className="myAccount__text"><b>Имя:</b> {user.username}</p>
                <div className="myAccount__grid">
                    <ul className="myAccount__list">
                        <li><b>Контакты</b></li>
                        <li><b>Телефон:</b> {user.phone}</li>
                        <li><b>Почта:</b> {user.email}</li>
                    </ul>
                    <ul className="myAccount__list">
                        <li><b>Любимые жанры:</b></li>
                        {user.favorite_genres.map((elem, i) => <li key={i}>{elem}</li>)}
                    </ul>
                    <ul className="myAccount__list">
                        <li><b>Ищу книги:</b></li>
                        {user.desired_books.map((elem, i) => <li key={i}>{elem}</li>)}
                    </ul>
                </div>
                <p className="myAccount__title">Мои книги:</p>
                <div className="withdrawalBooks grid-4">
                    {books ? (
                        books.map((book, i) => {
                                return (
                                    <Link key={book.id} to={`/all-books/${book.id}`} className="withdrawalBooks__elem">
                                        <div className="withdrawalBooks__img">
                                            <img src={book.cover} alt={book.title}/>
                                        </div>
                                        <div className="withdrawalBooks__text">
                                            <b className="withdrawalBooks__title">{book.title}</b>
                                            {book.available ? (
                                                <p className="cart__available cart__available__free">Доступна</p>
                                            ): (
                                                <p className="cart__available cart__available__busy">Занята</p>
                                            )}
                                            <div className="jc-sb">
                                                <p className="withdrawalBooks__genre"><b>Жанр:</b> {book.genre}</p>
                                                <p className="withdrawalBooks__author"><b>Автор:</b> {book.author}</p>
                                            </div>
                                            <p className="withdrawalBooks__desc">{book.description}</p>
                                        </div>
                                    </Link>
                                )
                            }
                        )
                    ) : (
                        <p className="myAccount__text">Вы пока не добавили никакой книги</p>
                    )}
                </div>
            </div>
        </>
    )
}