import {connect} from "react-redux";
import {IBook, IGlobalState, IUser} from "../modules";
import {Account} from "../components/Account";
import {useEffect, useState} from "react";

interface IProps {
    user: IUser,
    books: IBook[],
    auth: boolean
}

const AccountPage = ({user,books, auth}: IProps) => {

    const [filterBooks, setFilterBooks] = useState<IBook[]>([]);


    // Получу все киниги пользователя
    useEffect(() => {
        const filteredBooks = books.filter((book) => user.added_books.includes(book.id));
        setFilterBooks(filteredBooks);
    }, [user]);

    return (
        <>
            {auth ? (
                <Account user={user} books={filterBooks}/>
            ): (
                <h1>Вы не авторизованы</h1>
            )}
        </>
    )
};

const mapStatetoProps = (state: IGlobalState) => {
    return {
        user: state.userInfo,
        books: state.books.books,
        auth: state.auth.auth
    }
};

export default connect(mapStatetoProps, null)(AccountPage)