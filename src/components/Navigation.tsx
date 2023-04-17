import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IGlobalState} from "../modules";
import {ActionTheme, authUsers,} from "../redux/actions";

interface IProps {
    auth: boolean
    authUsers: () => {type: string}
    ActionTheme: () => {type: string}
}

const Navigation = ({auth, authUsers, ActionTheme}: IProps) => {
    return (
        <>
            <nav className="wrapper navigation">
                <b className="navigation__title">Навигация</b>
                <ul className="navigation__list">
                    <li className="navigation__elem"><Link to="/">Главная</Link></li>
                    <li className="navigation__elem"><Link to="/all-books">Все книги</Link></li>
                    {auth ? (
                        <li className="navigation__elem" onClick={authUsers}>Выйти из аккаунта</li>
                    ) : (
                        <li className="navigation__elem"><Link to="/auth">Авторизация</Link></li>
                    )}
                    <li onClick={ActionTheme}>Сменить тему</li>
                </ul>
            </nav>
        </>
    )
};

const mapStateToProps = (state: IGlobalState) => {
    return {
        auth: state.auth.auth
    }
};
const mapDispatchToProps = {
    authUsers,
    ActionTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)