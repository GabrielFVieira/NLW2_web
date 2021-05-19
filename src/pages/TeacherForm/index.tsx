import React, { useState, FormEvent, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';

import PageHeader from '../../components/PageHeader';
import AlertPanel from '../../components/AlertPanel';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { currencyPattern } from '../../assets/utils/patterns';
import { useAuth } from '../../contexts/auth';
import { Schedule } from '../../components/ScheduleBar';

import cancelIcon from '../../assets/images/icons/cancel.svg';
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
	const { user } = useAuth();
	const [subjects, setSubjects] = useState([]);

	const [description, setDescription] = useState('');
	const [subjectId, setSubjectId] = useState(0);

	const [newSubject, setNewSubject] = useState('');
	const [isNewSubject, setIsNewSubject] = useState(false);

	const [cost, setCost] = useState('');

	const [schedules, setSchedules] = useState([{ to: '', from: '' } as Schedule]);

	const [showAlert, setShowAlert] = useState(false);

	const newSubjectItem = { value: '-1', label: '+ Nova matéria' };

	useEffect(() => {
		trackPromise(
			api.get('subjects').then(response => {
				const subjectsOptions = response.data.map((subjectItem: SubjectItem) => {
					return { value: subjectItem.id, label: subjectItem.name };
				});

				subjectsOptions.push(newSubjectItem);

				setSubjects(subjectsOptions);
			})
		);
	}, []);

	function removeSpecialCharacters(text: string) {
		return text.replace(/[^0-9.,]/g, '').replace(',', '.');
	}

	function addNewScheduleItem() {
		setSchedules([...schedules, { to: '', from: '' } as Schedule]);
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

	async function handleCreateClass(e: FormEvent) {
		e.preventDefault();

		if (showAlert) {
			return;
		}

		let subject = isNewSubject ? { name: newSubject } : { id: subjectId };

		trackPromise(
			api
				.post('classes', {
					description,
					subject,
					cost: Number(removeSpecialCharacters(cost)),
					schedules,
				})
				.then(() => {
					setShowAlert(true);
				})
				.catch(() => {
					showError('Erro ao realizar cadastro');
				})
		);
	}

	function showError(message: String) {
		alert(message);
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

			{!showAlert ? (
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
								{!isNewSubject ? (
									<Select
										name="subject"
										label="Matéria"
										value={subjectId}
										options={subjects}
										required
										onChange={e => {
											if (e.target.value != newSubjectItem.value) {
												setSubjectId(Number(e.target.value));
											} else {
												setSubjectId(0);
												setIsNewSubject(true);
											}
										}}
									/>
								) : (
									<Input
										name="newSubject"
										label="Nome da nova matéria"
										required
										value={newSubject}
										maxLength={30}
										onChange={e => {
											setNewSubject(e.target.value);
										}}
									>
										<img
											className="icon"
											onClick={e => {
												setIsNewSubject(false);
												setNewSubject('');
											}}
											src={cancelIcon}
											alt="Cancelar nova matéria"
										/>
									</Input>
								)}
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
			) : (
				<AlertPanel
					title="Cadastro salvo!"
					message="Tudo certo, seu cadastro está na nossa lista de professores.
							 Agora é só ficar de olho no seu WhatsApp."
					buttonText="Acessar lista"
					buttonUrl="/study"
				/>
			)}
		</div>
	);
}

export default TeacherForm;
