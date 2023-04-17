import {combineReducers} from 'redux'
import {booksReducer} from "./booksReducer";
import {authReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {themeReducer} from "./themeReducer";



export const rootReducer = combineReducers ({
    books: booksReducer,
    auth: authReducer,
    userInfo: userReducer,
    dark: themeReducer
})