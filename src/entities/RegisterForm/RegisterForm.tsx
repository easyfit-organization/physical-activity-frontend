import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './RegisterForm.css';
import { Input } from '../Input/Input';
import { Checkbox } from '../RegisterCheckbox/RegisterCheckbox';
import { signup } from '../../shared/api/signup';
import { RegisterErrorPopup } from '../RegisterErrorPopup/RegisterErrorPopup';
import { useFormValidation } from 'shared/hooks/useFormValidation';
import { REGEX } from 'shared/utils/constants';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
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
		handleChange(e);
	};

	const validatePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (
			values.secondPassword !== '' &&
			e.target.value !== values.secondPassword
		) {
			e.target.setCustomValidity('Пароли не совпадают');
		} else {
			e.target.setCustomValidity('');
		}
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
					required={true}
					type="text"
					id="name"
					name="name"
					value={values.name}
					placeholder="Имя"
					setValue={handleChange}
					isValidInput={errors.name}
					pattern={REGEX.name.source}
				/>
				<Input
					required={true}
					type="text"
					id="email"
					name="email"
					value={values.email}
					placeholder="Почта"
					setValue={handleChange}
					isValidInput={errors.email}
					pattern={REGEX.email.source}
				/>
				<Input
					required={true}
					type="password"
					id="password"
					name="password"
					value={values.password}
					placeholder="Пароль"
					setValue={validatePasswordInput}
					isValidInput={errors.password}
					pattern={REGEX.password.source}
				/>
				<Input
					required={true}
					type="password"
					id="secondPassword"
					name="secondPassword"
					value={values.secondPassword}
					placeholder="Повторите пароль"
					setValue={validateRepeatpasswordInput}
					isValidInput={errors.secondPassword}
					pattern={REGEX.password.source}
				/>
				<Checkbox
					type="checkbox"
					id="terms"
					name="terms"
					validateInput={handleChange}
				/>
			</div>
			<button
				className={`register__button ${!isValid && 'register__button_unvalid'}`}
				disabled={!isValid}
			>
				Зарегистрироваться
			</button>
			{/* <div className="register__button-container"></div> */}
			<RegisterErrorPopup isOpen={isErrorPopupOpen} email={values.email} />
		</form>
	);
};
