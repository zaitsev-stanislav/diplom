import {connect, useDispatch} from "react-redux";
import {IBook, IGlobalState, IUser} from "../modules";
import {AddBook} from "../components/AddBook";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {AUserInfo, getAllBooks} from "../redux/actions";


interface IProps {
    user: IUser,
    auth: boolean,
    AUserInfo: (info: IUser) => { type: string, payload: IUser }
    // getAllBooks: (books: IBook[]) => { type: string, payload: IBook[] }

}

interface IAddBook {
    "title": string
    "author": string
    "genre": string
    "available": boolean
    "cover": string
    "description": string
}

interface IState {
    message: string,
    booksId: Array<number>

}

const AddBookPage = ({auth, user}: IProps) => {

    const [bookInfo, setBookInfo] = useState<IState>({
        message: "",
        booksId: user.added_books
    });
    const dispatch = useDispatch();

    // После успешного запроса обновим данные о пользователе и о всех книгах
    useEffect(() => {
        if (!auth) return; // Если не авторизованы то ничего не делаем

        // обновляем информацию о пользователе и книгах
        updateUserInfo();
        updateBooksInfo();
    }, [bookInfo.booksId, user.id]);


    // функция для обновления информации о пользователе
    const updateUserInfo =async () => {
        try {
            const req = await axios.patch<IUser>(`http://localhost:3004/users/${user.id}`, {
                added_books: bookInfo.booksId
            });
            if (req.status < 299) {
                dispatch(AUserInfo(req.data))
            }
        } catch (e) {
            console.log(e)
        }
    };

    // функция для обновления информации о всех книгах
    const updateBooksInfo = async () => {
        try {
            const books = await axios.get("http://localhost:3004/books");
            if (books.status < 299) {
                dispatch(getAllBooks(books.data));
            }
        } catch (e) {
            console.log(e)
        }
    };


    const addBookToDataBase = async (data: IAddBook) => {
        setBookInfo(prevState => ({
            ...prevState,
            message: ""
        }));
        try {
            // добавим книгу в базу данных
            const resp = await axios.post<IBook>("http://localhost:3004/books", {
                title: data.title,
                author: data.author,
                genre: data.genre,
                available: data.available,
                cover: data.cover,
                description: data.description,
                owner: user.id
            });

            if (resp.status < 299 || resp.statusText === "Created") {
                setBookInfo(prevState => ({
                    ...prevState,
                    booksId: [...prevState.booksId, resp.data.id],
                    message: "Книга успешно добавлена"
                }));
            } else {
                setBookInfo(prevState => ({
                    ...prevState,
                    message: "Что-то пошло не так"
                }));
            }
        } catch
            (e) {
            console.log(e)
        }

    };

    return (
        <>
            {auth ? (
                <>
                    <AddBook message={bookInfo.message} onSubmit={addBookToDataBase}/>
                </>
            ) : (
                <h1>Вы не авторизованы</h1>
            )}
        </>
    )
};

const mapStatetoProps = (state: IGlobalState) => {
    return {
        user: state.userInfo,
        auth: state.auth.auth
    }
};
const mapDispatchToProps = {
    AUserInfo,
    getAllBooks
};
export default connect(mapStatetoProps, {AUserInfo})(AddBookPage);