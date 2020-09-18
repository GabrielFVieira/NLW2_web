import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { currencyPattern } from '../../assets/utils/patterns';
import { useAuth } from '../../contexts/auth';
import { Schedule } from '../../components/ScheduleBar';

import userIcon from '../../assets/images/icons/user.svg';
import warningIcon from '../../assets/images/icons/warning.svg';
import removeIcon from '../../assets/images/icons/remove.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import weekDays from '../../assets/utils/weekDays';

import api from '../../services/api';
import './styles.css';

interface SubjectItem {
	id: number;
	name: string;
}

function TeacherForm() {
	const history = useHistory();

	const { user } = useAuth();
	const [subjects, setSubjects] = useState([]);

	const [description, setDescription] = useState('');
	const [subject, setSubject] = useState(0);
	const [cost, setCost] = useState('');

	const [schedules, setSchedules] = useState([{ to_formated: '', from_formated: '' } as Schedule]);

	useEffect(() => {
		api.get('subjects').then(response => {
			const subjectsOptions = response.data.map((subjectItem: SubjectItem) => {
				return { value: subjectItem.id, label: subjectItem.name };
			});

			setSubjects(subjectsOptions);
		});
	}, []);

	function removeSpecialCharacters(text: string) {
		return text.replace(/[^0-9.,]/g, '').replace(',', '.');
	}

	function addNewScheduleItem() {
		setSchedules([...schedules, { to_formated: '', from_formated: '' } as Schedule]);
	}

	function removeScheduleItem(scheduleIndex: number) {
		const scheduleItemsOriginal = [...schedules];
		scheduleItemsOriginal.splice(scheduleIndex, 1);
		setSchedules(scheduleItemsOriginal);
	}

	function setScheduleItemValue(position: number, field: string, value: string) {
		const updateScheduleItems = schedules.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value };
			}

			return scheduleItem;
		});

		setSchedules(updateScheduleItems);
	}

	function handleCreateClass(e: FormEvent) {
		e.preventDefault();

		api
			.post('classes', {
				description,
				subject: { id: subject },
				cost: Number(removeSpecialCharacters(cost)),
				schedules,
			})
			.then(() => {
				alert('Cadastro realizado com sucesso!');
				history.push('/');
			})
			.catch(() => {
				alert('Erro ao realizar cadastro');
			});
	}

	return (
		<div id="page-teacher-form" className="container">
			<PageHeader
				pageName="Dar aulas"
				title="Que incrível que você quer dar aulas."
				description="O primeiro passo é preencher esse formulário de inscrição"
				rightContent={{
					image: rocketIcon,
					imageAlt: 'Foguete',
					text: 'Preparare-se!\nVai ser o máximo.',
				}}
			/>

			<main>
				<form onSubmit={handleCreateClass}>
					<fieldset>
						<legend>Seus dados</legend>
						<div className="teacher-info">
							<div>
								<img src={user && user.avatar ? user.avatar : userIcon} alt={user?.name} className="user-icon" />
								<h2 className="proffy-name">{`${user?.name} ${user?.surname}`}</h2>
							</div>

							<Input
								name="whatsapp"
								label="Whatsapp"
								mask="+99 (99) 99999-9999"
								value={user && user.whatsapp ? user.whatsapp : ''}
								disabled
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
					</fieldset>

					<fieldset>
						<legend>Sobre a aula</legend>

						<div className="about-class-itens">
							<Select
								name="subject"
								label="Matéria"
								value={subject}
								options={subjects}
								required
								onChange={e => {
									setSubject(Number(e.target.value));
								}}
							/>
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
					</fieldset>

					<fieldset>
						<legend>
							Horários disponíveis
							<button type="button" onClick={addNewScheduleItem}>
								+ Novo horário
							</button>
						</legend>

						{schedules.map((scheduleItem, index) => {
							return (
								<div key={index} className="schedule-item">
									<Select
										name="week-day"
										label="Dia da semana"
										value={scheduleItem.week_day}
										required
										onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
										options={weekDays}
									/>

									<div className="hour-container">
										<Input
											name="from"
											label="Das"
											type="time"
											required
											value={scheduleItem.from_formated}
											onChange={e => setScheduleItemValue(index, 'from_formated', e.target.value)}
										/>

										<Input
											name="to"
											label="Até"
											type="time"
											required
											value={scheduleItem.to_formated}
											onChange={e => setScheduleItemValue(index, 'to_formated', e.target.value)}
										/>
									</div>

									<button type="button" onClick={() => removeScheduleItem(index)} disabled={schedules.length <= 1}>
										<img src={removeIcon} alt="Remover" />
									</button>
								</div>
							);
						})}
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">Salvar cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default TeacherForm;
