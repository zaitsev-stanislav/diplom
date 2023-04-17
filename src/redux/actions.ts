import {AUTH, GET_BOOKS, IBook, IUser, THEME, USERINFO} from "../modules";

export const authUsers = () => {
    return {type: AUTH}
};

export const ActionTheme = () => {
    return {type: THEME}
};

export const getAllBooks = (books: IBook[]) => {
    return {
        type: GET_BOOKS,
        payload: books
    }
};

export const AUserInfo = (info: IUser) => {
    return {
        type: USERINFO,
        payload: info
    }
};