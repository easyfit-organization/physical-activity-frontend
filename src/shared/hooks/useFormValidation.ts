import { useCallback, useState } from 'react';

const initialValues = {
	name: '',
	email: '',
	password: '',
	secondPassword: '',
	terms: '',
};

export function useFormValidation() {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const [isValid, setIsValid] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === 'email' && target.validationMessage !== '') {
			setErrors({ ...errors, [name]: 'Введите корректный Email' });
		} else if (name === 'name' && target.validationMessage !== '') {
			setErrors({ ...errors, [name]: 'Допустимые символы: пробел, дефис' });
		} else if (name === 'password' && target.validationMessage !== '') {
			setErrors({
				...errors,
				[name]:
					'Пароль должен состоять из 6 символов, буквы в верхнем и нижнем регистре, пробел, дефис',
			});
		} else if (name === 'secondPassword' && target.validationMessage !== '') {
			setErrors({ ...errors, [name]: 'Пароли не совпадают' });
		} else if (name === 'terms' && target.validationMessage !== '') {
			setErrors({ ...errors, [name]: 'Необходимо принять условия' });
		} else {
			setErrors({ ...errors, [name]: target.validationMessage });
		}
		setValues({ ...values, [name]: value });
		const form = target.closest('form');
		if (form) {
			setIsValid(form.checkValidity());
		}
	};

	const resetForm = useCallback(
		(
			newValues = initialValues,
			newErrors = initialValues,
			newIsValid = false
		) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[setValues, setErrors, setIsValid]
	);

	return { values, handleChange, errors, isValid, resetForm, setIsValid };
}
