import {THEME} from "../modules";


interface IState {
    dark: boolean
}
const initialState: IState = {
    dark : false
};

interface IAction  {
    type: string
}
export const themeReducer = (state:  IState= initialState, action: IAction): IState => {
    if (action.type === THEME) {
        return {
            ...state,
            dark: !state.dark
        }
    }else {
        return state
    }

};