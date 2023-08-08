import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegisterForm.css';
import { Input } from '../RegisterInput/RegisterInput';
import { Checkbox } from '../RegisterCheckbox/RegisterCheckbox';
import { signup } from '../../shared/api/signup';
import { RegisterErrorPopup } from '../RegisterErrorPopup/RegisterErrorPopup';
import { useFormValidation } from 'shared/hooks/useFormValidation';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
	const [repeatpasswordInputValue, setRepeatpasswordInputValue] = useState('');
	const { values, handleChange, errors, isValid, resetForm } =
		useFormValidation();

	useEffect(() => {
		resetForm();
	}, [resetForm]);

	const validateRepeatpasswordInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.value !== values.password) {
			e.target.setCustomValidity('Пароли не совпадают');
		} else {
			e.target.setCustomValidity('');
		}
		setRepeatpasswordInputValue(e.target.value);
		handleChange(e);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		signup(values.name, values.email, values.password)
			.then(() => navigate('/register-confirm'))
			.catch((err) => {
				if (
					`${err}` === 'Error: {"email":["User с таким email уже существует."]}'
				) {
					openErrorPopup();
				} else {
					navigate('/register-error');
				}
			});
	}

	function openErrorPopup() {
		setErrorPopupOpen(true);
	}

	return (
		<form className="register__form" onSubmit={handleSubmit}>
			<div className="register__input-container">
				<Input
					type="text"
					id="name"
					name="name"
					value={values.name}
					placeholder="Ваше имя"
					validateInput={handleChange}
					isValidInput={errors.name}
					pattern="[A-Za-zА-Яа-я\s-]{2,}"
				/>
				<Input
					type="email"
					id="email"
					name="email"
					value={values.email}
					placeholder="Почта"
					validateInput={handleChange}
					isValidInput={errors.email}
					pattern="^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$"
				/>
				<Input
					type="password"
					id="password"
					name="password"
					value={values.password}
					placeholder="Пароль"
					validateInput={handleChange}
					isValidInput={errors.password}
					pattern="[a-zA-Z0-9\#\?\!\@\$\%\^\&\*\-]*.{6,}"
				/>
				<Input
					type="password"
					id="secondPassword"
					name="secondPassword"
					value={repeatpasswordInputValue}
					placeholder="Повторите пароль"
					validateInput={validateRepeatpasswordInput}
					isValidInput={errors.secondPassword}
					pattern="[a-zA-Z0-9\#\?\!\@\$\%\^\&\*\-]*.{6,}"
				/>
				<Checkbox
					type="checkbox"
					id="terms"
					name="terms"
					validateInput={handleChange}
				/>
			</div>
			<div className="register__button-container">
				<button
					className={`register__button ${
						!isValid && 'register__button_unvalid'
					}`}
					disabled={!isValid}
				>
					Поехали
				</button>
			</div>
			<RegisterErrorPopup isOpen={isErrorPopupOpen} email={values.email} />
		</form>
	);
};
