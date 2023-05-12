import React, {useState} from "react";

interface IState {
    email: string
    password: string
    phone: string
    username: string
}
interface IProps {
    message: string,
    onSubmit: (data: IState) => Promise<void>

}
export const Registration = ({message, onSubmit}: IProps) => {

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const [formValues, setFormValues] = useState<IState>({
        email: '',
        password: '',
        username: '',
        phone: '',
    });

    // функция для отправки данных на сервер
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formValues)
    }

    return (
        <div className="wrapper">
            <h2 className="mb-32">Зарегистрироваться</h2>
            <form className="form authPage" onSubmit={handleSubmit}>
                <i className="form__desc">Введите вашу почту</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.email} type="text" name="email" placeholder="Почта"/>

                <i className="form__desc">Придумайте никнейм</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.username} type="text" name="username" placeholder="Никнейм"/>

                <i className="form__desc">Введите ваш телефон</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.phone} type="text" name="phone" placeholder="Телефон"/>

                <i className="form__desc">Придумайте пароль</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.password} type="text" name="password" placeholder="Пароль"/>
                <button className="btn form__btn">Зарегистрироваться</button>
                <p className="form__message">{message}</p>
            </form>
        </div>
    )
}