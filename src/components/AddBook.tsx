import React, {useState} from "react";
import {genres} from "../modules";

interface IState {
    "title": string
    "author": string
    "genre": string
    "available": boolean
    "cover": string
    "description": string
}
interface IProps {
    message: string,
    onSubmit: (data: IState) => Promise<void>
}

export const AddBook =  ({message, onSubmit}: IProps) => {
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const [formValues, setFormValues] = useState<IState>({
        title: '',
        author: '',
        genre: '',
        available: true,
        cover: '',
        description: '',
    });

    // функция для отправки данных на сервер
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formValues)
    }

    return (
        <div className="wrapper">
            <h1 className="mb-32">Добавить книгу</h1>
            <form className="form authPage" onSubmit={handleSubmit}>
                <i className="form__desc">Введите название книги</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.title} type="text" name="title" placeholder="Ночной дозор"/>

                <i className="form__desc">Введите автора книги</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.author} type="text" name="author" placeholder="Сергей Лукьяненко"/>

                <i className="form__desc">Укажите жанр</i>
                <select className="form__inpText" name="genre" value={formValues.genre} onChange={handleInputChange}>
                    <option value="Фантастика">Фантастика</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>

                <i className="form__desc">Напишите ссылку на картинку обложки книги</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.cover} type="text" name="cover" placeholder="https://example-image.com"/>

                <i className="form__desc">Укажите описание</i>
                <input className="form__inpText" onChange={handleInputChange} value={formValues.description} type="text" name="description" placeholder="Описание"/>

                <button className="btn form__btn">Добавить книгу</button>
                <p className="form__message">{message}</p>
            </form>
        </div>
    )
}