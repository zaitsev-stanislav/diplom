import {connect} from "react-redux";
import {genres, IBook, IGlobalState} from "../modules";
import {Link} from "react-router-dom";
import {useState} from "react";

interface IProps {
    books: IBook[]
}

const AllBooks = ({books}: IProps) => {
    const [filter, setFilter] = useState({
        title: '',
        author: '',
        genre: ''
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFilter(prevFilter => ({...prevFilter, [name]: value}));
    };
    // Список отфильтрованных книг
    const filteredBooks = books.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(filter.title.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(filter.author.toLowerCase());
        const genreMatch = filter.genre === '' || book.genre.toLowerCase() === filter.genre.toLowerCase();
        return titleMatch && authorMatch && genreMatch;
    });
    return (
        <>
            <div className="wrapper">
                <h1>Список всех книг</h1>
                <h2 className="mb-16">Фильтр книг</h2>
                <div className="filter mb-48">
                    <div>
                        <i className="form__desc filter__desc">Название</i>
                        <input className="form__inpText filter__inp" type="text" placeholder="Название" name="title"
                               value={filter.title}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <i className="form__desc filter__desc">Автор</i>
                        <input className="form__inpText filter__inp" type="text" placeholder="Автор" name="author"
                               value={filter.author}
                               onChange={handleInputChange}/>
                    </div>

                    <div>
                        <i className="form__desc filter__desc">Жанр</i>
                        <select className="form__inpText filter__inp" name="genre" id="genreFilter" value={filter.genre}
                                onChange={handleInputChange}>
                            <option value="">Все жанры</option>
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="withdrawalBooks grid-4">
                    {filteredBooks.map(book => {
                        return (
                            <Link key={book.id} to={`/all-books/${book.id}`} className="withdrawalBooks__elem">
                                <div className="withdrawalBooks__img">
                                    <img src={book.cover} alt={book.title}/>
                                </div>
                                <div className="withdrawalBooks__text">
                                    <b className="withdrawalBooks__title">{book.title}</b>
                                    {book.available ? (
                                        <p className="cart__available cart__available__free">Доступна</p>
                                    ) : (
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

const mapStateToProps = (state: IGlobalState) => {
    return {
        books: state.books.books
    }
};
export default connect(mapStateToProps, null)(AllBooks)