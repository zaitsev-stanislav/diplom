export interface IBook {
    "id": number
    "title": string
    "author": string
    "genre": string
    "available": boolean
    "cover": string
    "description": string
    "owner": number
}

export interface IUser {
    id: number;
    desired_books: string[];
    favorite_genres: string[];
    email: string;
    phone: string;
    username: string;
    password: string;
    added_books: number[];
}

export interface IGlobalState {
    books: {
        books: Array<IBook>
    },
    auth: {
        auth: boolean
    },
    userInfo: IUser
    dark: {
        dark: boolean
    }
}

export interface IAction {
    type: string
}

export const GET_BOOKS = "GET_BOOKS";
export const AUTH = "AUTH";
export const USERINFO = "USERINFO";
export const THEME = "THEME";