import {GET_BOOKS, IBook} from "../modules";

interface IInitialState {
    books: IBook[]
}

interface IAction {
    type: string
    payload: IBook[]
}

const initialState: IInitialState = {
    books: []
};

export const booksReducer = (state: IInitialState = initialState, action: IAction): IInitialState => {
    if (action.type === GET_BOOKS) {
        return {
            ...state,
            books: action.payload
        };
    } else {
        return state;
    }
};