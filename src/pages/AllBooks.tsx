import {connect} from "react-redux";
import {IBook, IGlobalState} from "../modules";
import {Link} from "react-router-dom";

interface IProps {
    books: IBook[]
}

const AllBooks = ({books}:IProps) => {
    return (
        <>
            <div className="wrapper">
                <h1>Список всех книг</h1>
                <div className="withdrawalBooks grid-4">
                    {books.map(book => {
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
                    })}
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state : IGlobalState) => {
    return {
        books : state.books.books
    }
};
export default connect(mapStateToProps, null)(AllBooks)