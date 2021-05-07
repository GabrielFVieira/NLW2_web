import React, { useState, useEffect } from 'react';

import { Schedule } from '../ScheduleBar';
import { Subject } from '../TeacherItem';
import Textarea from '../Textarea';
import Select from '../Select';
import Input from '../Input';

import { currencyPattern } from '../../assets/utils/patterns';
import weekDays from '../../assets/utils/weekDays';

import removeIcon from '../../assets/images/icons/remove.svg';

import './styles.css';

export interface UserClasses {
	id: number;
	subject: Subject;
	cost: number;
	schedules: Schedule[];
	description?: string;
}

interface UserClassItemProps {
	classe: UserClasses;
	index: number;
	onRemove(index: number): void;
	onRemoveSchedule(id: number): void;
}

const UserClassItem: React.FC<UserClassItemProps> = ({ classe, index, onRemove, onRemoveSchedule }) => {
	const [description, setDescription] = useState(classe.description);
	const [cost, setCost] = useState(formatNumber(classe.cost));
	const [subject] = useState(classe.subject.name);

	const defaultScheduleItem = { to: '', from: '' } as Schedule;

	const [schedules, setSchedules] = useState(
		classe.schedules && classe.schedules.length > 0 ? (classe.schedules as Schedule[]) : [defaultScheduleItem]
	);

	useEffect(() => {
		classe.description = description;
		classe.cost = Number(removeSpecialCharacters(cost));
		classe.schedules = schedules;
	}, [classe, description, cost, schedules]);

	function formatNumber(value: number) {
		let text = Number(value).toFixed(2).toString();
		return text.padStart(5, '0');
	}

	function handleRemove() {
		onRemove(index);
	}

	function addNewScheduleItem() {
		setSchedules([...schedules, defaultScheduleItem]);
	}

	function removeScheduleItem(scheduleIndex: number) {
		const scheduleItemsOriginal = [...schedules];
		const removedSchedules = scheduleItemsOriginal.splice(scheduleIndex, 1);

		if (removedSchedules[0].id) {
			onRemoveSchedule(removedSchedules[0].id);
		}

		setSchedules(scheduleItemsOriginal);
	}

	function setScheduleItemValue(position: number, field: string, value: string | number) {
		const updateScheduleItems = schedules.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value };
			}

			return scheduleItem;
		});

		setSchedules(updateScheduleItems);
	}

	function removeSpecialCharacters(text: string) {
		return text.replace(/[^0-9.,]/g, '').replace(',', '.');
	}

	return (
		<div className="user-class-item">
			<div className="user-class-item-container">
				<Input name="subject" label="Matéria" value={subject} disabled />
				<Input
					name="cost"
					label="Custo da sua hora por aula"
					mask="R$99,99"
					pattern={currencyPattern.pattern}
					title={currencyPattern.title}
					required
					value={cost}
					onChange={e => {
						setCost(e.target.value);
					}}
				/>
			</div>

			<Textarea
				maxLength={1000}
				name="description"
				required
				value={description}
				label="Descrição da aula"
				onChange={e => {
					setDescription(e.target.value);
				}}
			/>

			<h3>
				<span>Horários</span>
				<span className="add-schedule" onClick={addNewScheduleItem}>
					+ Novo horário
				</span>
			</h3>

			{schedules.map((scheduleItem, index) => {
				return (
					<div key={index} className="schedule-item">
						<Select
							name="week-day"
							label="Dia da semana"
							value={scheduleItem.week_day}
							required
							onChange={e => setScheduleItemValue(index, 'week_day', Number(e.target.value))}
							options={weekDays}
						/>

						<div className="hour-container">
							<Input
								name="from"
								label="Das"
								type="time"
								required
								value={scheduleItem.from}
								onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
							/>

							<Input
								name="to"
								label="Até"
								type="time"
								required
								value={scheduleItem.to}
								onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
							/>
						</div>

						<button type="button" onClick={() => removeScheduleItem(index)} disabled={schedules.length <= 1}>
							<img src={removeIcon} alt="Remover" />
						</button>
					</div>
				);
			})}

			<h2>
				<span onClick={handleRemove}>Excluir aula</span>
			</h2>
		</div>
	);
};

export default UserClassItem;
