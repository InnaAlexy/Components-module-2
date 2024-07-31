import './index.css';
import styles from './app.module.css';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState('');
	const [error, setError] = useState('');
	const [isValueValid, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length >= 3) {
			setValue(`${promptValue}`);
			setError('');
			setIsValueValid(true);
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueValid(false);
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			const updatedList = [...list, { id: `${Date.now()}`, value: `${value}` }];
			setList(updatedList);
			setValue('');
			setError('');
			setIsValueValid(false);
		}
	};

	const addListItem = (list) => {
		const listItem = list.map((item) => (
			<li className={styles['list-item']} key={item.id}>
				{item.value}
			</li>
		));
		return <ul className={styles.list}> {listItem} </ul>;
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code> value </code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list ? (
					addListItem(list)
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
}

export default App;
