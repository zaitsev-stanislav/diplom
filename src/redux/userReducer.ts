import {IUser, USERINFO} from "../modules";

interface IAction {
    type: string
    payload: IUser
}

const initialState: IUser = {
    id: 0,
    added_books: [],
    email: "",
    desired_books: [],
    favorite_genres: [],
    password: "",
    phone: "",
    username: ""
};
export const userReducer = (state: IUser = initialState, action: IAction): IUser => {

    if (action.type === USERINFO) {
        return {
            ...state,
            ...action.payload
        }
    }else {
        return state
    }

};