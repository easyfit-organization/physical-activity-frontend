import './TrainingInput.css';

type Props = {
	name: string;
	type: string;
	placeholder?: string;
	id: string;
	value: string | number | undefined;
	pattern?: string;
	isValidInput: string;
	setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TrainingInput = ({
	name,
	type,
	placeholder,
	id,
	value,
	pattern,
	isValidInput,
	setValue,
}: Props) => {
	return (
		<>
			<input
				required
				type={type}
				name={name}
				value={value}
				id={id}
				className="training-input__input"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e)}
				pattern={pattern}
				placeholder={placeholder}
			/>
		</>
	);
};
