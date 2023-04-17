import {AUTH, IAction} from "../modules";

interface IInitialState {
    auth: boolean
}

const initialState: IInitialState = {
    auth: false
};

export const authReducer = (state: IInitialState = initialState, action: IAction): IInitialState => {
    if (action.type === AUTH) {
        return {
            ...state,
            auth: !state.auth
        };
    } else {
        return state;
    }
};