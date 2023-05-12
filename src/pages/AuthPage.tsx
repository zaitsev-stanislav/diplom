import {connect} from "react-redux";
import {IAction, IGlobalState, IUser} from "../modules";
import {Auth} from "../components/Auth";
import axios from "axios";
import {AUserInfo, authUsers} from "../redux/actions";
import {Navigate} from "react-router-dom"
import React, {useState} from "react";
import {Registration} from "../components/Registration";

interface IRegistationData {
    email: string
    password: string
    phone: string
    username: string
}

interface IProps {
    auth: boolean,
    authUsers: () => IAction,
    AUserInfo: (info: IUser) => {type: string, payload: IUser}
}



const AuthPage = ({auth, authUsers, AUserInfo}: IProps) => {

    const [message, setMessage] = useState(""); // стате для хранения сообщения об ошибке

    // функция для авторизации в систему
    async function handleSubmitAddEnterprise(data: { email: string, password: string }) {
        try {
            const response = await axios.get<IUser[]>(`http://localhost:3004/users?email=${data.email.trim()}`);
            if (response.status < 299 && response.data.length !== 0) {
                if (response.data[0].password === data.password) {
                    // Если успешно авторизовались, то сохраним данные о пользователе и поменяем флаг что он авторизован
                    AUserInfo(response.data[0]);
                    authUsers();
                }else {
                    alert("Неверный пароль")
                }
            }else {
                alert("Пользователя с таким email нет")
            }

        } catch (e) {
            console.log(e);
            alert("Произошла ошибка: " + e)
        }
    }

    // функция для добавления новых пользователей в программу
    async function RegistationNewUsers(data: IRegistationData) {
        try {
            const response = await axios.get<IUser[]>(`http://localhost:3004/users?email=${data.email.trim()}`);
            if (response.status < 299 && response.data.length !== 0) {
                setMessage("Пользователь с таким email адресом уже есть");
            }else {
            //    Если новый пользователь
                const newUser = await axios.post<IUser>('http://localhost:3004/users', {
                    desired_books: [],
                    favorite_genres: [],
                    email: data.email,
                    phone: data.phone,
                    username: data.username,
                    password: data.password,
                    added_books: []
                }).then(response => {
                    if (response.status < 299 || response.statusText === "Created"){
                        AUserInfo(response.data);
                        authUsers()
                    }
                }).catch(error => {
                    setMessage(`Произошла ошибка: ${error}`);
                })
            }
        }
        catch (e) {
            console.log(`Ошибка при добавлении нового юзера в БД: ${e}`)
        }

    }

    return (
        <>
            {auth ? (
                // Если авторизованы то перекидывает на наш профиль
                <Navigate to="/account" replace={true} />
            ) : (
                <>
                    <div className="grid-2">
                        <Auth onSubmit={handleSubmitAddEnterprise}/>
                        <Registration message={message} onSubmit={RegistationNewUsers}/>
                    </div>
                </>

            )}
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
    AUserInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)