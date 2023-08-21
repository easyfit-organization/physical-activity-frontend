import { useNavigate } from 'react-router';

import './FooterMain.css';

import homeIcon from './icons/home.svg';
import homeIconInactive from './icons/homeInactive.svg';
import workoutIcon from './icons/workout.svg';
import workoutIconInactive from './icons/workoutInactive.svg';
import statsIconInactive from './icons/statInactive.svg';

type Props = {
	page: string;
};

const FooterMain = ({ page }: Props) => {
	const navigate = useNavigate();

	return (
		<div className="footer-main">
			<button
				className="footer-main__item"
				onClick={() => {
					navigate('/');
				}}
			>
				<img src={page === 'main' ? homeIcon : homeIconInactive}></img>
				<caption>Главная</caption>
			</button>
			<button
				className="footer-main__item"
				onClick={() => {
					navigate('/my-trainings');
				}}
			>
				<img
					src={page === 'trainings' ? workoutIcon : workoutIconInactive}
				></img>
				<caption>Тренировки</caption>
			</button>
			<button
				className="footer-main__item"
				onClick={() => {
					navigate('/');
				}}
			>
				<img src={statsIconInactive}></img>
				<caption>Статистика</caption>
			</button>
		</div>
	);
};

export default FooterMain;
