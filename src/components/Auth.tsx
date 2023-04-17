import React, {useState} from "react";

interface IState {
    email: string
    password: string
}
interface IProps {
    onSubmit: (data: IState) => Promise<void>
}
export const Auth = ({onSubmit}: IProps) => {
    const [formValues, setFormValues] = useState<IState>({
        email: '',
        password: ''
    });

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    // функция для добавления данных
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formValues)
    }

    return (
        <div className="wrapper">
            <h2 className="mb-32">Авторизоваться</h2>
            <form className="form authPage" onSubmit={handleSubmit}>
                <i className="form__desc">Введите ваш логин</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.email} type="text" name="email" placeholder="Логин"/>
                <i className="form__desc">Введите ваш пароль</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.password} type="text" name="password" placeholder="Пароль"/>
                <button className="btn form__btn">Авторизоваться</button>
            </form>
        </div>
    )
}